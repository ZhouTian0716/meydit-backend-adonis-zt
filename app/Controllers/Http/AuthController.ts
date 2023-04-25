import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Account from 'App/Models/Account';

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');
    try {
      const account = await Account.query().where('email', email).first();
      if (!account) {
        throw new Error('Account not found');
      }
      const accountSerialized = account.serialize({
        fields: ['first_name', 'last_name', 'role', 'email'],
      });
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '15 min',
      });
      const loginRes = {
        account: accountSerialized,
        token: token.toJSON(),
      };
      // The expiresIn, think about adding feature to refresh token
      return loginRes;
    } catch {
      return response.unauthorized('Invalid credentials');
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke();
    return {
      revoked: true,
    };
  }
}
