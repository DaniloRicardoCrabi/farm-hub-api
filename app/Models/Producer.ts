import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class Producer extends BaseModel {
  @beforeCreate()
  public static async generateUuid(producer: Producer) {
    producer.id = uuidv4()
  }

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
