import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'projects';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('slug').notNullable().unique();
      table.string('title', 50).notNullable();
      table.text('description');
      table.integer('start_price').nullable();
      table.enu('status', ['Released', 'In Progress', 'Completed']).notNullable();
      table.integer('maker_id').nullable().unsigned().references('id').inTable('accounts');
      table.integer('client_id').notNullable().unsigned().references('id').inTable('accounts').onDelete('CASCADE');
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
