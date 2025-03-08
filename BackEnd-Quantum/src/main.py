from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

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

# CORS Configuration (Allows frontend to communicate with the backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173"],  # Allows all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)
@app.on_event("startup")
async def startup():
    await init_db()  # Initialize the database on startup

# Import and include your routers
from src.modules.Formulaire.router import router as formulaire_router

app.include_router(formulaire_router)
# Include User Routes
app.include_router(user_router, prefix="/users", tags=["Users"])


app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
