'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    communities () {
        return this.hasMany('App/Model/Community')
    }

}

module.exports = Category
