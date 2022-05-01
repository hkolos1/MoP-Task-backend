const router = require('express').Router();
const Dislike = require('../models/DislikeModel');

router.post('/add', async ({body}, res) => {

    try{
        const {questionID, userID} = body;
        if(!questionID || !userID  ) return res.status(400).json({message: 'Empty fields'});
        const dislike = await Dislike.create({userID, questionID});
        res.json({dislike});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.get('/', async (req, res) => {
    try {
        const dislikes = await Dislike.find();
        res.json(dislikes);
    } catch(e) {
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.delete('/:id', async({params},res) => {
    try {
        const id = params.id;
        await Dislike.findByIdAndDelete(id);
        res.send({message: 'Deleted'});
    } catch (e) {
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

module.exports = router;