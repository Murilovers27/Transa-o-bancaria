const express = require('express');
const router = express.Router();
const { 
  getMovimentacoes, 
  addMovimentacao, 
  deleteMovimentacao,
  getSaldo
} = require('../controllers/movimentacaoController');

// Rota para listar todas as movimentações e adicionar uma nova
router.route('/')
  .get(getMovimentacoes)
  .post(addMovimentacao);

// Rota para obter o saldo total
router.route('/saldo')
  .get(getSaldo);

// Rota para deletar uma movimentação específica
router.route('/:id')
  .delete(deleteMovimentacao);

module.exports = router;