const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {PORT, ATLAS_URI} = require('./config');
require('dotenv').config();

const server = express();

server.use(cors());
server.use(express.json());

mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('mongodb-connection-established');
});

const UserRouter = require('./routes/UserRoutes');
const QuestionRouter = require('./routes/QuestionRoutes');
const LikeRouter = require('./routes/LikeRoutes');
const DislikeRouter = require('./routes/DislikeRoutes');
const ReplyRouter = require('./routes/ReplyRoutes');

server.use('/users', UserRouter);
server.use('/questions', QuestionRouter);
server.use('/likes', LikeRouter);
server.use('/dislikes', DislikeRouter);
server.use('/replies', ReplyRouter);

server.get('/health', (req, res) => {
    res.send({
        message: 'server running'
    })
});



server.listen(PORT || 5000, () => {
    console.log(`server_running-port-${PORT || 5000}`);
});
