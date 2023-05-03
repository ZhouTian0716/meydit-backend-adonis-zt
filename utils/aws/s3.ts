import Env from '@ioc:Adonis/Core/Env';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import crypto from 'crypto';
import { promisify } from 'util';
const randomBytes = promisify(crypto.randomBytes);

const region = Env.get('AWS_S3_REGION');
const bucketName = Env.get('AWS_S3_BUCKET');
const accessKeyId = Env.get('AWS_S3_ACCESS_KEY_ID');
const secretAccessKey = Env.get('AWS_S3_SECRET_ACCESS_KEY');

const s3Client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

export const getUploadURL = async (fileExtension: String) => {
  const rawBytes = await randomBytes(6);
  const imageName = rawBytes.toString('hex');
  const params = {
    Bucket: bucketName,
    Key: `project-images/${imageName}.${fileExtension}`,
    ContentType: `image/${fileExtension}`,
  };
  let command = new PutObjectCommand(params);

  const uploadUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });
  const urlOnS3 = `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;
  return { uploadUrl, urlOnS3, fileName: params.Key };
};

export const getDeleteURL = async (key: string) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };
  let command = new DeleteObjectCommand(params);

  const deleteUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });
  return deleteUrl;
};
