const { FLOAT } = require('sequelize');
const Estacionamento = require('../models/Estacionamento');
const moment = require('moment');

module.exports = class EstacionamentoController {
  static async index(req, res) {
    res.redirect('/home');
  }

  static async getInformacaoEstacionamento(req, res) {
    const userId = req.session.userId;
    const caractEstacionamento = await Estacionamento.findAll({ 
      where: { userId: userId },
      raw: true 
    });
    res.render("informacoesDoEstacionamento", { estacionamentos: caractEstacionamento });
  }

  static async informacaoEstacionamentoUn(req, res) {
    const userId = req.session.userId;
    const id = parseInt(req.params.id);
    const IDestacionamento = await Estacionamento.findOne({
      where: { id: id, userId: userId },
      raw: true
    });
    if (IDestacionamento) {
      res.render("informacoesDoEstacionamento", { estacionamentos: [IDestacionamento] }); 
    } else {
      res.redirect("/");
    }
    
  }

  static async getCadastrarNovoEst(req, res) {
    res.render("cadastrarEstacionamento");
  }

  static async cadastrarEstacionamento(req, res) {
    const userId = req.session.userId;

    const infoEstacionamento = {
      formaPagamento: req.body.formaPagamento,
      status: true,
      tarifa: req.body.tarifa,
      quantidadeVagas: req.body.quantidadeVagas,
      horarioAbertura: req.body.horarioAbertura,
      horarioFechamento: req.body.horarioFechamento,
      endereco: req.body.endereco,
      nome: req.body.nome,
      userId: userId
    };

    await Estacionamento.create(infoEstacionamento);
    res.redirect(`/`);
  }

  static async getAtualizarEst(req, res) {
    const userId = req.session.userId;
   
    const caractEstacionamento = await Estacionamento.findAll({
      where: { userId: userId },
      raw: true
    });

    res.render("atualizarEstacionamento", { caractEstacionamento });
  }

  static async atualizarEstacionamento(req, res) {
    const userId = req.session.userId;
    const idEstac = parseInt(req.params.id);

    const infoNovaEstacionamento = {
      formaPagamento: String(req.body.formaAtt),
      tarifa: parseFloat(req.body.tarifaAtt),
      quantidadeVagas: parseFloat(req.body.quantidadeAtt),
      horarioAbertura: moment(req.body.horarioAbAtt, "HH:mm").format("HH:mm"),
      horarioFechamento: moment(req.body.horarioFechAtt, "HH:mm").format("HH:mm"),
      endereco: String(req.body.enderecoAtt),
      nome: String(req.body.nomeAtt),
    }

    await Estacionamento.update(infoNovaEstacionamento, { 
      where: { id: idEstac, userId: userId }
    });
    res.redirect("/estacionamento/informacoesDoEstacionamento");
  }

  static async getRemocaoEst(req, res) {
    const userId = req.session.userId;
    const caractEstacionamento = await Estacionamento.findAll({
      where: { userId: userId },
      raw: true
    });
    res.render("remocaoEstacionamento", { caractEstacionamento });
  }

  static async remocaoEstacionamento(req, res) {
    const userId = req.session.userId;
    const idEstac = parseInt(req.params.id);
    await Estacionamento.destroy({ 
      where: { id: idEstac, userId: userId }
    });
    res.redirect("/");
  }
}
