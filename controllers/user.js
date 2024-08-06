const {v4: uuidv4}  = require("uuid")
const User = require("../models/user");
const {setUser} = require("../service/auth")

async function handleSignUpecred(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ status: "error", msg: "All fields are required" });
    }
    try {
        const result = await User.create(
            { name, email, password });
        console.log("result of user", result);
        return res.status(201).render("login");
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}


async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: "Please provide all credentials" });
    }

    const user = await User.findOne({ email, password });
   
    
    if (!user) {
        return res.status(401).render("login", { error: "Please enter valid email and password" });
    }
    const sessionId = uuidv4()
    setUser(sessionId , user)
    res.cookie("uid", sessionId)
    return res.redirect("/home");
}


module.exports = {
    handleSignUpecred,
    handleUserLogin
}