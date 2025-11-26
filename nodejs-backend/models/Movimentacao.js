const mongoose = require('mongoose');

const MovimentacaoSchema = mongoose.Schema(
  {
    descricao: {
      type: String,
      trim: true, // Remove espaços em branco antes e depois
      required: [true, 'Por favor, adicione uma descrição'],
    },
    valor: {
      type: Number,
      required: [true, 'Por favor, adicione um valor numérico'],
      default: 0,
    },
    tipo: {
      type: String,
      enum: ['receita', 'despesa'], // Garante que seja apenas um desses dois valores
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
    timestamps: true, // Adiciona 'createdAt' e 'updatedAt' automaticamente
  }
);

module.exports = mongoose.model('Movimentacao', MovimentacaoSchema);