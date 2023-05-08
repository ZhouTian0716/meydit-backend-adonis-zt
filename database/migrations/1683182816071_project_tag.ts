import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ProjectTag extends BaseSchema {
  protected tableName = 'project_tags';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table
        .integer('project_id')
        .unsigned()
        .references('projects.id')
        .notNullable()
        .onDelete('CASCADE');
      table.integer('tag_id').unsigned().references('tags.id').notNullable().onDelete('CASCADE');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
