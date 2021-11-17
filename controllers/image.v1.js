'use strict';

require('dotenv').config();

class ImageController {
    async uploadImage(req, res) {
        try {
            if (req.file) {
                const respone = {
                    url: req.file.url,
                    bucket: req.file.bucket,
                    key: req.file.key,
                    description: req.body.description
                }
                res.status(200).json({
                    data: respone
                });
            }
            else {
                throw Error('Please upload an Image');
            }
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

module.exports = new ImageController();
