import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');
    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '15 min',
      }); 
      // The expiresIn, think about adding feature to refresh token
      return token.toJSON();
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
