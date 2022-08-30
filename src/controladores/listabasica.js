const { query } = require("../bancodedados/conexao");

const listarListabasica = async (req, res) => {
  try {
    const listabasica = await query("select * from listabasica");
    return res.json(listabasica.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
};

const cadastrarListabasica = async (req, res) => {
  const { usuario } = req;
  const { nome } = req.body;

  if (!nome) {
    return res
      .status(400)
      .json({ mensagen: "Todos os campos são obrigatórios" });
  }

  try {
    const queryListar =
      "insert into listabasica (nome, usuario_id) values ($1, $2) returning *";
    const paramListar = [nome, usuario.id];
    const { rowCount, rows } = await query(queryListar, paramListar);

    if (rowCount <= 0) {
      return res
        .status(500)
        .json({ mensagem: `Erro interno: ${error.message}` });
    }
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
};

const excluirListabasica = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;

  try {
    const listabasica = await query(
      "select * from listabasica where usuario_id = $1 and id = $2",
      [usuario.id, id]
    );

    if (listabasica.rowCount <= 0) {
      return res.status(404).json({ mensagem: "O item não existe" });
    }

    const listabasicaExcluida = await query(
      "delete from listabasica where id = $1",
      [id]
    );

    if (listabasicaExcluida.rowCount <= 0) {
      return res
        .status(500)
        .json({ mensagem: `Erro interno: ${error.message}` });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
};

module.exports = {
  listarListabasica,
  cadastrarListabasica,
  excluirListabasica,
};
