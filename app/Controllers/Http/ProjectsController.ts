import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Project from 'App/Models/Project';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import CreateProjectValidator from 'App/Validators/Project/CreateProjectValidator';
// import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'

export default class ProjectsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      // const projects = await Project.all();
      // pagination

      const page = 1;
      const perPage = request.input('per_page') || 20;
      // ZT-NOTE: The preload('account') here, 'account' need to match the relation field defined in the Project model
      const projects = await Project.query()
        .preload('account')
        .orderBy('id', 'desc')
        .paginate(page, perPage);
      response.status(200);
      return projects;
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

    const project = await auth.user!.related('projects').create({ ...payload });

    project.$setRelated('account', auth.user!);

    response.created({
      data: project,
    });
  }

  public async show({ request }: HttpContextContract) {
    const project = await Project.findOrFail(request.param('id'));
    await project.load('account');
    return {
      data: project,
    };
  }

  // ZT NOTE: This is not ready yet
  // public async update({ request, response, params }: HttpContextContract) {
  //   try {
  //     const { slug } = params;
  //     const payload = await request.validate(CreateProjectValidator);
  //     console.log(payload);
  //     await Project.query().where('slug', slug).update(payload);
  //     response.status(204);
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // public async destroy({ response, params }: HttpContextContract) {
  //   try {
  //     const { slug } = params;
  //     const project = await Project.findBy('slug', slug);
  //     if (project) {
  //       await project.delete();
  //     }
  //     response.status(200);
  //   } catch (error) {
  //     return error;
  //   }
  // }
}
