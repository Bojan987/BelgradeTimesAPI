require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// Upload to S3
export const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
};

// Download from S3
export const getFile = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  const fileObj = s3.getObject(downloadParams);

  return fileObj.createReadStream();
};

// Delete from S3
export const removeFile = (fileKey) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  s3.deleteObject(deleteParams, (err, data) => {
    if (err) return console.log(err, err.stack);
    else console.log(data);
  });
  return "Image removed successfuly";
};
