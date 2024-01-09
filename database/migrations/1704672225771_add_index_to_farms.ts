import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'farms'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.index(['id'])
      table.index(['producer_id'])
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex(['id'])
      table.dropIndex(['producer_id'])
    })
  }
}
