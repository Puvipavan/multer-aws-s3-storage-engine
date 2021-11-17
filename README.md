# [Multer](https://github.com/expressjs/multer) AWS S3 Storage Engine - Sample

## Info

- This is just a sample application which is used to upload images. Use your own logic for the operations like naming the files, check user permission before upload etc
- Try to use AWS Roles instead of the Access Keys whenever possible.
- You can find the actual class inside the [modules/multer-s3-storage-engine.js](modules/multer-s3-storage-engine.js) file.
- If you found any bad practice in this repo or want to make a change, please feel free to open a [PR](https://github.com/Puvipavan/multer-aws-s3-storage-engine/pulls) or an [Issue](https://github.com/Puvipavan/multer-aws-s3-storage-engine/issues).

## Quick Start

- Setup Required Environment Variables in the `.env` file(Refer `.env.sample`)
- Execute Following Commands
  ```bash
  npm install
  npm start 
  ```
- Visit: http://localhost:8000/

## Environment Variables

**AWS_ACCESS_KEY_ID** - AWS Access Key ID. No need if you are using Roles or config file \
**AWS_SECRET_ACCESS_KEY** - AWS Secret Access Key. No need if you are using Roles or config file

**PORT** - Port for this service 

**S3_BUCKET_NAME** - Name of the AWS S3 Bucket where files needs to be uploaded