'use strict';

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const routes = require('./routes/index');

// Use Dotenv
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Default Response
app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Default Errors
app.use(function (err, req, res, next) {
    if (err.type == "entity.parse.failed") {
        res.status(400).json({
            error: {
                message: "JSON Parsing Failed"
            }
        });
    }
    else {
        console.log(err);
        res.status(400).json({
            error: {
                message: "Unknown error occured!",
                trace: err
            }
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
