import MFRC522
import RPi.GPIO as GPIO

import threading
import time

class NFCThread(threading.Thread):
	def __init__(self, callback):
		threading.Thread.__init__(self)
		self.callback = callback
		self.lock = threading.Lock()
		self.running = True

	def run(self):
		self.reader = MFRC522.MFRC522()
		while True:
			self.lock.acquire()
			if not self.running:
				self.lock.release()
				break
			self.lock.release()

			block = self.readBlock()
			self.callback(block)
			time.sleep(0.1)

	def kill(self):
		self.lock.acquire()
		self.running = False
		self.lock.release()

	def readBlock(self):
		(status, tag) = self.reader.MFRC522_Request(self.reader.PICC_REQIDL)
		if status != self.reader.MI_OK:
			return None

		(status, uid) = self.reader.MFRC522_Anticoll()
		if status != self.reader.MI_OK:
			return None

		key = [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
		self.reader.MFRC522_SelectTag(uid)
		status = self.reader.MFRC522_Auth(self.reader.PICC_AUTHENT1A, 0, key, uid)
		if status != self.reader.MI_OK:
			return None

		block = self.reader.MFRC522_Read(0) # lels
		self.reader.MFRC522_StopCrypto1()
		if block:
			return block