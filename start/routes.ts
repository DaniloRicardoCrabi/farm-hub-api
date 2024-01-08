import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
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
