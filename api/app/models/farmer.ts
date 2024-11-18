import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Farm from './farm.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Farmer extends BaseModel {
  @column({ isPrimary: true })
  declare id?: number

  @column()
  declare name: string

  @column({ columnName: 'document_number' })
  declare documentNumber: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Farm, {
    foreignKey: 'farmerId'
  })
  declare farms: HasMany<typeof Farm>

}