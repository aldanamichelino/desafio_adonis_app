'use strict'



/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Authentication
Route.post('register', 'AuthController.register');
Route.post('login', 'AuthController.login');
Route.get('logout', 'AuthController.logout');
Route.get('login', ({view}) => view.render('login'))
Route.get('register', ({view}) => view.render('register'))

Route.get('/home', async({request, view, session}) => {
    const user = session.get('user');
    return view.render('landing', {user})
}).middleware(['auth']);

Route.any('*', ({ view }) => view.render('/'))
