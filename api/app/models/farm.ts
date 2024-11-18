import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Farmer from './farmer.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Culture from './culture.js'

export default class Farm extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'farmer_id' })
  declare farmerId: number

  @column()
  declare name: string

  @column()
  declare city: string

  @column()
  declare state: string

  @column({ columnName: 'hectare_total_area' })
  declare hectareTotalArea: number

  @column({ columnName: 'hectare_agricultural_area' })
  declare hectareAgriculturalArea: number

  @column({ columnName: 'hectare_vegetation_area' })
  declare hectareVegetationArea: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Farmer, {
    foreignKey: 'farmerId'
  })
  declare farmer: BelongsTo<typeof Farmer>

  @hasMany(() => Culture, {
    foreignKey: 'farmId'
  })
  declare cultures: HasMany<typeof Culture>
}