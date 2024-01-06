import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('producers', 'ProducersController').apiOnly()
}).prefix('api/v1')
