'use strict'

const Lucid = use('Lucid')

class Community extends Lucid {
    static get rules () {
        return {
            name: 'required|unique:communities',            
            category_id: 'required',
        }        
    } 



    category () {
        return this.belongsTo('App/Model/Category')
    }

    user () {
        return this.belongsTo('App/Model/User')
    }

    match () {
        return this.hasMany('App/Model/Match')
    }

    player () {
        return this.hasMany('App/Model/Player')
    }
}

module.exports = Community
