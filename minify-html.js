var fs = require('fs'),
    path = require("path"),
    exec = require('child_process').exec;

function readFromCache( file, html )
{
	console.log(file, path.existsSync( file ) )
	
	if ( path.existsSync( file ) ) {
		console.log('odczyt z cache: '+file);
		html = fs.readFileSync( file );
	}

	return html;
}


module.exports = function(request, result, html, callback)
{
	var file = '../cache/'+request.url.replace(/\//g, '_');
	
	if ( path.exists( file ) ) {
		console.log('JEST CACHE')
		return callback( readFromCache( file, html ) );
	} else {
		var fHandle = fs.createWriteStream(file, {'flags': 'a'});
		fHandle.write(html);
		var cmd = 'java -jar ./htmlcompressor/bin/htmlcompressor-1.5.2.jar '+file+' -o '+file;
		exec(cmd, function(error, stdout, stderr){
			if ( error ) {
				return console.log('NIE SKOMPRESOWANO');
			}
			
			callback( readFromCache( file, html ) );
		});
	}
}