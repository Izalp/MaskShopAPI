"use strict";

const emailService = require("../services/email-service");
const recipientEmail = process.env.EMAIL_RECIPIENT;

const subject = "Notificação: Pipeline Executado";
const body = "<strong>O pipeline foi executado com sucesso.</strong>";

emailService.send(recipientEmail, subject, body)
  .then(() => {
    console.log("E-mail enviado com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao enviar e-mail:", error);
    process.exit(1); 
  });
