const	express = require('express'),
	crypto = require('crypto'),
	fs = require("fs"),
	http = require('http'),
	exec = require('child_process'),
	querystring = require('querystring'),
	jsdom = require('jsdom');



var server = http.createServer(function(req, res) {
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
	
	if(typeof req.headers['content-length'] !== 'undefined') {
		options.headers['content-length'] = req.headers['content-length'];
	}
	
	req.content = '';
	req.postData = '';
	
	req.addListener('data', function(chunk) {
		if ( req.method == 'POST' ) {
			req.postData += chunk;
			return ;
		} // endif
		
		req.content += chunk;
	});
	req.addListener('end', function() {
		if ( req.method == 'POST' ) {
			options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		} // endif
		
		var proxy = http.request(options, function(result) {
				var html = '';
				var isHtml = 'undefined' !== result.headers['content-type'] && 'text/html' == result.headers['content-type'];
			
				res.writeHead(200, result.header);
				res.write(req.content);
				
				result.on('data', function(cont) {
					html += cont;
				});
				
				result.on('error', function(e) {
					console.log("Got error: " + e.message);
				});
				
				result.on('end', function() {
					switch (result.headers['content-type']) {
					
						case 'text/html':
	                        var dom = jsdom.jsdom(html);
	                        var window = dom.createWindow();
	                        window.console = console;
	                        window.run(require('fs').readFileSync('jquery.js', 'utf-8'));
	                        window.run('$("title").html("Kopytko");');
	                        window.run('console.log($("title").html());');
	                        
	                        html = window.document.innerHTML;
							
							require('./minify-html')(req, result, html, function( html ){
								res.write(html);
	    						console.log("end");
		     					res.end();
							});
							break;
						/*
						case 'application/javascript':
							require('./minify-js')(req, result, html, function( html ){
								res.write(html);
	    						console.log("end");
		     					res.end();
							});
							break;*/
						case 'text/css':
							require('./minify-js')(req, result, html, function( html ){
								res.write(html);
	    						console.log("end");
		     					res.end();
							});
							break;
							
						default:
							res.write(html);
    						console.log("end");
	     					res.end();
					}
				});
		});
		
		if ( req.method == 'POST' ) {
			proxy.write( req.postData );
		}

		proxy.end();
	});
}).listen(3000, '127.0.0.1');
