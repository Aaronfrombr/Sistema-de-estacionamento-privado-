const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {
    const { cpf, password } = req.body;
    const usuario = await Usuario.findOne({ where: { cpf: cpf } });
    if (!usuario) {
      AuthController.login(req, res);
      return;
    }
    const senhaCorreta = bcrypt.compareSync(password, usuario.password);
    if (!senhaCorreta) {
      AuthController.login(req, res);
      return;
    }
    req.session.userId = usuario.id;
    req.session.nome = usuario.nome;
    req.session.save(() => {
      res.redirect("/");
    });
  }

  static signup(req, res) {
    res.render("auth/signup");
  }

  static async signupPost(req, res) {
    const { cpf, nome, password, confirmpassword } = req.body;
    if (password !== confirmpassword) {
      AuthController.signup(req, res);
      return;
    }

    const usuario = await Usuario.findOne({ where: { cpf: cpf } });
    if (usuario) {
      AuthController.signup(req, res);
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const dadosUsuario = {
      cpf,
      nome,
      password: hashedPassword,
    };

    const user = await Usuario.create(dadosUsuario);

    req.session.userId = user.id;
    req.session.nome = user.nome;
    req.session.save(() => {
      res.redirect("/");
    });
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }

  static makeAuthMiddleware(req, res, next) {
    if (!req.session.userId) {
      req.session.save(() => {
        res.redirect("/login");
      });
      return;
    }
    next();
  }
}
