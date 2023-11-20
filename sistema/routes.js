const usuarioController = require('./controllers/usuarioController');

module.exports = (app) => {
    app.get('/', usuarioController.indexGet);
    app.post('/', usuarioController.indexPost);
    app.get('/cadastro', usuarioController.cadastroGet);
    app.post('/cadastro', usuarioController.cadastroPost);
    app.get('/dashboard', usuarioController.dashboardGet);
}