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
    "params": []
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
    "params": [111, 222, 333]
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
    "params": []
}
*/
```

# APIs

### .setReroutes(rerouteRules [object])

Sets rerouting rules.

### .parse(uri [string])

Parses the given URI and returns an object.

# Test

`make test`
