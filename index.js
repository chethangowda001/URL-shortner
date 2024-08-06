const express = require("express");
const {connectMongoDb} = require("./connect")
const cookiePaser = require("cookie-parser")
const {onlyrestictedloginuser, checkAuth} = require("./middleware/auth")

const useRouter = require("./router/url");
const usestatiroute = require("./router/staticRouter");
const useUserRouter = require("./router/user");

const URL = require("./models/url");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8001;

// conection
connectMongoDb("mongodb://localhost:27017/short-url")
.then(()=> console.log( "mongoDB connected"))
.catch((err)=> console.log(" error", err));


//middlewere 
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//route
app.use("/url", onlyrestictedloginuser, useRouter);
app.use("/user", useUserRouter)
app.use("/",  checkAuth, usestatiroute)

app.get("/test", async(req, res)=>{
    const allDbuser = await URL.find({})
    return res.render("home", {
        urls: allDbuser,
    })
});



app.listen(port, ()=>{
    return console.log("server started in the http://localhost:",`${port}`);
})


