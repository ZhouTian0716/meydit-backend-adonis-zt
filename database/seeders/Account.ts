import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Account from 'App/Models/Account';
// import Hash from '@ioc:Adonis/Core/Hash';

export default class AccountSeeder extends BaseSeeder {
  public static environment = ['development']
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = 'email';
    await Account.updateOrCreateMany(uniqueKey, [
      {
        email: 'anthony0716@hotmail.com',
        roleId: 1,
        firstName: 'Zhou',
        lastName: 'Tian',
        password: 'Xiao0716!',
      },
      {
        email: 'joe@gmail.com',
        roleId: 1,
        firstName: 'Joe',
        lastName: 'Tian',
        password: 'Xiao0716!',
      },
      {
        email: 'jam@gmail.com',
        roleId: 2,
        firstName: 'Jam',
        lastName: 'Lok',
        password: 'Xiao0716!',
      },
      {
        email: 'susan@gmail.com',
        roleId: 1,
        firstName: 'Susan',
        lastName: 'Hansen',
        password: 'Xiao0716!',
      },
      {
        email: 'jess@gmail.com',
        roleId: 2,
        firstName: 'Jess',
        lastName: 'Karl',
        password: 'Xiao0716!',
      },
      {
        email: 'maker@gmail.com',
        roleId: 2,
        firstName: 'Maker',
        lastName: 'Lau',
        password: 'Xiao0716!',
      },
      {
        email: 'client@gmail.com',
        roleId: 1,
        firstName: 'Client',
        lastName: 'Kidman',
        password: 'Xiao0716!',
      },
    ]);
  }
}
