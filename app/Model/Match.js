'use strict'

const Lucid = use('Lucid')

class Match extends Lucid {
    static get rules () {
        return {
            player1: 'required',
            player2: 'required',
            result: 'required',
            date: 'required|date'
        }        
    } 

    communities () {
        return this.belongsTo('App/Model/Community')
    }
}

module.exports = Match
