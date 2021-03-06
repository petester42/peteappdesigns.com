#!/usr/bin/env node

"use strict";

require("dotenv").config();

const shell = require("shelljs");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
const AWS = require("aws-sdk");

const s3 = new AWS.S3();

const removeObject = (bucketName, obj) => {
  const params = {
    Bucket: bucketName,
    Key: obj.Key
  };
  return s3.deleteObject(params).promise();
};

const putObject = (bucketName, obj) => {
  const params = {
    Bucket: bucketName,
    Key: obj.Key,
    Body: obj.Body,
    ContentType: obj.ContentType
  };
  return s3.putObject(params).promise();
};

const emptyBucket = bucketName => {
  const objects = s3.listObjects({ Bucket: bucketName }).promise();
  return objects.then(data => {
    return Promise.all(data.Contents.map(obj => removeObject(bucketName, obj)));
  });
};

const filesInDirectory = dir => {
  return Array.prototype.concat(
    ...fs.readdirSync(dir).map(name => {
      let filePath = path.join(dir, name);
      let stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        return filesInDirectory(filePath);
      } else {
        return filePath;
      }
    })
  );
};

const s3BucketPath = (dir, filePath) => {
  let bucketPath = filePath.split(path.join(dir))[1];
  if (bucketPath.indexOf("/") === 0) {
    return bucketPath.slice(1);
  } else {
    return bucketPath;
  }
};

const contentTypeForPath = filePath => {
  return mime.lookup(filePath);
};

const uploadDir = (dir, bucketName) => {
  return Promise.all(
    filesInDirectory(dir).map(filePath => {
      let params = {
        Key: s3BucketPath(dir, filePath),
        Body: fs.readFileSync(filePath),
        ContentType: contentTypeForPath(filePath)
      };
      return putObject(bucketName, params);
    })
  );
};

async function run() {
  const bucket = "peteappdesigns.com";
  const folder = "./build";
  try {
    await emptyBucket(bucket);
    await uploadDir(folder, bucket);
  } catch (err) {
    shell.echo(err);
    shell.exit(1);
  }
}

run();
