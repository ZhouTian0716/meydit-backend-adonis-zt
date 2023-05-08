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
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';


// Healthcheck
Route.get('/', ({ response }: HttpContextContract) => {
  response.status(200).json({ hello: 'api home' });
});

Route.get('/healthcheck', ({ response }: HttpContextContract) =>
  response.status(200).json({ hello: 'healthcheck' })
);

Route.group(() => {
  // Route.resource('projects', 'ProjectsController').paramFor('projects', 'slug').apiOnly();
  Route.resource('/accounts', 'AccountsController').apiOnly();
  Route.resource('/profiles', 'ProfilesController').apiOnly();  
  Route.resource('/categories', 'CategoriesController').apiOnly();
  Route.resource('/statuses', 'StatusesController').apiOnly();
  Route.resource('/roles', 'RolesController').apiOnly();
  Route.resource('/tags', 'TagsController').apiOnly();
  Route.resource('/projects', 'ProjectsController')
    .middleware({ store: ['auth'], update: ['auth'], destroy: ['auth'] })
    .apiOnly();
  Route.resource('/images', 'ImagesController').apiOnly();  
  Route.post('/auth/login', 'AuthController.login').as('auth.login');
  Route.post('/auth/logout', 'AuthController.logout').as('auth.logout');
  Route.get('/aws/s3/upload', 'AwsS3Controller.secureUrlForUpload');
  Route.get('/aws/s3/delete', 'AwsS3Controller.secureUrlForDelete');
}).prefix('api');
