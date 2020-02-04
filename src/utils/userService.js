/** this file handles the client side user business 
 * you do not want to polute your your components with fetch calls
*/
import tokenService from './tokenService';

const BASE_URL = '/api/users';

// this sends the user to the server and gets back the token.
function signup(user) {
    return fetch(BASE_URL + '/signup', {
        method: "POST",
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(user)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Email already exists');
    })
    .then(({token}) => tokenService.setToken(token));
}

function getUser() {
    return tokenService.getUserFromToken();
}

function logout() {
    tokenService.removeToken();
}

function login(user) {
    return fetch(BASE_URL + '/login', {
        method:'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(user)
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error('Bad Credentials');
    }).then(({token}) => 
        tokenService.setToken(token)
    );
}

export default {
    signup,
    getUser,
    logout,
    login, 
};