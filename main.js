const	express = require('express'),
	crypto = require('crypto'),
	fs = require("fs"),
	http = require('http'),
	exec = require('child_process');
	
//var server = require('./skeleton');

var server = http.createServer(function(req, res) {

	//console.log(req.headers);
	
	var options = {
		host: "localhost",
		port: 80,
		path: req.url,
		headers: {
			'user-agent' : req.headers['user-agent'],
			'accept-charset' : req.headers['accept-charset']
		},
		method: req.method
	};
	
	if ( req.method == 'POST' ) {
		options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	}

	
	
	if(typeof req.headers['content-length'] !== 'undefined') {
		options.headers['content-length'] = req.headers['content-length'];
	}
	req.content = '';
	req.addListener('data', function(chunk) {
		req.content += chunk;
	});
	req.addListener('end', function() {
		var falsy = http.request(options, function(result) {
				res.writeHead(200, result.header);
				res.write(req.content);
				result.on('data', function(cont) {
					res.write(cont);
				});
				result.on('error', function(e) {
					console.log("Got error: " + e.message);
				});
				result.on('end', function() {
					console.log("end");
					res.end();
				});
		});
		falsy.end();
	});
}).listen(3000, '127.0.0.1');
