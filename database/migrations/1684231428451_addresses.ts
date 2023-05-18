import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Addresses extends BaseSchema {
  protected tableName = 'addresses';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('number').nullable();
      table.string('route').nullable();
      table.string('city').nullable();
      table.string('state').nullable();
      table.string('zip').nullable();
      table.string('country').nullable();
      table.boolean('is_primary').notNullable().defaultTo(false);
      table
        .integer('account_id')
        .notNullable()
        .unsigned()
        .references('accounts.id')
        .onDelete('CASCADE');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
