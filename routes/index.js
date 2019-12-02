const express = require('express');
const router = express.Router();
const usersContainer = require('../containers/usersContainer');
const user = require('../structures/user');
const db =require("../containers/mainDataClass");


router.post("/login", (req, res, next)=>{
    if(!req.body) res.sendStatus(400);
    const newUser = new user(usersContainer.getUsersNumber());
    usersContainer.addNewUser(newUser.login(req.body, res));
});

router.post("/register", (req, res, next)=>{
    if(!req.body) res.sendStatus(400);
    const newUser = new user(usersContainer.getUsersNumber());
    usersContainer.addNewUser(newUser.register(req.body, res));
});

router.post("/subjects", (req, res, next)=>{
 db.getSubjects(res);
});

router.post("/journal", (req, res, next)=>{
    db.getJournal(res);
});



module.exports = router;
