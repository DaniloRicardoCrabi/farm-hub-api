import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Producer from 'App/Models/Producer'
import Logger from '@ioc:Adonis/Core/Logger'
import { cpf, cnpj } from 'cpf-cnpj-validator'
import StoreProducerValidator from 'App/Validators/Producer/StoreProducerValidator'
import BadRequestException from 'App/Exceptions/BadRequestExeption'
import UpdateProducerValidator from 'App/Validators/Producer/UpdateProducerValidator'
import NotFoundException from 'App/Exceptions/NotFoundExeption'
import InternalServerException from 'App/Exceptions/InternalServerExeption'

export default class ProducersController {
  private logger = Logger.child({
    name: 'ProducersController',
  })

  public async store({ request, response }: HttpContextContract) {
    const producerDto = await request.validate(StoreProducerValidator)

    const { document } = producerDto

    if (!cpf.isValid(document) && !cnpj.isValid(document)) {
      this.logger.error('Requested creation of producer with invalid document')
      throw new BadRequestException('Producer not created, document is invalid')
    }

    const alreadyExists = await Producer.findBy('document', document)

    if (alreadyExists) {
      this.logger.error('Requested creation of producer with document already registered')
      throw new BadRequestException('Producer with this document already registered')
    }

    try {
      const producer = await Producer.create(producerDto)

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

  public async show({ request, response }: HttpContextContract) {
    try {
      const producer = await Producer.findOrFail(request.params().id)

      response.status(200)
      return {
        message: 'Producer retrieved successfully',
        data: producer,
      }
    } catch {
      response.status(404)
      this.logger.error('Producer not found 2')
      return {
        message: 'Producer not found 2',
      }
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const updateProducerDto = await request.validate(UpdateProducerValidator)
    const { document } = updateProducerDto

    const producer = await Producer.find(request.params().id)

    if (!producer) {
      this.logger.error('Producer not found')
      throw new NotFoundException('Producer not found')
    }

    if (document && producer.document !== document) {
      const producerWithDocumentAlreadyExists = await Producer.query()
        .where('document', document)
        .first()

      if (producerWithDocumentAlreadyExists) {
        this.logger.error('Requested update of producer with document already registered')
        throw new BadRequestException('Producer with this document already registered')
      }

      if (!cpf.isValid(document) && !cnpj.isValid(document)) {
        this.logger.error('Requested update of producer with invalid document')
        throw new BadRequestException('Producer not updated, document is invalid')
      }

      producer.document = document
    }

    try {
      producer.merge(updateProducerDto)

      await producer.save()

      response.status(200)
      return {
        message: 'Producer updated successfully',
        data: producer,
      }
    } catch (error) {
      this.logger.error('Erro on update produces ' + error.stack)
      const message = error.message ?? 'Error on update producer'
      throw new InternalServerException(message)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const producer = await Producer.findOrFail(request.params().id)

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
