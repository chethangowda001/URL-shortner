const express = require("express");
const {handleSignUpecred, handleUserLogin} = require("../controllers/user")

const Router = express.Router();

Router.post("/", handleSignUpecred)
Router.post("/login", handleUserLogin)

module.exports= Router;
