import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Role from 'App/Models/Role';

export default class RoleSeeder extends BaseSeeder {
  public static environment = ['development']
  public async run() {
    const uniqueKey = 'name'
    await Role.updateOrCreateMany(uniqueKey,[
      {
        name: 'Client',
      },
      {
        name: 'Maker',
      },
      {
        name: 'Admin',
      },
      {
        name: 'Developer',
      },
      {
        name: 'CEO',
      },
    ]);
  }
}
