const mongoose = require("mongoose");
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const CadastroSchema = new mongoose.Schema({
  email: { type: String, require: true },
  senha: { type: String, require: true },
  nome: { type: String, require: true },
  data_nascimento: { type: String, require: true },
  sexo: { type: String, require: true },
  celular: { type: String, require: true },
  carro: { type: String, require: true },
  cnh: String,
  marca_do_veiculo: String,
  modelo_do_veiculo: String,
  placa_do_veiculo: String,
  capacidade_do_veiculo: Number,
  avaliacoes: {type: Array, "default" : []} //Lista de avaliações vinculadas ao usuário - Média
});

const CadastroModel = mongoose.model('Cadastro', CadastroSchema);

class Cadastro{
  constructor(body){
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login(){
    this.valida_login();
    if(this.errors.length > 0)return;
    this.user = await CadastroModel.findOne({email: this.body.email});

    if(!this.user) {
      this.errors.push('Usuário não existe.');
      return;
    }
    if(!bcryptjs.compareSync(this.body.senha, this.user.senha)){
      this.errors.push('Senha inválida');
      this.user = null;
      return;
    }

  }

  async register(){
    this.valida();
    if(this.errors.length > 0)return;

    await this.userExists();
    await this.celExists();

    const salt = bcryptjs.genSaltSync();
    this.body.senha = bcryptjs.hashSync(this.body.senha, salt);
    this.user = await CadastroModel.create(this.body);
  }

  async userExists(){
    this.user = await CadastroModel.findOne({email: this.body.email});
    if(this.user) this.errors.push('Usuário já cadastrado');
  }

  async celExists(){
    const user = await CadastroModel.findOne({celular: this.body.celular});

    if(user) this.errors.push('Celular ja cadastrado');
  }

  valida(){
    this.cleanUp();
    //Validação
    //Nome preenchido
    if(this.body.nome.length <= 3){
      this.errors.push('O nome deve ser maior do que 3 caracteres');
    }

    //Data preenchida
    if(this.body.data_nascimento == "") this.errors.push('Preencher o campo Data ');

    //Sexo preenchido
    if(this.body.sexo == null){
      this.errors.push('Preencher o campo Sexo ');
    }

    //Celular preenchido
    if(this.body.celular == "") this.errors.push('Preencher o Celular ');

    //Email precisa ser valido
    if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido');

    //Senha mais que 3 caracteres
    if(this.body.senha.length <= 3){
      this.errors.push('A senha deve ser maior do que 3 caracteres');
    }

   //Verificar carro
    if(this.body.carro == null){
      this.errors.push('Preencher o campo Possui Carro? ');
    }

    if(this.body.carro == "não"){
      this.body.cnh = null;
      this.body.marca_do_veiculo = null;
      this.body.modelo_do_veiculo = null;
      this.body.placa_do_veiculo = null;
      this.body.capacidade_do_veiculo = null;
    }

    if(this.body.carro == "sim"){
      if(this.body.cnh == "") this.errors.push('Preencher o campo CNH ');
      if(this.body.marca_do_veiculo == "") this.errors.push('Preencher o campo Marca ');
      if(this.body.modelo_do_veiculo == "") this.errors.push('Preencher o campo Modelo ');
      if(this.body.placa_do_veiculo == "") this.errors.push('Preencher o campo Placa ');
      if(this.body.capacidade_do_veiculo == "") this.errors.push('Preencher o campo Capacidade ');
    }
  }
  valida_login(){
    this.cleanUp();
    //Email precisa ser valido
    if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido');

    //Senha mais que 3 caracteres
    if(this.body.senha.length <= 3){
      this.errors.push('A senha deve ser maior do que 3 caracteres');
    }
  }

  cleanUp(){
    for(const key in this.body){
      if (typeof this.body[key] !== 'string'){
        this.body[key] = '';
      }
    }
    this.body = {
      email: this.body.email,
      senha: this.body.senha,
      nome: this.body.nome,
      celular: this.body.celular,
      data_nascimento: this.body.data_nascimento,
      sexo: this.body.sexo,
      carro: this.body.carro,
      cnh: this.body.cnh,
      marca_do_veiculo: this.body.marca_do_veiculo,
      modelo_do_veiculo: this.body.modelo_do_veiculo,
      placa_do_veiculo: this.body.placa_do_veiculo,
      capacidade_do_veiculo: this.body.capacidade_do_veiculo,
      avaliacoes: this.body.avaliacoes
    };
  }

  avaliar(){
    for(const key in this.body){
      if (typeof this.body[key] !== 'string'){
        this.body[key] = '';
      }
    }
    this.body = {
      $push: { avaliacoes: this.body.avaliacao}
    }
  }

  async avaliarPerfil(id){
    if(typeof id !== 'string') return;
    this.avaliar();
    if(this.errors.length > 0) return;
    this.cadastro = await CadastroModel.findByIdAndUpdate(id, this.body, {new: true});
  }
};

Cadastro.buscaPorId = async function(id){
  const user = await CadastroModel.findById(id);
  return user;
}

module.exports = Cadastro;