
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

async function handleRedirectURL(req, res) {
    const shortId = req.params.shortId;

    try {
        const result = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            },
            { new: true, timestamps: true } // Ensures the updated document is returned
        );

        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        return res.redirect(result.reDirectURL);
    } catch (err) {
        console.log("Error in redirect", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function HnadleGetAnalytics(req, res){
const shortId = req.params.shortId;
const entry = await URL.findOne({shortId});

return res.status(200).json({TotalClicks: entry.visitHistory.length, analytics: entry.visitHistory})
}


module.exports = {
    handleGernateNewShortURL,
    handleRedirectURL,
    HnadleGetAnalytics,
   
}