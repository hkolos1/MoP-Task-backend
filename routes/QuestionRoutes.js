const router = require('express').Router();
const Question = require('../models/QuestionsModel');
const User = require("../models/UserModel");
const Like = require("../models/LikeModel");

router.post('/add', async ({body}, res) => {

    try{
        const {title, text, userID} = body;
        if(!title || !text || !userID  ) return res.status(400).json({message: 'Empty fields'});
        const question = await Question.create({title, text, userID, date: Date.now()});
        res.json({question});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.get('/most-replies', async (req, res) => {
    try {
        const questions = await Question.find();
        const likes = await Like.find();
        const newQuestions = questions.map(q => {
            const numberOfLikes = likes.reduce((acc, like) => {
                if(q._id.toString() === like.questionID) return acc + 1;
                return acc;
            }, 0);
            return {
                ...q._doc,
                numberOfLikes
            }
        }).sort((a,b) => {
            if(a.numberOfLikes > b.numberOfLikes) return -1;
            else if(a.numberOfLikes < b.numberOfLikes) return 1;
            return 0;
        });
        res.send(newQuestions);
    } catch (e) {
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.get('/not-my-questions/:id', async ({params}, res) => {
    try {
        const id = params.id;
        if(!id) return res.status(400).json({message: 'Invalid ID'});
        const myQuestions = await Question.find( {
            userID: {$ne: id}
        }).sort({date: 'desc'});
        const users = await User.find();
        const newQs = myQuestions.map(q => {
            const user = users.find(user => user._id.toString() === q.userID);
            if(!user) return q._doc;
            return {
                ...q._doc,
                nameSurname: `${user.name} ${user.surname}`
            }
        });
        res.json(newQs);
    } catch(e) {
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.get('/my-questions/:id', async ({params}, res) => {
    try {
        const id = params.id;
        if(!id) return res.status(400).json({message: 'Invalid ID'});
        const myQuestions = await Question.find( {
            userID: id
        }).sort({date: 'desc'});
        res.json(myQuestions);
    } catch(e) {
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.get('/', async (req, res) => {
    try {
        const qs = await Question.find().sort({date: 'desc'});
        const users = await User.find();
        const newQs = qs.map(q => {
            const user = users.find(user => user._id.toString() === q.userID);
            if(!user) return q._doc;
            return {
                ...q._doc,
                nameSurname: `${user.name} ${user.surname}`
            }
        });
        res.json(newQs);
    } catch(e) {
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.post('/reply/:id', async({body, params}, res) => {
    try {
        const id = params.id;
        if(!id) return res.status(400).json({message: 'Invalid ID'});
        const question = await Question.findById(id);
        question.reply = body.reply;
        const savedQuestion = await question.save();
        res.send(savedQuestion);
    } catch (e) {
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});


module.exports = router;
