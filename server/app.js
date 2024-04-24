const express= require('express');
const app = express();
const db = require("./dbConnection");
//const model = require("./models/userModel");


const router = require("./routes/route");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/admin");
const authMiddleware = require("./models/userModel").authMiddleware;
const requestLogger = require("./utils/requestLogger");
const errorLogger = require("./utils/errorLogger");

//used for parsing the body
app.use(express.json());
//used for logging all requests
app.use('/',requestLogger);

//route middlewares
app.use('/user',userRouter);
app.use('/api',router);
app.use('/admin',authMiddleware,adminRouter);

//used for error logging 

app.use(errorLogger);

app.listen(4000,()=>{
    console.log("server running on port 4000");
})