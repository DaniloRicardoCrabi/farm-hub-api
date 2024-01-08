import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'

export default class LogRequest {
  private logger = Logger.child({
    name: 'FarmsController',
  })
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    this.logger.info(`-> ${request.method()}: ${request.url()}`)
    await next()
  }
}
