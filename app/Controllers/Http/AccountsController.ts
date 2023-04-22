import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Account from 'App/Models/Account';
import Hash from '@ioc:Adonis/Core/Hash';
import CreateAccountValidator from 'App/Validators/Account/CreateAccountValidator';
import UpdateAccountValidator from 'App/Validators/Account/UpdateAccountValidator';

export default class AccountsController {
  public async index({ response }: HttpContextContract) {
    try {
      const accounts = await Account.all();
      response.status(200);
      return accounts;
    } catch (error) {
      return error;
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateAccountValidator);
    const res = await Account.create(payload);
    response.status(201);
    return res;
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const account = await Account.findBy('email', id);
      if (account) {
        response.status(200);
        return account;
      }
      response.status(404);
      return { message: 'Account not found' };
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
