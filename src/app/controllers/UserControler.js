import User from "../models/User";
import * as Yup from "yup";

class UserController {
  async store(req, res) {
    const esquema = Yup.object().shape({
      name: Yup.string().required(), // campo name é do tipo string e é obrigatorio
      email: Yup.string().email().required(),
      password_hash: Yup.string().required().min(6),
    });
    if (!(await esquema.isValid(req.body))) {
      return res.status(400).json({ mensagem: "Campos invalidos" });
    }

    const userExists = await User.findOne({ where: req.body });
    if (userExists) {
      return res.status(400).json({ mensagem: "Usuario já existe" });
    }

    const { id, name, email, prestador_servico } = await User.create(req.body);

    return res.json({ id, name, email, prestador_servico });
  }

  async update(req, res) {
    //validar os campos
    const esquema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      passwordAntigo: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("passwordAntigo", (passwordAntigo, field) =>
          passwordAntigo ? field.required() : field
        ), //validação condicional
      confirmarPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ), //validar o novo password
    });

    if (!(await esquema.isValid(req.body))) {
      return res.status(400).json({ mensagem: "Campos invalidos" });
    }

    const { email, password_hash } = req.body;
    const user = await User.findByPk(req.userId); //buscar o usuario no banco de dados pelo id

    //verificar se ele quer alterar o email, comparar com o email atual
    console.log(email);
    if (email != user.email) {
      const existeUsuarioEmail = await User.findOne({ where: { email } });
      if (existeUsuarioEmail) {
        //usuario já existe
        return res.status(400).json({ error: "Email já cadastrado" });
      }
    }

    //verificar se a senha antiga é a senha cadastrada no banco
    //só vai realizar a verificação se ele informou a senha antiga
    console.log(password_hash);

    if (!password_hash) {
      return res.status(400).json({ error: "Senha antiga não informada" });
    }

    const pass = await User.findOne({ where: { password_hash } });

    if (!pass) {
      return res
        .status(400)
        .json({ error: "Senha antiga diferente da senha cadastrada" });
    }

    const { id, name, prestador_servico } = await user.update(req.body);

    return res.json({ id, name, email, prestador_servico });
  }
}

export default new UserController();
