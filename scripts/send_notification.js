const emailService = require('../src/services/email-service');

const recipient = process.env.EMAIL_RECIPIENT;
const subject = 'Pipeline Executado';
const body = '<p>O pipeline foi executado com sucesso.</p>';

emailService.send(recipient, subject, body);
