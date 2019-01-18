from led import *
from nfcthread import *
from node import *

import threading
import signal
import time

class Main:
	def __init__(self):
		self.running = True
		self.readID = None

		self.leds = LED()

		self.node = Node()

		self.nfcLock = threading.Lock()
		self.nfcThread = NFCThread(self.nfcCallback)

		self.nfcThread.start()

	def run(self):
		self.leds.setColors(self.node.getColors())

		while self.running:
			time.sleep(0.2)
			self.nfcLock.acquire(True)
			if self.readID:

				self.leds.clear()
				print("Got:", self.readID)

				colors = self.node.capture(self.readID)
				if colors:
					self.leds.setColors(colors)
				else:
					self.leds.setColors(self.node.getColors())
			
			self.readID = None
			self.nfcLock.release()

		print("Bye bye")
		self.nfcThread.kill()
		GPIO.cleanup()

	def quit(self):
		self.running = False

	def nfcCallback(self, block):
		self.nfcLock.acquire(True)
		if block and not self.readID:
			self.readID = ''.join(format(x, '02x') for x in block[:4])
		self.nfcLock.release()

m = Main()
signal.signal(signal.SIGINT, lambda s, f: m.quit())
m.run()