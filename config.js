var development = {
	env : global.process.env.NODE_ENV || 'development',
	port : global.process.env.PORT || 8080,
	host : global.process.env.HOST || 'localhost',
	API_2LEDGER : global.process.env.API_2LEDGER || '2ledger-api-dev-teste.azurewebsites.net',
	API_2LEDGER_TOKEN : global.process.env.API_2LEDGER_TOKEN || '.',
	API_2LEDGER_SAMPLE_ID_NETWORK : '5bd3f8f0be308241cae57134',
	API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID : global.process.env.API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID || '5bd3f8fbbe308241cae57136'
};

var production = {
	env : global.process.env.NODE_ENV || 'production',
	port : 8080,
	host : global.process.env.HOST || 'localhost',
	API_2LEDGER : global.process.env.API_2LEDGER,
	API_2LEDGER_TOKEN : global.process.env.API_2LEDGER_TOKEN,
	API_2LEDGER_SAMPLE_ID_NETWORK : '5bd3f8f0be308241cae57134',
	API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID : global.process.env.API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID || '5bd3f8fbbe308241cae57136'
};

exports.Config = global.process.env.NODE_ENV === 'production' ? production : development;
