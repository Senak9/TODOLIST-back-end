const { query } = require("../bancodedados/conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }
  try {
    const usuario = await query("select * from usuarios where nome = $1", [
      nome,
    ]);

    if (usuario.rowCount > 0) {
      return res
        .status(400)
        .json({ mensagem: "O usuario já existe cadastrado." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const queryCadastro =
      "insert into usuarios (nome, senha) values ($1, $2) returning *";
    const paramCadastro = [nome, senhaCriptografada];
    const usuarioCadastrado = await query(queryCadastro, paramCadastro);

    if (usuarioCadastrado.rowCount <= 0) {
      return res
        .status(500)
        .json({ mensagem: `Erro interno: ${error.message}` });
    }

    const { senha: _, ...cadastro } = usuarioCadastrado.rows[0];

    return res.status(201).json(cadastro);
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
};
module.exports = {
  cadastrarUsuario,
};
