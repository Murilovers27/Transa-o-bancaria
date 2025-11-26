const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const movimentacoes = require('./routes/movimentacoes.js'); // Importa o arquivo de rotas

// Carrega variáveis de ambiente do .env
dotenv.config();

// Conecta ao banco de dados
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Habilita o Express a ler body de requisições JSON
app.use(cors()); // Habilita o CORS para o frontend

// Monta as rotas
app.use('/api/movimentacoes', movimentacoes);

// Definição da porta
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Servidor rodando em modo ${process.env.NODE_ENV} na porta ${PORT}`)
);