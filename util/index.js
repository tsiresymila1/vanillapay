
var Encryption = require('node_triple_des');

module.exports = function(){

    this.key = null ;

    this.setKey = function(key){
        this.key = key ;
    }

    this.encrypt = function (key,data) {
        this.setKey(key);
        return Encryption.encrypt(this.key,data);
    }
    this.decript = function (key,data) {
        this.setKey(key);
        return Encryption.decrypt(this.key,data);
    }

    return this;

}

