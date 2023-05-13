import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Profile from 'App/Models/Profile';
import Env from '@ioc:Adonis/Core/Env';

export default class ProfileSeeder extends BaseSeeder {
  public static environment = ['development']
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = 'accountId';
    const bucketName = Env.get('AWS_S3_BUCKET');
    await Profile.updateOrCreateMany(uniqueKey, [
      {
        avatar: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/account-images/id-1/12792782813c.jpg`,
        accountId: 1,
        bio: 'Hi, I am Zhou Tian. I have the profile for account one.',
      },
      {
        avatar: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/account-images/id-2/0128287182e9.jpg`,
        accountId: 2,
        bio: 'Hi, I am Joe Tian. I am the profile for account two.',
      },
      {
        avatar: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/account-images/id-3/fe6e3d3d15ed.jpg`,
        accountId: 3,
        bio: 'Hi, I am Jam Lok, the first registered maker.',
      },
      {
        avatar: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/account-images/id-4/f3f0ef3a65da.jpg`,
        accountId: 4,
        bio: 'Hi, I am Susan Hansen, registered client and the CEO.',
      },
      {
        avatar: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/account-images/id-5/30e4d24b0644.jpg`,
        accountId: 5,
        bio: 'Hi, I am Jess Karl, registered maker and HR.',
      },
      {
        avatar: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/account-images/id-6/5b3c9a560c7d.jpg`,
        accountId: 6,
        bio: 'Hi, I am Lau Maker, registered maker.',
      },
      {
        avatar: null,
        accountId: 7,
        bio: 'Hi, I am a place holder user, for profile avatar upload testing.',
      },
    ]);
  }
}
