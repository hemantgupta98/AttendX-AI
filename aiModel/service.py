from pathlib import Path
import json
import shutil
from datetime import datetime

import cv2
import numpy as np
from insightface.app import FaceAnalysis

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
ATTENDANCE_DIR = DATA_DIR / "attendance"
REFERENCE_FILE = DATA_DIR / "reference.json"
REFERENCE_IMAGE = DATA_DIR / "reference.jpg"

DATA_DIR.mkdir(exist_ok=True)
ATTENDANCE_DIR.mkdir(exist_ok=True)

face_app = FaceAnalysis(name="buffalo_l")
face_app.prepare(ctx_id=-1)


def get_face_embedding(image_path):
    image = cv2.imread(str(image_path))

    if image is None:
        return None

    faces = face_app.get(image)

    if len(faces) == 0:
        return None

    return faces[0].embedding


def compare_faces(stored_embedding, current_embedding):
    stored_embedding = np.array(stored_embedding)
    current_embedding = np.array(current_embedding)

    similarity = np.dot(
        stored_embedding,
        current_embedding
    ) / (
        np.linalg.norm(stored_embedding)
        * np.linalg.norm(current_embedding)
    )

    return float(similarity)


def save_reference(image_path, name="Student"):
    embedding = get_face_embedding(image_path)

    if embedding is None:
        return None

    reference = {
        "name": name,
        "embedding": embedding.tolist(),
    }

    shutil.copyfile(str(image_path), REFERENCE_IMAGE)

    with open(REFERENCE_FILE, "w", encoding="utf-8") as file:
        json.dump(reference, file)

    return reference


def save_attendance_capture(image_path, name="Student", matched=False, confidence=None):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    safe_name = "".join(char for char in name if char.isalnum() or char in ("-", "_", " ")).strip()
    safe_name = safe_name.replace(" ", "_") or "Student"
    status = "matched" if matched else "not_matched"
    confidence_text = ""

    if confidence is not None:
        confidence_text = f"_{confidence:.3f}".replace(".", "_")

    destination = ATTENDANCE_DIR / f"{timestamp}_{safe_name}_{status}{confidence_text}.jpg"
    shutil.copyfile(str(image_path), destination)
    return destination


def load_reference():
    if not REFERENCE_FILE.exists():
        return None

    with open(REFERENCE_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def check_reference(image_path, threshold=0.6):
    reference = load_reference()

    if reference is None:
        return {
            "success": False,
            "message": "No enrolled face found"
        }

    current_embedding = get_face_embedding(image_path)

    if current_embedding is None:
        return {
            "success": False,
            "message": "No face detected in the image"
        }

    score = compare_faces(reference["embedding"], current_embedding)

    if score >= threshold:
        return {
            "success": True,
            "matched": True,
            "name": reference["name"],
            "confidence": score,
            "message": "Face matched. Attendance marked."
        }

    return {
        "success": True,
        "matched": False,
        "name": reference["name"],
        "confidence": score,
        "message": "Face not matched. Attendance not marked."
    }