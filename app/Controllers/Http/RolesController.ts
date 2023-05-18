import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Role from 'App/Models/Role';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

const payloadSchema = schema.create({
  name: schema.string({ trim: true }, [
    rules.unique({ table: 'roles', column: 'name', caseInsensitive: true }),
  ]),
});

export default class RolesController {
  public async index({ response }: HttpContextContract) {
    try {
      const roles = await Role.query().select('*');
      return response.status(200).json(roles);
    } catch (error) {
      return error;
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({ schema: payloadSchema });
      const res = await Role.create({ name: payload.name });
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
      const role = await Role.query().preload('accounts').where('id', id).first();
      if (!role) return response.status(404).json({ message: 'Role not found' });
      return response.status(200).json(role);
    } catch (error) {
      return error;
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate({ schema: payloadSchema });
      if (!payload.name) return;
      await Role.query().where('id', id).update({ name: payload.name });
      const updated = await Role.findByOrFail('id', id);
      return response.status(200).json(updated);
    } catch (error) {
      return error;
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const role = await Role.findBy('id', id);
      if (!role) return;
      await role.delete();
      return response.status(200).json({ deleted: role });
    } catch (error) {
      return error;
    }
  }
}
