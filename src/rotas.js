const express = require("express");
const { cadastrarUsuario } = require("./controladores/usuario");
const { login } = require("./controladores/login");
const {
  listarCategorias,
  cadastrarCategorias,
} = require("./controladores/categorias");
const {
  listarListabasica,
  cadastrarListabasica,
  excluirListabasica,
} = require("./controladores/listabasica");
const {
  listarListaavançada,
  cadastrarListaavançada,
  excluirListaavançada,
} = require("./controladores/listaavançada");
const { filtroAutenticacao } = require("./intermediarios/autenticacao");

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);

rotas.use(filtroAutenticacao);

rotas.get("/categoria", listarCategorias);
rotas.post("/categoria", cadastrarCategorias);

rotas.get("/listabasica", listarListabasica);
rotas.post("/listabasica", cadastrarListabasica);
rotas.delete("/listabasica/:id", excluirListabasica);

rotas.get("/listaavançada", listarListaavançada);
rotas.post("/listaavançada", cadastrarListaavançada);
rotas.delete("/listaavançada/:id", excluirListaavançada);

module.exports = rotas;
