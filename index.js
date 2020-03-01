const http = require('http');

const PORT =  process.env.PORT || 3000;

const ident = process.env.ident || "i";
const pwd = process.env.pwd || "p";

http.createServer( (req, res) => {
	if( req.url === '/' ) {
// da qui



















// a qui
		res.write("eccolo!");
		res.end();
		console.log( 'ecco' );
		console.log( PORT );
		console.log( ident, pwd );
	}
}).listen(PORT);

