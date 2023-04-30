import Env from '@ioc:Adonis/Core/Env';
import S3 from 'aws-sdk/clients/s3';
import crypto from 'crypto';
import { promisify } from 'util';
const randomBytes = promisify(crypto.randomBytes);

const region = Env.get('AWS_S3_REGION');
const bucketName = Env.get('AWS_S3_BUCKET');
const accessKeyId = Env.get('AWS_S3_ACCESS_KEY_ID');
const secretAccessKey = Env.get('AWS_S3_SECRET_ACCESS_KEY');

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

export const getUploadURL = async (fileExtension: String) => {
  const rawBytes = await randomBytes(6);
  const imageName = rawBytes.toString('hex');
  const params = {
    Bucket: bucketName,
    Key: `project-images/${imageName}.${fileExtension}`,
    Expires: 5 * 60,
    ContentType: `image/${fileExtension}`,
  };

  const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
  return { uploadUrl, fileName: params.Key };
};

export const getDeleteURL = async (key: String) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: 5 * 60,
  };

  const deleteUrl = await s3.getSignedUrlPromise('deleteObject', params);
  return deleteUrl;
};
