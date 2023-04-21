/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => {
  return { hello: 'world' };
});

Route.resource('/accounts',  'AccountsController').apiOnly();

// Route.resource('projects', 'ProjectsController').paramFor('projects', 'slug').apiOnly();
Route.resource('projects', 'ProjectsController').middleware({ store: ['auth'] });

// 👻👻👻
// i am now just using repl cli to register a user
// node ace repl
// import Account from 'App/Models/Account';
// await Account.create({ first_name: 'JoeJoe', last_name: 'Tian', email: 'joe@gmail.com', password: '123456', role: 'client' });
// await Account.create({ first_name: 'Jam', last_name: 'Lok', email: 'jam@gmail.com', password: '123456', role: 'maker' });
// 👻👻👻
Route.post('/login', async ({ auth, request, response }) => {
  const email = request.input('email');
  const password = request.input('password');

  await auth.use('web').attempt(email, password); // The return of this is the account object
  return response;
});

Route.post('/logout', async ({ auth }) => {
  const res = await auth.use('web').logout();
  return res;
});
