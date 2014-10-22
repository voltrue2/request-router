# request-router

A router for HTTP/HTTPS request.

# Installation

`npm install request-router`

# How to use

```
var router = require('request-router');

var uri = '/aaa/bbb';
var routed = router(uri);
/*
{
    "uri": "/aaa/bbb"
    "controller": "aaa",
    "method": "bbb",
    "params": [],
    "mappedParams": {}
}
*/
```
```
var uri2 = '/ccc/ddd/111/222/333';
var routed2 = router(uri2);
/*
{
    "uri": "/aaa/bbb"
    "controller": "aaa",
    "method": "bbb",
    "params": [111, 222, 333],
    "mappedParams": {}
}
*/
```

# Rerouting

```
var router = reqiure('request-router');

router.setReroutes({
    '/reroute/me': 'routed/you'
});

var routed = router.parse('/reroute/me');
/*
{
    "uri": "/routed/you",
    "controller": "routed",
    "method": "you",
    "params": [],
    "mappedParams": {}
}
*/
```

# Predefined Paramter Map

`request-router` module allows you to predefine request paramters as a map for each request URI.

Example 1:

```
var router = require('request-router');

router.mapParams('/myController/myMethod/myParam1/myParam2');
// the above code defines the parameters for the request URI /myController/myMethod with.
// the parsed parameters will be named as myParam1 and myParam2.

// parsing the in-coming request URI
var parsed = router.parse('myController/myMethod/AAA/BBB');
/* parsed routed object
{
	controller: 'myController',
	method: 'myMethod',
	params: [
		'AAA',
		'BBB'
	],
	mappedParams: {
		myParam1: 'AAA',
		myParam2: 'BBB'
	}
}
*/
```

Example 2:

```
var router = require('request-router');

router.mapParams('/myController/myMethod/myParam1/myParam2');

// parsing the in-coming request URI
var parsed = router.parse('myController/myMethod/AAA');
/* parsed routed object
{
	controller: 'myController',
	method: 'myMethod',
	params: [
		'AAA'
	],
	mappedParams: {
		myParam1: 'AAA'
	}
}
*/
```

Example 3:

```
var router = require('request-router');

router.mapParams('/myController/myMethod/myParam1');

// parsing the in-coming request URI
var parsed = router.parse('myController/myMethod/AAA/BBB/CCC');
/* parsed routed object
{
	controller: 'myController',
	method: 'myMethod',
	params: [
		'AAA',
		'BBB',
		'CCC'
	],
	mappedParams: {
		myParam1: 'AAA'
	}
}
*/
```

# APIs

### .mapParams(paramterMapDefinitionURI [string])

Predefines parameters as a map for a request URI.

### .setReroutes(rerouteRules [object])

Sets rerouting rules.

### .parse(uri [string])

Parses the given URI and returns an object.

# Test

`make test`
