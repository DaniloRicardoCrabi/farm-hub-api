import { schema } from '@ioc:Adonis/Core/Validator'

export default class StoreFarmValidator {
  public schema = schema.create({
    name: schema.string(),
    state: schema.string(),
    city: schema.string(),
    totalHectares: schema.number(),
    cultivableHectares: schema.number(),
    vegetatedHectares: schema.number(),
    cultivatedCrops: schema.array().members(schema.string()),
  })
}
