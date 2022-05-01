const router = require('express').Router();
const Question = require('../models/QuestionsModel');

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

router.get('/my-questions/:id', async ({params}, res) => {
    try {
        const id = params.id;
        if(!id) return res.status(400).json({message: 'Invalid ID'});
        const myQuestions = await Question.find( {
            userID: id
        });
        res.json(myQuestions);
    } catch(e) {
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.get('/', async (req, res) => {
    try {
        const qs = await Question.find().sort({date: 'desc'});
        res.json(qs);
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
