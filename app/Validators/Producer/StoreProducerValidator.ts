import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class StoreProducerValidator {
  public schema = schema.create({
    name: schema.string(),
    email: schema.string.optional({}, [rules.email()]),
    city: schema.string(),
    state: schema.string(),
    document: schema.string(),
  })
}
