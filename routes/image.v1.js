'use strict';

const express = require('express');
const imageController = require('../controllers/image.v1');
const uploadToS3Middleware = require('../middlewares/upload-to-s3');
const router = express.Router();

router.post('/', uploadToS3Middleware.imageUpload, imageController.uploadImage);

module.exports = router;
