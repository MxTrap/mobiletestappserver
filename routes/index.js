const express = require('express');
const router = express.Router();
const usersContainer = require('../containers/usersContainer');
const user = require('../structures/user');



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

router.post("/", (req, res, next)=>{
 console.log(usersContainer.allUsers);
 res.json(usersContainer.allUsers);
});



module.exports = router;
