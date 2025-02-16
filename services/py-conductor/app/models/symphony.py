from typing import TypedDict, NotRequired
from bson import ObjectId
from ..helpers.mongo import MongoConnection
from pymongo.collection import Collection

class Action(TypedDict):
    type: str
    output: str

class Symphony(TypedDict):
    _id: NotRequired[ObjectId]
    symphony_id: int
    name: str
    performer: str
    step: int
    action: Action

CollectionName = "symphony"
connection = MongoConnection()
collection: Collection[Symphony] = connection.database()[CollectionName]

def find_by_id(symphony_id: str) -> Symphony:
    return collection.find_one({"symphony_id": symphony_id}, {'_id': 0})