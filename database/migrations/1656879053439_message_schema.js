'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('lastName').notNullable()
      table.string('age').notNullable()
      table.string('nickname').notNullable()
      table.string('avatar').notNullable()
      table.string('text').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessageSchema
