const Caronas = require('../models/CaronaModels');

exports.index = (req, res) => {
    res.render('ride_details');
};

exports.profile = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const carona = await Caronas.buscaPorId(req.params.id);
    if(!carona) return res.render('404');

    res.render('ride_details', {carona});
};

exports.join = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');
        const carona = new Caronas(req.body);
        await carona.entrarNaCarona(req.params.id)

        if(carona.errors.length > 0){
            req.flash('errors', carona.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('sucess', 'Carona solicitada com sucesso');
        req.session.save(() => res.redirect('detalhes/index/${carona.carona._id}'));
        return;
    } catch (error) {
        console.log(error);
        res.render('404');
    }
};