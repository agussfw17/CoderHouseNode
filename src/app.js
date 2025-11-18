const express = require("express");
require("dotenv").config();

const routes = require("./routes/routes");

const app = express();
app.use(express.json());

// Rutas
app.use("/clientes", routes);

module.exports = app;