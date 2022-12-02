const Cadastro = require('../models/CadastroModels');

exports.index = (req, res) => {
    res.render('user_account');
};

exports.profile = async (req, res) => {
    const motorista = await Cadastro.buscaPorId(req.params.id);
    res.render('user_account copy',{motorista});
};
