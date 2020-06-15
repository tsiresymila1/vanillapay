
/*
    VanillaPay NodeJS module
    by Digi-Talent
*/
var request = require('request');
var datetime = require('node-datetime');
var Util = new require('../util')();

module.exports = function (site_url, client_id, client_secret, public_key, private_key) {

    var URL_AUTH = "https://pro.ariarynet.com/oauth/v2/token";
    var URL_PAIEMENT = "https://pro.ariarynet.com/api/paiements";
    var URL_RESULTAT = "https://pro.ariarynet.com/api/resultats";
    var URL_PAIE = "https://moncompte.ariarynet.com/paiement/";
    var URL_RESULT_PAIE = "https://moncompte.ariarynet.com/paiement_resultat";

    this.public_key = public_key;
    this.private_key = private_key;
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.site_url = site_url;
    this.token = null;

    this.getAccess=function (callback) {
        if (this.token != null) {
            if (callback) callback(this.token);
            return;
        };
        var params = {
            client_id: this.client_id,
            client_secret: this.client_secret,
            grant_type: 'client_credentials'
        };
        request.post({ url: URL_AUTH, form: params }, function (err, httpResponse, body) {
            if (err) return err;
            var json_result = JSON.parse(body);
            this.token = json_result.access_token;
            if (callback) callback(this.token);
        });
    }

    this.send=function (url, params, callback, errorcallback) {
        this.getAccess(function (token) {
            Util.encrypt(public_key, params,function(crypt_params){
                console.log(crypt_params);
                var headers = {
                    'Authorization': "Bearer " + token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
                var parms = {
                    "site_url": this.site_url,
                    "params": crypt_params
                };
                request.post({ headers: headers, url: url, form: parms }, function (err, response, json) {
                    console.log("Error :" +err)
                    console.log("Response:" +response)
                    console.log("Body :" +json)
                    if (err) return err;
                    var error = JSON.parse(json);
                    if (!error.error){
                        if(errorcallback){errorcallback(error.error_message);return;}
                    }
                    else {
                        Util.encrypt(this.private_key, JSON.stringify(json),function(result){
                            console.log(result);
                            if (callback) callback(result)
                        });
                    }
                    ;
                });
            });
        });
    }

    this.initPaie = function (idpanier, montant, nom, reference, adresseip, callback,errorcallback) {
        var params = {
            "unitemonetaire": "Ar",
            "adresseip": adresseip,
            "date": datetime.create().format('Y-m-d H:M:S'),
            "idpanier": idpanier,
            "montant": montant,
            "nom": nom,
            "reference": reference
        };
        this.send(URL_PAIEMENT, params, function (idpaiement) {
            if (callback) callback(idpaiement);
            request({ url: URL_PAIE + idpaiement, followAllRedirects: true, followOriginalHttpMethod: true }, function (err, response, body) {
                if (err) return err;
            });
        },function(error){
                if(errorcallback) errorcallback();
            });
    }

    this.resultPaie = function (crypedidpaiement, callback,errorcallback) {
        Util.decrypt(this.private_key, crypedidpaiement,function(idpaiement){
            var params = {
                "idpaiement": idpaiement
            };
            this.send(URL_RESULT_PAIE, params, function (result) {
                if (callback) callback(result);
            },function(error){
                if(errorcallback) errorcallback();
            });
        });
        
    }
    return this
}