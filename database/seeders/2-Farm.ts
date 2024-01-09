import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Farm from 'App/Models/Farm'
import Producer from 'App/Models/Producer'

export default class extends BaseSeeder {
  public static order = 2

  public async run() {
    const producers = await Producer.query().select('id')

    await Farm.createMany([
      {
        name: 'Farm 1',
        state: 'MG',
        city: 'Eloi Mendes',
        producerId: producers[0].id,
        totalHectares: 100.25,
        cultivableHectares: 25.25,
        vegetatedHectares: 50.0,
        cultivatedCrops: ['Cenoura', 'Café'],
      },
      {
        name: 'Farm 2',
        state: 'MG',
        city: 'Eloi Mendes',
        producerId: producers[0].id,
        totalHectares: 100.25,
        cultivableHectares: 25.25,
        vegetatedHectares: 50.0,
        cultivatedCrops: ['Cenoura', 'Café', 'Limão'],
      },
      {
        name: 'Farm 3',
        state: 'MG',
        city: 'Fama',
        producerId: producers[1].id,
        totalHectares: 100.25,
        cultivableHectares: 25.25,
        vegetatedHectares: 50.0,
        cultivatedCrops: ['Café', 'Limão'],
      },
      {
        name: 'Farm 3',
        state: 'MG',
        city: 'Capitólio',
        producerId: producers[3].id,
        totalHectares: 100.25,
        cultivableHectares: 25.25,
        vegetatedHectares: 50.0,
        cultivatedCrops: ['Limão', 'Laranja', 'Uva'],
      },
      {
        name: 'Farm Manaus',
        state: 'AM',
        city: 'Manaus',
        producerId: producers[5].id,
        totalHectares: 1000.25,
        cultivableHectares: 250.25,
        vegetatedHectares: 500.0,
        cultivatedCrops: ['Limão', 'Laranja', 'Uva'],
      },
      {
        name: 'Farm Acre',
        state: 'AC',
        city: 'Rio Branco',
        producerId: producers[5].id,
        totalHectares: 2000.25,
        cultivableHectares: 1250.25,
        vegetatedHectares: 500.0,
        cultivatedCrops: ['Laranja'],
      },
    ])
  }
}
