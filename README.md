# VanillaPay

For using vanilla pay NodeJs Module

*Inside your project folder run*

```
$ npm install vanillapay
```

```js

var Payment = require('vanillapay');
// get Paiment instance.
var payment = new Payment(your_site_url,client_id,client_secret,public_key,private_key);

```

*To unit payment processing*

```js

payment.initPaie(idpanier,montant,nom,reference,adresseip,(idpayment){
    //idpaiement is your payment id (crypted) and you need it to get payment result
    console.log(idpayment);
});
//You will be redirect to VanillaPay payment and  follow it ;

```

*To get payment result* ;

```js

//Getting payment result
payment.resultPaie(idpayment,(result){
    console.log(result);
});
```

**Digi-Talent**

