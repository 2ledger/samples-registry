var development = {
	env : global.process.env.NODE_ENV || 'development',
	port : global.process.env.PORT || 8080,
	host : global.process.env.HOST || 'localhost',
	API_2LEDGER : global.process.env.API_2LEDGER || '2ledger-api-dev-teste.azurewebsites.net',
	API_2LEDGER_TOKEN : global.process.env.API_2LEDGER_TOKEN || '.',
	API_2LEDGER_SAMPLE_ID_NETWORK : '5c5e31d01f76dd0095141274',
	API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID : global.process.env.API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID || '5c5e3cb81f76dd0095141296',
	API_2LEDGER_BASIC_LOGIN : global.process.env.API_BASIC_LOGIN_2LEDGER || 'YWRtX1VzZXJNYW5hZ2VyQGdtYWlsLmNvbToxMjM0NTY='
};

var production = {
	env : global.process.env.NODE_ENV || 'production',
	port : 8080,
	host : global.process.env.HOST || 'localhost',
	API_2LEDGER : global.process.env.API_2LEDGER,
	API_2LEDGER_TOKEN : global.process.env.API_2LEDGER_TOKEN,
	API_2LEDGER_SAMPLE_ID_NETWORK : '5c5e31d01f76dd0095141274',
	API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID : global.process.env.API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID || '5c5e3cb81f76dd0095141296',
	API_2LEDGER_BASIC_LOGIN : global.process.env.API_BASIC_LOGIN_2LEDGER || 'YWRtX1VzZXJNYW5hZ2VyQGdtYWlsLmNvbToxMjM0NTY='
};

exports.Config = global.process.env.NODE_ENV === 'production' ? production : development;
