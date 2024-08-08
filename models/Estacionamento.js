const conn = require("../db/conn");
const { DataTypes } = require("sequelize");

const Estacionamento = conn.define("Estacionamento", {
  formaPagamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tarifa: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantidadeVagas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  horarioAbertura: {
    type: DataTypes.TIME, 
    allowNull: false,
  },
  horarioFechamento: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Estacionamento;
