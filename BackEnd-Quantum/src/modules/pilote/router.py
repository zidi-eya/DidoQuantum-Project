# router.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from src.modules.pilote.service import PiloteService
from src.modules.pilote.schemas import ReportMetadata
from typing import List
import os

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.post("/", response_model=ReportMetadata)
async def upload_report(file: UploadFile = File(...)):
    return PiloteService.upload_report(file)

@router.get("/", response_model=List[ReportMetadata])
async def list_reports():
    return PiloteService.get_all_reports()

@router.get("/{report_id}")
async def download_report(report_id: int):
    try:
        report = PiloteService.get_report_by_id(report_id)
        return FileResponse(report.path, filename=report.filename)
    except ValueError:
        raise HTTPException(status_code=404, detail="Report not found")
@router.post("/generate")
async def generate_reports_api():
    try:
        output_dir = PiloteService.generate_reports()
        return {"message": "Reports generated successfully", "output_dir": output_dir}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



REPORTS_DIR = "src/modules/data/DQPReports"
@router.get("/generated", response_model=List[str])
async def list_generated_reports():
    try:
        if not os.path.exists(REPORTS_DIR):
            raise HTTPException(status_code=404, detail="Reports directory not found")
        
        reports = [
            f for f in os.listdir(REPORTS_DIR)
            if os.path.isfile(os.path.join(REPORTS_DIR, f))
        ]
        return reports
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ⚠️ This must stay after, or it overrides everything
@router.get("/{report_id}")
async def get_report(report_id: int):
    return {"report_id": report_id}
