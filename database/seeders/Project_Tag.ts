import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import ProjectTag from 'App/Models/ProjectTag';

export default class ProjectTagSeeder extends BaseSeeder {
  public static environment = ['development'];
  public async run() {
    await ProjectTag.createMany([
      {
        projectId: 1,
        tagId: 2,
      },
      {
        projectId: 1,
        tagId: 3,
      },
      {
        projectId: 1,
        tagId: 4,
      },
      {
        projectId: 2,
        tagId: 6,
      },
      {
        projectId: 2,
        tagId: 7,
      },
      {
        projectId: 2,
        tagId: 8,
      },
      {
        projectId: 3,
        tagId: 4,
      },
      {
        projectId: 3,
        tagId: 2,
      },
      {
        projectId: 3,
        tagId: 1,
      },
      {
        projectId: 4,
        tagId: 1,
      },
      {
        projectId: 4,
        tagId: 3,
      },
      {
        projectId: 4,
        tagId: 7,
      },
    ]);
  }
}
