
var Encryption = require('node_triple_des');

module.exports = function(){

    this.key = null ;

    function setKey(key){
        this.key = key ;
    }

    function encrypt(key,data) {
        this.setKey(key);
        return Encryption.encrypt(this.key,data);
    }
    function decript(key,data) {
        this.setKey(key);
        return Encryption.decrypt(this.key,data);
    }

}

