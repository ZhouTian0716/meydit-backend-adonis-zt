import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Project from 'App/Models/Project';
import CreateProjectValidator from 'App/Validators/Project/CreateProjectValidator';
import UpdateProjectValidator from 'App/Validators/Project/UpdateProjectValidator';
// import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'

export default class ProjectsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      // pagination
      const perPage = parseInt(request.qs().perPage) || 10;
      const page = parseInt(request.qs().page) || 1;
      const projects = await Project.query()
        .preload('client')
        .preload('maker')
        .preload('category')
        .preload('images')
        .preload('tags')
        .orderBy('id', 'desc')
        .paginate(page, perPage);

      const serializedData = projects.serialize({
        relations: {
          maker: {
            fields: {
              pick: ['firstName', 'lastName', 'email'],
            },
          },
          client: {
            fields: {
              pick: ['firstName', 'lastName', 'email'],
            },
          },
          images: {
            fields: {
              pick: ['url', 'fileName'],
            },
          },
        },
      });

      // Replace category object with its name property
      serializedData.data.forEach((project) => {
        project.category = project.category.name;
      });

      return response.status(200).json(serializedData);
    } catch (error) {
      return error;
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const project = await Project.query()
        .preload('client')
        .preload('maker')
        .preload('category')
        .preload('images')
        // .preload('tags')
        .where('id', id)
        .first();
      if (!project) return response.status(404).json({ message: 'Project not found' });

      // Exclude the `category` relation from the serialized data
      const { category, ...serializedData } = project.serialize({
        relations: {
          maker: {
            fields: {
              pick: ['firstName', 'lastName', 'email'],
            },
          },
          client: {
            fields: {
              pick: ['firstName', 'lastName', 'email'],
            },
          },
          images: {
            fields: {
              pick: ['url', 'fileName'],
            },
          },
        },
      });

      // Add the `category` field to the response object
      const responseObj = {
        ...serializedData,
        category: category.name,
      };

      return response.json(responseObj);
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
