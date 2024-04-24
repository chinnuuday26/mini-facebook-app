const {sign,verify} = require('jsonwebtoken');

const generateToken = (data)=>{

    const token = sign(data,"test",{expiresIn:"1m"});
    console.log(token);
    return token;
}

const verifyToken = (token)=>{
   return verify(token,"test");

}

const getTokenFromHeader = (req)=>{
    const {header:{authorization}} = req;
    console.log(header);
    if(authorization){
    const [ ,token] = authorization.split(" ");
    return token;
    }
    else{
        const err = new Error("token not found");
        err.status = 401;
        throw(err);
    }
};
module.exports = {generateToken,verifyToken,getTokenFromHeader};
