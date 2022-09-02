require('dotenv').config();
require('./db/conn');
const path = require('path');
const cors = require('cors');
const express = require('express');
const Router = require('./models/Routers');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', Router);
if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'staging'
) {
    app.use(express.static(path.join(__dirname + '/../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/../client/build/index.html'));
    });
}
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.listen(port, () => console.log(`app run port ${port}`));