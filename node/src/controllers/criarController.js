const Carona = require('../models/CaronaModels');

exports.index = (req, res) => {
    res.render('create_ride');
};

exports.criar = (req, res) => {
    const carona = new Carona(req.body);
    carona.register();
    res.send(carona.body);
};