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
        name: 'Pants',
      },
      {
        name: 'Sportswear',
      },
      {
        name: 'Jumpsuit',
      },
      {
        name: 'Smart casual',
      },
      {
        name: 'Accessories',
      },
      {
        name: 'Others',
      },
    ]);
  }
}
