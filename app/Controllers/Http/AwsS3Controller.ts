import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { getDeleteURL, getUploadURL } from '../../../utils/aws/s3';

export default class AwsS3Controller {
  public async secureUrlForUpload({ request, response }: HttpContextContract) {
    const extension = request.qs().fileType;
    const filesFolder = request.qs().filesFolder;
    const category = request.qs().category;
    const res = await getUploadURL(extension, filesFolder, category);
    return response.status(200).json(res);
  }
  public async secureUrlForDelete({ request, response }: HttpContextContract) {
    const key = request.qs().fileName;
    const url = await getDeleteURL(key);
    return response.status(200).json(url);
  }
}
