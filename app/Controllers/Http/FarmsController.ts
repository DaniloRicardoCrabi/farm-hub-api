import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import Farm from 'App/Models/Farm'
import Producer from 'App/Models/Producer'
import BadRequestException from 'App/Exceptions/BadRequestExeption'
import NotFoundException from 'App/Exceptions/NotFoundExeption'
import UpdateFarmValidator from 'App/Validators/Farm/UpdateFarmValidator'
import StoreFarmValidator from 'App/Validators/Farm/StoreFarmValidator'
import InternalServerException from 'App/Exceptions/InternalServerExeption'

export default class FarmsController {
  private logger = Logger.child({
    name: 'FarmsController',
  })
  public async store({ request, response }: HttpContextContract) {
    const farmsDto = await request.validate(StoreFarmValidator)

    const producerId = request.params().producerId

    const producer = await Producer.find(producerId)

    if (!producer) {
      throw new NotFoundException('Producer not found')
    }

    this.validateArea(
      farmsDto.totalHectares,
      farmsDto.cultivableHectares,
      farmsDto.vegetatedHectares
    )

    try {
      const farm = await Farm.create({ producerId, ...farmsDto })

      await farm.save()

      response.status(201)
      return {
        message: 'Farm created successfully',
        data: farm,
      }
    } catch (error) {
      this.logger.error('Error on creating farm ' + error)
      const message = error.message ?? 'Error on creating farm'
      throw new InternalServerException(message)
    }
  }

  public async index({ request, response }: HttpContextContract) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 1)

      const farms = await Farm.query().paginate(page, limit)
      farms.baseUrl('/farms')

      response.status(200)
      return {
        message: 'Farms fetched successfully',
        data: farms,
      }
    } catch (error) {
      this.logger.error('Error on fetching farms ' + error.stack)
      const message = error.message ?? 'Error on fetching farms'
      const status = error.status ?? 500
      throw new InternalServerException(message, status)
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const farm = await Farm.find(request.params().id)

      if (!farm) {
        throw new NotFoundException('Farm not found')
      }

      response.status(200)
      return {
        message: 'Farm retrieved successfully',
        data: farm,
      }
    } catch (error) {
      this.logger.error('Error on show farm ' + error.stack)
      const message = error.message ?? 'Error on show farm'
      const status = error.status ?? 500
      throw new InternalServerException(message, status)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const farmsDto = await request.validate(UpdateFarmValidator)

    const farm = await Farm.find(request.params().id)

    if (!farm) {
      throw new NotFoundException('Farm not found')
    }

    farm.merge(farmsDto)

    this.validateArea(farm.totalHectares, farm.cultivableHectares, farm.vegetatedHectares)

    try {
      await farm.save()

      response.status(200)
      return {
        message: 'Farm updated successfully',
        data: farm,
      }
    } catch (error) {
      this.logger.error('Error on update farm ' + error.stack)
      const message = error.message ?? 'Error on update farm'
      const status = error.status ?? 500
      throw new InternalServerException(message, status)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const farm = await Farm.find(request.params().id)

    if (!farm) {
      throw new NotFoundException('Farm not found')
    }

    try {
      await farm.delete()

      response.status(200)
      return {
        message: 'Farm deleted successfully',
      }
    } catch (error) {
      this.logger.error('Error on delete farm ' + error.stack)
      const message = error.message ?? 'Error on delete farm'
      const status = error.status ?? 500
      throw new InternalServerException(message, status)
    }
  }

  private validateArea(
    totalHectares: number,
    cultivableHectares: number,
    vegetatedHectares: number
  ) {
    if (totalHectares < cultivableHectares + vegetatedHectares) {
      throw new BadRequestException(
        'Total area cannot be less than the sum of cultivable and vegetated areas'
      )
    }
  }
}
