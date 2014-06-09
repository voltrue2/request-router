// format: { "/aaa/bbb": "/ccc/ddd" } => this reroutes /aaa/bbb to /ccc/dddd
var reroutes = {};

module.exports.setReroutes = setReroutes;

module.exports.parse = parse;

function setReroutes(reroutesIn) {
	reroutes = reroutesIn;
}

function parse(uri) {

	// if URI is root (/)
	if (uri === '/') {
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
		params: params || []
	};
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
