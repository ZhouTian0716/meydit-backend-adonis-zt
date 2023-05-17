import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bids'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('comment').notNullable();
      table.integer('price').notNullable();
      table.integer('project_id').nullable().unsigned().references('projects.id').onDelete('CASCADE');
      table.integer('maker_id').notNullable().unsigned().references('accounts.id').onDelete('CASCADE');
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
