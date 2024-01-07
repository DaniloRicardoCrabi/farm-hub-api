import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('producers', 'ProducersController').apiOnly()
  Route.resource('farms', 'FarmsController').apiOnly().except(['store'])
  Route.post('farms/:producerId', 'FarmsController.store')
}).prefix('api/v1')
