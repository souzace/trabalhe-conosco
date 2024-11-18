import Farmer from '#models/farmer'

import { documentRule } from '#validators/document_rule'
import type { HttpContext } from '@adonisjs/core/http'
import vine, { errors } from '@vinejs/vine'



export default class FarmersController {

  async index({ }: HttpContext) {
    return await Farmer
      .query()
      .preload('farms')
  }

  async store({ request, response }: HttpContext) {

    try {
      const { name, documentNumber } = request.all()

      const schema = vine.object({
        documentNumber: vine
          .string()
          .use(
            documentRule({})
          )
      })

      vine.validate({ schema, data: { documentNumber } });

      const newFarmer = new Farmer()
      newFarmer.name = name
      newFarmer.documentNumber = documentNumber
      return await Farmer.create(newFarmer)

    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        // array created by SimpleErrorReporter
        console.log(error.messages)
      }
    }

  }

  async edit({ params }: HttpContext) {
    return await Farmer.find(params.id);
  }

  async update({ params, request }: HttpContext) {
    const { name, documentNumber } = request.all()

    const farmer = await Farmer.find(params.id);

    if (!farmer) {
      return 'not found'
    }

    farmer.name = name
    farmer.documentNumber = documentNumber
    return await farmer.save()
  }

  async destroy({ params }: HttpContext) {
    const farmer = await Farmer.find(params.id);
    return (farmer) ? await farmer.delete() : 'not found'
  }
}