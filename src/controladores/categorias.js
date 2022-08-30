const { query } = require("../bancodedados/conexao");

const listarCategorias = async (req, res) => {
  try {
    const categorias = await query("select * from categorias");
    return res.json(categorias.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
};

const cadastrarCategorias = async (req, res) => {
  const { usuario } = req;
  const { nome } = req.body;

  if (!nome) {
    return res
      .status(400)
      .json({ mensagen: "Todos os campos são obrigatórios" });
  }

  try {
    const queryCategorias =
      "insert into categorias (nome, usuario_id) values ($1, $2) returning *";
    const paramCategorias = [nome, usuario.id];
    const { rowCount, rows } = await query(queryCategorias, paramCategorias);

    if (rowCount <= 0) {
      return res
        .status(500)
        .json({ mensagem: `Erro interno: ${error.message}` });
    }
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
};

module.exports = {
  listarCategorias,
  cadastrarCategorias,
};
