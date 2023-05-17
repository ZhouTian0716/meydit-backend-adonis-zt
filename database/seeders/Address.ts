import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Address from 'App/Models/Address';

export default class AddressSeeder extends BaseSeeder {
  public static environment = ['development'];
  public async run() {
    await Address.createMany([
      {
        number: '6',
        route: 'johnstone St',
        city: 'Glengowrie',
        state: 'SA',
        zip: '5044',
        country: 'AU',
        accountId: 1,
      },
      {
        number: '22',
        route: 'Adelaide St',
        city: 'Killarney Vale',
        state: 'NSW',
        zip: '2261',
        country: 'AU',
        isPrimary: true,
        accountId: 1,
      },
      {
        number: '10',
        route: 'johnstone St',
        city: 'Glengowrie',
        state: 'SA',
        zip: '5044',
        country: 'AU',
        accountId: 1,
      },
      {
        number: '93',
        route: 'Constitution Rd W',
        city: 'West Ryde',
        state: 'NSW',
        zip: '2114',
        country: 'AU',
        accountId: 2,
      },
      {
        number: '39',
        route: 'Arthur St',
        city: 'Ashfield',
        state: 'NSW',
        zip: '2131',
        country: 'AU',
        accountId: 3,
      },
      {
        number: '58',
        route: 'Eastwood Ave',
        city: 'Eastwood',
        state: 'NSW',
        zip: '2122',
        country: 'AU',
        accountId: 4,
      },
      {
        number: '66',
        route: 'Hurstville Rd',
        city: 'Hurstville Grove',
        state: 'NSW',
        zip: '2220',
        country: 'AU',
        accountId: 5,
      },
      {
        number: '22',
        route: 'Pitt St',
        city: 'Redfern',
        state: 'NSW',
        zip: '2016',
        country: 'AU',
        accountId: 6,
      },
      {
        number: null,
        route: null,
        city: null,
        state: null,
        zip: null,
        country: null,
        accountId: 7,
      },
    ]);
  }
}
