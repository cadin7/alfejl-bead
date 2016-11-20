'use strict'

const Schema = use('Schema')

class TelekocsisTableSchema extends Schema {

  up () {
    this.drop('telekocsis', (table) => {
      table.increments()
      table.string('poster')
      table.string('fromm')
      table.string('to')
      table.string('when')
      table.string('seats')
      table.integer('price')
      table.string('contact')
      table.timestamps()
    })
  }

  down () {
    this.drop('telekocsis')
  }

}

module.exports = TelekocsisTableSchema
