
/*
    VanillaPay NodeJS module
    by Digi-Talent
*/
var request = require('request');
var datetime = require('node-datetime');
var Util = require('../util');

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

    this.getAccess = function (callback) {
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
            var json_result = JSON.decode(body);
            this.token = json_result.access_token;
            if (callback) callback(this.token);
        });
    }

    this.send = function (url, params, callback, errorcallback) {
        var crypt_params = Util.encrypt(this.public_key, params);
        this.getAccess(function (token) {
            var headers = {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            var parms = {
                "site_url": this.site_url,
                "params": crypt_params
            };
            request.post({ headers: headers, url: URL_AUTH, form: parms }, function (err, response, json) {
                if (err) return err;
                var error = JSON.decode(json);
                if (error.error) return error.error;
                var result = Util.encrypt(this.private_key, json);
                if (callback) callback(result);
            });
        });
    }

    this.initPaie = function (idpanier, montant, nom, reference, adresseip, callback) {
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
        });
    }

    this.resultPaie = function (crypedidpaiement, callback) {
        var idpaiement = Util.decrypt(this.private_key, crypedidpaiement);
        var params = {
            "idpaiement": idpaiement
        };
        this.send(URL_RESULT_PAIE, params, function (result) {
            if (callback) callback(result);
        });
    }
    return this
}