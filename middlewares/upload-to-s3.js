'use strict'

const multer = require('multer');
const multerS3StorageEngineModule = require('../modules/multer-s3-storage-engine');

require('dotenv').config();

class UploadToS3 {
    async imageUpload(req, res, next) {
        try {
            // Process anything here before uploading an image. Such as permission check

            const storage = multerS3StorageEngineModule({
                allowedExtensions: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
                acl: 'public-read',
            });
            const upload = multer({ storage: storage, limits: { files: 1 } }).single('image');

            upload(req, res, function (err) {
                if (err) {
                    res.status(400).json({
                        error: {
                            message: 'errors' in err ? err.errors[0].message : err.message || 'Unknwon error occured while uploading image.'
                        }
                    });
                }
                else {
                    next();
                }
            })
        }
        catch (err) {
            console.log(err);
            res.status(400).json({
                error: {
                    message: 'errors' in err ? err.errors[0].message : err.message || 'Unknwon error occured while uploading image.'
                }
            });
        }
    }
}

module.exports = new UploadToS3();
