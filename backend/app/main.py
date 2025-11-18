"""
FastAPI application for Citi Bike analysis backend
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import ALLOWED_ORIGINS
from app.routers import stations

# Create FastAPI app
app = FastAPI(
	title="Citi Bike Analysis API",
	description="Backend API for Columbia Citi Bike analysis dashboard",
	version="1.0.0"
)

# Configure CORS
app.add_middleware(
	CORSMiddleware,
	allow_origins=ALLOWED_ORIGINS,
	allow_credentials=True,
	allow_methods=["GET"],
	allow_headers=["*"],
)

# Include routers
app.include_router(stations.router)


@app.get("/health")
async def health_check():
	"""Health check endpoint"""
	return {
		"status": "ok",
		"service": "citibike-analysis-api"
	}


@app.get("/")
async def root():
	"""Root endpoint"""
	return {
		"message": "Citi Bike Analysis API",
		"docs": "/docs",
		"health": "/health"
	}
