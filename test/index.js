var assert = require('assert');

describe('request-router', function () {

	var router = require('../');
	router.setReroutes({
		'/reroute/me': '/routed/me'
	});

	it('can parse "/"', function () {
		var routed = router.parse('/');
		assert.equal(routed.uri, '/');
	});

	it('can parse "/aaa"', function () {
		var routed = router.parse('/aaa');
		assert.equal(routed.uri, '/aaa');
		assert.equal(routed.controller, 'aaa');
		assert.equal(routed.method, null);
	});

	it('can parse "/aaa/bbb/"', function () {
		var routed = router.parse('/aaa/bbb/');
		assert.equal(routed.uri, '/aaa/bbb');
		assert.equal(routed.controller, 'aaa');		
		assert.equal(routed.method, 'bbb');		
		assert.equal(routed.params.length, 0);		
	});

	it('can parse "/aaa/bbb"', function () {
		var routed = router.parse('/aaa/bbb');
		assert.equal(routed.uri, '/aaa/bbb');
		assert.equal(routed.controller, 'aaa');		
		assert.equal(routed.method, 'bbb');		
		assert.equal(routed.params.length, 0);		
	});

	it('can parse "/aaa//bbb"', function () {
		var routed = router.parse('/aaa//bbb');
		assert.equal(routed.uri, '/aaa/bbb');
		assert.equal(routed.controller, 'aaa');		
		assert.equal(routed.method, 'bbb');		
		assert.equal(routed.params.length, 0);		
	});

	it('can parse "//aaa/bbb"', function () {
		var routed = router.parse('//aaa/bbb');
		assert.equal(routed.uri, '/aaa/bbb');
		assert.equal(routed.controller, 'aaa');		
		assert.equal(routed.method, 'bbb');		
		assert.equal(routed.params.length, 0);		
	});

	it('can parse "//aaa//bbb"', function () {
		var routed = router.parse('//aaa//bbb');
		assert.equal(routed.uri, '/aaa/bbb');
		assert.equal(routed.controller, 'aaa');		
		assert.equal(routed.method, 'bbb');		
		assert.equal(routed.params.length, 0);		
	});

	it('can parse "/aaa/bbb/?test=1"', function () {
		var routed = router.parse('/aaa/bbb/?test=1');
		assert.equal(routed.uri, '/aaa/bbb');
		assert.equal(routed.controller, 'aaa');		
		assert.equal(routed.method, 'bbb');		
		assert.equal(routed.params.length, 0);		
	});

	it('can parse "/aaa/bbb?test=1"', function () {
		var routed = router.parse('/aaa/bbb?test=1');
		assert.equal(routed.uri, '/aaa/bbb');
		assert.equal(routed.controller, 'aaa');		
		assert.equal(routed.method, 'bbb');		
		assert.equal(routed.params.length, 0);		
	});
	
	it('can parse "/aaa/bbb/111/222/333/4.4/5,5"', function () {
		var routed = router.parse('/aaa/bbb/111/222/333/4.4/5,5');
		assert.equal(routed.uri, '/aaa/bbb');
		assert.equal(routed.controller, 'aaa');		
		assert.equal(routed.method, 'bbb');		
		assert.equal(routed.params[0], 111);		
		assert.equal(routed.params[1], 222);		
		assert.equal(routed.params[2], 333);		
		assert.equal(routed.params[3], 4.4);		
		assert.equal(routed.params[4], '5,5');		
	});
	
	it('can parse "/aaa/bbb/111/222//333/4.4/5,5"', function () {
		var routed = router.parse('/aaa/bbb/111/222/333/4.4/5,5');
		assert.equal(routed.uri, '/aaa/bbb');
		assert.equal(routed.controller, 'aaa');		
		assert.equal(routed.method, 'bbb');		
		assert.equal(routed.params[0], 111);		
		assert.equal(routed.params[1], 222);		
		assert.equal(routed.params[2], 333);		
		assert.equal(routed.params[3], 4.4);		
		assert.equal(routed.params[4], '5,5');		
	});
	
	it('can parse "/aaa/bbb/111/222/333/4.4/5,5/"', function () {
		var routed = router.parse('/aaa/bbb/111/222/333/4.4/5,5/');
		assert.equal(routed.uri, '/aaa/bbb');
		assert.equal(routed.controller, 'aaa');		
		assert.equal(routed.method, 'bbb');		
		assert.equal(routed.params[0], 111);		
		assert.equal(routed.params[1], 222);		
		assert.equal(routed.params[2], 333);		
		assert.equal(routed.params[3], 4.4);		
		assert.equal(routed.params[4], '5,5');		
	});
	
	it('can parse "/aaa/bbb/111/222/333/4.4/5,5/?test=1"', function () {
		var routed = router.parse('/aaa/bbb/111/222/333/4.4/5,5/?test=1');
		assert.equal(routed.uri, '/aaa/bbb');
		assert.equal(routed.controller, 'aaa');		
		assert.equal(routed.method, 'bbb');		
		assert.equal(routed.params[0], 111);		
		assert.equal(routed.params[1], 222);		
		assert.equal(routed.params[2], 333);		
		assert.equal(routed.params[3], 4.4);		
		assert.equal(routed.params[4], '5,5');		
	});
	
	it('can parse "/aaa/bbb/111/222/333/4.4/5,5?test=1"', function () {
		var routed = router.parse('/aaa/bbb/111/222/333/4.4/5,5?test=1');
		assert.equal(routed.uri, '/aaa/bbb');
		assert.equal(routed.controller, 'aaa');		
		assert.equal(routed.method, 'bbb');		
		assert.equal(routed.params[0], 111);		
		assert.equal(routed.params[1], 222);		
		assert.equal(routed.params[2], 333);		
		assert.equal(routed.params[3], 4.4);		
		assert.equal(routed.params[4], '5,5');		
	});

	it('can reroute from "/reroute/me" to "/routed/me"', function () {
		var routed = router.parse('/reroute/me');
		assert.equal(routed.uri, '/routed/me');
		assert.equal(routed.controller, 'routed');
		assert.equal(routed.method, 'me');
	});

	it('can reroute from "/reroute/me/111/222/333/4.4/5,5" to "/routed/me/111/222/333/444/5,5"', function () {
		var routed = router.parse('/reroute/me/111/222/333/4.4/5,5');
		assert.equal(routed.uri, '/routed/me');
		assert.equal(routed.controller, 'routed');
		assert.equal(routed.method, 'me');
		assert.equal(routed.params[0], 111);		
		assert.equal(routed.params[1], 222);		
		assert.equal(routed.params[2], 333);		
		assert.equal(routed.params[3], 4.4);		
		assert.equal(routed.params[4], '5,5');		
	});

});
