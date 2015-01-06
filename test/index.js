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

	it('can rerout from "/" to "/hello/world"', function () {
		router.setReroutes({
			'/': '/hello/world'
		});
		var routed = router.parse('/');
		assert.equal(routed.controller, 'hello');
		assert.equal(routed.method, 'world');
	});

	it('can map parameters for a URI', function () {
		router.mapParams('/test/map/param1/param2/param3/');
		var routed = router.parse('/test/map/AAA/BBB/CCC/');
		assert.equal(routed.mappedParams.param1, 'AAA');
		assert.equal(routed.mappedParams.param2, 'BBB');
		assert.equal(routed.mappedParams.param3, 'CCC');
	});
	
	it('can catch a duplicate paramter map attemp', function () {
		try {
			router.mapParams('/test/map/param1/param2/param3/');
		} catch (e) {
			assert.equal(e.message, 'duplicateParameterMap');
		}
	});

	it('can map parameters for a URI without a trailing slash in both .mapParams() and parse URI', function () {
		router.mapParams('/test/mapNoSlash/param10/param20/param30');
		var routed = router.parse('/test/mapNoSlash/AAA/BBB/CCC');
		assert.equal(routed.mappedParams.param10, 'AAA');
		assert.equal(routed.mappedParams.param20, 'BBB');
		assert.equal(routed.mappedParams.param30, 'CCC');
	});

	it('can map parameters for a URI without a trailing slash in .mapParams()', function () {
		router.mapParams('/test/mapNoSlash2/param10/param20/param30');
		var routed = router.parse('/test/mapNoSlash2/AAA/BBB/CCC/');
		assert.equal(routed.mappedParams.param10, 'AAA');
		assert.equal(routed.mappedParams.param20, 'BBB');
		assert.equal(routed.mappedParams.param30, 'CCC');
	});

	it('can map parameters for a URI without a trailing slash in parse URI', function () {
		router.mapParams('/test/mapNoSlash3/param10/param20/param30/');
		var routed = router.parse('/test/mapNoSlash3/AAA/BBB/CCC');
		assert.equal(routed.mappedParams.param10, 'AAA');
		assert.equal(routed.mappedParams.param20, 'BBB');
		assert.equal(routed.mappedParams.param30, 'CCC');
	});

	it('can map access mapped params with less request parameters than predefined parameters', function () {
		router.mapParams('/test/map2/param10/param20/param30');
		var routed = router.parse('/test/map2/AAA');
		assert.equal(routed.mappedParams.param10, 'AAA');
		assert.equal(routed.mappedParams.param20, undefined);
		assert.equal(routed.mappedParams.param30, undefined);
		assert.equal(routed.params.length, 1);
	});

	it('can not map access mapped params wirh more request parameters than predefined parameters', function () {
		router.mapParams('/test/map3/param10/param20');
		var routed = router.parse('/test/map3/AAA/BBB/CCC/DDD');
		assert.equal(routed.mappedParams.param10, 'AAA');
		assert.equal(routed.mappedParams.param20, 'BBB');
		assert.equal(routed.mappedParams.param30, undefined);
		assert.equal(routed.params.length, 4);
	});

	it('can route /?test=true/ correctly', function () {
		router.setReroutes({});
		var routed = router.parse('/?test=true/');
		assert.equal(routed.controller, '/');
		assert.equal(routed.method, null);
	});

	it('can route /?test=true correctly', function () {
		router.setReroutes({});
		var routed = router.parse('/?test=true/');
		assert.equal(routed.controller, '/');
		assert.equal(routed.method, null);
	});

});
