const express = require("express")
const {handleGernateNewShortURL, handleRedirectURl} = require("../controllers/url")
const Router = express.Router();


Router.post("/", handleGernateNewShortURL )
Router.get("/:shortId", handleRedirectURl)


module.exports = Router;