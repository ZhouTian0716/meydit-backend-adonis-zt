import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Account from 'App/Models/Account';
import Hash from '@ioc:Adonis/Core/Hash';
import CreateAccountValidator from 'App/Validators/Account/CreateAccountValidator';
import UpdateAccountValidator from 'App/Validators/Account/UpdateAccountValidator';
import { defaultProfile } from './ProfilesController';
import { defaultAddress } from './AddressesController';

export default class AccountsController {
  public async index({ response }: HttpContextContract) {
    try {
      const accounts = await Account.query()
        .preload('role')
        .preload('profile', (query) => {
          query.select('id', 'bio', 'avatar');
        });
      return response.status(200).json(accounts);
    } catch (error) {
      return error;
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateAccountValidator);
      const res = await Account.create({ ...payload });
      const parentAccount = await Account.findBy('id', res.id);
      if (!parentAccount) return response.status(404).json({ message: 'Account not found' });
      // ZT-NOTE:给account创建时候各关联对象的默认值
      await parentAccount?.related('profile').create({ ...defaultProfile });
      await parentAccount?.related('addresses').createMany([{ ...defaultAddress }]);
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
      // Check the account role.
      const accountRole = (await Account.query().preload('role').where('id', id).first())?.role
        .name;
      // console.log(accountRole);
      if (accountRole === 'Client') {
        const account = await Account.query()
          .preload('role')
          .preload('profile')
          .preload('addresses')
          .where('id', id)
          .first();
        if (!account) return response.status(404).json({ message: 'Account not found' });
        return response.status(200).send(account);
      } else {
        const account = await Account.query()
          .preload('role')
          .preload('profile')
          .preload('addresses')
          .where('id', id)
          .first();
        if (!account) return response.status(404).json({ message: 'Account not found' });
        return response.status(200).send(account);
      }
    } catch (error) {
      return error;
    }
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    try {
      const { id } = params;
      const account = await Account.findBy('id', id);
      if (!account) return response.status(404).json({ message: 'Account not found' });
      const authUserId = auth.user?.$original.id;
      if (parseInt(id) !== authUserId)
        return response.status(401).json({ message: 'Unauthorized' });
      const payload = await request.validate(UpdateAccountValidator);
      if (payload.password) {
        payload.password = await Hash.make(payload.password);
      }
      await Account.query()
        .where('id', id)
        .update({ ...payload, password: payload.password });
      response.status(204);
    } catch (error) {
      response.badRequest(error.messages.errors);
    }
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    try {
      const { id } = params;
      const account = await Account.findBy('id', id);
      if (!account) return response.status(404).json({ message: 'Account not found' });
      const authUserId = auth.user?.$original.id;
      if (parseInt(id) !== authUserId)
        return response.status(401).json({ message: 'Unauthorized' });
      await account.delete();
      response.status(200);
    } catch (error) {
      return error;
    }
  }
}
