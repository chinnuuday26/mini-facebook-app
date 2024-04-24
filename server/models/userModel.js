const mongoose = require('mongoose');
const { Schema } = mongoose;
const {generatePassword,verifyPassword} = require('../utils/passwordUtil');
const {generateToken,verifyToken,getTokenFromHeader} = require('../utils/jwtUtils');

const userSchema = new Schema({
 name: String,
 username:{
        type: String,
        unique: true,
        required: true,
    
 },  
 password:{
    type: String,
    required: [true, 'password is required'],
    validate: {
        validator:(v)=>{return v.length >= 8},
        message: props => "password must be at least 8 characters long!"
 },
}});



userSchema.statics.signup = async(req,res,next)=>{   
    let user = req.body;
    try {
        //create hash from password
        
        const password = await generatePassword(user.password);
        user = {...user,password};
        const data = await UserModel.create(user);//whenever the user is created, it will return the user object.
        if(data){
            console.log(data);
            res.status(200);
            res.send({message:`user ${data.username} created succesfully`,success:true});
        }
    } catch (error) {
        if (error.code === 11000){
            error.message = `user ${user.username} already exists!`;
            error.status = 409;
        }
        next(error);
    }
};



userSchema.statics.login = async(req,res,next)=>{
    const {username,password} = req.body;
    try{
    const data = await UserModel.findOne({username});
    if (data){
        console.log(data);
        const passwordMatch = await verifyPassword(password,data.password);
        if(passwordMatch){
           
            res.status(200);
            const {password,...userData}=data.toJSON();
            //generate token
            const token = generateToken(userData);
            res.send({message:`user ${data.username} logged in succesfully`,success:true,data:data.toJSON(),token});

            
        }
        else{
            
            const err = new Error("password incorrect");
            err.status = 401;
            throw(err);
        }
    }
    else{
        
        const err = new Error("username incorrect");
        err.status = 404;
        throw(err);
    }
   }
   catch(error){
       next(error);
   }
};

userSchema.statics.authMiddleware = async(req,res,next)=>{
    const token = getTokenFromHeader(req);
    try{
        const data = await verifyToken(token);
        if(data){
            const userData = await UserModel.findOne({username:data.username});
            if(userData){
                res.status(200);
                console.log(userData);
                next();
            }
            else{
                const err = new Error("user not found");
                err.status = 404;
                throw(err);
            }
            
        }


    }
    catch(error){
        next(error);
    }
};
//check logic for loginWithToken properly
userSchema.statics.loginWithToken = async(req,res,next)=>{
    const token = getTokenFromHeader(req);
    
    try{
    const data = await verifyToken(token);
    
    if (data){
        console.log(data);
        const passwordMatch = await verifyPassword(password,data.password);
        if(passwordMatch){
           
            res.status(200);
            const {password,...userData}=data.toJSON();
            res.send({message:`user ${data.username} logged in succesfully`,success:true,data:data.toJSON()});

             //generate token
                //const token = generateToken(userData);
        }
        else{
            
            const err = new Error("password incorrect");
            err.status = 401;
            throw(err);
        }
    }
    else{
        
        const err = new Error("username incorrect");
        err.status = 404;
        throw(err);
    }
   }
   catch(error){
       next(error);
   }
};

const UserModel = mongoose.model('User', userSchema);//compiling our schema into a Model.


module.exports = UserModel;