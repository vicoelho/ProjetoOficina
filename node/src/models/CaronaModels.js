const mongoose = require("mongoose");

const CaronaSchema = new mongoose.Schema({
    motorista: {type: String, require:true},
    cidade_origem: {type: String, require:true},
    endereco_origem: {type: String, require:true},
    cidade_destino: {type: String, require:true},
    endereco_destino: {type: String, require:true},
    vagas: {type: String, require:true},
    horario: {type: String, require:true},
    data: {type: String, require:true},
    valor: {type: String, require:true},
    passageiros: Array  //ID dos passageiros vinculados
});

const CaronaModel = mongoose.model('Carona', CaronaSchema);

class Carona{
  constructor(body){
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register(){
    this.valida();
    if(this.errors.length > 0)return;

    await this.userExists();

    this.user = await CaronaModel.create(this.body);
  }

  async userExists(){
    this.user = await CaronaModel.findOne({email: this.body.email});
    if(this.user) this.errors.push('Usuário já cadastrado');
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
  }

  cleanUp(){
    for(const key in this.body){
      if (typeof this.body[key] !== 'string'){
        this.body[key] = '';
      }
    }
    this.body = {
      motorista: user,
      cidade_origem: this.body.cidade_origem,
      endereco_origem: this.body.endereco_origem,
      cidade_destino: this.body.cidade_destino,
      endereco_destino: this.body.endereco_destino,
      vagas: this.body.vagas,
      horario: this.body.horario,
      data: this.body.data,
      valor: this.body.valor,
      passageiros: this.body.passageiros
    };
  }
};

module.exports = Carona;