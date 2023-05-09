import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Image from 'App/Models/Image';

export default class ImageSeeder extends BaseSeeder {
  public static environment = ['development']
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = 'url';
    await Image.updateOrCreateMany(uniqueKey, [
      {
        url: 'https://meydit-media-storage-production.s3.ap-southeast-2.amazonaws.com/project-images/id-1/000000000001.jpg',
        fileName: 'project-images/id-1/000000000001.jpg',
        projectId: 1,
      },
      {
        url: 'https://meydit-media-storage-production.s3.ap-southeast-2.amazonaws.com/project-images/id-1/000000000002.jpg',
        fileName: 'project-images/id-1/000000000002.jpg',
        projectId: 1,
      },
      {
        url: 'https://meydit-media-storage-production.s3.ap-southeast-2.amazonaws.com/project-images/id-1/000000000003.jpg',
        fileName: 'project-images/id-1/000000000003.jpg',
        projectId: 1,
      },
      {
        url: 'https://meydit-media-storage-production.s3.ap-southeast-2.amazonaws.com/project-images/id-1/000000000004.jpg',
        fileName: 'project-images/id-1/000000000004.jpg',
        projectId: 1,
      },
      {
        url: 'https://meydit-media-storage-production.s3.ap-southeast-2.amazonaws.com/project-images/id-2/000000000005.jpg',
        fileName: 'project-images/id-2/000000000005.jpg',
        projectId: 2,
      },
      {
        url: 'https://meydit-media-storage-production.s3.ap-southeast-2.amazonaws.com/project-images/id-2/000000000006.jpg',
        fileName: 'project-images/id-2/000000000006.jpg',
        projectId: 2,
      },
      {
        url: 'https://meydit-media-storage-production.s3.ap-southeast-2.amazonaws.com/project-images/id-3/000000000007.jpg',
        fileName: 'project-images/id-3/000000000007.jpg',
        projectId: 3,
      },
      {
        url: 'https://meydit-media-storage-production.s3.ap-southeast-2.amazonaws.com/project-images/id-3/000000000008.jpg',
        fileName: 'project-images/id-3/000000000008.jpg',
        projectId: 3,
      },
      {
        url: 'https://meydit-media-storage-production.s3.ap-southeast-2.amazonaws.com/project-images/id-4/000000000009.jpg',
        fileName: 'project-images/id-4/000000000009.jpg',
        projectId: 4,
      },
      {
        url: 'https://meydit-media-storage-production.s3.ap-southeast-2.amazonaws.com/project-images/id-4/000000000010.jpg',
        fileName: 'project-images/id-4/000000000010.jpg',
        projectId: 4,
      },
    ]);
  }
}
