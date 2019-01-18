import requests

class Node:
	def __init__(self):
		self.ENDPOINT_BASE = "https://api.ctrl.nu"
		self.ENDPOINT_CAPTURE = self.ENDPOINT_BASE + "/capture"

		self.ID = None
		with open("/root/ctrl/.node_id", "r") as file:
			self.ID = file.read()
			file.close()

		self.colors = self.initialColors()

	def initialColors(self):
		return [0xFF0000, 0xFF0000, 0xFF0000, 0xFF0000, 0xFF0000]

	def getColors(self):
		return self.colors

	def capture(self, newowner):
		resp = requests.post(self.ENDPOINT_CAPTURE, data={
			"nodeId": self.ID,
			"cardId": newowner.upper()
		})

		if resp.status_code != 200:
			return None

		colors = resp.json()
		
		if not isinstance(colors, list):
			return None

		if len(colors) != 5:
			return None

		rColors = []
		for color in colors:
			if not isinstance(color, str):
				return None

			try:
				rColors.append(int(color[1:], 16))
			except ValueError:
				return None

		self.colors = rColors
		return rColors