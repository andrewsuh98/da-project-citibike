"""
Simple in-memory cache with TTL
"""
import time
from typing import Optional, Any


class SimpleCache:
	"""Simple in-memory cache with time-to-live"""

	def __init__(self):
		self._cache = {}

	def get(self, key: str) -> Optional[Any]:
		"""Get value from cache if not expired"""
		if key in self._cache:
			value, expiry = self._cache[key]
			if time.time() < expiry:
				return value
			else:
				# Expired, remove from cache
				del self._cache[key]
		return None

	def set(self, key: str, value: Any, ttl_seconds: int):
		"""Set value in cache with TTL"""
		expiry = time.time() + ttl_seconds
		self._cache[key] = (value, expiry)

	def clear(self):
		"""Clear all cache entries"""
		self._cache.clear()


# Global cache instance
cache = SimpleCache()
