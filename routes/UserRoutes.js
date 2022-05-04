const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const Reply = require('../models/ReplyModel');

router.post('/login', async ({body}, res) => {

    try{
        const {email, password} = body;
        if(!email || !password) return res.status(400).json({message: 'Empty fields'});
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'Invalid email or password'});
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) return res.status(400).json({message: 'Invalid email or password'});
        user.password = null;
        res.json({user});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.get('/most-answers', async (req,res) => {
    try {
        const users = await User.find();
        const replies = await Reply.find();
        const newUsers = users.map(user => {
            const numberOfAnswers = replies.reduce((acc, reply) => {
                if(user._id.toString() === reply.userID) return acc + 1;
                return acc;
            }, 0);
            return {
                ...user._doc,
                numberOfAnswers
            }
        }).sort((a,b) => {
            if(a.numberOfAnswers > b.numberOfAnswers) return -1;
            else if(a.numberOfAnswers < b.numberOfAnswers) return 1;
            return 0;
        });
        res.send(newUsers);
    } catch (e) {
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.post('/register', async ({body}, res) => {

    try{
        const {email, password, name, surname} = body;
        if(!email || !password || !name || !surname) return res.status(400).json({message: 'Empty fields'});
        if(!email || !password) return res.status(400).json({message: 'Invalid email or password'});
        if(password.length < 5) return res.status(400).json({message: 'Password too short'});
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({email, password: hash, name, surname});
        user.password = null;
        res.json({user});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.post('/edit/:id', async ({body, params}, res) => {
    try{
        const {email, name, surname} = body;
        if(!email && !name && !surname) return res.status(400).json({message: 'Empty fields'});

        const user = await User.findById(params.id);

        if(user.email)
            user.email = email;
        if(user.name)
            user.name = name;
        if(user.surname)
            user.surname = surname;

        const saved = await user.save();
        res.json(saved);
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.post('/edit/password/:id', async ({body, params}, res) => {
    try{
        const {newPw, oldPw} = body;
        if(!newPw || !oldPw) return res.status(400).json({message: 'Empty fields'});
        if(newPw.length < 5) return res.status(400).json({message: 'Password too short'});
        const user = await User.findById(params.id);
        const passwordMatched = await bcrypt.compare(oldPw, user.password);
        if (!passwordMatched) return res.status(400).json({message: 'Invalid email or password'});

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPw, salt);

        user.password = hash;

        const saved = await user.save();
        saved.password = null;
        res.json(saved);
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

module.exports = router;
