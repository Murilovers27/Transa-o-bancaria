const Movimentacao = require('../models/movimentacao');

// @desc    Obter todas as movimentações
// @route   GET /api/movimentacoes
// @access  Public
exports.getMovimentacoes = async (req, res, next) => {
  try {
    const movimentacoes = await Movimentacao.find().sort({ data: -1 }); // Ordena pela data mais recente

    return res.status(200).json({
      success: true,
      count: movimentacoes.length,
      data: movimentacoes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erro do Servidor',
    });
  }
};

// @desc    Calcular o saldo total
// @route   GET /api/movimentacoes/saldo
// @access  Public
exports.getSaldo = async (req, res, next) => {
  try {
    const movimentacoes = await Movimentacao.find();
    
    // Calcula o saldo, somando as receitas e subtraindo as despesas
    const saldo = movimentacoes.reduce((acc, mov) => {
        return acc + (mov.tipo === 'receita' ? mov.valor : -mov.valor);
    }, 0);

    return res.status(200).json({
      success: true,
      data: { saldo: saldo },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erro do Servidor',
    });
  }
};


// @desc    Adicionar nova movimentação
// @route   POST /api/movimentacoes
// @access  Public
exports.addMovimentacao = async (req, res, next) => {
  try {
    const movimentacao = await Movimentacao.create(req.body);

    // Retorna 201 Created com a nova movimentação
    return res.status(201).json({
      success: true,
      data: movimentacao,
    });
  } catch (error) {
    // Tratamento de erros de validação (ex: campo requerido faltando)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Erro do Servidor',
      });
    }
  }
};

// @desc    Deletar movimentação
// @route   DELETE /api/movimentacoes/:id
// @access  Public
exports.deleteMovimentacao = async (req, res, next) => {
  try {
    const movimentacao = await Movimentacao.findById(req.params.id);

    if (!movimentacao) {
      return res.status(404).json({
        success: false,
        error: 'Movimentação não encontrada',
      });
    }

    await Movimentacao.deleteOne({ _id: req.params.id });

    // Retorna 204 No Content (sucesso sem corpo de resposta)
    return res.status(204).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erro do Servidor',
    });
  }
};