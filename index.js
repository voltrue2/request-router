// format: { "/aaa/bbb": "/ccc/ddd" } => this reroutes /aaa/bbb to /ccc/dddd
var reroutes = {};
// format: { "controller": "myController", "method": "myMethod", paramMap: [ "param1", "param2" ] }
var paramMap = {};

// mapParams('/myController/myMethod/param1/param2/'); => 
// { "controller": "myController", "method": "myMethod", paramMap: [ "param1", "param2" ] }
module.exports.mapParams = mapParams;

module.exports.setReroutes = setReroutes;

module.exports.parse = parse;

function mapParams(uri) {
	var parsed = parse(uri);
	if (paramMap[parsed.controller] && paramMap[parsed.controller][parsed.method]) {
		throw new Error('duplicateParameterMap');
	}
	if (!paramMap[parsed.controller]) {
		paramMap[parsed.controller] = {};
	}
	paramMap[parsed.controller][parsed.method] = parsed.params;
}

function setReroutes(reroutesIn) {
	reroutes = reroutesIn;
}

function parse(uri) {

	// if URI is root (/)
	if (uri === '/') {
		if (reroutes[uri]) {
			// there is reroute
			return parse(reroutes[uri]);
		}
		return createParsed(uri, null, null);
	}	

	// remove GET queries if present
	var index = uri.indexOf('?');
	if (index !== -1) {
		uri = uri.substring(0, index);
	}
	
	// trim front slashes
	if (uri[0] === '/') {
		uri = uri.substring(1);
	}
	
	// trim traling slash
	if (uri[uri.length - 1] === '/') {
		uri = uri.substring(0, uri.length - 1);
	}

	// now separate in chuncks
	var sep = uri.split('/');
	var controller;
	var method;
	var params = [];
	for (var i = 0, len = sep.length; i < len; i++) {
		if (sep[i] && !controller) {
			controller = sep[i];
			continue;
		}
		if (sep[i] && !method) {
			method = sep[i];
			continue;
		}
		if (sep[i] && controller && method) {
			var value = getValue(sep[i]);
			params.push(value);
		}
	}

	var parsed = createParsed(controller, method, params);

	// check for reroutes
	var reroute = reroutes[parsed.uri];

	if (reroute) {
		// we need reroute
		return parse(reroute + '/' + parsed.params.join('/'));
	}

	return parsed;
}

function createParsed(controller, method, params) {
	return {
		uri: (controller === '/' ? controller : '/' + controller) + (method ? '/' + method : ''),
		controller: controller || null,
		method: method || null,
		params: params || [],
		mappedParams: createMappedParams(controller, method, params) || {}
	};
}

function createMappedParams(controller, method, params) {
	if (paramMap[controller] && paramMap[controller][method]) {
		var mapList = paramMap[controller][method];
		var map = {};
		for (var i = 0, len = mapList.length; i < len; i++) {
			map[mapList[i]] = params[i];
		}
		return map;
	}
	return null;
}

function getValue(value) {

	if (!isNaN(value)) {
		// number
		if (value.indexOf('.') === -1) {
			value = parseInt(value, 10);
		} else {
			value = parseFloat(value, 10);
		}
	}
	
	return value;
}
