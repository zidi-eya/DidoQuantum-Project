from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from src.database import init_db
from src.modules.websocket.router import router as websocket_router
from src.modules.Formulaire.router import router as formulaire_test
from src.modules.Files_Uploaded.router import router as Files_router
from src.modules.company_projects.router import router as company_projects
from src.modules.researcher_profiles.router import router as researcher_profile
from src.modules.matching.router import router as matching
from src.modules.admin.router import router as admin_router
from src.modules.stripe.router import router as stripe_router




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
app.include_router(company_projects, prefix="/company_projects", tags=["company projects"])
app.include_router(researcher_profile, prefix="/researcher_profile", tags=["researcher profile"])
app.include_router(matching, prefix="/matching", tags=["matching"])
app.include_router(Files_router, prefix="/Files", tags=["Files"])
app.include_router(admin_router, prefix="/admin", tags=["Admin"])

app.include_router(    stripe_router, prefix="/stripe", tags=["Stripe"])
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
