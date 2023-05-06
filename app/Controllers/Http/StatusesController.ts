import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Status from 'App/Models/Status';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

const payloadSchema = schema.create({
  name: schema.string({ trim: true }, [
    rules.unique({ table: 'statuses', column: 'name', caseInsensitive: true }),
  ]),
});

export default class StatusesController {
  public async index({ response }: HttpContextContract) {
    try {
      const statuses = await Status.query().preload('projects').select('*');
      return response.status(200).json(statuses);
    } catch (error) {
      return error;
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({ schema: payloadSchema });
      const res = await Status.create({ name: payload.name });
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
      const status = await Status.query().preload('projects').where('id', id).first();
      if (!status) return response.status(404).json({ message: 'Status not found' });
      return response.status(200).json(status);
    } catch (error) {
      return error;
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate({ schema: payloadSchema });
      if (!payload.name) return;
      const res = await Status.query().where('id', id).update({ name: payload.name });
      return response.status(204).json(res);
    } catch (error) {
      return error;
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const status = await Status.findBy('id', id);
      if (!status) return;
      await status.delete();
      return response.status(200).json({ deleted: status });
    } catch (error) {
      return error;
    }
  }
}
