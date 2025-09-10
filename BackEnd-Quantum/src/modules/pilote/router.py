# router.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from src.modules.pilote.service import PiloteService
from src.modules.pilote.schemas import ReportMetadata
from typing import List
import os

import shutil
REPORTS_DIR = "src/modules/data/DQPReports"

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.post("/", response_model=ReportMetadata)
async def upload_report(file: UploadFile = File(...)):
    return PiloteService.upload_report(file)

@router.get("/", response_model=List[ReportMetadata])
async def list_reports():
    return PiloteService.get_all_reports()

@router.post("/generate")
async def generate_reports_api():
    try:
        output_dir = PiloteService.generate_reports()
        return {"message": "Reports generated successfully", "output_dir": output_dir}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/generated")
async def list_generated_reports():
    try:
        if not os.path.exists(REPORTS_DIR):
            raise HTTPException(status_code=404, detail="Reports directory not found")
        
        reports = []
        for item in os.listdir(REPORTS_DIR):
            path = os.path.join(REPORTS_DIR, item)
            reports.append({
                "name": item,
                "type": "file" if os.path.isfile(path) else "folder"
            })
        
        return reports
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/download/{name}")
async def download_item(name: str):
    path = os.path.join(REPORTS_DIR, name)

    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Not found")

    if os.path.isfile(path):
        # cas normal fichier
        return FileResponse(path, filename=name)

    elif os.path.isdir(path):
        # cas dossier → zip
        zip_path = shutil.make_archive(path, 'zip', path)  # crée dossier.zip
        return FileResponse(zip_path, filename=f"{name}.zip")