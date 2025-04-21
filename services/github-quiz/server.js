const app = require('./app')

app.listen("8080", function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", "8080");
})
