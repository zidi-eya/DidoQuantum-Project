from fastapi import UploadFile, File, Depends ,HTTPException ,APIRouter
import os
import traceback
from src.modules.auth.service import  service
from src.modules.auth.models import User


router = APIRouter()

get_current_user = service.access_token_validation()


@router.post("/add-file")
async def add_new_file(
    file: UploadFile = File(...),
    user: User = Depends(get_current_user)  # This gives you the User object
):
    # Save file to the user's directory
    save_path = f"uploaded_files/{user.id}/{file.filename}"
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    content = await file.read()
    with open(save_path, "wb") as f:
        f.write(content)
    return {"message": "File added", "filename": file.filename}




@router.get("/list")
async def list_user_files(user: User = Depends(get_current_user)):
    user_dir = f"uploaded_files/{user.id}"
    if not os.path.exists(user_dir):
        # Si le dossier n'existe pas, on retourne une liste vide
        files = []
    else:
        files = os.listdir(user_dir)
    return {"files": files}
