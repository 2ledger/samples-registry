'use strict';

var Promise = require('promise');
var https = require('https');
var querystring = require('querystring');


module.exports = function (app) {
	///////////////////////////////////////////////////////////////////////
	// ChamadaGET
	// Método para chamadas GET
	///////////////////////////////////////////////////////////////////////
	function chamadaGET(path) {
		return new Promise((resolve, reject) => {
			var auth = global.cfg.API_2LEDGER_TOKEN;

			const options = {
				hostname: global.cfg.API_2LEDGER,
				method: 'GET',
				path: '/v1' + path,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + auth
				}
			};

			const req = https.request(options, (response) => {
				response.setEncoding('utf8');
				var body = '';

				response.on('data', (retorno) => {
					body += retorno;
				});

				response.on('end', function () {
					resolve(body);
				});
			});
			req.on('error', (e) => {
				console.info(`problem with request: ${e.message}`);
			});
			req.end();
		});
	}

	///////////////////////////////////////////////////////////////////////
	// ChamadaDELETE
	// Método para chamadas DELETE
	///////////////////////////////////////////////////////////////////////
	function chamadaDELETE(path) {
		return new Promise((resolve, reject) => {
			var auth = global.cfg.API_2LEDGER_TOKEN;

			const options = {
				hostname: global.cfg.API_2LEDGER,
				method: 'DELETE',
				path: '/v1' + path,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + auth
				}
			};

			const req = https.request(options, (response) => {
				response.setEncoding('utf8');
				var body = '';

				response.on('data', (retorno) => {
					body += retorno;
				});

				response.on('end', function () {
					resolve(body);
				});
			});
			req.on('error', (e) => {
				console.info(`problem with request: ${e.message}`);
			});
			req.end();
		});
	}

	///////////////////////////////////////////////////////////////////////
	// ChamadaPOST
	// Método para chamadas POST
	///////////////////////////////////////////////////////////////////////
	function chamadaPOST(path, data) {
		return new Promise((resolve, reject) => {
			var auth = global.cfg.API_2LEDGER_TOKEN;

			const options = {
				hostname: global.cfg.API_2LEDGER,
				method: 'POST',
				path: '/v1' + path,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + auth
				}
			};

			const req = https.request(options, (response) => {
				var body = '';

				response.setEncoding('utf8');
				response.on('data', (retorno) => {
					body += retorno;
				});

				response.on('end', function () {
					resolve(body);
				});
			});
			req.on('error', (e) => {
				console.info(`problem with request: ${e.message}`);
			});
			req.write(JSON.stringify(data));
			req.end();
		});
	}

	var clientController = {

		///////////////////////////////////////////////////////////////////////
		// buscarConfiguracoes
		// Método para retornar as configurações do aplicativo
		///////////////////////////////////////////////////////////////////////
		getToken: function (req, res) {

			const basic = Buffer.from('adm_UserManager@gmail.com:123456').toString('base64');
			const options = {
				hostname: global.cfg.API_2LEDGER,
				method: 'POST',
				path: '/v1/login',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Basic ' + basic
				}
			};

			const req2 = https.request(options, (response) => {
				response.setEncoding('utf8');
				var body = '';

				response.on('data', (retorno) => {
					body += retorno;
				});

				response.on('end', function () {
					global.cfg.API_2LEDGER_TOKEN = JSON.parse(body).response;

					res.send({'sucess':'true'});
				});
			});
			req2.on('error', (e) => {
				console.info(`problem with request: ${e.message}`);
			});
			req2.end();
		},

		///////////////////////////////////////////////////////////////////////
		// saveRegistry
		// Metod
		///////////////////////////////////////////////////////////////////////
		addDocument: function (req, res) {
			var value = req.body.data;
			value.status = 'active';
			value.dateRegister = new Date();

			var obj = {key:req.body.id, value:value};
			chamadaPOST('/entities/' + global.cfg.API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID + '/records', obj).then(d => {
				res.send(JSON.parse(d).response);
			})
		},

		///////////////////////////////////////////////////////////////////////
		// searchRegistry
		// Metod
		///////////////////////////////////////////////////////////////////////
		searchDocument: function (req, res) {
			var hash = req.body.document;

			chamadaGET('/records/' + encodeURIComponent(hash)).then(d => {
				var client = JSON.parse(d);

				if (client.success == 'false')
					res.send({ type: 'error', message: 'unknown document' });
				else 
					res.send({ type: 'success', data: client.response.record.value });
			})
		},
		
	}

	return clientController;
}

