"""
Configuration settings for the Citi Bike API backend
"""

# Columbia University station IDs
COLUMBIA_STATION_IDS = [
	"7783.18",  # Broadway & W 122 St
	"7741.04",  # Morningside Dr & Amsterdam Ave
	"7745.07",  # W 120 St & Claremont Ave
	"7727.07",  # Amsterdam Ave & W 119 St
	"7713.11",  # W 116 St & Broadway
	"7692.11",  # W 116 St & Amsterdam Ave
	"7713.01",  # W 113 St & Broadway
]

# Citi Bike GBFS API endpoints
GBFS_BASE_URL = "https://gbfs.citibikenyc.com/gbfs/en"
STATION_INFORMATION_URL = f"{GBFS_BASE_URL}/station_information.json"
STATION_STATUS_URL = f"{GBFS_BASE_URL}/station_status.json"

# Cache settings
CACHE_TTL_SECONDS = 300  # 5 minutes

# CORS settings
ALLOWED_ORIGINS = [
	"http://localhost:3000",
	"http://127.0.0.1:3000",
	"http://localhost:3001",
	"http://127.0.0.1:3001",
]
