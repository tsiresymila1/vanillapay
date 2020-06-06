# VanillaPay

For using vanilla pay NodeJs Module

*Inside your project folder run*

```
$ npm install vanillapay
```

```js
var Payment = require('vanillapay');
// get Paiment instance.
var payment = Payment(your_site_url,client_id,client_secret,public_key,private_key);

```

*To unit payment processing*

```js
var Paiement = require('vanilla');
// Get all parameters in  pro.vanillapay.mg.
var payment = Payment(your_site_url,your_client_id,your_client_secret,your_public_key,your_private_key);
/*
@idpanier
@montant
@nom
@reference
@adresseip
@callback , you will getidpayment of your payment
*/
payment.initPaie(idpanier,montant,nom,reference,adresseip,(idpayment){
    //idpaiement is your payment id (crypted) and you need it to get payment result
    console.log(idpayment);
});
//You will be redirect to VanillaPay payment and  follow it ;
```

*To get payment result* ;

```js
var Paiement = require('vanilla');
// get Paiment instance.
var payment = Payment(your_site_url,your_client_id,your_client_secret,your_public_key,your_private_key);

/*
@idpanier
@montant
@nom
@reference
@adresseip
@callback , you will getidpayment of your payment
*/

payment.initPaie(idpanier,montant,nom,reference,adresseip,(idpayment){
    //idpaiement is your payment id (crypted) and you need it to get payment result
    console.log(idpayment);
});

//Getting payment result
payment.resultPaie(idpayment,(result){
    console.log(result);
});

```