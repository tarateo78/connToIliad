'use strict';

const Telegram = require('telegram-node-bot');
const axios = require( 'axios' );
const cheerio = require( 'cheerio' );
const request = require( 'request' );

class TodoController extends Telegram.TelegramBaseController {
	addHandler($) {
		let todo = $.message.text.split(' ').slice(1).join(' ');

		if (!todo) return $.sendMessage('Sorry, please pass a todo item. ' + '👍');

		$.getUserSession('todos')
			.then(todos => {
				if (!Array.isArray(todos)) $.setUserSession('todos', [todo]);
				else $.setUserSession('todos', todos.concat([todo]));
				$.sendMessage('Added new todo! 🙈');
			});

	}

	getHandler($) {
		console.log($.getUserSession('todos'));
		$.getUserSession('todos')
			.then(todos => {
				if (!Array.isArray(todos)) $.sendMessage("Nessun dato presente");
				else $.sendMessage(this._serializeList(todos), { parse_mode: 'Markdown' });
			});

	}

	/* START */
	startHandler($) {
		console.log("Benvenuto!");
		$.sendMessage("Benvenuto su iliadGbBot\ninnanzitutto immetti il tuo Username di iliad");
	}


	/* USER */
	userHandler($) {
		let user = $.message.text.split(' ').slice(1).join(' ');

		if (!user) {

			$.getUserSession('myUser').then(data => {
				if (typeof data !== 'string' || data instanceof String) {
					$.sendMessage("Nessun User impostato!\nDigitare /user [spazio] <nome>");
				} else {
					$.sendMessage("👦🏼 User attuale: *" + data + "*", { parse_mode: 'Markdown' });
				}
			})

		} else {

			$.getUserSession('myUser')
				.then(myUser => {
					$.setUserSession('myUser', user).then(() => {
						return $.getUserSession('myUser')
					})
						.then(data => {
							$.sendMessage("User impostato: _" + data + "_ 👍🏻", { parse_mode: 'Markdown' });
						})
				});
		}



	}

	/* PASS */
	passHandler($) {
		let pass = $.message.text.split(' ').slice(1).join(' ');

		if (!pass) {

			$.getUserSession('myPass').then(data => {
				if (typeof data !== 'string' || data instanceof String) {
					$.sendMessage("Nessuna Pass impostata!\nDigitare /pass [spazio] <password>");
				} else {
					$.sendMessage("🔐 Pass attuale: *" + data + "*", { parse_mode: 'Markdown' });
				}
			})

		} else {

			$.getUserSession('myPass')
				.then(myPass => {
					$.setUserSession('myPass', pass).then(() => {
						return $.getUserSession('myPass')
					})
						.then(data => {
							$.sendMessage("Pass impostata: _" + data + "_ 👍🏻", { parse_mode: 'Markdown' });
						})
				});
		}
		// $.runMenu({
		// 	message: 'ss',
		// 	layout: [1,2],
		// 	'/consumo': () => { }, //will be on first line
		// 	'/user': () => { }, //will be on first line
		// 	'/pass': () => { }, //will be on second line
		// })
	}


	/* CONSUMO */
	consumoHandler($) {

		$.getUserSession('myPass').then( pwd => {
			$.getUserSession('myUser').then( usr => {
				if ( typeof usr !== 'string' ) {
					$.sendMessage("Impostare /user");
					return;
				} 
				if (typeof pwd !== 'string' ) {
					$.sendMessage("Impostare /pass");
					return;
				}
				
				$.sendMessage("OK");
				

			});
		} );


		// let pass = $.message.text.split(' ').slice(1).join(' ');

		// if (!pass) {

		// 	$.getUserSession('myPass').then(data => {
		// 		if (typeof data !== 'string' || data instanceof String) {
		// 			$.sendMessage("Nessuna Pass impostata!\nDigitare /pass [spazio] <password>" );
		// 		}else {
		// 			$.sendMessage("🔐 Pass attuale: *" + data + "*", { parse_mode: 'Markdown' } );
		// 		}
		// 	})

		// } else {

		// 	$.getUserSession('myPass')
		// 	.then(myPass => {
		// 		$.setUserSession('myPass', pass ).then(() => {
		// 			return $.getUserSession('myPass')
		// 		})
		// 		.then(data => {
		// 			$.sendMessage("Pass impostata: _" + data + "_ 👍🏻", { parse_mode: 'Markdown' } );
		// 		})
		// 	});
		// }
		// $.getUserSession('myUser')
		// 	.then(myUser => {
		// 		if (!typeof myUser === 'string' || myUser instanceof String) {
		// 			console.log("SI");
		// 		} else {
		// 			$.setUserSession('myUser', "");
		// 			console.log("NO");
		// 		}
		// 		$.sendMessage(' ! 🙈');
		// 	});

	}

	checkHandler($) {
		let index = parseInt($.message.text.split(' ').slice(1)[0]);
		if (isNaN(index)) return $.sendMessage('Sorry, you didn\'t pass a valid index.');

		$.getUserSession('todos')
			.then(todos => {
				if (index >= todos.length) return $.sendMessage('Sorry, you didn\'t pass a valid index.');
				todos.splice(index, 1);
				$.setUserSession('todos', todos); parse_mode: 'Markdown'
				$.sendMessage('Checked todo!');
			});
	}

	get routes() {
		parse_mode: 'Markdown'
		return {
			'addCommand': 'addHandler',
			'getCommand': 'getHandler',
			'checkCommand': 'checkHandler',
			'startCommand': 'startHandler',
			'userCommand': 'userHandler',
			'passCommand': 'passHandler',
			'consumoCommand': 'consumoHandler',
		};
	}

	_serializeList(todoList) {
		let serialized = '*Your Todos:*\n\n';
		todoList.forEach((t, i) => {
			serialized += `*${i}* - ${t}\n`;
		});
		return serialized;
	}
}

module.exports = TodoController;