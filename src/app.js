"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();
const router = express.Router();

// Conecta ao banco
mongoose.connect(config.connectionString)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Carrega os Models
const Product = require("./models/product");
const Customer = require("./models/customer");
const Order = require("./models/order");

// Carrega as Rotas
const indexRoutes = require("./routes/index-routes");
const productsRoutes = require("./routes/product-routes");
const orderRoutes = require("./routes/order-routes");
const customerRoutes = require("./routes/customer-routes");

app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use("/", indexRoutes);
app.use("/products", productsRoutes);
app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);

module.exports = app;
