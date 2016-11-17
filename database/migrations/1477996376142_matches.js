'use strict'

const Schema = use('Schema')

class MatchesTableSchema extends Schema {

  up () {
    this.create('matches', (table) => {
      table.increments()
      table.string('player1')
      table.string('player2')
      table.integer('result')
      table.date('date')
      table.string('community') 
      table.timestamps()
    })
  }

  down () {
    this.drop('matches')
  }

}
 
module.exports = MatchesTableSchema
