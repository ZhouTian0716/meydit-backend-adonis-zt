import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Project from 'App/Models/Project';
import CreateProjectValidator from 'App/Validators/Project/CreateProjectValidator';
import UpdateProjectValidator from 'App/Validators/Project/UpdateProjectValidator';
// import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'

export default class ProjectsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      // pagination
      const page = request.input('page') || 1;
      const perPage = request.input('per_page') || 3;
      // ZT-NOTE: The preload('account') here, 'account' need to match the relation field defined in the Project model
      const projects = await Project.query()
        .preload('client')
        .orderBy('id', 'desc')
        .paginate(page, perPage);
      // ZT-NOTE: way to serialize the data
      // const projectsSerialized = projects.serialize({
      //   fields: ['title', 'id','image'],
      // });
      return response.status(200).json(projects);
    } catch (error) {
      return error;
      // return response.badRequest(error.messages);
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const isClient = auth.user?.$original.role === 'client';

    if (!isClient) {
      return response.unauthorized({
        errors: [{ message: 'Only client can create project' }],
      });
    }

    const payload = await request.validate(CreateProjectValidator);
    const project = await auth.user!.related('projects').create({ ...payload, status: 'Released' });

    project.$setRelated('account', auth.user!);

    response.created({
      data: project,
    });
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const project = await Project.query().preload('client').preload('maker').where('slug', id);
      if (project) {
        return response.json(project);
      }
      return response.status(404).json({ message: 'Project not found' });
    } catch (error) {
      return error;
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate(UpdateProjectValidator);
      // console.log(payload);
      await Project.query().where('slug', id).update(payload);
      return response.status(204);
    } catch (error) {
      return error;
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const project = await Project.findBy('slug', id);
      if (project) {
        await project.delete();
      }
      response.status(200);
    } catch (error) {
      return error;
    }
  }
}
