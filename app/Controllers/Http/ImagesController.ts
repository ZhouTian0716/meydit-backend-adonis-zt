import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Project from 'App/Models/Project';
import Image from 'App/Models/Image';
import CreateImageValidator from 'App/Validators/Image/CreateImageValidator';
import UpdateImageValidator from 'App/Validators/Image/UpdateImageValidator';

export default class ImagesController {
  public async index({ response }: HttpContextContract) {
    try {
      const images = await Image.query().select('*');
      return response.status(200).json(images);
    } catch (error) {
      return error;
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const image = await Image.findBy('id', id);
      if (!image) return response.status(404).json({ message: 'Image not found' });
      return response.status(200).json(image);
    } catch (error) {
      return error;
    }
  }

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

  public async update({ request, response, params, auth }: HttpContextContract) {
    try {
      const { id } = params;
      const image = await Image.findBy('id', id);
      if (!image) return response.status(404).json({ message: 'Image not found' });
      const projectId = image.projectId;
      const imageProject = await Project.findBy('id', projectId);
      if (!imageProject) return response.status(404).json({ message: 'Project not found' });
      const imageOwnerId = imageProject.clientId;
      const authUserId = auth.user?.$original.id;
      // Check whether the login user is the owner of the image
      if (imageOwnerId !== authUserId)
        return response
          .status(401)
          .json({ message: 'Unauthorized, you are not the one who created this image' });
      const payload = await request.validate(UpdateImageValidator);
      // Check if wanting to change cover image
      if (payload.isProjectCover) {
        // turn off previous cover image
        await Image.query()
          .where((query) => {
            query.where('projectId', projectId).where('isProjectCover', true);
          })
          .update({ isProjectCover: false });
      }
      await Image.query().where('id', id).update({ isProjectCover: payload.isProjectCover });
      return response.status(204);
    } catch (error) {
      return error;
    }
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    try {
      const { id } = params;
      const image = await Image.query().where('id', id).first();
      if (!image) return response.status(404).json({ message: 'Image not found' });
      const projectId = image.projectId;
      const imageProject = await Project.findBy('id', projectId);
      if (!imageProject) return response.status(404).json({ message: 'Project not found' });
      const imageOwnerId = imageProject.clientId;
      const authUserId = auth.user?.$original.id;
      // Check whether the login user is the owner of the image
      if (imageOwnerId !== authUserId)
        return response
          .status(401)
          .json({ message: 'Unauthorized, you are not the one who created this image' });
      // Check if the deleting one is the cover image ?
      // Or just let frontend handle it.
      await image.delete();
      response.status(200);
    } catch (error) {
      return error;
    }
  }
}
