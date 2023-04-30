import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { generateUploadURL } from '../../../utils/aws/s3';

export default class AwsS3Controller {
  public async secureUrl({ response }: HttpContextContract) {
    const url = await generateUploadURL();
    return response.status(200).json(url);
  }
}
