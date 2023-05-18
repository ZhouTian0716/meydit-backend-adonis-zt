import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Roles from 'App/Enums/Roles';
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
      // serializedData.data.forEach((project) => {
      //   project.category = project.category.name;
      // });

      return response.status(200).json(serializedData);
    } catch (error) {
      return error;
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const isClient = auth.user?.$original.roleId === Roles.CLIENT;
    // const selectedTags = request.query;
    if (!isClient) {
      return response.unauthorized({
        errors: [{ message: 'Only client can create project' }],
      });
    }

    const payload = await request.validate(CreateProjectValidator);
    const { tagIds, ...rest } = payload;
    // 下面的附着都是仅为了检查？关系已经定位好了，不需要再次附着
    const project = await auth.user!.related('projects').create({ ...rest });
    project.$setRelated('account', auth.user!);
    tagIds && (await project.related('tags').attach(tagIds));
    response.status(201).json(project);
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { slug } = params;
      const project = await Project.query()
        .preload('client', (query) => {
          query.preload('profile').preload('addresses');
        })
        .preload('maker', (query) => {
          query.preload('profile').preload('addresses');
        })
        .preload('category')
        .preload('status')
        .preload('images')
        .preload('bids', (query) => {
          query.preload('maker', (query) => {
            query.preload('profile').preload('addresses');
          });
        })
        .preload('tags')
        .where('slug', slug)
        .first();
      if (!project) return response.status(404).json({ message: 'Project not found' });

      // Exclude the `category` relation from the serialized data
      const serializedData = project.serialize({
        relations: {
          maker: {
            fields: {
              pick: ['id', 'firstName', 'lastName', 'email'],
            },
          },
          client: {
            fields: {
              pick: ['id', 'firstName', 'lastName', 'email'],
            },
          },
          images: {
            fields: {
              pick: ['id', 'url', 'fileName', 'isProjectCover'],
            },
          },
        },
      });

      return response.json(serializedData);
    } catch (error) {
      return error;
    }
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    try {
      const { id } = params;
      const project = await Project.query().where('id', id).first();
      if (!project) return response.status(404).json({ message: 'Project not found' });
      const authUserId = auth.user?.$original.id;
      if (project.$original.clientId !== authUserId)
        return response.status(401).json({ message: 'Unauthorized' });
      const payload = await request.validate(UpdateProjectValidator);
      await Project.query().where('id', id).update(payload);
      return response.status(204);
    } catch (error) {
      return error;
    }
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    try {
      const { id } = params;
      const project = await Project.query().where('id', id).first();
      // console.log(project?.$original);
      if (!project) return response.status(404).json({ message: 'Project not found' });
      const authUserId = auth.user?.$original.id;
      // console.log(authUserId);
      if (project.$original.clientId !== authUserId)
        return response.status(401).json({ message: 'Unauthorized' });
      await project.delete();
      response.status(200);
    } catch (error) {
      return error;
    }
  }

  public async filterByAccount({ request, response, params }: HttpContextContract) {
    const perPage = parseInt(request.qs().perPage) || 10;
    const page = parseInt(request.qs().page) || 1;
    try {
      const { accountId } = params;
      const projects = await Project.query()
        .preload('client')
        .preload('maker')
        .preload('category')
        .preload('images')
        .preload('tags')
        .where('clientId', accountId)
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

      return response.status(200).json(serializedData);
    } catch (error) {
      return error;
    }
  }
}
