const router = require('express').Router();
const Reply = require('../models/ReplyModel');
const User = require('../models/UserModel')

router.get('/:id', async ({params}, res) => {
    try{
        const id = params.id;
        const replies = await Reply.find({questionID: id});
        const users = await User.find();
        const newReplies = replies.map(reply => {
            const user = users.find(user => user._id.toString() === reply.userID);
            if(!user) return reply._doc;
            return {
                ...reply._doc,
                nameSurname: `${user.name} ${user.surname}`
            }
        });
        res.send(newReplies);
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.post('/add', async ({body}, res) => {

    try{
        const {questionID, userID,text} = body;
        if(!questionID || !userID || !text  ) return res.status(400).json({message: 'Empty fields'});
        const reply = await Reply.create({userID, questionID,text, date: new Date()});
        res.json({reply});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

module.exports = router;