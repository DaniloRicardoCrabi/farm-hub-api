import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.group(() => {
  Route.get('health', async ({ response }) => {
    const report = await HealthCheck.getReport()
    return report.healthy ? response.ok(report) : response.badRequest(report)
  })
  Route.resource('producers', 'ProducersController').apiOnly()
  Route.resource('farms', 'FarmsController').apiOnly().except(['store'])
  Route.post('farms/:producerId', 'FarmsController.store')
  Route.get('reports/total-producers', 'ReportsController.getTotalProducers')
  Route.get('reports/total-farms', 'ReportsController.getTotalFarms')
  Route.get('reports/total-hectares', 'ReportsController.getTotalHectares')
  Route.get('reports/total-producers-by-state', 'ReportsController.getTotalProducersByState')
  Route.get('reports/total-farms-by-state', 'ReportsController.getTotalFarmsByState')
  Route.get('reports/total-by-cultivated-crops', 'ReportsController.getTotalByCultivatedCrops')
  Route.get(
    'reports/total-by-vegetated-and-cultivable-hectares',
    'ReportsController.getTotalByVegetatedAndCultivableHectares'
  )
}).prefix('api/v1')
