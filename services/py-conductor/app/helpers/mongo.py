# MongoDB helper functions
from pymongo import MongoClient
from mongoengine import ValidationError, NotUniqueError, get_db, ConnectionFailure
from ..config import Config
from pymongo.database import Database
from pymongo.collection import Collection

class MongoConnection:
    def __init__(self) -> None:
        self.client = MongoClient(Config().MONGO_CN)

    def database(self) -> Database:
        return self.client[Config().MONGO_DB]


