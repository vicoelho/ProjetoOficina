const Caronas = require('../models/CaronaModels');

exports.index = async(req, res) => {
    try {
        const caronas = await Caronas.buscaCaronas();
        res.render('available_list', {caronas});
    } catch (error) {
        console.log(error);
        res.render('404');
    }
};

exports.join = async (req, res) => {
    try {
        if(!req.body) return res.render('404');
        req.session.save(() => res.redirect(`/caronas/index/${req.body.de}/${req.body.para}`));
        return;
    } catch (error) {
        console.log(error);
        res.render('404');
    }
};

exports.filtrar = async(req, res) => {
    try {
        if(!req.body.de || !req.body.para){
            req.flash('errors', 'Preencha todos os campos do filtro');
            req.session.save(() => res.redirect('/caronas/index'));
            return;
        }
        res.redirect(`/caronas/index/${req.body.de}/${req.body.para}`);
    } catch (error) {
        console.log(error);
        res.render('404');
    }
};

exports.filtro = async(req, res) => {
    try {
        const caronas = await Caronas.buscaCaronasFiltro(req.params.de, req.params.para);
        res.render('available_list', {caronas});
    } catch (error) {
        console.log(error);
        res.render('404');
    }
};
