'use strict';

const express = require('express');
const app = express();

app.use('/v1/images', require('./image.v1'));

module.exports = app;
