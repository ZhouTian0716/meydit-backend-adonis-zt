import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { getDeleteURL, getUploadURL } from '../../../utils/aws/s3';

export default class AwsS3Controller {
  public async secureUrlForUpload({ request, response }: HttpContextContract) {
    // ZT-NOTE: filesFolder here is the id of the new project, it's a string here from the request.qs()
    const extension: string = request.qs().fileType;
    const filesFolder: string = request.qs().filesFolder;
    const category: string = request.qs().category;
    const res = await getUploadURL(extension, filesFolder, category);
    return response.status(200).json(res);
  }
  public async secureUrlForDelete({ request, response }: HttpContextContract) {
    const key: string = request.qs().fileName;
    const url = await getDeleteURL(key);
    return response.status(200).json(url);
  }
}
