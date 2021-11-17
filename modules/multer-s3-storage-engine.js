'use strict';

require('dotenv').config();

const AWS = require('aws-sdk');

const s3Client = new AWS.S3();

class MulterS3StorageEngine {
    constructor(opts) {
        this.allowedExtensions = opts.allowedExtensions || null;
        this.acl = opts.acl || 'private';
    }

    _handleFile(req, file, cb) {
        try {
            // Checking file extension is fine since we upload to object storage. https://www.npmjs.com/package/file-type may help if you don't like my approach  
            if (Array.isArray(this.allowedExtensions) && !this.allowedExtensions.includes(file.originalname.split('.').pop().toLowerCase())) {
                throw Error(`File does not match allowed extensions: ${this.allowedExtensions.join(', ')}`);
            }

            // My file naming logic. Bad? But fine for my application
            const date = new Date();
            const path = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}/${date.getHours()}/${date.getMinutes()}/${date.getSeconds()}`;
            const bucketName = process.env.S3_BUCKET_NAME;
            const fileName = `${path}/${file.originalname}`;

            const params = {
                Bucket: bucketName,
                Key: fileName,
                ACL: this.acl,
                ContentType: file.mimetype,
                Body: file.stream
            };

            s3Client.upload(params, function (err, data) {
                if (err) {
                    console.log(err);
                    return cb(err);
                }

                cb(null, {
                    url: data.Location,
                    bucket: bucketName,
                    key: fileName
                });
            });
        }
        catch (err) {
            console.log(err);
            cb(err);
        }
    }

    _removeFile(req, file, cb) {
        try {
            const params = {
                Bucket: file.bucket,
                Key: file.key
            };

            s3.deleteObject(params, function (err, data) {
                if (err) {
                    console.log(err);
                    return cb(err);
                }
                cb(null);
            });
        }
        catch (err) {
            console.log(err);
            cb(err);
        }
    }
}

module.exports = function (opts) {
    return new MulterS3StorageEngine(opts)
}
