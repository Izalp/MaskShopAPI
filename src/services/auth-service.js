"use strict";

const jwt = require("jsonwebtoken");

exports.generateToken = (data) => {
  return jwt.sign(data, process.env.SALT_KEY, { expiresIn: "1d" });
};

exports.decodeToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SALT_KEY, (error, decoded) => {
      if (error) {
        reject("Token inválido");
      } else {
        resolve(decoded);
      }
    });
  });
};

exports.authorize = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      message: "Acesso Restrito",
    });
  }

  jwt.verify(token, process.env.SALT_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: "Token Inválido",
      });
    }
    req.user = decoded; 
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      message: "Token Inválido",
    });
  }

  jwt.verify(token, process.env.SALT_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: "Token Inválido",
      });
    }
    if (decoded.roles.includes("admin")) {
      req.user = decoded; 
      next();
    } else {
      return res.status(403).json({
        message: "Esta funcionalidade é restrita para administradores",
      });
    }
  });
};
