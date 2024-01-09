import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Producer from 'App/Models/Producer'
import { cnpj } from 'cpf-cnpj-validator'

export default class extends BaseSeeder {
  public static order = 1

  public async run() {
    await Producer.createMany([
      {
        name: 'John Doe',
        email: 'johh@gmail.com',
        state: 'SP',
        city: 'São Paulo',
        document: cnpj.generate(),
      },
      {
        name: 'John Doe 2',
        email: 'johh@gmail.com',
        state: 'SP',
        city: 'São Paulo',
        document: cnpj.generate(),
      },
      {
        name: 'John Doe 3',
        email: 'johh@gmail.com',
        state: 'MG',
        city: 'Eloi Mendes',
        document: cnpj.generate(),
      },
      {
        name: 'John Doe 4',
        email: 'johh@gmail.com',
        state: 'MG',
        city: 'Varginha',
        document: cnpj.generate(),
      },
      {
        name: 'John Doe 5',
        email: 'johh@gmail.com',
        state: 'RJ',
        city: 'Rio de Janeiro',
        document: cnpj.generate(),
      },
      {
        name: 'John Doe 5',
        email: 'johh@gmail.com',
        state: 'ES',
        city: 'Vitoria',
        document: cnpj.generate(),
      },
      {
        name: 'John Doe 6',
        email: 'john@gmail.com',
        state: 'ES',
        city: 'Inhauma',
        document: cnpj.generate(),
      },
      {
        name: 'Bob Johnson',
        email: 'bob@gmail.com',
        state: 'MG',
        city: 'Eloi Mendes',
        document: cnpj.generate(),
      },
      {
        name: 'Alice Smith',
        email: 'alice@gmail.com',
        state: 'MG',
        city: 'Varginha',
        document: cnpj.generate(),
      },
      {
        name: 'Charlie Brown',
        email: 'charlie@gmail.com',
        state: 'RJ',
        city: 'Rio de Janeiro',
        document: cnpj.generate(),
      },
      {
        name: 'David Williams',
        email: 'david@gmail.com',
        state: 'ES',
        city: 'Vitoria',
        document: cnpj.generate(),
      },
      {
        name: 'Eva Davis',
        email: 'eva@gmail.com',
        state: 'ES',
        city: 'Inhauma',
        document: cnpj.generate(),
      },
    ])
  }
}
