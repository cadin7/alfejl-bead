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
Route.get('/create', 'TelekocsiController.create').middleware('auth');
Route.post('/create', 'TelekocsiController.createNew').middleware('auth');
Route.get('/search', 'TelekocsiController.search');
Route.get('/browse', 'TelekocsiController.browse');
Route.get('/telekocsi/:id', 'TelekocsiController.show');
Route.get('/telekocsi/:id/edit', 'TelekocsiController.edit').middleware('auth');
Route.post('/telekocsi/:id/edit', 'TelekocsiController.editSubmit').middleware('auth');
Route.post('/telekocsi/:id/delete', 'TelekocsiController.delete').middleware('auth');
Route.post('/telekocsi/:id/reserv', 'TelekocsiController.reserv').middleware('auth');

Route.get('/mylist/:poster', 'TelekocsiController.mylist').middleware('auth');

Route.get('/register', 'UserController.register');
Route.post('/register', 'UserController.registerSubmit');
Route.get('/login', 'UserController.login');
Route.post('/login', 'UserController.loginSubmit');
Route.get('/logout', 'UserController.logout').middleware('auth');
Route.get('/profile/:id', 'UserController.profile').middleware('auth');
Route.get('/profile/:id/editprofile', 'UserController.edit').middleware('auth');
Route.post('/profile/:id/editprofile', 'UserController.editSubmit').middleware('auth');

//2. kieg

Route.get('/myfavorites/:poster', 'TelekocsiController.myfavorites').middleware('auth');
Route.post('/addToFavorites/:id', 'TelekocsiController.addToFavorites').middleware('auth');
Route.post('/telekocsi/:id/deleteFavorite', 'TelekocsiController.deleteFavorite').middleware('auth');

Route.group('ajax', function () {
  Route.delete('/telekocsi/:id/delete', 'TelekocsiController.ajaxDelete').middleware('auth')
  Route.post('/telekocsi/:id/reserv', 'TelekocsiController.ajaxReserv').middleware('auth');
  Route.get('/search', 'TelekocsiController.ajaxSearch')
  Route.post('/login', 'UserController.ajaxLogin')
  Route.post('/register', 'UserController.ajaxRegister')
}).prefix('/ajax');