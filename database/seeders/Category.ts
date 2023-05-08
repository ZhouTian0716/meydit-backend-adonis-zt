import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Category from 'App/Models/Category';

export default class CategorySeeder extends BaseSeeder {
  public static environment = ['development']
  public async run() {
    const uniqueKey = 'name';
    await Category.updateOrCreateMany(uniqueKey, [
      {
        name: 'General',
      },
      {
        name: 'Dress',
      },
      {
        name: 'Jacket',
      },
      {
        name: 'Shirt',
      },
      {
        name: 'Kids',
      },
      {
        name: 'Sportswear',
      },
      {
        name: 'Woman',
      },
      {
        name: 'Man',
      },
      {
        name: 'Accessories',
      },
      {
        name: 'Hats',
      },
      {
        name: 'Others',
      },
    ]);
  }
}
