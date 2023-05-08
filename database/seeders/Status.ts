import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Status from 'App/Models/Status';

export default class StatusSeeder extends BaseSeeder {
  public static environment = ['development']
  public async run() {
    const uniqueKey = 'name'
    await Status.updateOrCreateMany(uniqueKey,[
      {
        name: 'Released',
      },
      {
        name: 'In Progress',
      },
      {
        name: 'Deliverying',
      },
      {
        name: 'In Review',
      },
      {
        name: 'Completed',
      },
    ]);
  }
}