import Culture from '#models/culture'
import type { HttpContext } from '@adonisjs/core/http'

export default class CulturesController {
  async index({ }: HttpContext) {
    return await Culture.all()
  }

  async store({ request }: HttpContext) {

    const newCulture = new Culture()

    const { farmId, name } = request.all()

    newCulture.farmId = farmId
    newCulture.name = name

    return await Culture.create(newCulture)
  }

  async edit({ params }: HttpContext) {
    return await Culture.find(params.id);
  }

  async update({ params, request }: HttpContext) {
    const { farmId, name } = request.all()

    const culture = await Culture.find(params.id);

    if (!culture) {
      return 'not found'
    }

    culture.farmId = farmId
    culture.name = name

    return await culture.save()
  }

  async destroy({ params }: HttpContext) {
    const culture = await Culture.find(params.id);
    return (culture) ? await culture.delete() : 'not found'
  }
}