const { criptografar, descriptografar } = require('../shared/cryptograph');
const { chave, maxAge } = require('../config')

module.exports = { 
    dashboardGet: async (req, res) => {
        if(!req.cookies['_fgp'])
            return res.redirect('/')
    
        const id = descriptografar(req.cookies['_fgp'], chave)
        return res.render('dashboard')
    },
    
}