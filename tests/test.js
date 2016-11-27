QUnit.test("billify", function(assert) {
	function billTest(billId, billPayment, expected) {
		var bill = new billify();
		bill.setId(billId)
		bill.setPeymentId(billPayment)
		assert.equal(bill.getData().amount, expected);
	}
	billTest(2813823309056, 25143031, 25100);
	billTest(2813823309056, 18143115, 18100);
	billTest(2813823309056, 38743208, 38700);
	billTest(2813823309056, 74952182, 74900);
	billTest(2813823309056, 11652243, undefined);
	billTest(7106329993556, 78850759, 78800);
});
