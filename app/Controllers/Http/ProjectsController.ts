import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Project from 'App/Models/Project';
import CreateProjectValidator from 'App/Validators/CreateProjectValidator';

export default class ProjectsController {
  public async index({ response }: HttpContextContract) {
    try {
      const projects = await Project.all();
      response.status(200);
      return [];
    } catch (error) {
      return error;
      //   return response.badRequest(error.messages);
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateProjectValidator);
      const project = await Project.create(payload); 
      response.status(201);
      return project;
    } catch (error) {
      return error;
    }
  }

  public async show({ params }: HttpContextContract) {
    try {
      const { slug } = params;
      const project = await Project.findBy('slug', slug);
      return project;
    } catch (error) {
      console.log('error.message');
      return error;
    }
  }

  // ZT NOTE: This is not ready yet
  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { slug } = params;
      const payload = await request.validate(CreateProjectValidator);
      console.log(payload);
      await Project.query().where('slug',slug).update(payload)
      response.status(204);
    } catch (error) {
      return error;
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { slug } = params;
      const project = await Project.findBy('slug', slug);
      if (project) {
        await project.delete();
      }
      response.status(200);
    } catch (error) {
      return error;
    }
  }
}


// import Database from '@ioc:Adonis/Lucid/Database';

// public async store({ request, response }: HttpContextContract) {
//   try {
//     const payload = await request.validate(CreateProjectValidator);
//     const res = await Database.table('projects').insert({
//       ...payload,
//       // slug: `${payload.title.replace(' ', '-')}-${Date.now()}`,
//       slug: Date.now(),
//     });
//     response.status(201);
//     return res;
//   } catch (error) {
//     return error;
//   }
// }
