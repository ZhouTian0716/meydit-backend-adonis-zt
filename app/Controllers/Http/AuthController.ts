import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Account from 'App/Models/Account';

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');
    try {
      const account = await Account.query().where('email', email).first();
      if (!account) {
        return response.status(404).json({ message: 'Account not found' });
      }
      const accountSerialized = account.serialize({
        fields: ['first_name', 'last_name', 'role', 'email'],
      });

      // If this attempt check fail, it will throw error
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '1 day',
      });
      const loginRes = {
        account: accountSerialized,
        token: token.toJSON(),
      };
      // The expiresIn, think about adding feature to refresh token
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
