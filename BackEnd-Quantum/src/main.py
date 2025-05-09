from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from src.database import init_db
from src.modules.websocket.router import router as websocket_router
from src.modules.Formulaire.router import router as formulaire_test
from src.modules.Files_Uploaded.router import router as Files_router
from src.modules.auth.router import router as auth

# FastAPI App
app = FastAPI(
    title="Dido Quantum API",
    description="API documentation for the Dido Quantum backend",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI (default)
    openapi_url="/openapi.json"
)


app.include_router(
    websocket_router,
    tags=["WebSocket"],
)


@app.get("/")
async def read_root():
    return {"Hello": "World"}
# CORS Configuration (Allows frontend to communicate with the backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:9518"],  # Allows all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)
@app.on_event("startup")
async def startup():
    await init_db()  # Initialize the database on startup



app.include_router(formulaire_test)
app.include_router(Files_router)

# Include User Routes
app.include_router(formulaire_test, prefix="/users", tags=["formulaire test"])
app.include_router(auth, prefix="/auth", tags=["auth"])

app.include_router(Files_router, prefix="/Files", tags=["Files"])


app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
