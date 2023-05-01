import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'accounts';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('first_name', 50).nullable();
      table.string('last_name', 50).nullable();
      table.string('email', 255).notNullable().unique();
      table.string('password', 180).notNullable();
      table.enu('role', ['client', 'maker', 'admin']).notNullable();
      table.string('remember_me_token').nullable();
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
