import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Profile from 'App/Models/Profile';
import UpdateProfileValidator from 'App/Validators/Profile/UpdateProfileValidator';

export default class ProfilesController {
  public async index({ response }: HttpContextContract) {
    try {
      const profiles = await Profile.query().select('*');
      return response.status(200).json(profiles);
    } catch (error) {
      return error;
    }
  }

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

  public async update({ request, response, params, auth }: HttpContextContract) {
    try {
      const { id } = params;
      const profile = await Profile.query().where('id', id).first();
      if (!profile) return response.status(404).json({ message: 'Profile not found' });
      // ZT-NOTE: authUserId 是通过解析前端发来的token得到的
      const authUserId = auth.user?.$original.id;
      if (profile.$original.accountId !== authUserId)
        return response.status(401).json({ message: 'Unauthorized' });
      const payload = await request.validate(UpdateProfileValidator);
      await Profile.query().where('id', id).update(payload);
      return response.status(204);
    } catch (error) {
      return error;
    }
  }

}

export const defaultProfile={
  avatar: null,
  bio: null,
}
