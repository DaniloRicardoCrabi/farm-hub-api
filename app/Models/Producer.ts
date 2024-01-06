import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Producer extends BaseModel {
  @column({ isPrimary: true })
  public id: String

  @column()
  public name: String

  @column()
  public email?: String

  @column()
  public state: String

  @column()
  public city: String

  @column()
  public document: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
