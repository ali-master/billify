# Iranian Bill Detector
bill.js exposes a simple API for detect bill information.

[![npm version](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/billify)
[![npm](https://img.shields.io/npm/l/express.svg?style=flat-square)](https://www.npmjs.com/package/billify)
[![npm downloads](https://img.shields.io/npm/dt/express.svg?style=flat-square)](https://www.npmjs.com/package/billify)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square)](https://gitter.im/billify/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

### Features
- Detect Bill information by `bill Id` and `bill Payment`
- Detect Bill information by `bill Barcode`

### Usage
- *Import This package into you'r project*
```javascript
// ES6
import billify from "billify";

// RequireJS
var billify = require('billify');

// Define
define(['billify'], function(){
    // some you'r code...
});
```

### Callback functions
```javascript
// set bill id in prototype function of billify
billify.setId(8887858300146)

// set bill payment in prototype function of billify
billify.setPeymentId(51350244)

// set billId and billPaymentId in constructor of billify
billify(8887858300146, 51350244);

// set config
billify.setConfig({
    // Rial OR Toman
    currency: "Rial"
    // Farsi OR English
    lang: "en", // value just: fa or en
    // convert numbers from english to farsi and reverse
    EnToFa: true, // value just: true or false
});

// If You want to find Bill Information from Barcode, you can use this fuature
// bill set Barcode with 26 length
billify.setBarcode(88878583001460000051650244);
// and use this prototype for find and get bill information
billify.findByBarcode();

// bill get amount
billify.getBillAmount();

// bill get type
billify.getBillType();

// bill get Barcode
billify.getBarcode();

// verification Bill Id
// return true or false
billify.verificationBillId();

// verification Bill Payment
// return true or false
billify.verificationBillPayment();

// verification bill[id and payment]
billify.verificationBill();

// get all data of bill
// return object
billify.getData();
```

### Installation
##### Method One:
Download and extract the [latest pre-built release](https://github.com/ali-master/billify/releases).

Just grab billify.min.js and include them with a script tag.
```javascript
<script src="billify.min.js"></script>
<script>
    // set billId and billPaymentId in prototype functions of billify
    var bill = new billify();
    bill.setId(8887858300146);
    bill.setPaymentId(51350244);
    var billResult = bill.getData();

    // set billId and billPaymentId in constructor of billify
    var bill = new billify(8887858300146, 51350244);
    var billResult = bill.getData();
</script>
```

##### Method Two:
installation with NPM
```sh
$ npm install billify
```

### Contributors & Forks
> Contributors: [https://github.com/ali-master/billify/graphs/contributors](https://github.com/ali-master/billify/graphs/contributors)

> Forks: [https://github.com/ali-master/billify/network/members](https://github.com/ali-master/billify/network/members)

You can try out the Node package online at [tonicdev](https://runkit.com/alimaster/billify)
