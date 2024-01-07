import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import Farm from 'App/Models/Farm'
import Producer from 'App/Models/Producer'
import BadRequestException from 'App/Exceptions/BadRequestExeption'
import NotFoundException from 'App/Exceptions/NotFoundExeption'
import UpdateFarmValidator from 'App/Validators/Farm/UpdateFarmValidator'
import StoreFarmValidator from 'App/Validators/Farm/StoreFarmValidator'

export default class FarmsController {
  private logger = Logger.child({
    name: 'FarmsController',
  })
  public async store({ request, response }: HttpContextContract) {
    await request.validate(StoreFarmValidator)

    const producerId = request.params().producerId

    const producer = await Producer.find(producerId)

    if (!producer) {
      throw new NotFoundException('Producer not found')
    }

    const farmsDto = request.body()

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
      console.log(error)
      this.logger.error('Error on creating farm ' + error)
      response.status(error.status || 500)
      return {
        message: error.message ?? 'Error creating farm',
      }
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
      this.logger.error('Error fetch ' + error.stack)
      response.status(500)
      return {
        message: 'Error farms fetching',
      }
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const farm = await Farm.find(request.params().id)

    if (!farm) {
      throw new NotFoundException('Farm not found')
    }

    response.status(200)
    return {
      message: 'Farm retrieved successfully',
      data: farm,
    }
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateFarmValidator)

    const farm = await Farm.find(request.params().id)

    if (!farm) {
      throw new NotFoundException('Farm not found')
    }

    const farmsDto = request.body()

    this.validateArea(
      farmsDto.totalHectares,
      farmsDto.cultivableHectares,
      farmsDto.vegetatedHectares
    )

    farm.merge(farmsDto)

    try {
      await farm.save()

      response.status(200)
      return {
        message: 'Farm updated successfully',
        data: farm,
      }
    } catch (error) {
      this.logger.error('Error on update farm ' + error.stack)
      response.status(500)
      return {
        message: 'Error on update farm',
      }
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
      response.status(500)
      return {
        message: 'Error delete farm',
      }
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
