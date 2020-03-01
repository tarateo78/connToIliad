const http = require('http');



const PORT = process.env.PORT || 3000;

http.createServer( function( req, res ) {
	res.write("eccolo!");
	console.log( 'ecco' );
	console.log( PORT );
}).listen(PORT);