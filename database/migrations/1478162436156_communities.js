'use strict'

const Schema = use('Schema')

class CommunitiesTableSchema extends Schema {
 up () {
    this.create('communities', (table) => {
      table.increments()
      table.string('name')
      table.string('owner')
      table.integer('category_id')
      table.string('category')
      table.timestamps()
    })
  }


  down () {
    this.drop('communities')
  }

}

module.exports = CommunitiesTableSchema
