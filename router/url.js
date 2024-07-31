const express = require("express")
const {handleGernateNewShortURL, handleRedirectURL, HnadleGetAnalytics} = require("../controllers/url")
const Router = express.Router();


Router.post("/", handleGernateNewShortURL )
Router.get("/:shortId", handleRedirectURL)
Router.get("/:shortId/analytics", HnadleGetAnalytics)


module.exports = Router;