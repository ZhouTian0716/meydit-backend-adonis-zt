import Env from '@ioc:Adonis/Core/Env';
import aws from "aws-sdk";
import crypto from 'crypto';
import { promisify } from 'util';
const randomBytes = promisify(crypto.randomBytes);

const region = Env.get('AWS_S3_REGION');
const bucketName = Env.get('AWS_S3_BUCKET');
const accessKeyId = Env.get('AWS_S3_ACCESS_KEY_ID');
const secretAccessKey = Env.get('AWS_S3_ECRET_ACCESS_KEY');

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

export const generateUploadURL = async () => {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex');

  // ZT-NOTE:The secureUrl only valid for 60 seconds
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
};
