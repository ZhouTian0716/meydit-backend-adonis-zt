import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { getDeleteURL, getUploadURL } from '../../../utils/aws/s3';

export default class AwsS3Controller {
  public async secureUrlForUpload({ request, response }: HttpContextContract) {
    const extension = request.qs().fileType;
    const { uploadUrl, fileName } = await getUploadURL(extension);
    return response.status(200).json({ uploadUrl, fileName });
  }
  public async secureUrlForDelete({ request, response }: HttpContextContract) {
    const key = request.qs().fileName;
    const url = await getDeleteURL(key);
    return response.status(200).json(url);
  }
}
