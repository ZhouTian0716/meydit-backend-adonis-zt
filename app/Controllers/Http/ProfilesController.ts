import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Account from 'App/Models/Account';
import CreateProfileValidator from 'App/Validators/Profile/CreateProfileValidator';

export default class ProfilesController {
  public async store({ request, response }: HttpContextContract) {
    try {
      // you need the parent project created first
      const payload = await request.validate(CreateProfileValidator);
      const parentAccount = await Account.findBy('id', payload.accountId);
      if(!parentAccount) return response.status(404).json({ message: 'Account not found' });
      const res = await parentAccount?.related('profile').create({ ...payload });
      response.status(201).json(res);
    } catch (error) {
      return error;
    }
  }
}
