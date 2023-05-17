import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Bid from 'App/Models/Bid';

export default class BidSeeder extends BaseSeeder {
  public static environment = ['development'];
  public async run() {
    await Bid.createMany([
      {
        comment: `Dear client, I am thrilled to have the opportunity to work on your clothing project. With my expertise in garment design and meticulous craftsmanship, I assure you that I will bring your vision to life with utmost precision, creativity, and attention to detail. Let's collaborate and create something truly exceptional together!`,
        price: 110,
        projectId: 1,
        makerId: 3,
      },
      {
        comment: `Hello there! As a skilled maker in the realm of clothing creation, I'm excited to bid on your project. I possess a deep understanding of fabric selection, impeccable stitching, and the ability to transform ideas into stunning garments. Trust me to deliver exceptional craftsmanship and a unique style that perfectly matches your vision. Let's embark on this creative journey together!`,
        price: 150,
        projectId: 1,
        makerId: 5,
      },
      {
        comment: `Dear client, experienced maker here offering top-notch craftsmanship, impeccable quality, and competitive pricing. Let's create exceptional garments together that reflect your unique style and surpass your expectations.`,
        price: 170,
        projectId: 1,
        makerId: 6,
      },
      {
        comment: `Dear client, experienced maker here offering top-notch craftsmanship, impeccable quality, and competitive pricing. Let's create exceptional garments together that reflect your unique style and surpass your expectations.`,
        price: 220,
        projectId: 2,
        makerId: 6,
      },
      {
        comment: `With extensive experience, I offer superior craftsmanship, impeccable quality, and competitive pricing. Let's bring your vision to life with exceptional garments that showcase your style and exceed your expectations.`,
        price: 250,
        projectId: 2,
        makerId: 3,
      },
      {
        comment: `With extensive experience, I offer superior craftsmanship, impeccable quality, and competitive pricing. Let's bring your vision to life with exceptional garments that showcase your style and exceed your expectations.`,
        price: 320,
        projectId: 3,
        makerId: 5,
      },
      {
        comment: `With extensive experience, I offer superior craftsmanship, impeccable quality, and competitive pricing. Let's bring your vision to life with exceptional garments that showcase your style and exceed your expectations.`,
        price: 450,
        projectId: 4,
        makerId: 6,
      },
    ]);
  }
}
