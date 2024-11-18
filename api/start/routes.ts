/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const FarmersController = () => import('#controllers/farmers_controller')
const FarmsController = () => import('#controllers/farms_controller')
const CulturesController = () => import('#controllers/cultures_controller')

router.get('/', async () => {
  return 'Welcome to Brain Agriculture'
})

router.resource('farmers', FarmersController)
router.resource('farms', FarmsController)
router.resource('cultures', CulturesController)