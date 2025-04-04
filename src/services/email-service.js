const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.send = async (to, subject, body) => {
  const msg = {
    to: to,
    from: 'hello@maskshop.io', 
    subject: subject,
    html: body,
  };

  try {
    await sgMail.send(msg);
    console.log('E-mail enviado com sucesso.');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
};
