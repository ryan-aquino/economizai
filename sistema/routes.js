const usuarioController = require('./controllers/usuarioController');
const dashboardController = require('./controllers/dashboardController');
const historicoController = require('./controllers/historicoController');
const categoriaController = require('./controllers/categoriaController');
const financasController = require("./controllers/financasController");

module.exports = (app) => {

    // USUARIO
    app.get('/', usuarioController.indexGet);
    app.post('/', usuarioController.indexPost);
    app.get('/logoff', usuarioController.logoffGet);
    app.get('/cadastro', usuarioController.cadastroGet);
    app.post('/cadastro', usuarioController.cadastroPost);
    app.get('/inicio', usuarioController.inicioGet);
    app.get('/perfil', usuarioController.perfilGet);
    app.put('/perfil/:id', usuarioController.perfilPut);


    // DASHBOARD
    app.get('/dashboard', dashboardController.dashboardGet);

    // HISTORICO
    app.get('/historico', historicoController.historicoGet);
    app.put('/historico/:id', historicoController.historicoPut);

    // CATEGORIA
    app.get('/categoria', categoriaController.categoriaGet);
    app.post('/categoria', categoriaController.categoriaPost);
    app.put('/categoria/:id', categoriaController.categoriaPut);
    app.delete('/categoria/:id', categoriaController.categoriaDelete);

    // FINANCAS - RECEITAS/DESPESAS/LIMITES
    app.post('/financas', financasController.financasPost)

}