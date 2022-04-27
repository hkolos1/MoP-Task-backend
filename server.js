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
const QuestionRouter = require('./routes/QuestionRoutes')

server.use('/users', UserRouter);
server.use('/questions', QuestionRouter);

server.get('/health', (req, res) => {
    res.send({
        message: 'server running'
    })
});



server.listen(PORT || 5000, () => {
    console.log(`server_running-port-${PORT || 5000}`);
});
