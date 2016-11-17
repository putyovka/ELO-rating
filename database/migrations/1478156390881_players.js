'use strict'

const Schema = use('Schema')

class PlayersTableSchema extends Schema {

  up () {
    this.create('players', (table) => {
      table.increments()
      table.string('name')
      table.integer('elo')
      table.integer('community_id')
      table.string('category')
      table.timestamps()
    })
  }

  down () {
    this.drop('players')
  }

}

module.exports = PlayersTableSchema
