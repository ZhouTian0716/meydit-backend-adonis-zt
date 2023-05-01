import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Project from 'App/Models/Project';
import CreateImageValidator from 'App/Validators/Image/CreateImageValidator';

export default class ImagesController {
  public async store({ request, response }: HttpContextContract) {
    try {
      // you need the parent project created first

      const payload = await request.validate(CreateImageValidator);
      const parentProject = await Project.findBy('id', payload.projectId);
      const res = await parentProject?.related('images').create({ ...payload });
      response.status(201).json(res);
    } catch (error) {
      return error;
    }
  }
}
