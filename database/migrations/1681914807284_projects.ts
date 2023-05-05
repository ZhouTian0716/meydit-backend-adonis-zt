import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'projects';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('slug').notNullable().unique();
      table.string('title', 50).notNullable();
      table.text('description').nullable();
      table.integer('start_price').notNullable();
      table
        .integer('status_id')
        .notNullable()
        .unsigned()
        .references('statuses.id')
        .onDelete('CASCADE')
        .defaultTo(1);
      table.integer('maker_id').nullable().unsigned().references('accounts.id');
      table
        .integer('client_id')
        .notNullable()
        .unsigned()
        .references('accounts.id')
        .onDelete('CASCADE');
      table
        .integer('category_id')
        .notNullable()
        .unsigned()
        .references('categories.id')
        .onDelete('CASCADE')
        .defaultTo(1);
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
