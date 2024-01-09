import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import Producer from 'App/Models/Producer'
import Database from '@ioc:Adonis/Lucid/Database'
import InternalServerException from 'App/Exceptions/InternalServerExeption'
import Farm from 'App/Models/Farm'

export default class ReportsController {
  private logger = Logger.child({
    name: 'ReportsController',
  })

  public async getTotalProducers({ response }: HttpContextContract) {
    try {
      const total = await Producer.query().getCount()

      response.status(200)
      return {
        message: 'Get total producers successfully',
        data: {
          totalProducers: total,
        },
      }
    } catch (error) {
      this.logger.error('Error on get total producers ' + error)
      const message = error.message ?? 'Error on get total producers'
      const status = error.status ?? 500
      throw new InternalServerException(message, status)
    }
  }
  public async getTotalFarms({ response }: HttpContextContract) {
    try {
      const total = await Farm.query().getCount()

      response.status(200)
      return {
        message: 'Get total farms successfully',
        data: {
          totalFarms: total,
        },
      }
    } catch (error) {
      this.logger.error('Error on get total farms ' + error)
      const message = error.message ?? 'Error on get total farms'
      const status = error.status ?? 500
      throw new InternalServerException(message, status)
    }
  }
  public async getTotalHectares({ response }: HttpContextContract) {
    try {
      const result = await Farm.query().sum('total_hectares as totalHectares')
      const totalHectares = result[0].$extras.totalHectares

      response.status(200)
      return {
        message: 'Get total area successfully',
        data: {
          totalArea: totalHectares,
        },
      }
    } catch (error) {
      this.logger.error('Error on get total area ' + error)
      const message = error.message ?? 'Error on get total area'
      const status = error.status ?? 500
      throw new InternalServerException(message, status)
    }
  }
  public async getTotalProducersByState({ response }: HttpContextContract) {
    try {
      const result = await Database.from('producers')
        .select('state')
        .count('* as total')
        .groupBy('state')
        .orderBy('total', 'desc')

      response.status(200)
      return {
        message: 'Get total producers by state successfully',
        data: result,
      }
    } catch (error) {
      this.logger.error('Error on get total producers by state ' + error)
      const message = error.message ?? 'Error on get total producers by state'
      const status = error.status ?? 500
      throw new InternalServerException(message, status)
    }
  }
  public async getTotalFarmsByState({ response }: HttpContextContract) {
    try {
      const result = await Database.from('farms')
        .select('state')
        .count('* as total')
        .groupBy('state')
        .orderBy('total', 'desc')

      response.status(200)
      return {
        message: 'Get total farms by state successfully',
        data: result,
      }
    } catch (error) {
      this.logger.error('Error on get total farms by state ' + error)
      const message = error.message ?? 'Error on get total farms by state'
      const status = error.status ?? 500
      throw new InternalServerException(message, status)
    }
  }
  public async getTotalByCultivatedCrops({ response }: HttpContextContract) {
    try {
      const result = await Database.rawQuery(`
      SELECT crop, COUNT(*) as total
        FROM (
          SELECT UNNEST(cultivated_crops) as crop
          FROM farms
        ) as crops
        WHERE crop IS NOT NULL
        GROUP BY crop
        `)

      const totalByCultivateCrops: { crop: string; total: number }[] = result.rows.map((item) => {
        return {
          crop: item.crop,
          total: Number(item.total),
        }
      })

      response.status(200)
      return {
        message: 'Get total by cultivated crops successfully',
        data: {
          totalCrops: result.rows.length,
          totalByCultivateCrops,
        },
      }
    } catch (error) {
      this.logger.error('Error on get total by cultivated crops ' + error)
      const message = error.message ?? 'Error on get total by cultivated crops'
      const status = error.status ?? 500
      throw new InternalServerException(message, status)
    }
  }
  public async getTotalByVegetatedAndCultivableHectares({ response }: HttpContextContract) {
    try {
      const result = await Database.from('farms')
        .sum('total_hectares as totalHectares')
        .sum('vegetated_hectares as vegetatedHectares')
        .sum('cultivable_hectares as cultivableHectares')

      response.status(200)
      return {
        message: 'Get total by vegetated and cultivable successfully',
        data: result,
      }
    } catch (error) {
      this.logger.error('Error on get total by vegetated and cultivable ' + error)
      const message = error.message ?? 'Error on get total by vegetated and cultivable'
      const status = error.status ?? 500
      throw new InternalServerException(message, status)
    }
  }
}
