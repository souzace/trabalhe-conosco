import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Farm from './farm.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'


export default class Culture extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'farm_id' })
  declare farmId: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Farm, {
    foreignKey: 'farmId'
  })
  declare farm: BelongsTo<typeof Farm>
}