const jwt=require("jsonwebtoken")

const APP_SECRET=process.env.MYSECRET;
const USERNAME=process.env.USERNAME;
const PASSWORD=process.env.PASSWORD;

module.exports=function(req,res,next){
    if((req.url=="/api/login" || req.url=="/login") && req.method == "POST")  {
        if (req.bosy !=null && req.body.name==USERNAME && req.body.password == PASSWORD) {
            let token=jwt.sign({data:USERNAME,expiresIn:"1h"},APP_SECRET);
            res.json({success:true,token:token});
        } else{
            res.json({success:false})
        }
        res.end();
        return;
    } else if ((((req.url.startsWith("/api/dataspaces") || req.url.startsWith("/dataspaces"))||(req.url.startsWith("/api/dataspace")|| req.url.startsWith("/dataspace")
    )) && req.method != "GET")|| ((req.url.startsWith("/api/add")|| req.url.startsWith("/add"))&& req.method!="POST")){
        let token =req.headers["authorization"];
        if (token !=null&& token.startsWith("Bearer<")){
            token=token.substring(7,token.length-1);
            try{
                jwt.verify(token,APP_SECRET);
                next();
                return;
            }catch(err) {}
        }
        res.statusCode=401;
        res.end();
        return;
    }
    next();
}