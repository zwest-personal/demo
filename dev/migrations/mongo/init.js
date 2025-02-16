//console.log("========= CONSOLE LOG - INIT =========")
db = db.getSiblingDB('admin');
db.auth(
    process.env.MONGO_INITDB_ROOT_USERNAME,
    process.env.MONGO_INITDB_ROOT_PASSWORD,
);

db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

try {
// Basic user creation on DB refresh
    let users = [
        {
            'user': 'py',
            'pass': 'pyconductor',
            'role': 'dbOwner'
        }
    ]

    users.forEach((user) => {
        let nextUser = {
            user: user.user,
            pwd: user.pass,
            roles: [{
                role: user.role,
                db: process.env.MONGO_INITDB_DATABASE,
            }]
        }
        db.createUser(nextUser);
    })


    db.createCollection(name = "symphony")

    db.symphony.createIndex({"performer": 1, "step": 1}, {unique: false});

    db.symphony.insert({
        "symphony_id": "1", // In real code, probably be a UUID or event he Mongo ObjectId
        "name": "DoTheThing",
        "steps": [{ // Could also be done as individual documents
            "step": 1, // What 'step' this is - Conductor will go through each step doing actions, overlap is allowed
            "performer": "go", // What performer service should take the action
            "type": "text", // What the action type is (text, image, color)
            "output": "THIS IS STEP 1 from GO", // Output is what should be rendered
            "beat": 1 // Beat is the musical beat, eg 1/8ths, determines how long to wait before next command
        }, {
            "step": 2,
            "performer": "node",
            "type": "text",
            "output": "THIS IS STEP 2 from NODE",
            "beat": 2
        }, {
            "step": 3,
            "performer": "go",
            "type": "text",
            "output": "THIS IS STEP 3 from GO",
            "beat": 0.5
        }]
    });
} catch (e) {
    console.log("error in init: ", e)
}