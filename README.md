# Iranian Bill Detector
bill.js exposes a simple API for detect bill information
### Features
- Detect Bill information by `bill Id` and `bill Payment`
- Detect Bill information by `bill Barcode`

### Usage
```javascript
// bill id
billify.setId(8887858300146)

// bill payment
billify.setPeymentId(51350244)

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
Download and extract the [latest pre-built release](https://github.com/ali-master/billify/releases).

Just grab bill.js and include them with a script tag.
```javascript
<script src="bill.js"></script>
<script>
    var bill = new billify();
    bill.setId();
    bill.setPaymentId();
    var billResult = bill.getData();
</script>
```

### Contributors & Forks
> Contributors: [https://github.com/ali-master/billify/graphs/contributors](https://github.com/ali-master/billify/graphs/contributors)

> Forks: [https://github.com/ali-master/billify/network/members](https://github.com/ali-master/billify/network/members)
