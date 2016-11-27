/**
 * @return object
 * @ref http://www.chargereseller.com/files/chargereseller-bill-validation-document.pdf
 */
"use strict"
// billify.js
var billify = function () {
	this._barcode = null;
	this._currency = "toman";
	this._lang = "en";
	this._EnToFa = false;
	this._billTypes = {
		"en": {
			1: "water",
			2: "power",
			3: "gas",
			4: "telphone",
			5: "mobile",
			6: "municipality",
		},
		"fa": {
			1: "آب",
			2: "برق",
			3: "گاز",
			4: "تلفن",
			5: "تلفن همراه",
			6: "شهرداری",
		}
	}

	if(arguments[0] && arguments[1]){
		this.setId(arguments[0]);
		this.setPeymentId(arguments[1]);
	}
};

billify.prototype.version = "1.2.5";
billify.prototype.setConfig = function(options) {
	var options = options || {};

	this._currency = options.currency.toLocaleLowerCase() == "rial" ? "rial" : "toman";
	this._lang = options.lang.toLocaleLowerCase() == "fa" ? "fa" : "en";
	this._EnToFa = options.EnToFa == true ? true : false;
};
billify.prototype.setId = function(billId) {
	var billId = billId || null;
	this._billId = billId;
};
billify.prototype.setPeymentId = function(billPayment) {
	var billPayment = billPayment || null;
	this._billPayment = billPayment;
};
billify.prototype.setPeymentId = function(billPayment) {
	var billPayment = billPayment || null;
	this._billPayment = billPayment;
};
billify.prototype.setBarcode = function(barcode) {
	var barcode = barcode || null;
	this._barcode = barcode;
};

billify.prototype.getBillAmount = function() {
	var currency = (this._currency == "rial") ? 1000 : 100;
	var amount = parseInt(this._billPayment.toString().slice(0, -5)) * currency;

	return (this._EnToFa == true ? this._digitsEn2Fa(amount) : amount) || "undefined";
}
billify.prototype.getBillType = function() {
	var billLangType = (this._lang == "fa") ? this._billTypes.fa : this._billTypes.en;
	return billLangType[this._billId.toString().slice(-2, -1)] || "undefined";
};

billify.prototype.getBarcode = function() {
	var width = 13;
	var padding = "0";

	var billPayment = this._billPayment.toString();
	var lpadBillPayment = billPayment;

	if (billPayment.length < width) lpadBillPayment = padding.repeat(width - billPayment.length) + billPayment;

	return (this._billId + "" + lpadBillPayment) || "undefined";
};
billify.prototype.findByBarcode = function() {
	if(this._barcode != null) {
		this._billId = this._barcode.substr(0, 13);
		this._billPayment = parseInt(this._barcode.split(this._billId)[1]);
	}
};

billify.prototype.verificationBillPayment = function() {
	return this._verification(this._billPayment.toString().slice(0, -2), this._billPayment.toString().substr(-2, 1));
};
billify.prototype.verificationBillId = function() {
	return this._verification(this._billId.toString().slice(0, -1), this._billId.toString().slice(-1));
};
billify.prototype.verificationBill = function() {
	if(this.verificationBillPayment() == true && this.verificationBillId() == true)
		return true;
	else
		return false;
};
billify.prototype._verification = function(sum, checkId) {
	var totalSum = 0;
	var status = 0;
	var sum = sum || null;
	var checkId = checkId || null;

	var stringToArray = sum.split('').reverse().join('').split('');

	stringToArray.forEach(function(value, index){
		totalSum += (2 + index % 6) * parseInt(value);
	});

	var modify = totalSum % 11;

	status = (modify < 2) ? 0 : 11 - modify;
	return (status == parseInt(checkId)) ? true : false;
};
billify.prototype._digitsEn2Fa = function(number) {
	return number.toString().replace(/\d/g, function(dist){
		return String.fromCharCode(dist.charCodeAt(0) + 1728);
	});
};
billify.prototype.getData = function() {
	return {
		// مبلغ قبض
		"amount": (this._EnToFa == true) ? this._digitsEn2Fa(this.getBillAmount()) : this.getBillAmount(),

		// نوع قبض
		"type": this.getBillType(),

		// بارکد قبض
		"barcode": (this._EnToFa == true) ? this._digitsEn2Fa(this.getBarcode()) : this.getBarcode(),

		// صحت ارتباط شناسه قبض و پرداخت
		"validationBill": this.verificationBill(),

		// صحت شناسه قبض
		"verificationBillId": this.verificationBillId(),

		// صحت شناسه پرداخت
		"verificationBillPayment": this.verificationBillPayment(),

		"configs": {
			// واحد پولی
			"currency": this._currency,
			"lang": this._lang,
			"EnToFa": this._EnToFa
		}
	};
}

if (typeof module != 'undefined' && module.exports && this.module !== module) {
	module.exports = billify;
}else if (typeof define === 'function' && define.amd) {
	define(billify);
}
