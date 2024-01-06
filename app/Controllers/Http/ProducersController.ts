import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Producer from 'App/Models/Producer'
import Logger from '@ioc:Adonis/Core/Logger'
import { cpf, cnpj } from 'cpf-cnpj-validator'

export default class ProducersController {
  private logger = Logger.child({
    name: 'ProducersController',
  })

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.body()
      const { name, email, state, city, document } = data

      if (!cpf.isValid(document) && !cnpj.isValid(document)) {
        this.logger.error('Requested creation of producer with invalid document')
        response.status(400)
        return {
          message: 'Invalid document',
        }
      }

      const alreadyExists = await Producer.findBy('document', document)

      if (alreadyExists) {
        this.logger.error('Requested creation of producer with document already registered')
        response.status(400)
        return {
          message: 'Document already registered',
        }
      }

      const producer = await Producer.create({
        name,
        email,
        state,
        city,
        document,
      })

      response.status(201)
      return {
        message: 'Producer created successfully',
        data: producer,
      }
    } catch (err) {
      this.logger.error(err.stack)
      response.status(500)
      return {
        message: 'Something went wrong',
      }
    }
  }

  public async index({ request, response }: HttpContextContract) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)

      const producers = await Producer.query().orderBy('name', 'asc').paginate(page, limit)

      response.status(200)
      return {
        message: 'Producers fetched successfully',
        data: producers,
      }
    } catch (err) {
      this.logger.error(err)
      response.status(500)
      return {
        message: 'Something went wrong',
      }
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const producer = await Producer.findOrFail(params.id)

      response.status(200)
      return {
        message: 'Producer retrieved successfully',
        data: producer,
      }
    } catch {
      response.status(404)
      this.logger.error('Producer not found')
      return {
        message: 'Producer not found',
      }
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const data = request.body()
      const { name, email, state, city, document } = data

      if (!cpf.isValid(document) && !cnpj.isValid(document)) {
        this.logger.error('Requested update of producer with invalid document')
        response.status(400)
        return {
          message: 'Producer not updated, document is invalid',
        }
      }

      const producer = await Producer.findOrFail(params.id)

      producer.name = name
      producer.email = email
      producer.state = state
      producer.city = city
      producer.document = document

      await producer.save()

      response.status(200)
      return {
        message: 'Producer updated successfully',
        data: producer,
      }
    } catch {
      response.status(404)
      this.logger.error('Producer not found')
      return {
        message: 'Producer not found',
      }
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const producer = await Producer.findOrFail(params.id)

      await producer.delete()

      response.status(200)
      return {
        message: 'Producer deleted successfully',
      }
    } catch {
      response.status(404)
      this.logger.error('Producer not found')
      return {
        message: 'Producer not found',
      }
    }
  }
}
