from fastapi import FastAPI, UploadFile, File, Form, HTTPException
import shutil
from pathlib import Path
from uuid import uuid4

from service import save_reference, check_reference, save_attendance_capture

app = FastAPI()

TEMP_DIR = Path(__file__).resolve().parent / "temp"
TEMP_DIR.mkdir(exist_ok=True)


def save_upload(image: UploadFile):
    path = TEMP_DIR / f"temp_{uuid4().hex}_{Path(image.filename).name}"

    with open(path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return path

@app.post("/admin/register")
async def enroll_face(
    image: UploadFile = File(...),
    name: str = Form("admin")
):
    path = save_upload(image)

    try:
        reference = save_reference(path, name=name)

        if reference is None:
            raise HTTPException(status_code=400, detail="No face detected in the uploaded image")

        return {
            "success": True,
            "message": f"Face enrolled for {name}",
        }
    finally:
        if path.exists():
            path.unlink()

@app.post("/employee/register")
async def enroll_face(
    image: UploadFile = File(...),
    name: str = Form("employee")
):
    path = save_upload(image)

    try:
        reference = save_reference(path, name=name)

        if reference is None:
            raise HTTPException(status_code=400, detail="No face detected in the uploaded image")

        return {
            "success": True,
            "message": f"Face enrolled for {name}",
        }
    finally:
        if path.exists():
            path.unlink()




@app.post("/student/register")
async def enroll_face(
    image: UploadFile = File(...),
    name: str = Form("Student")
):
    path = save_upload(image)

    try:
        reference = save_reference(path, name=name)

        if reference is None:
            raise HTTPException(status_code=400, detail="No face detected in the uploaded image")

        return {
            "success": True,
            "message": f"Face enrolled for {name}",
        }
    finally:
        if path.exists():
            path.unlink()


@app.post("/check-attendance")
async def check_attendance(
    image: UploadFile = File(...)
):
    path = save_upload(image)

    try:
        result = check_reference(path)

        if not result["success"]:
            raise HTTPException(status_code=400, detail=result["message"])

        save_attendance_capture(
            path,
            name=result.get("name", "Student"),
            matched=result.get("matched", False),
            confidence=result.get("confidence"),
        )

        return result
    finally:
        if path.exists():
            path.unlink()