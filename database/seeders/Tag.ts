import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Tag from 'App/Models/Tag';

export default class TagSeeder extends BaseSeeder {
  public static environment = ['development']
  public async run() {
    const uniqueKey = 'name';
    await Tag.updateOrCreateMany(uniqueKey, [
      {
        name: 'Fitting',
      },
      {
        name: 'Custom Design',
      },
      {
        name: 'Cotton',
      },
      {
        name: 'Fabric',
      },
      {
        name: 'Woolen',
      },
      {
        name: 'Waterproof',
      },
      {
        name: 'Cool',
      },
      {
        name: 'Warm',
      },
      {
        name: 'Pattern Creation',
      },
    ]);
  }
}
