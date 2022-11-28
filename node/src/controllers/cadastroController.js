const Cadastro = require('../models/CadastroModels');

exports.index = (req, res) => {
    res.render('create_account');
};

exports.index_login = (req, res) => {
    res.render('login');
};

exports.cadastro = async function(req, res) {
    try {
        const cadastro = new Cadastro(req.body);
        await cadastro.register();

        if(cadastro.errors.length > 0){
            req.flash('errors', cadastro.errors);
            req.session.save(function(){
                return res.redirect('/cadastro/index');
            });
            return ;
        }
        req.flash('sucess', 'Cadastro realizado com sucesso');
        req.session.user = cadastro.user;
        req.session.save(function(){
            return res.redirect('/cadastro/index');
        });
    }catch(e) {
        console.log(e);
        return res.render('404');
    }

};

exports.login = async function(req, res) {
    try {
        const cadastro = new Cadastro(req.body);
        await cadastro.login();

        if(cadastro.errors.length > 0){
            req.flash('errors', cadastro.errors);
            req.session.save(function(){
                return res.redirect('/login/index');
            });
            return ;
        }

        req.flash('sucess', 'Login realizado com sucesso');
        req.session.user = cadastro.user;
        req.session.save(function(){
            return res.redirect('/login/index');
        });
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
}