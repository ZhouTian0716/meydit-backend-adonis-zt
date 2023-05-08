import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Profile from 'App/Models/Profile';


export default class ProfileSeeder extends BaseSeeder {
  public static environment = ['development']
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = 'accountId';
    await Profile.updateOrCreateMany(uniqueKey, [
      {
        avatar: 'https://meydit-media-storage-production.s3.ap-southeast-2.amazonaws.com/account-images/id-1/12792782813c.jpg',
        accountId: 1,
        bio: 'Hi, I am Zhou Tian. I am the profile for account one.',
      },
      {
        avatar: 'https://meydit-media-storage-production.s3.ap-southeast-2.amazonaws.com/account-images/id-2/0128287182e9.jpg',
        accountId: 2,
        bio: 'Hi, I am Zhou Tian. I am the profile for account two.',
      },
    ]);
  }
}
