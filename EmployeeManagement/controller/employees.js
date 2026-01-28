const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const auth = require("../middleWare/auth");

const router=express.Router();

router.post("/create", auth, (req,res)=>{

    db.query("INSERT INTO employees SET ?", req.body, (err)=>{
        if(err) return res.status(400).json(err);
        res.status(201).json({message:"Employee created successfully"});
    });
})

router.get("/",auth,(req,res)=>{
    
    const page=req.query.page ||1; //current page number we get it by query parameter
    const limit=5;
    const offset=(page-1)*limit;
    db.query("SELECT * FROM employees LIMIT ? OFFSET ?", [limit,offset], (err,results)=>{
        if(err) return res.status(400).json(err);
        res.json(results);
    });
})


module.exports=router;
