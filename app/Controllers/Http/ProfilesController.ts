import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Account from 'App/Models/Account';
import Profile from 'App/Models/Profile';
import CreateProfileValidator from 'App/Validators/Profile/CreateProfileValidator';

export default class ProfilesController {
  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      // ZT-NOTE: 这里需不需要projects也一同查询，取决于前端需不需要
      const profile = await Profile.query().where('id', id).first();
      if (!profile) return response.status(404).json({ message: 'Profile not found' });
      return response.status(200).json(profile);
    } catch (error) {
      return error;
    }
  }

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

export const defaultProfile={
  avatar: null,
  bio: null,
}
