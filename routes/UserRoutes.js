const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');

router.post('/login', async ({body}, res) => {

    try{
        const {email, password} = body;
        if(!email || !password) return res.status(400).json({message: 'Empty fields'});
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'Invalid username or password'});
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) return res.status(400).json({message: 'Invalid username or password'});
        user.password = null;
        res.json({user});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.post('/register', async ({body}, res) => {

    try{
        const {email, password, name, surname} = body;
        if(!email || !password || !name || !surname) return res.status(400).json({message: 'Empty fields'});
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({email, password: hash, name, surname});
        res.json({user});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

module.exports = router;
