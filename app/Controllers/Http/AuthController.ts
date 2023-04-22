import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');
    // ZT-NOTE: use() is used to specify the guard?
    const token = await auth.use('api').attempt(email, password); // The return of this is the account object
    return token.toJSON();
  }

  public async logout({ auth }: HttpContextContract) {
    const res = await auth.use('api').logout();
    return res;
  }
}
