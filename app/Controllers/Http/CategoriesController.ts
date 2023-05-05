import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Category from 'App/Models/Category';
import CreateCategoryValidator from 'App/Validators/Category/CreateCategoryValidator';
import UpdateCategoryValidator from 'App/Validators/Category/UpdateCategoryValidator';

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    try {
      const categories = await Category.all();
      return response.status(200).json(categories);
    } catch (error) {
      return error;
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateCategoryValidator);
      const res = await Category.create({ ...payload });
      response.status(201);
      return res;
    } catch (error: any) {
      // ZT-NOTE: pass deeper for frontend to handle
      response.badRequest(error.messages.errors);
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      // ZT-NOTE: 这里需不需要projects也一同查询，取决于前端需不需要
      const category = await Category.query().preload('projects').where('id', id);
      if (!category) return response.status(404).json({ message: 'Category not found' });
      return response.status(200).json(category);
    } catch (error) {
      return error;
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate(UpdateCategoryValidator);
      if (!payload.name) return;

      const res = await Category.query()
        .where('id', id)
        .update({ ...payload, name: payload.name });
      return response.status(204).json(res);
    } catch (error) {
      return error;
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const category = await Category.findBy('id', id);
      if (!category) return;
      await category.delete();
      return response.status(200);
    } catch (error) {
      return error;
    }
  }
}
