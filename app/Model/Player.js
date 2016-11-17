'use strict'

const Lucid = use('Lucid')

class Player extends Lucid {
    communities () {
        return this.belongsTo('App/Model/Community')
    }

}

module.exports = Player
