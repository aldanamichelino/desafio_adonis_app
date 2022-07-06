'use strict';

const User = use('App/Models/User');

class AuthController {

    async register({request, auth, response, session}){
        try{
            const user = await User.create(request.all());
            session.put('user', user.email);
            response.route('/');

        } catch(error) {
            throw new Error(JSON.stringify(error.message));
        }
    }

    async login({request, auth, response, session}){
        try{
            const {email, password} = request.all();
            
            if (await auth.attempt(email, password, true)) {
                const user = await User.findBy('email', email);
                session.put('user', user.email);
                response.route('/home');
              }

        } catch(error) {
            console.log(error.message);
            throw new Error(JSON.stringify(error.message));
        }
    }

    async logout({request, auth, response, session}){
        try{
            await auth.logout();
            session.forget('user');
            response.redirect('/');
        } catch (error) {
            console.log(error.message);
            throw new Error(JSON.stringify(error.message));
        }
    }
        
}

module.exports = AuthController
