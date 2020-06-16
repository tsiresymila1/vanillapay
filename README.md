# VanillaPay

For using vanilla pay NodeJs Module

*Inside your project folder run*

```
$ npm install --save vanillapay
```

```js

var VanillaPay = require('vanillapay');
// get Paiment instance.
var vanillapay = new VanillaPay(your_site_url,client_id,client_secret,public_key,private_key);

```

*To unit payment processing*

```js

vanillapay.initPaie(idpanier,montant,nom,reference,adresseip,function(idpayment){
    //idpaiement is your payment id (crypted) that you need if you want to get payment result
    console.log(idpayment);
},function(error){
    console.log(error);
});
//You will be redirect to VanillaPay payment and  follow it ;

```

*To get payment result* ;

```js

//Getting payment result
vanillapay.resultPaie(idpayment,(result){
    console.log(result);
},function(error){
    console.log(error);
});
```

**Digi-Talent**

