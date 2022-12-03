const Cadastro = require('../models/CadastroModels');

exports.index = (req, res) => {
    res.render('user_account');
};

exports.profile = async (req, res) => {
    const motorista = await Cadastro.buscaPorId(req.params.id);
    res.render('motorista_account',{motorista});
};

exports.avaliar = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');
        const cadastro = new Cadastro(req.body);
        await cadastro.avaliarPerfil(req.params.id);

        if(cadastro.errors.length > 0){
            req.flash('errors', cadastro.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('sucess', 'Avaliação enviada com sucesso');
        req.session.save(() => res.redirect(`/perfil/index/${cadastro.cadastro._id}`));
        return;
    } catch (error) {
        console.log(error);
        res.render('404');
    }
};