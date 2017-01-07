'use strict'

const Lucid = use('Lucid')

class Favorite extends Lucid {
    telekocsis () {
    return this.hasMany('App/Model/Telekocsi')
  }

  users () {
    return this.hasMany('App/Model/User')
  }
}

module.exports = Favorite
