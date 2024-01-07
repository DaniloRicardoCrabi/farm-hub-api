import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, HasMany, beforeCreate, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Farm from './Farm'

export default class Producer extends BaseModel {
  @hasMany(() => Farm)
  public farms: HasMany<typeof Farm>

  @beforeCreate()
  public static async generateUuid(producer: Producer) {
    producer.id = uuidv4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public email?: string

  @column()
  public state: string

  @column()
  public city: string

  @column()
  public document: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
