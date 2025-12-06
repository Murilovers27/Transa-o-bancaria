const express = require('express');
const router = express.Router();
const { 
  getMovimentacoes, 
  addMovimentacao, 
  deleteMovimentacao,
  getSaldo
} = require('../controllers/movimentacaoController');

router.route('/')
  .get(getMovimentacoes)
  .post(addMovimentacao);


router.route('/saldo')
  .get(getSaldo);

router.route('/:id')
  .delete(deleteMovimentacao);

module.exports = router;