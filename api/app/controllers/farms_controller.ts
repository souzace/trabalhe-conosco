import Farm from '#models/farm'
import type { HttpContext } from '@adonisjs/core/http'

export default class FarmsController {

  async index({ }: HttpContext) {
    return await Farm
      .query()
      .preload('cultures')
  }

  async store({ request }: HttpContext) {

    const newFarm = new Farm()

    const { farmerId, name, city, state, hectareTotalArea, hectareAgriculturalArea, hectareVegetationArea } = request.all()

    newFarm.farmerId = farmerId
    newFarm.name = name
    newFarm.city = city
    newFarm.state = state
    newFarm.hectareTotalArea = hectareTotalArea
    newFarm.hectareAgriculturalArea = hectareAgriculturalArea
    newFarm.hectareVegetationArea = hectareVegetationArea

    return await Farm.create(newFarm)
  }

  async edit({ params }: HttpContext) {
    return await Farm.find(params.id);
  }

  async update({ params, request }: HttpContext) {
    const { farmerId, name, city, state, hectareTotalArea, hectareAgriculturalArea, hectareVegetationArea } = request.all()

    const farm = await Farm.find(params.id);

    if (!farm) {
      return 'not found'
    }

    farm.farmerId = farmerId
    farm.name = name
    farm.city = city
    farm.state = state
    farm.hectareTotalArea = hectareTotalArea
    farm.hectareAgriculturalArea = hectareAgriculturalArea
    farm.hectareVegetationArea = hectareVegetationArea

    return await farm.save()
  }

  async destroy({ params }: HttpContext) {
    const farm = await Farm.find(params.id);
    return (farm) ? await farm.delete() : 'not found'
  }
}