import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'farms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('farmer_id')
      table.string('name')
      table.string('city')
      table.string('state')
      table.double('hectare_total_area')
      table.double('hectare_agricultural_area')
      table.double('hectare_vegetation_area')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}