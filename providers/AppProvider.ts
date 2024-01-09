import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Logger from '@ioc:Adonis/Core/Logger'

export default class AppProvider {
  private logger = Logger.child({ name: 'AppProvider' })
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    const { ModelQueryBuilder } = this.app.container.use('Adonis/Lucid/Database')
    ModelQueryBuilder.macro('getCount', async function () {
      const result = await this.count('* as total')
      return BigInt(result[0].$extras.total)
    })
  }

  public async ready() {
    this.logger.info('App is ready')
    this.logger.info(
      'HOST: ' + JSON.stringify(this.app.container.use('Adonis/Core/Env').get('HOST'))
    )
    this.logger.info(
      'PORT: ' + JSON.stringify(this.app.container.use('Adonis/Core/Env').get('PORT'))
    )
    this.logger.info(
      'HOST: ' + JSON.stringify(this.app.container.use('Adonis/Core/Env').get('NODE_ENV'))
    )
    this.logger.info(
      'DATA BASE HOST: ' + JSON.stringify(this.app.container.use('Adonis/Core/Env').get('PG_HOST'))
    )
    this.logger.info(
      'DATA BASE PORT: ' + JSON.stringify(this.app.container.use('Adonis/Core/Env').get('PG_PORT'))
    )
    this.logger.info(
      'DATA BASE NAME: ' +
        JSON.stringify(this.app.container.use('Adonis/Core/Env').get('PG_DB_NAME'))
    )
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
