const http = require('http');



const PORT =  process.env.PORT || 3000;

http.createServer( (req, res) => {
	if( req.url === '/' ) {
		res.write("eccolo!");
		res.end();
		console.log( 'ecco' );
		console.log( PORT );
	}
}).listen(PORT);