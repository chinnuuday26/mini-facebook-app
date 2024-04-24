const fs =  require('fs');


const errorLogger = (err,req,res,next)=>{
    const timestamp = new Date();
    const {path,method}= req;
    console.log(timestamp,path,method);
    console.log(err.stack);
    const data = `${err.message} ${path} ${method}\n`;

    fs.appendFile('./errorLogs.txt',data,(logError)=>{
        if(logError){
            console.error(logError);
        }
        else{
            const {message="request failed",status=500} = err;
            res.status(status||500);
            res.send({message,success:false});
        }
    })
};


module.exports = errorLogger;