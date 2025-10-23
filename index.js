import 'dotenv/config';
import express from 'express';
import connection from './src/config/mongodb-connect.config.js';
import errorMiddleware from './src/middlewares/error.middleware.js';
import swaggerUi from 'swagger-ui-express';
import redoc from 'redoc-express';
import swaggerSpecs from './src/config/swagger.config.js';

import customerRoutes from './src/routes/customer.routes.js';
import accountRoutes from './src/routes/account.routes.js';
import transactionRoutes from './src/routes/transaction.routes.js';
import consentRoutes from './src/routes/consent.routes.js';
import openFinanceRoutes from './src/routes/open-finance.routes.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT

app.get('/docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpecs);
});

app.get('/docs', redoc({
  title: 'API IF COMPASS - Documentação',
  specUrl: '/docs/swagger.json',
  redocOptions: {
    theme: {
      colors: {
        primary: {
          main: '#1976d2'
        }
      },
      typography: {
        fontSize: '14px',
        lineHeight: '1.5em',
        code: {
          fontSize: '13px'
        }
      }
    }
  }
}));

app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  customSiteTitle: 'API IF COMPASS - Swagger',
  customCss: '.swagger-ui .topbar { display: none }',
  customfavIcon: '/favicon.ico'
}));

app.use('/open-finance', customerRoutes);
app.use('/open-finance', accountRoutes);
app.use('/open-finance', transactionRoutes);
app.use('/open-finance', consentRoutes);
app.use('/open-finance', openFinanceRoutes);

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Documentação ReDoc: http://localhost:${PORT}/docs`);
  console.log(`📋 Swagger UI: http://localhost:${PORT}/docs/swagger`);
  console.log(`🔗 OpenAPI JSON: http://localhost:${PORT}/docs/swagger.json`);
  console.log('─'.repeat(60));
  connection();
});

