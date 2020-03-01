const http = require('http');

console.log( 'ecco' );

const PORT = process.env.PORT || 3000;

http.createServer( function( req, res ) {
	res.writeHead( 200, { 'Content-Type' : 'text/html'} );
	res.end( creditoTmp[0] );
}).listen(PORT);