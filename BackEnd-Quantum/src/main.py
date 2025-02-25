from fastapi import FastAPI
from src.database import init_db
from src.modules.Formulaire.router import router as user_router

# FastAPI App
app = FastAPI(
    title="Dido Quantum API",
    description="API documentation for the Dido Quantum backend",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI (default)
    redoc_url="/redoc",  # ReDoc UI (optional)
    openapi_url="/openapi.json"
)

@app.on_event("startup")
async def startup():
    await init_db()  # Initialize the database on startup


# Include User Routes
app.include_router(user_router, prefix="/users", tags=["Users"])


