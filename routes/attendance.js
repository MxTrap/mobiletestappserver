const express = require('express');
const router = express.Router();
const DB = require("../containers/mainDataClass");



router.post("/", (req, res, next)=>{
    if(!req.body) res.sendStatus(400);
    DB.getАttendance(req.body, res);
});





module.exports = router;
