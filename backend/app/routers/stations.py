"""
Station endpoints
"""
from fastapi import APIRouter, HTTPException
from typing import List, Dict
from app.services.gbfs_client import gbfs_client
import httpx

router = APIRouter(prefix="/api/stations", tags=["stations"])


@router.get("/columbia")
async def get_columbia_stations() -> Dict:
	"""Get list of Columbia University area stations with metadata"""
	try:
		stations = await gbfs_client.fetch_station_information()
		return {
			"stations": stations,
			"count": len(stations)
		}
	except httpx.HTTPError as e:
		raise HTTPException(status_code=503, detail=f"Error fetching station data: {str(e)}")
	except Exception as e:
		raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/status")
async def get_station_status() -> Dict:
	"""Get current availability status for Columbia stations"""
	try:
		stations = await gbfs_client.get_combined_station_data()

		# Calculate summary stats
		total_bikes = sum(s["num_bikes_available"] for s in stations)
		total_docks = sum(s["num_docks_available"] for s in stations)
		total_capacity = sum(s["capacity"] for s in stations)

		return {
			"stations": stations,
			"summary": {
				"total_stations": len(stations),
				"total_bikes_available": total_bikes,
				"total_docks_available": total_docks,
				"total_capacity": total_capacity,
				"overall_percent_full": round((total_bikes / total_capacity * 100), 1) if total_capacity > 0 else 0
			},
			"last_updated": max((s["last_reported"] for s in stations), default=0)
		}
	except httpx.HTTPError as e:
		raise HTTPException(status_code=503, detail=f"Error fetching station data: {str(e)}")
	except Exception as e:
		raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
