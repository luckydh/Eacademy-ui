import ls from './Storage'
import encryption from './Encryption'
import cookie from 'js-cookie'
var jwtDecode = require('jwt-decode')

let auth = new (function() {

    let permissions = () => {
        try {
            return encryption.decryptObject(cookie.get('_token')).permissions;
        } catch(e) {
            return null
        }
    }

    this.set = (payload) => {
        ls.set('account', payload.token);
        cookie.set('_token', payload.user);
    };

    this.get = () => {
        let lib = ls.get('account')
        return `${lib}`
    };

    this.user = () => {
        try {
            return encryption.decryptObject(cookie.get('_token'));
        } catch(e) {
            return null
        }
    };

    this.authenticated = () => {
        let data = ls.get('account');
        if(data == undefined) return false;
        try {
            var decoded = jwtDecode(data);
            data = encryption.decrypt(decoded.sub)
            return !isNaN(data)
        } catch(e) {
            return false;
        }
    };

    this.permissions = () => permissions();

    this.can = (p) => {
        p = p.replace(/\s/g, '').split(',');
        if(!p.length) return false;
        return p.some(r => permissions().indexOf(r) !== -1)
    };

    this.clear = () => {
        ls.clear()
    }
})

/*let auth = {
    set: (payload) => {
        ls.set('account', payload.token);
        ls.set('user', encryption.encryptObject(payload.user));
    },
    get: () => {
        let lib = ls.get('account')
        return `${lib}`
    },
    user: () => {
        try {
            return encryption.decryptObject(ls.get('user'));
        } catch(e) {
            return null
        }
    },
    authenticated: () => {
        let data = ls.get('account');
        if(data == undefined) return false;
        try {
            var decoded = jwtDecode(data);
            data = encryption.decrypt(decoded.sub)
            return !isNaN(data)
        } catch(e) {
            return false;
        }
    },
    permissions() {
        return []
    },
    can: (...p) => {
        console.log(a.set());
        if(!p.length) return false;
        return true;
        //return p.some(r => this.permissions().indexOf(r) !== -1).bind(this)
    },
    clear: () => {
        ls.clear()
    }
};*/

export default auth;
