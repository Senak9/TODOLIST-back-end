const { query } = require("../bancodedados/conexao");

const listarListaavançada = async (req, res) => {
  const { usuario } = req;

  try {
    const listaavançada = await query(
      "select * from listaavançada whwew usuario_id = $1",
      [usuario.id]
    );
    return res.json(listaavançada.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
};
const cadastrarListaavançada = async (req, res) => {
  const { usuario } = req;
  const { nome, categoria_id } = req.body;

  if (!nome || !categoria_id) {
    return res
      .status(400)
      .json({ mensagen: "Todos os campos são obrigatórios" });
  }

  try {
    const categoria = await query("select * from categorias where id = $1", [
      categoria_id,
    ]);

    if (categoria.rowCount <= 0) {
      return res.status(404).json({ mensagem: "A categoria não existe" });
    }

    const queryCadastro =
      "insert into listaavançada (nome, usuario_id, categoria_id) values ($1, $2, $3) returning *";
    const paramCadastro = [nome, usuario.id, categoria_id];
    const { rowCount, rows } = await query(queryCadastro, paramCadastro);

    if (rowCount <= 0) {
      return res
        .status(500)
        .json({ mensagem: `Erro interno: ${error.message}` });
    }

    const [listaavançada] = rows;
    listaavançada.categoria_nome = categoria.rows[0].nome;

    return res.status(201).json(transacao);
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
};

const excluirListaavançada = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;

  try {
    const listaavançada = await query(
      "select * from listaavançada where usuario_id = $1 and id = $2",
      [usuario.id, id]
    );

    if (listaavançada.rowCount <= 0) {
      return res.status(404).json({ mensagem: "O item não existe" });
    }

    const listaavançadaExcluida = await query(
      "delete from listaavançada where id = $1",
      [id]
    );

    if (listaavançadaExcluida.rowCount <= 0) {
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
  listarListaavançada,
  cadastrarListaavançada,
  excluirListaavançada,
};
