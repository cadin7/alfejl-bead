'use strict'

const Schema = use('Schema')

class FavoritesTableSchema extends Schema {

  up () {
    this.create('favorites', (table) => {
      table.increments()
      table.integer('telekocsi_id')
      table.string('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('favorites')
  }

}

module.exports = FavoritesTableSchema
