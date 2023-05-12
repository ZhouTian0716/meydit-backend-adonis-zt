import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Category from 'App/Models/Category';

export default class CategorySeeder extends BaseSeeder {
  public static environment = ['development']
  public async run() {
    const uniqueKey = 'name';
    await Category.updateOrCreateMany(uniqueKey, [
      {
        name: 'General',
        url: 'https://meydit-media-storage.s3.ap-southeast-2.amazonaws.com/category-images/General.png',
      },
      {
        name: 'Dress',
        url: 'https://meydit-media-storage.s3.ap-southeast-2.amazonaws.com/category-images/Dress.png',
      },
      {
        name: 'Jacket',
        url: 'https://meydit-media-storage.s3.ap-southeast-2.amazonaws.com/category-images/Jacket.png',
      },
      {
        name: 'Shirt',
        url: 'https://meydit-media-storage.s3.ap-southeast-2.amazonaws.com/category-images/Shirt.png',
      },
      {
        name: 'Kids',
        url: 'https://meydit-media-storage.s3.ap-southeast-2.amazonaws.com/category-images/Kids.png',
      },
      {
        name: 'Sportswear',
        url: 'https://meydit-media-storage.s3.ap-southeast-2.amazonaws.com/category-images/Sportswear.png',
      },
      {
        name: 'Woman',
        url: 'https://meydit-media-storage.s3.ap-southeast-2.amazonaws.com/category-images/Woman.png',
      },
      {
        name: 'Man',
        url: 'https://meydit-media-storage.s3.ap-southeast-2.amazonaws.com/category-images/Man.png',
      },
      {
        name: 'Accessories',
        url: 'https://meydit-media-storage.s3.ap-southeast-2.amazonaws.com/category-images/Accessories.png',
      },
      {
        name: 'Hats',
        url: 'https://meydit-media-storage.s3.ap-southeast-2.amazonaws.com/category-images/Hats.png',
      },
      {
        name: 'Others',
        url: 'https://meydit-media-storage.s3.ap-southeast-2.amazonaws.com/category-images/Others.png',
      },
    ]);
  }
}
