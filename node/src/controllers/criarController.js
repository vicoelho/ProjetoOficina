const Carona = require('../models/CaronaModels');

exports.index = (req, res) => {
    res.render('create_ride');
};

exports.criar = async (req, res) => {
    try {
        const carona = new Carona(req.body);
        await carona.register();

        if(carona.errors.length > 0){
            req.flash('errors', carona.errors);
            req.session.save(function(){
                return res.redirect('/criar/index');
            });
            return ;
        }

        req.flash('sucess', 'Carona criada com sucesso');
        req.session.save(() => res.redirect('/criar/index'));
    } catch (error) {
        console.log(error);
        res.render('404');
    }
};
//exports.editIndex = async (req, res) => {
//    if(!req.params.id) return res.render('404');
//
//    const carona = await Carona.buscaPorId(req.params.id);
//    if(!carona) return res.render('404');
//
//
//    res.render('ride_details', {carona});
//};