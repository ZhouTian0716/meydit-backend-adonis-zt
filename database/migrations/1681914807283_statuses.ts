import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Statuses extends BaseSchema {
  protected tableName = 'statuses';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('name', 20).notNullable().unique();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
