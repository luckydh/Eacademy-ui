let CryptoJS = require('crypto-js')
var iv = CryptoJS.lib.WordArray.random(128/8);
import config from './Config'

let encryption = {
    /** Encrypt String **/
    encrypt: (value) => {
        try {
            let cipher = CryptoJS.AES.encrypt(String(value), config.APP_KEY, {iv: iv});
            return cipher.toString()
        } catch(e) {
            return null
        }
    },

    /** Decrypt String **/
    decrypt: (value) => {
        try {
            let bytes = CryptoJS.AES.decrypt(value, config.APP_KEY);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch(e) {
            return null
        }
    },

    /** Encrypt Object **/
    encryptObject: (value) => {
        if(value !== undefined) return CryptoJS.AES.encrypt(JSON.stringify(value), config.APP_KEY).toString()
    },

    /** Decrypt Object **/
    decryptObject: (value) => {
        try {
            let bytes = CryptoJS.AES.decrypt(value, config.APP_KEY);
            let text_string = bytes.toString(CryptoJS.enc.Utf8);
            return JSON.parse(text_string)
        } catch (e) {
            return null
        }
    }
};

export default encryption
