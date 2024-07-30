
const URL = require("../models/url");

async function handleGernateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "url is required"});

    const { nanoid } = await import("nanoid");
     const shortid = nanoid(8);
 try {  
const result = await URL.create({
    shortId: shortid,
    reDirectURL: body.url,
    visitHistory: [],
});
console.log("Post result", result);
return res.status(201).json({ msg: "Success", id: shortid })
}  catch(err) {
    console.log("error in post server error", err);
    return res.status(500).json({error: "faild to upload internal server error"})
} ;
}

async function handleRedirectURl(req, res){
    const shortId = req.params.shortid;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push: {
        visitHistory: Date.now(),
    },
});
return res.status(200).json({ redirectlink: allDbUrl})

}



module.exports = {
    handleGernateNewShortURL,
    handleRedirectURl,
   
}