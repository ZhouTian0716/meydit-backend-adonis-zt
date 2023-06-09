import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Categories extends BaseSchema {
  protected tableName = 'categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('name', 20).notNullable().unique();
      table.string('url').notNullable().unique();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
