
# Running
Install uvicorn, then run:
```
    uvicorn app.main:app --reload
```

# Routes:

POST AI Command Performance?
GET /performers/check Ping Performers
GET /socket Establish Websocket
GET /performers Get a list of active performers (check on Nats)
POST /performers Send Command(s) manually
GET /symphony View Performance Info (from DB/Migration)
POST /symphony Commence Performance