import { schema } from '@ioc:Adonis/Core/Validator'

export default class UpdateFarmValidator {
  public schema = schema.create({
    name: schema.string.optional(),
    state: schema.string.optional(),
    city: schema.string.optional(),
    totalHectares: schema.number.optional(),
    cultivableHectares: schema.number.optional(),
    vegetatedHectares: schema.number.optional(),
    cultivatedCrops: schema.array.optional().members(schema.string()),
  })
}
