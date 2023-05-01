import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Account from 'App/Models/Account';
import Hash from '@ioc:Adonis/Core/Hash';
import CreateAccountValidator from 'App/Validators/Account/CreateAccountValidator';
import UpdateAccountValidator from 'App/Validators/Account/UpdateAccountValidator';

export default class AccountsController {
  public async index({ response }: HttpContextContract) {
    try {
      const accounts = await Account.all();
      // const res = accounts.map((project) => project.serialize({ fields: ['id', 'email'] }));
      return response.status(200).json(accounts);
    } catch (error) {
      return error;
    }
  }

  public async store({ request, response }: HttpContextContract) {
    // ZT-NOTE: if the validation fail, try catch here will go catch block,
    // will get the error object
    try {
      const payload = await request.validate(CreateAccountValidator);
      const res = await Account.create({ ...payload });
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
      const account = await Account.query().preload('projects').where('id', id);
      if (!account) return response.status(404).json({ message: 'Account not found' });
      return response.status(200).send(account);
      // return response.status(200).json(account.first_name);
    } catch (error) {
      return error;
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate(UpdateAccountValidator);
      if (payload.password) {
        payload.password = await Hash.make(payload.password);
      }
      await Account.query()
        .where('email', id)
        .update({ ...payload, password: payload.password });
      response.status(204);
    } catch (error) {
      return error;
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const account = await Account.findBy('email', id);
      if (account) {
        await account.delete();
      }
      response.status(200);
    } catch (error) {
      return error;
    }
  }
}
