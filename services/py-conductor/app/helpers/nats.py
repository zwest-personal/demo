# Nats helper package
import nest_asyncio, asyncio
from pydantic import BaseModel

import nats

# TODO Implement proper errors
from nats.errors import ConnectionClosedError, TimeoutError

from ..config import Config

nest_asyncio.apply()

class NatsRequest(BaseModel):
    subject: str
    message: str

class NatsClient:
    def __init__(self) -> None :
        self.client = None
        return

    async def connect(self):
        self.client = await nats.connect(Config().NATS_CN)

    async def publish(self, message: NatsRequest):
        print("Publishing: ", message)
        await self.client.publish(message.subject, str.encode(message.message))

Nats = NatsClient()
asyncio.run(Nats.connect())

# Just some example code for how you'd use this
# async def test():
#     testRequest = NatsRequest(subject="Testing", message="This is a test message")
#     await Nats.publish(testRequest)
#
# asyncio.run(test())