//FAZER A CONSULTA
//HomeModel.find()
//.then(dados => console.log(dados))
//.catch(e => console.log(e));

exports.index = (req, res) => {
    res.render('index');
};