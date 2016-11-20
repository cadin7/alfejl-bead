'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    telekocsis () {
    return this.hasMany('App/Model/Telekocsi')
  }
}

module.exports = Category
