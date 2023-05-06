import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Tag from 'App/Models/Tag';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

const payloadSchema = schema.create({
  name: schema.string({ trim: true }, [
    rules.unique({ table: 'tags', column: 'name', caseInsensitive: true }),
  ]),
});

export default class TagsController {
  public async index({ response }: HttpContextContract) {
    try {
      const tags = (await Tag.all()).sort((a, b) => a.id - b.id);
      return response.status(200).json(tags);
    } catch (error) {
      return error;
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({ schema: payloadSchema });
      const res = await Tag.create({ name: payload.name });
      response.status(201);
      return res;
    } catch (error) {
      return response.badRequest(error);
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      // ZT-NOTE: 这里需不需要projects也一同查询，取决于前端需不需要
      const tag = await Tag.query().where('id', id).first();
      if (!tag) return response.status(404).json({ message: 'Tag not found' });
      return response.status(200).json(tag);
    } catch (error) {
      return error;
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate({ schema: payloadSchema });
      if (!payload.name) return;
      const res = await Tag.query().where('id', id).update({ name: payload.name });
      return response.status(204).json(res);
    } catch (error) {
      return error;
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const tag = await Tag.findBy('id', id);
      if (!tag) return;
      await tag.delete();
      return response.status(200).json({ deleted: tag });
    } catch (error) {
      return error;
    }
  }
}
