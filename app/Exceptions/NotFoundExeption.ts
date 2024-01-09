import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NotFoundException extends Exception {
  constructor(message: string, status = 404) {
    super(message, status)
  }

  public async handle(error: this, { response }: HttpContextContract) {
    response.status(error.status).json({ message: this.message, status: this.status })
  }
}
