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

  @column({ columnName: 'total_hectares' })
  public totalHectares: number

  @column({ columnName: 'cultivable_hectares' })
  public cultivableHectares: number

  @column({ columnName: 'vegetated_hectares' })
  public vegetatedHectares: number

  @column({ columnName: 'cultivated_crops' })
  public cultivatedCrops: string[]

  @column({ columnName: 'producer_id' })
  public producerId: string

  @belongsTo(() => Producer, { foreignKey: 'producerId' })
  public producer: BelongsTo<typeof Producer>

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
