const mongoose = require("mongoose");

const CaronaSchema = new mongoose.Schema({
    motorista: {type: Object, require:true},
    motorista_id: {type: String, require:true},
    cidade_origem: {type: String, require:true},
    endereco_origem: {type: String, require:true},
    cidade_destino: {type: String, require:true},
    endereco_destino: {type: String, require:true},
    vagas: {type: String, require:true},
    horario: {type: String, require:true},
    data: {type: String, require:true},
    valor: {type: String, require:true},
    passageiros: {type: Array, "default" : []}   //ID dos passageiros vinculados
});

const CaronaModel = mongoose.model('Carona', CaronaSchema);

class Carona{
  constructor(body){
    this.body = body;
    this.errors = [];
    this.carona = null;
  }

  //async buscaPorId(id){
  //  if(typeof id !== String) return ;
  //  const user = await CaronaModel.findById(id);
  //  return user;
  //}

  async register(){
    this.valida();
    if(this.errors.length > 0)return;

    this.carona = await CaronaModel.create(this.body);
  }

  valida(){
    this.cleanUp();
    //Validação
    //Cidade de Origem
    if(this.body.cidade_origem.length <= 3){
      this.errors.push('A cidade de origem deve ter mais que 3 caracteres');
    }

    //Endereço de Origem
    if(this.body.endereco_origem.length <= 3){
      this.errors.push('O Endereço de origem deve ter mais que 3 caracteres');
    }

    //Cidade de Destino
    if(this.body.cidade_destino.length <= 3){
      this.errors.push('A cidade de destino deve ter mais que 3 caracteres');
    }

    //Endereço de Origem
    if(this.body.endereco_destino.length <= 3){
      this.errors.push('O Endereço de destino deve ter mais que 3 caracteres');
    }

    //Vagas preenchido
    if(this.body.vagas == ''){
      this.errors.push('Preencher o campo vagas ');
    }

    //Horario preenchido
    if(this.body.horario == "") this.errors.push('Preencher o horario ');

    //Data preenchido
    if(this.body.data == "") this.errors.push('Preencher a data ');

    //Valor preenchido
    if(this.body.horario == "") this.errors.push('Preencher o valor ');

    //Cadastrar Passageiro caso tenha
    if(this.body.nome_passageiro) this.passageiros.push(this.body.nome_passageiro);
  }

  cleanUp(){
    for(const key in this.body){
      if (typeof this.body[key] !== 'string'){
        this.body[key] = '';
      }
    }
    this.body = {
      motorista: this.body.user,
      motorista_id: this.body.id,
      cidade_origem: this.body.cidade_origem,
      endereco_origem: this.body.endereco_origem,
      cidade_destino: this.body.cidade_destino,
      endereco_destino: this.body.endereco_destino,
      vagas: this.body.vagas,
      horario: this.body.horario,
      data: this.body.data,
      valor: this.body.valor,
      passageiros: this.passageiros,
      avaliacoes: this.body.avaliacoes
    };
  }

  entrar(){
    for(const key in this.body){
      if (typeof this.body[key] !== 'string'){
        this.body[key] = '';
      }
    }
    this.body = {
      $push: { passageiros: this.body.nome_passageiro}
    }
  }

  async entrarNaCarona(id){
    if(typeof id !== 'string') return;
    this.entrar();
    if(this.errors.length > 0) return;
    this.carona = await CaronaModel.findByIdAndUpdate(id, this.body, {new: true});
  }
};

Carona.buscaCaronas = async function(){
  const caronas = await CaronaModel.find()
    .sort({criadosEm: -1});
  return caronas;
}

Carona.buscaCaronasFiltro = async function(de, para){
  const caronas = await CaronaModel.find({cidade_origem:  de, cidade_destino: para})
    .sort({criadosEm: -1});
  return caronas;
}

Carona.buscaPorId = async function(id){
  const carona = await CaronaModel.findById(id);
  return carona;
}

module.exports = Carona;