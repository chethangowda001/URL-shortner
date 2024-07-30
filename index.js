const express = require("express");
const {connectMongoDb} = require("./connect")
const useRouter = require("./router/url")
const app = express();
const port = 8001;

// conection
connectMongoDb("mongodb://localhost:27017/short-url")
.then(()=> console.log( "mongoDB connected"))
.catch((err)=> console.log(" error", err));

//middlewere 
app.use(express.json())

//route
app.use("/url", useRouter);

app.listen(port, ()=>{
    return console.log("server started");
})


