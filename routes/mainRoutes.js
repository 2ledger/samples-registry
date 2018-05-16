module.exports = function(app) {
	var registry = app.controllers.registryController;

	app.get('/getToken', registry.getToken);
	app.post('/addDocument', registry.addDocument);
	app.post('/searchDocument' , registry.searchDocument);
	
};
