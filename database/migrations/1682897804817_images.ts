import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Images extends BaseSchema {
  protected tableName = 'images'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('url').notNullable().unique();
      table.string('file_name').notNullable();
      table.integer('project_id').nullable().unsigned().references('projects.id').onDelete('CASCADE');
      table.boolean('is_project_cover').notNullable().defaultTo(false);
      table.timestamp('created_at', { useTz: true }).notNullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
