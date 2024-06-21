const express=require("express");
const router=express.Router();


const fetch=require("./fetchQuestions");



router.use("/fetch",fetch);

module.exports=router;