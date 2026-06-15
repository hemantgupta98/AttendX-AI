import numpy as np
from service import (
    get_face_embedding,
    compare_faces
)

def recognize_student(image_path, students):

    current_embedding = get_face_embedding(image_path)

    if current_embedding is None:
        return None

    best_match = None
    best_score = 0

    for student in students:

        stored_embedding = np.array(
            student["embedding"]
        )

        score = compare_faces(
            stored_embedding,
            current_embedding
        )

        if score > best_score:
            best_score = score
            best_match = student

    if best_score > 0.6:
        return {
            "student_id": best_match["id"],
            "name": best_match["name"],
            "confidence": float(best_score)
        }

    return None