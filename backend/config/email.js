var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    port: '587',
    auth: {
        user: 'clrobotica@deec.uc.pt',
        pass: 'clrobotica2122'
    },
    host: 'smtp.deec.uc.pt',
});

module.exports = transporter;