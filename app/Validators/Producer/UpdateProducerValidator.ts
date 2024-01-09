import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateProducerValidator {
  public schema = schema.create({
    name: schema.string.optional(),
    email: schema.string.optional({}, [rules.email()]),
    city: schema.string.optional(),
    state: schema.string.optional(),
    document: schema.string.optional(),
  })
}
