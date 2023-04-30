import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { generateUploadURL } from '../../../utils/aws/s3';

export default class AwsS3Controller {
  public async secureUrl({ request, response }: HttpContextContract) {
    const extension = request.qs().fileType;
    const url = await generateUploadURL(extension);
    return response.status(200).json(url);
  }
}
