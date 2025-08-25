# service.py
from typing import List
from fastapi import UploadFile,HTTPException
from src.modules.pilote.repository import PiloteRepository
from src.modules.pilote.schemas import ReportMetadata
from src.modules.pilote.utils import generate_reports
import os

class PiloteService:

    @classmethod
    def upload_report(cls, file: UploadFile) -> ReportMetadata:
        return PiloteRepository.save_report(file.file, file.filename)

    @classmethod
    def get_all_reports(cls) -> List[ReportMetadata]:
        return PiloteRepository.list_reports()

    @classmethod
    def get_report_by_id(cls, report_id: int) -> ReportMetadata:
        report = PiloteRepository.get_report(report_id)
        if not report:
            raise ValueError("Report not found")
        return report



    def generate_reports():
        pilots = "src/modules/data/pilots.csv"
        output_dir = "src/modules/data/DQPReports"
        if not os.path.exists(pilots):
            raise HTTPException(status_code=404, detail="Pilots CSV not found")

        return generate_reports(pilots, output_dir)
        #return {"message": "Reports generated successfully", "output_dir": output_dir}