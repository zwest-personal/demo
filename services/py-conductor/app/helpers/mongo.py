# MongoDB helper functions
from pymongo import MongoClient
from pymongo.database import Database
# from pymongo.collection import Collection

from ..config import Config

class MongoConnection:
    def __init__(self) -> None:
        # TODO Connection error handling
        self.client = MongoClient(Config().MONGO_CN)

    # database grabs our default Mongo Database from our existing connection and returns it
    # Mongo client calls typically go through a 'collection' reference that will be created
    # by whoever calls this function
    def database(self) -> Database:
        return self.client[Config().MONGO_DB]


