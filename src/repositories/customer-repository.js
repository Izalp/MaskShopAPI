"use strict";
const mongoose = require("mongoose");
const Customer = require("../models/customer");

exports.create = async (data) => {
  var customer = new Customer(data);
  await customer.save();
};

exports.authenticate = async (data) => {
  const res = await Customer.findOne({
    email: data.email,
    password: data.password,
  });
  return res;
};

exports.getById = async (id) => {
  const res = await Customer.findById(id);
  return res;
};

exports.getByEmail = async (email) => {
  return await Customer.findOne({ email });
};
