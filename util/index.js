
var Encryption = require('node_triple_des');

function Util(){

    this.key = null ;

    this.setKey = function(key){
        this.key = key ;
    }

    this.encrypt = function(key,data,callback) {
        this.setKey(key);
        Encryption.encrypt(key,JSON.stringify(data)).then(callback).catch(function(e){
            console.log(e);
        })
    }
    this.decrypt = function (key,data,callback) {
        this.setKey(key);
        Encryption.decrypt(key,JSON.stringify(data)).then(callback).catch(function(e){
            console.log(e);
        });
    }
    return this;

}

module.exports = Util

