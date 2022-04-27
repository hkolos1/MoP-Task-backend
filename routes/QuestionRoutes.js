const router = require('express').Router();
const Question = require('../models/QuestionsModel');

router.post('/question', async ({body}, res) => {

    try{
        const {title, text, date, like, dislike} = body;
        if(!title || !text || !date || !like || !dislike) return res.status(400).json({message: 'Empty fields'});
        const question = await Question.create({title, text, date, like, dislike});
        res.json({question});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});


module.exports = router;
