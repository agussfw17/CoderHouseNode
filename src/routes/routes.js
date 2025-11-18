const express = require("express");
const router = express.Router();
const { getClientes } = require("../apis/clientes/clientes");

router.get("/", getClientes);

module.exports = router;