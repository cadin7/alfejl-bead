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


Route.get('/', 'TelekocsiController.list');
Route.get('/create', 'TelekocsiController.create');
Route.post('/create', 'TelekocsiController.createNew');
Route.get('/search', 'TelekocsiController.search');
Route.get('/browse', 'TelekocsiController.browse');
Route.get('/telekocsi/:id', 'TelekocsiController.show');
Route.get('/telekocsi/:id/edit', 'TelekocsiController.edit');
Route.post('/telekocsi/:id/edit', 'TelekocsiController.editSubmit');
Route.post('/telekocsi/:id/delete', 'TelekocsiController.delete');

Route.get('/mylist/:poster', 'TelekocsiController.mylist');

Route.get('/register', 'UserController.register');
Route.post('/register', 'UserController.registerSubmit');
Route.get('/login', 'UserController.login');
Route.post('/login', 'UserController.loginSubmit');
Route.get('/logout', 'UserController.logout');
Route.get('/profile/:id', 'UserController.profile');
Route.get('/profile/:id/editprofile', 'UserController.edit');
Route.post('/profile/:id/editprofile', 'UserController.editSubmit');