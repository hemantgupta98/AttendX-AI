from insightface.app import FaceAnalysis

import cv2
import numpy as np

import tempfile
import os


face_app = FaceAnalysis(
    name="buffalo_sc"
)


face_app.prepare(
    ctx_id=-1,
    det_size=(320,320)
)




def get_face_embedding(image_path):

    image = cv2.imread(
        image_path
    )


    if image is None:
        return None



    faces = face_app.get(
        image
    )


    if len(faces)==0:
        return None


    return faces[0].embedding





def compare_faces(
    emb1,
    emb2
):

    score = np.dot(
        emb1,
        emb2
    ) / (
        np.linalg.norm(emb1)
        *
        np.linalg.norm(emb2)
    )


    return float(score)





async def verify_face(
    storedImage,
    liveImage
):


    stored_temp = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".jpg"
    )


    live_temp = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".jpg"
    )



    try:


        stored_temp.write(
            await storedImage.read()
        )


        live_temp.write(
            await liveImage.read()
        )


        stored_temp.close()
        live_temp.close()



        stored_embedding = get_face_embedding(
            stored_temp.name
        )


        if stored_embedding is None:

            return {

                "matched":False,
                "message":
                "No face found in registered image"

            }




        live_embedding = get_face_embedding(
            live_temp.name
        )


        if live_embedding is None:

            return {

                "matched":False,
                "message":
                "No face found in live image"

            }




        confidence = compare_faces(
            stored_embedding,
            live_embedding
        )


        matched = confidence >= 0.60



        return {

            "matched": matched,

            "confidence":
            round(confidence,4),

            "message":
            (
            "Face matched"
            if matched
            else
            "Face not matched"
            )

        }



    finally:


        os.remove(
            stored_temp.name
        )

        os.remove(
            live_temp.name
        )