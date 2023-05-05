import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'project_tag_relations';

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
      table.unique(['project_id', 'tag_id']);
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
