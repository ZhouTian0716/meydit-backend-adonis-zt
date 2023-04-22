import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {

  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');
    await auth.use('web').attempt(email, password); // The return of this is the account object
    return response;
  }

  public async logout({ auth }: HttpContextContract) {
    const res = await auth.use('web').logout();
    return res;
  }
}
