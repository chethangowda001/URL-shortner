const express = require("express");
const Router = express.Router();
const URL = require("../models/url");

Router.get("/home", async(req, res)=>{
    if(!req.user) return res.redirect("/login")
    const allurl = await URL.find({createdBy: req.user._id})
    return res.render("home",{
urls:allurl

    })
})

Router.get("/signup", async(req,res)=>{
    return res.render("signup")
})

Router.get("/login", async(req, res)=>{
    return res.render("login")
})

module.exports = Router;