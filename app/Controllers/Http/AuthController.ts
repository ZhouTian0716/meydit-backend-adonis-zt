import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Account from 'App/Models/Account';

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');
    try {
      const account = await Account.query()
        .preload('role')
        .preload('profile')
        .preload('addresses')
        .where('email', email)
        .first();
      if (!account) {
        return response.status(404).json({ message: 'Account not found' });
      }

      // If this attempt check fail, it will throw error
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '1 day',
      });
      const loginRes = {
        account,
        token: token.toJSON(),
      };
      // The expiresIn, think about adding feature to refresh token
      // ZT-NOTE:这里登录后的返回值是配合前端redux的
      return loginRes;
    } catch {
      response.unauthorized({ message: 'Invalid credentials' });
    }
  }

  public async logout({ request, response, auth }: HttpContextContract) {
    // Validate if the req header has authorization token
    const token = request.headers().authorization?.split(' ')[1];
    if (!token) {
      response.badRequest({ message: 'Access Token missing for successful logout!' });
      return;
    }
    await auth.use('api').revoke();
    response.status(200).json({ message: 'Logout Successfully.' });
  }
}
