const router = require('express').Router();
const Like = require('../models/LikeModel');

router.post('/add', async ({body}, res) => {

    try{
        const {questionID, userID} = body;
        if(!questionID || !userID  ) return res.status(400).json({message: 'Empty fields'});
        const like = await Like.create({userID, questionID});
        res.json({like});
    }catch (e){
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.get('/', async (req, res) => {
    try {
        const likes = await Like.find();
        res.json(likes);
    } catch(e) {
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

router.delete('/:id', async({params},res) => {
    try {
        const id = params.id;
        await Like.findByIdAndDelete(id);
        res.send({message: 'Deleted'});
    } catch (e) {
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
});

module.exports = router;