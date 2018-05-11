module.exports = function(app) {
	var registry = app.controllers.registryController;

	app.get('/registry/getToken', registry.getToken);
	app.post('/registry/addDocument', registry.addDocument);
	app.post('/registry/searchDocument' , registry.searchDocument);
	
};
