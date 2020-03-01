const http = require('http');
const request = require( 'request' );

const PORT =  process.env.PORT || 3000;

const ident = process.env.ident || "i";
const pwd = process.env.pwd || "p";
const url = "https://www.iliad.it/account/";

http.createServer( (req, res) => {
	if( req.url === '/' ) {
	
	// da qui


	var areariservata = {
		uri: url,
		method: "POST",
		followAllRedirects: true,
		jar: true,
		form: {
			"login-ident": ident,
			"login-pwd": pwd
		}
	};

	var creditoTmp;

	request.post( areariservata, function(error, response, body) {
		console.log(body);
		/*const $ = cheerio.load( body );

		//-- Set Credito Residuo
		creditoTmp = $('h2 > b').html();
		creditoTmp = creditoTmp.split("&");
		var credito = creditoTmp[0];

		//-- Set giorni offerta
		var endOfferta = $('.end_offerta').text().substring(59,69);
		var miaData = endOfferta.split("/");
		var dE = new Date( miaData[2] + "/" + miaData[1] + "/" + miaData[0] );
		// console.log(dE.toLocaleDateString());
		var dI = new Date( miaData[2] + "/" + miaData[1] + "/" + miaData[0] );
		dI.setMonth(dE.getMonth() - 1);
		// console.log(dI.toLocaleDateString());
		
		// To calculate the time difference of two dates 
		var Difference_In_Time = dE.getTime() - dI.getTime(); 
		
		// To calculate the no. of days between two dates 
		var giorniOfferta = Difference_In_Time / (1000 * 3600 * 24); 


		var oggi = new Date();
		var diffInTime = oggi.getTime() - dI.getTime(); 
		var giorniPassati = Math.trunc( diffInTime / (1000 * 3600 * 24) ); 
		
		console.log( credito );
		console.log( endOfferta );
		console.log(giorniPassati);
		console.log ( giorniOfferta );*/


	});













	// a qui
		res.write("eccolo!");
		res.end();
		console.log( 'ecco' );
		console.log( PORT );
		console.log( ident, pwd );
	}
}).listen(PORT);

