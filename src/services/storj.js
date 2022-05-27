/* Storj integration: Accessing a storage bucket. */

const S3 = require('aws-sdk/clients/s3');
const config = require('./config-loader').getConfig();
const fs = require('fs');
const path = require('path');

const accessKeyId = config.access_key;
const secretAccessKey = config.secret_access_key;
const endpoint = "https://gateway.storjshare.io";

const s3 = new S3({
  accessKeyId,
  secretAccessKey,
  endpoint,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
  connectTimeout: 0,
  httpOptions: { timeout: 0 }
});

async function download() {
    const { Buckets } = await s3.listBuckets({}).promise();
    console.log(Buckets);
    return Buckets;
}

/* Uploads a folder to Storj. */
const uploadDir = function(s3Path) {

  function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
      const filePath = path.join(currentDirPath, name);
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        callback(filePath, stat);
      } else if (stat.isDirectory()) {
        walkSync(filePath, callback);
      }
    });
  }

  walkSync(s3Path, function(filePath, stat) {
    const bucketName = config.bucket_name;
    const bucketPath = filePath.substring(s3Path.length+1);
    const params = {Bucket: bucketName, Key: bucketPath, Body: fs.readFileSync(filePath) };
    s3.putObject(params, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log('Successfully uploaded '+ bucketPath +' to ' + bucketName);
      }
    });
  });
};

/* Uploads a file to Storj. */
// async function uploadFile(file) {
//   const fileContent = fs.readFileSync(file);
//
//   const params = {
//     Bucket: process.env.STORJ_BUCKET_NAME,
//     Key: file,
//     Body: fileContent
//   }
//
//   s3.upload(params, (err, data) => {
//     if (err) {
//       console.log(err)
//     }
//     // resolve(data.Location)
//     // console.log("success: " + data.Location);
//   })
// }

module.exports = {
  download,
  uploadDir
};
