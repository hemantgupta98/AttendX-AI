import numpy as np

from service import (
    get_face_embedding,
    compare_faces
)



def recognize_person(
    image_path,
    users
):


    live_embedding = get_face_embedding(
        image_path
    )


    if live_embedding is None:
        return None



    best_user = None
    best_score = 0



    for user in users:


        stored = np.array(
            user["embedding"]
        )


        score = compare_faces(
            stored,
            live_embedding
        )


        if score > best_score:

            best_score = score
            best_user = user




    if best_score >= 0.60:


        return {

            "id":
            best_user["id"],

            "name":
            best_user["name"],

            "confidence":
            float(best_score)

        }



    return None