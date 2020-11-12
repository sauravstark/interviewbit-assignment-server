const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const interviewRoute = require('./routes/interview.route');
const participantRoute = require('./routes/participant.route');

app.use('/interview', interviewRoute);
app.use('/participant', participantRoute);

app.get('*', function (req, res) {
    res.status(404).send('You\'re lost');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});