import express from 'express';
import dotenv from 'dotenv';
import connection from './src/config/mongodb-connect.js';

import customerRoutes from './src/routes/customer.router.js';
import accountRoutes from './src/routes/account.router.js';
import transactionRoutes from './src/routes/transaction.router.js';

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT

app.use('/', customerRoutes);
app.use('/', accountRoutes);
app.use('/', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  connection();
});

