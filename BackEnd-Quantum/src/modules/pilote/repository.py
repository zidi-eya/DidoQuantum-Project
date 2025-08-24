# repository.py
import os
from datetime import datetime
from typing import List, Optional
from src.modules.pilote.schemas import ReportMetadata

REPORTS_DIR = "src/modules/data/DQPReports"  # dossier où on sauvegarde les rapports

# s'assurer que le dossier existe
os.makedirs(REPORTS_DIR, exist_ok=True)

class PiloteRepository:
    _fake_db: List[ReportMetadata] = []  # à remplacer par une vraie DB plus tard

    @classmethod
    def save_report(cls, file, filename: str) -> ReportMetadata:
        path = os.path.join(REPORTS_DIR, filename)
        with open(path, "wb") as f:
            f.write(file.read())

        metadata = ReportMetadata(
            id=len(cls._fake_db) + 1,
            filename=filename,
            uploaded_at=datetime.now(),
            path=path,
        )
        cls._fake_db.append(metadata)
        return metadata

    @classmethod
    def list_reports(cls) -> List[ReportMetadata]:
        return cls._fake_db

    @classmethod
    def get_report(cls, report_id: int) -> Optional[ReportMetadata]:
        for report in cls._fake_db:
            if report.id == report_id:
                return report
        return None
