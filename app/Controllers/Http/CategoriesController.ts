import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Category from 'App/Models/Category';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

const payloadSchema = schema.create({
  name: schema.string({ trim: true }, [
    rules.unique({ table: 'categories', column: 'name', caseInsensitive: true }),
  ]),
});

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    try {
      const categories = await Category.query().select('*');
      return response.status(200).json(categories);
    } catch (error) {
      return error;
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({ schema: payloadSchema });
      const res = await Category.create({ name: payload.name });
      response.status(201);
      return res;
    } catch (error) {
      // ZT-NOTE: pass deeper for frontend to handle
      return response.badRequest(error);
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      // ZT-NOTE: 这里需不需要projects也一同查询，取决于前端需不需要
      const category = await Category.query().preload('projects').where('id', id).first();
      if (!category) return response.status(404).json({ message: 'Category not found' });
      return response.status(200).json(category);
    } catch (error) {
      return error;
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate({ schema: payloadSchema });
      if (!payload.name) return;
      const res = await Category.query().where('id', id).update({ name: payload.name });
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
      return response.status(200).json({ deleted: category });
    } catch (error) {
      return error;
    }
  }
}
