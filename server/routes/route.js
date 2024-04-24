const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    console.log("route found");
    res.status(200);
    res.send("success!");
})

router.get('/test',(req,res,next)=>{
    console.log(req.path);
    res.status(200);
    res.send("sucess to test!");
})



router.get('/abcd',(req,res,next)=>{
    console.log(req.path);
    res.status(200);
    res.send("ab?cd");
})

router.get('/user/:id',(req,res,next)=>{
    console.log(req.path);
    console.log(req.params);
    res.status(200);
    res.send(req.params);
})

router.get('/product',(req,res,next)=>{
    console.log(req.path);
    console.log(req.query);
    res.status(200);
    res.send(req.query);
})

router.post('/user',(req,res,next)=>{
        const {body} = {...req};
        const userId = 123;
        res.send({message:`user created with id ${userId}`, data:body, success:true});
})

router.post('/flights/:from-:to',(req,res,next)=>{
    const {body} = req;
    const {from,to} = req.params
    res.send(`flight ${from} to ${to} is available`);
})

router.all('/*',(req,res,next)=>{
    console.log(req.path);
    const {path,method} = req;
    res.status(404);
    let err = new Error("path doesn't exist");
    err.status = 404;
    next(err);
})



module.exports = router;