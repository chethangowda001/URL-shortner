const {getUser} = require("../service/auth");



async function onlyrestictedloginuser(req, res, next){
    console.log(req);
    
    const cookieid = req.cookies?.uid;
    console.log(cookieid);
    

if (!cookieid){
   return res.redirect("/login")
}
const user = getUser(cookieid)
if (!user){
   return res.redirect("/login")
}
req.user = user;

next();
}

async function checkAuth(req, res, next) {
  
    const cookieid = req.cookies?.uid;
   
    const user = getUser(cookieid)

req.user = user;

next();
}

module.exports ={onlyrestictedloginuser, checkAuth} ;