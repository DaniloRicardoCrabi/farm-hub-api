import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'farms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().primary()
      table.string('name').notNullable()
      table.string('state').notNullable()
      table.string('city').notNullable()
      table.float('total_hectares').notNullable()
      table.float('cultivable_hectares').notNullable()
      table.float('vegetated_hectares').notNullable()
      table.specificType('cultivated_crops', 'text[]').notNullable()
      table
        .uuid('producer_id')
        .references('id')
        .inTable('producers')
        .onDelete('CASCADE')
        .notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
