const express = require('express');
const UserModel = require('../models/userModel');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.send("admin router");
});

router.get('/getdata',(req,res,next)=>{
    res.status(200);
    res.send({adminData: "dummy admin data"});
});

module.exports = router;