import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Project from 'App/Models/Project';

export default class ProjectSeeder extends BaseSeeder {
  public static environment = ['development'];
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = 'title';
    await Project.updateOrCreateMany(uniqueKey, [
      {
        title: 'project first',
        description:
          'Description one, Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum blanditiis ipsa error eveniet.',
        startPrice: 100,
        statusId: 1,
        makerId: 3,
        clientId: 4,
        categoryId: 1,
      },
      {
        title: 'project second',
        description:
          'Description two, Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum blanditiis ipsa error eveniet.',
        startPrice: 200,
        statusId: 1,
        makerId: 3,
        clientId: 2,
        categoryId: 2,
      },
      {
        title: 'project third',
        description:
          'Description three, Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum blanditiis ipsa error eveniet.',
        startPrice: 300,
        statusId: 1,
        makerId: 3,
        clientId: 1,
        categoryId: 3,
      },
      {
        title: 'project forth',
        description:
          'Description four, Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum blanditiis ipsa error eveniet.',
        startPrice: 400,
        statusId: 1,
        makerId: 3,
        clientId: 4,
        categoryId: 4,
      },
    ]);
  }
}
