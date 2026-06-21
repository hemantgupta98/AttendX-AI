from fastapi import FastAPI, UploadFile, File, Form, HTTPException
import shutil
from pathlib import Path
from uuid import uuid4

from service import verify_face

app = FastAPI()


TEMP_DIR = Path(__file__).resolve().parent / "temp"
UPLOAD_DIR = Path(__file__).resolve().parent / "faces"

TEMP_DIR.mkdir(exist_ok=True)
UPLOAD_DIR.mkdir(exist_ok=True)


def save_upload(image: UploadFile, folder):

    path = folder / f"{uuid4().hex}_{Path(image.filename).name}"

    with open(path, "wb") as buffer:
        shutil.copyfileobj(
            image.file,
            buffer
        )

    return path



# =========================
# ADMIN SIGNUP
# =========================

@app.post("/admin/signup")
async def admin_signup(
    image: UploadFile = File(...),
    name: str = Form(...)
):

    path = save_upload(
        image,
        UPLOAD_DIR
    )

    return {
        "success": True,
        "role": "admin",
        "name": name,
        "image": str(path),
        "message": "Admin face registered"
    }



# =========================
# EMPLOYEE SIGNUP
# =========================

@app.post("/employee/signup")
async def employee_signup(
    image: UploadFile = File(...),
    name: str = Form(...)
):

    path = save_upload(
        image,
        UPLOAD_DIR
    )

    return {
        "success": True,
        "role": "employee",
        "name": name,
        "image": str(path),
        "message": "Employee face registered"
    }



# =========================
# STUDENT SIGNUP
# =========================

@app.post("/student/signup")
async def student_signup(
    image: UploadFile = File(...),
    name: str = Form(...)
):

    path = save_upload(
        image,
        UPLOAD_DIR
    )

    return {
        "success": True,
        "role": "student",
        "name": name,
        "image": str(path),
        "message": "Student face registered"
    }




# =========================
# ADMIN ATTENDANCE
# =========================

@app.post("/admin/attendance")
async def admin_attendance(
    storedImage: UploadFile = File(...),
    liveImage: UploadFile = File(...)
):

    return await check_attendance(
        storedImage,
        liveImage
    )




# =========================
# EMPLOYEE ATTENDANCE
# =========================

@app.post("/employee/attendance")
async def employee_attendance(
    storedImage: UploadFile = File(...),
    liveImage: UploadFile = File(...)
):

    return await check_attendance(
        storedImage,
        liveImage
    )




# =========================
# STUDENT ATTENDANCE
# =========================

@app.post("/student/attendance")
async def student_attendance(
    storedImage: UploadFile = File(...),
    liveImage: UploadFile = File(...)
):

    return await check_attendance(
        storedImage,
        liveImage
    )





async def check_attendance(
    storedImage,
    liveImage
):

    result = await verify_face(
        storedImage,
        liveImage
    )


    if result["matched"]:

        return {

            "success": True,
            "attendance": "marked",
            "message":
            "Face matched. Attendance marked.",
            "confidence":
            result["confidence"]

        }


    return {

        "success": False,
        "attendance": "not marked",
        "message":
        result["message"],
        "confidence":
        result.get("confidence")

    }

@app.post("/admin/verify")
async def admin_verify(
    storedImage: UploadFile = File(...),
    liveImage: UploadFile = File(...)
):

    result = await verify_face(
        storedImage,
        liveImage
    )

    return result



# =========================
# EMPLOYEE VERIFY
# =========================

@app.post("/employee/verify")
async def employee_verify(
    storedImage: UploadFile = File(...),
    liveImage: UploadFile = File(...)
):

    result = await verify_face(
        storedImage,
        liveImage
    )

    return result



# =========================
# STUDENT VERIFY
# =========================

@app.post("/student/verify")
async def student_verify(
    storedImage: UploadFile = File(...),
    liveImage: UploadFile = File(...)
):

    result = await verify_face(
        storedImage,
        liveImage
    )


    if result["matched"]:

        return {
            "success": True,
            "attendance": "marked",
            "message":
            "Face matched. Attendance marked.",
            "confidence":
            result["confidence"]
        }


    return {
        "success": False,
        "attendance": "not marked",
        "message":
        result["message"],
        "confidence":
        result.get("confidence")
    }