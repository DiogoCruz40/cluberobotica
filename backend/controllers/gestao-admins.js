const config = require("../config/auth");
const db = require("../models");
const User = db.user;
var generator = require('generate-password');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { user } = require("../models");
var transporter = require("../config/email");

exports.getAdmins = (req, res) => {

    user.find({}, {
        _id: 1,
        nome: 1,
        email: 1
    }, (err, users) => {
        return res.status(200).json(users);
    });

};

exports.addAdmin = (req, res) => {

    var password = generator.generate({
        length: 12,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
        strict: true
    });

    const user = new User({
        nome: req.body.nome,
        email: req.body.email,
        password: bcrypt.hashSync(password, 8),
        omnipotente: req.body.omnipotente
    });

    var mailOptions = {
        from: '"Clube de Robótica <no-reply>" clrobotica@deec.uc.pt',
        to: req.body.email,
        subject: 'Foi criada uma nova conta de administrador do clrobotica.deec.uc.pt com o seu email',
        html: `        <span style="font-style: italic;font-size:14px">
        Esta mensagem é enviada automaticamente, por favor não responda.
        Em caso de dúvidas ou informações adicionais, aceda a <a href="https://clrobotica.deec.uc.pt"
          target="_blank">clrobotica.deec.uc.pt</a></span><br><br>
    
        Exmo(a). Senhor(a) ${req.body.nome},<br><br>Informamos que foi criada uma nova conta de administrador para este email.<br> 
        Foi gerada a password seguinte para poder iniciar sessão: ${password} <br>
        Para iniciar sessão por favor diriga-se a <a href="https://clrobotica.deec.uc.pt/admin"
        target="_blank">https://clrobotica.deec.uc.pt/admin</a> > Iniciar Sessão > Colocar credenciais
        `
    };

    try {
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(`couldn't send mail ${error}`);
                throw 500;
            } else {
                console.log('Message sent: %s', response.response);
            }
        });
    } catch (error) {
        console.log('error =' + error);
    }


    user.save((err, user) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json("Administrador adicionado com sucesso, Email enviado.");
    });

};
exports.removeAdmin = (req, res) => {

    if (!req.query.id) {
        res.status(400).json('Id não pode ser nulo.')
    }
    else if (req.query.id != req.userId) {

        user.findByIdAndDelete(req.query.id, {}, (err, data) => {
            if (err) {
                res.status(400).json(err);
                return;
            }
            res.json("Administrador eliminado com sucesso.");
        });
    }

    else {
        res.status(400).json('Não te podes eliminar a ti próprio.');
    }

};

exports.alterapassAdmin = (req, res) => {
    var password = generator.generate({
        length: 12,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
        strict: true
    });

    user.findByIdAndUpdate(req.query.id, { password: bcrypt.hashSync(password, 8) }, { new: true }, (err, data) => {
        if (err) {
            res.status(500).json(err);
            return;
        }   
        var mailOptions = {
            from: '"Clube de Robótica <no-reply>" clrobotica@deec.uc.pt',
            to: data.email,
            subject: 'Foi enviada uma nova password da sua conta administrador clrobotica.deec.uc.pt',
            html: `        <span style="font-style: italic;font-size:14px">
        Esta mensagem é enviada automaticamente, por favor não responda.
        Em caso de dúvidas ou informações adicionais, aceda a <a href="https://clrobotica.deec.uc.pt"
          target="_blank">clrobotica.deec.uc.pt</a></span><br><br>
    
        Exmo(a). Senhor(a) ${data.nome},<br><br>Informamos que a sua palavra-passe temporária é: ${password} <br>
        <span style="font-style: italic"> Para alterar a sua password por favor diriga-se a <a href="https://clrobotica.deec.uc.pt/admin"
        target="_blank">https://clrobotica.deec.uc.pt/admin</a> > Inicie Sessão > Inicio > Alterar Palavra-Passe</span>
        `
        };

        try {
            transporter.sendMail(mailOptions, (error, response) => {
                if (error) {
                    console.log(`couldn't send mail ${error}`);
                    throw 500;
                } else {
                    console.log('Message sent: %s', response.response);
                }
            });
        } catch (error) {
            console.log('error =' + error);
        }  
    });
    res.json("Nova password enviada com sucesso!");
}

