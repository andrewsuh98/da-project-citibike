"""
Citi Bike GBFS API client
"""
import httpx
from typing import List, Dict, Optional
from app.config import (
	STATION_INFORMATION_URL,
	STATION_STATUS_URL,
	COLUMBIA_STATION_IDS,
	CACHE_TTL_SECONDS
)
from app.services.cache import cache


class GBFSClient:
	"""Client for fetching Citi Bike station data"""

	def __init__(self):
		self.timeout = 10.0  # seconds

	async def fetch_station_information(self) -> List[Dict]:
		"""Fetch station information (static metadata)"""
		cached = cache.get("station_info")
		if cached:
			return cached

		async with httpx.AsyncClient(timeout=self.timeout) as client:
			response = await client.get(STATION_INFORMATION_URL)
			response.raise_for_status()
			data = response.json()

		stations = data.get("data", {}).get("stations", [])

		# Filter for Columbia stations (by short_name)
		columbia_stations = [
			station for station in stations
			if station.get("short_name") in COLUMBIA_STATION_IDS
		]

		# Cache for 5 minutes (station info rarely changes)
		cache.set("station_info", columbia_stations, CACHE_TTL_SECONDS)
		return columbia_stations

	async def fetch_station_status(self, station_ids: List[str] = None) -> List[Dict]:
		"""Fetch current station status (real-time availability)

		Args:
			station_ids: List of UUID station IDs to filter for. If None, returns all.
		"""
		cached = cache.get("station_status_all")
		if cached:
			all_status = cached
		else:
			async with httpx.AsyncClient(timeout=self.timeout) as client:
				response = await client.get(STATION_STATUS_URL)
				response.raise_for_status()
				data = response.json()

			all_status = data.get("data", {}).get("stations", [])
			# Cache all status for 5 minutes
			cache.set("station_status_all", all_status, CACHE_TTL_SECONDS)

		# Filter for specific station IDs if provided
		if station_ids:
			return [s for s in all_status if s.get("station_id") in station_ids]
		return all_status

	async def get_combined_station_data(self) -> List[Dict]:
		"""Get combined station info + status for Columbia stations"""
		# Fetch Columbia station info first (filtered by short_name)
		info_list = await self.fetch_station_information()

		# Extract UUIDs from info
		station_uuids = [info["station_id"] for info in info_list]

		# Fetch status for these UUIDs
		status_list = await self.fetch_station_status(station_uuids)

		# Create lookup dict for status (by UUID)
		status_dict = {s["station_id"]: s for s in status_list}

		# Combine info + status
		combined = []
		for info in info_list:
			station_uuid = info["station_id"]
			status = status_dict.get(station_uuid, {})

			# Calculate percent full
			capacity = info.get("capacity", 0)
			bikes_available = status.get("num_bikes_available", 0)
			ebikes_available = status.get("num_ebikes_available", 0)
			classic_bikes_available = bikes_available - ebikes_available
			percent_full = round((bikes_available / capacity * 100), 1) if capacity > 0 else 0

			combined_data = {
				"station_id": info.get("station_id"),
				"name": info.get("name", "Unknown"),
				"lat": info.get("lat"),
				"lon": info.get("lon"),
				"capacity": capacity,
				"num_bikes_available": bikes_available,
				"num_ebikes_available": ebikes_available,
				"num_classic_bikes_available": classic_bikes_available,
				"num_docks_available": status.get("num_docks_available", 0),
				"is_installed": status.get("is_installed", 0),
				"is_renting": status.get("is_renting", 0),
				"is_returning": status.get("is_returning", 0),
				"last_reported": status.get("last_reported", 0),
				"percent_full": percent_full,
			}
			combined.append(combined_data)

		return combined


# Global client instance
gbfs_client = GBFSClient()
