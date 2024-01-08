import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Producer from './Producer'

export default class Farm extends BaseModel {
  @beforeCreate()
  public static async generateUuid(farm: Farm) {
    farm.id = uuid()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public state: string

  @column()
  public city: string

  @column()
  public totalHectares: number

  @column()
  public cultivableHectares: number

  @column()
  public vegetatedHectares: number

  @column()
  public cultivatedCrops: string[]

  @column({ columnName: 'producer_id' })
  public producerId: string

  @belongsTo(() => Producer, { foreignKey: 'producerId' })
  public producer: BelongsTo<typeof Producer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
