'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

//Route.on('/').render('main')

Route.get('/', 'EloController.main'  );
Route.get('/user/createcommunity', 'EloController.createCommunity');             //create, edtit, delete COMMUNITY
Route.post('/user/createcommunity', 'EloController.createNewCommunity');
Route.get('/user/:id?/editcommunity', 'EloController.editCommunity');
Route.post('/user/:id?/editcommunity', 'EloController.editSubmitCommunity');
Route.get('/user/:id?/deletecommunity', 'EloController.deleteCommunity');


Route.get('/user/list', 'EloController.listOwnCummunities')

Route.get('/user/:id?/creatematch', 'EloController.createMatch');             //create MATCH
Route.post('/user/:id?/creatematch', 'EloController.createNewMatch');

Route.get('/user/:id?', 'EloController.showOwnCommunity');

Route.get('/community/list', 'EloController.listCommunities');
Route.get('/community/:id?', 'EloController.showCommunity');


Route.get('/register', 'UserController.register');
Route.post('/register', 'UserController.registerSubmit');
Route.get('/login', 'UserController.login');
Route.post('/login', 'UserController.loginSubmit');
Route.get('/logout', 'UserController.logout');
