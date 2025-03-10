"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const router = express.Router();

mongoose.connect("mongodb://izalopes:ilr202412@localhost:27017/admin");

const indexRoutes = require("./routes/index-routes");
const productsRoutes = require("./routes/products-routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRoutes);
app.use("/products", productsRoutes);

module.exports = app;
