'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
  static get rules () {
        return {
            username: 'required|unique:users',
            email: 'required|email|unique:users',
            firstname: 'required',
            lastname: 'required',
            password: 'required',
            password2: 'required|same:password',
        }        
    }


  community () {
        return this.hasMany('App/Model/Community')
    }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

}

module.exports = User
