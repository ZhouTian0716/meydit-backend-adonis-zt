import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Category from 'App/Models/Category';
import Env from '@ioc:Adonis/Core/Env';

export default class CategorySeeder extends BaseSeeder {
  public static environment = ['development'];
  public async run() {
    const uniqueKey = 'name';
    const bucketName = Env.get('AWS_S3_BUCKET');
    await Category.updateOrCreateMany(uniqueKey, [
      {
        name: 'General',
        url: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/category-images/General.png`,
      },
      {
        name: 'Dress',
        url: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/category-images/Dress.png`,
      },
      {
        name: 'Jacket',
        url: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/category-images/Jacket.png`,
      },
      {
        name: 'Shirt',
        url: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/category-images/Shirt.png`,
      },
      {
        name: 'Kids',
        url: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/category-images/Kids.png`,
      },
      {
        name: 'Sportswear',
        url: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/category-images/Sportswear.png`,
      },
      {
        name: 'Woman',
        url: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/category-images/Woman.png`,
      },
      {
        name: 'Man',
        url: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/category-images/Man.png`,
      },
      {
        name: 'Accessories',
        url: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/category-images/Accessories.png`,
      },
      {
        name: 'Hats',
        url: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/category-images/Hats.png`,
      },
      {
        name: 'Others',
        url: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/category-images/Others.png`,
      },
    ]);
  }
}
