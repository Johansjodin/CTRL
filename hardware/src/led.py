from neopixel import *

class LED:
	def __init__(self):
		self.LED_COUNT = 5
		self.BRIGHTNESS = 64

		self.leds = Adafruit_NeoPixel(self.LED_COUNT, 18, 800000, 10, False, self.BRIGHTNESS, 0)
		self.leds.begin()

	def setColors(self, colors):
		if len(colors) != self.LED_COUNT:
			print("error")
			return

		for i in range(0, self.LED_COUNT):
			self.leds.setPixelColor(i, colors[i] | 0xFF000000)
		
		self.leds.show()

	def clear(self):
		for i in range(0, self.LED_COUNT):
			self.leds.setPixelColor(i, 0)

		self.leds.show()