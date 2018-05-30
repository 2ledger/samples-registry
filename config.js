var development = {
	env : global.process.env.NODE_ENV || 'development',
	port : global.process.env.PORT || 8080,
	host : global.process.env.HOST || 'localhost',
	API_2LEDGER : global.process.env.API_2LEDGER || 'sandbox.2ledger.com',
	API_2LEDGER_TOKEN : global.process.env.API_2LEDGER_TOKEN || '.',
	API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID : global.process.env.API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID || '5b0f1e8f29b63b00396c6454'
};

var production = {
	env : global.process.env.NODE_ENV || 'production',
	port : 8080,
	host : global.process.env.HOST || 'localhost',
	API_2LEDGER : global.process.env.API_2LEDGER,
	API_2LEDGER_TOKEN : global.process.env.API_2LEDGER_TOKEN,
	API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID : global.process.env.API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID
};

exports.Config = global.process.env.NODE_ENV === 'production' ? production : development;
