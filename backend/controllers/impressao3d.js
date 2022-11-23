const db = require("../models");
const Impressao3d = db.impressao3d;
const User = db.user;
const Email = db.email;
const File = db.file;

const emailManager = require("../middlewares/emailManager");
var ObjectId = require('mongodb').ObjectId;
var moment = require('moment-timezone');
const fs = require("fs");

const impressao3d = require("../models/impressao3d");
const { file } = require('../models');
const { promisify } = require('util');
const files = require('../models/files');

const unlinkAsync = promisify(fs.unlink);

exports.getImpressao3d = (req,res) => {


    impressao3d.aggregate([
     
    
        {
            $lookup: {
                from: "files",
                localField: "anexos",
                foreignField: "_id",
                as: "anexos"
            }
        },
        { $sort: { 'dataInsercao': -1 } },
        {
            $project: {
                "sent" : 0,
                "anexos.data": 0,
                "anexos.type": 0,
            }
        }
    ], (err, users) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.status(200).json(users);
    }
    );
}


exports.submissaoImpressao3d = async (req, res) => {

    if (!req.file) {
        return res.status(400).json("O ficheiro 3d é de caráter obrigatório.")
    }

      var ficheirosList = [];
    async function saveFile() {

            var ficheiroSync = fs.readFileSync(req.file.path);
         
            const newFile = new File({
                type: req.file.mimetype,
                data: ficheiroSync,
                fileName: req.file.originalname
            })

            await newFile.save().then(fileSaved => {
                ficheirosList.push(fileSaved._id);
            });
            await unlinkAsync(req.file.path);
       
        return;
    }
    if (req.file)
       await saveFile();
    const pedidoimpressao3d = new Impressao3d({
        nome: req.body.nome,
        telemovel: req.body.telemovel,
        email: req.body.email,
        metodopagamento: req.body.metodopagamento,
        observacoes: req.body.observacoes ? req.body.observacoes : '',
        dataInsercao: moment(new Date(), 'UTC').utcOffset(0, true).toDate(),
        anexos: ficheirosList
    });
    pedidoimpressao3d.save((err, oferta) => {
        if (err) {
            if (err.name == 'ValidationError') {
                console.error('Erro nas validações!', err);
                res.status(422).json(err);
                return;
            }
            else {
                res.status(400).json(err);
                return;
            }
        }
        res.json("Pedido de Impressao 3d adicionado com sucesso.");

    });

    }

