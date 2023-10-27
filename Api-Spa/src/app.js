const express = require('express');
const app = express();
const morgan = require('morgan');

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Rota não encontrada');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message
  });
});

app.listen(port, () => {
  console.log(`Api-spa está rodando na porta: ${port}`);
});
