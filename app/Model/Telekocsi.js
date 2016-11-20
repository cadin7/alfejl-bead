'use strict'

const Lucid = use('Lucid')

class Telekocsi extends Lucid {
    static get rules () {
        return {
            category_id: 'required',
            fromm: 'required|unique:telekocsis',
            to: 'required|unique:telekocsis',
            when: 'required',
            seats: 'required',
            price: 'required',
            contact: 'required'            
        }        
    }      

    category () {
        return this.belongsTo('App/Model/Category')
    }
}

module.exports = Telekocsi
