var mongoose = require('mongoose');

var impressao3dSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    telemovel: String,
    metodopagamento: String,
    preco:
    {
        type:Number,
        default:0,
        required:true
    },
    email: String,
    observacoes: String,
    dataInsercao: Date,
    estado:
    {
        type: String,
        default: 'Em análise',
        required: true
    },
    sent:
    {
        type: Boolean,
        default: false,
        required: true
    },
    anexos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'file'
    }],
})

module.exports = mongoose.model('impressao3d', impressao3dSchema);