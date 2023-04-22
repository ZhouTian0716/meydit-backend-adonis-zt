import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'projects';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('title', 100).notNullable();
      table.string('slug').notNullable().unique();
      table.string('image');
      table.text('description');
      table.enu('status', ['Released', 'In Progress', 'Completed']).notNullable();
      table.integer('maker_id').nullable().unsigned().references('id').inTable('accounts').onDelete('CASCADE');
      table.integer('account_id').notNullable().unsigned().references('id').inTable('accounts').onDelete('CASCADE');

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
