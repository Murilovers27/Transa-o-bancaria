const mongoose = require('mongoose');

const MovimentacaoSchema = mongoose.Schema(
  {
    descricao: {
      type: String,
      trim: true, 
      required: [true, 'Por favor, adicione uma descrição'],
    },
    valor: {
      type: Number,
      required: [true, 'Por favor, adicione um valor numérico'],
      default: 0,
    },
    tipo: {
      type: String,
      enum: ['receita', 'despesa'], 
      required: [true, 'Por favor, especifique o tipo (receita ou despesa)'],
    },
    categoria: {
      type: String,
      required: [true, 'Por favor, adicione uma categoria'],
      trim: true,
    },
    data: {
      type: Date,
      required: [true, 'Por favor, adicione a data da movimentação'],
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Movimentacao', MovimentacaoSchema);