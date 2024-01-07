import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'producers'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.unique(['document'])
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropUnique(['document'])
    })
  }
}
