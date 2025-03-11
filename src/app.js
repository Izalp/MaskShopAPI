"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const router = express.Router();

mongoose
  .connect("mongodb://127.0.0.1:27017/mongodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

const Product = require("./models/product");

const indexRoutes = require("./routes/index-routes");
const productsRoutes = require("./routes/products-routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRoutes);
app.use("/products", productsRoutes);

module.exports = app;
