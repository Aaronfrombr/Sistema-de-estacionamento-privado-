const express = require("express");
const router = express.Router();
const EstacionamentoController = require("../controllers/estacionamentoController");
const AuthController = require("../controllers/authController");

router.use(AuthController.makeAuthMiddleware);
router.get("/", EstacionamentoController.index);
router.get("/estacionamento/cadastrarEstacionamento", EstacionamentoController.getCadastrarNovoEst);
router.post("/estacionamento/cadastrarEstacionamento", EstacionamentoController.cadastrarEstacionamento);
router.get("/estacionamento/atualizarEstacionamento", EstacionamentoController.getAtualizarEst);
router.post("/estacionamento/atualizarEstacionamento/:id", EstacionamentoController.atualizarEstacionamento);
router.get("/estacionamento/remocaoEstacionamento", EstacionamentoController.getRemocaoEst);
router.post("/estacionamento/remocaoEstacionamento/:id", EstacionamentoController.remocaoEstacionamento);
router.get("/estacionamento/informacoesDoEstacionamento", EstacionamentoController.getInformacaoEstacionamento);
router.get("/estacionamento/informacoesDoEstacionamento/:id", EstacionamentoController.informacaoEstacionamentoUn);

module.exports = router;
