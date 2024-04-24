const {genSalt,hash,compare} = require('bcrypt');//genSalt is asynchronous, always use it instead sync version
// const salt = genSalt().then((salt)=>{
//     console.log(salt);
//     console.log("salt generated");
// }).catch((err)=>{
//     console.error(err);
// });

const generatePassword = async (password)=>{
    const salt = await genSalt();
    const hashedPassword = await hash(password,salt);
    console.log("hashedPassword",hashedPassword);
    return hashedPassword;
};




const verifyPassword = async (password,hashedPassword)=>{ 
    return compare(password,hashedPassword);
}

module.exports = {generatePassword,verifyPassword};

