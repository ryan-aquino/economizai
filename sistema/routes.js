const usuarioController = require('./controllers/usuarioController');
const dashboardController = require('./controllers/dashboardController');
const historicoController = require('./controllers/historicoController');
const categoriaController = require('./controllers/categoriaController');

module.exports = (app) => {
    app.get('/', usuarioController.indexGet);
    app.post('/', usuarioController.indexPost);
    app.get('/logoff', usuarioController.logoffGet);
    app.get('/cadastro', usuarioController.cadastroGet);
    app.post('/cadastro', usuarioController.cadastroPost);
    app.get('/inicio', usuarioController.inicioGet);
    app.get('/perfil', usuarioController.perfilGet);
    

    app.get('/dashboard', dashboardController.dashboardGet);
    
    app.get('/historico', historicoController.historicoGet);

    app.get('/categoria', categoriaController.categoriaGet);
    app.post('/categoria', categoriaController.categoriaPost);
    app.delete('/categoria/:id', categoriaController.categoriaDelete);

}