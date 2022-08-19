const express = require("express");

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);

module.exports = rotas;
