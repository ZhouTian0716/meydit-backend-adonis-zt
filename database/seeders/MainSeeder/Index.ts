import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Application from '@ioc:Adonis/Core/Application';

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in a environment specified in Seeder
     */
    if (
      (!Seeder.default.environment.includes('development') && Application.inDev) ||
      (!Seeder.default.environment.includes('testing') && Application.inTest) ||
      (!Seeder.default.environment.includes('production') && Application.inProduction)
    ) {
      return;
    }

    await new Seeder.default(this.client).run();
  }

  public async run() {
    await this.runSeeder(await import('../Role'));
    await this.runSeeder(await import('../Account'));
    await this.runSeeder(await import('../Profile'));
    await this.runSeeder(await import('../Status'));
    await this.runSeeder(await import('../Category'));
    await this.runSeeder(await import('../Tag'));
    await this.runSeeder(await import('../Project'));
    await this.runSeeder(await import('../Image'));
  }
}
