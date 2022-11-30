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