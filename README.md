# 🏦 API IF COMPASS

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-blue?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green?logo=mongodb)
![OpenAPI](https://img.shields.io/badge/OpenAPI-3.1.0-orange?logo=openapi-initiative)
![License](https://img.shields.io/badge/License-MIT-yellow)

**API bancária RESTful completa desenvolvida para o desafio COMPASS**

[📚 Documentação](#-documentação) • [🚀 Instalação](#-instalação) • [🔗 Endpoints](#-endpoints) • [🛠️ Tecnologias](#️-stack-tecnológico)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Documentação](#-documentação)
- [Endpoints](#-endpoints)
- [Exemplos de Uso](#-exemplos-de-uso)
- [Contribuição](#-contribuição)

---

## 🎯 Sobre o Projeto

A **API IF COMPASS** é uma solução bancária moderna e completa, desenvolvida como parte do desafio técnico da COMPASS. Implementa funcionalidades essenciais de um sistema bancário, incluindo:

- 👤 **Gestão de Clientes** com validação de CPF
- 💳 **Contas Bancárias** (Corrente e Poupança)
- 💰 **Sistema de Transações** com controle de saldo
- 🔐 **Consentimentos** para Open Banking

---

## ✨ Funcionalidades

### 🏗️ Arquitetura
- ✅ **Arquitetura MVC** bem estruturada
- ✅ **RESTful API** seguindo melhores práticas
- ✅ **Middleware de erro** centralizado
- ✅ **Validação robusta** de dados
- ✅ **Auto-incremento** de IDs customizados

### 🔒 Segurança
- ✅ **Validação de CPF** integrada
- ✅ **Sanitização** de dados de entrada
- ✅ **Tratamento de erros** padronizado
- ✅ **Headers de segurança** configurados

### 📊 Recursos Avançados
- ✅ **Paginação inteligente** com metadados
- ✅ **Visão agregada** de contas
- ✅ **Sistema de categorias** para transações
- ✅ **Controle de consentimentos** granular

---

## 🛠️ Stack Tecnológico

<table>
<tr>
<td align="center"><strong>Backend</strong></td>
<td align="center"><strong>Banco de Dados</strong></td>
<td align="center"><strong>Documentação</strong></td>
<td align="center"><strong>Ferramentas</strong></td>
</tr>
<tr>
<td align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,express" />
  <br>Node.js + Express
</td>
<td align="center">
  <img src="https://skillicons.dev/icons?i=mongodb" />
  <br>MongoDB + Mongoose
</td>
<td align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg" width="50" />
  <br>OpenAPI 3.1.0
</td>
<td align="center">
  <img src="https://skillicons.dev/icons?i=vscode,git" />
  <br>VS Code + Git
</td>
</tr>
</table>

---

## 📁 Estrutura do Projeto

```
api_IF/
├── 📄 index.js                 # Ponto de entrada da aplicação
├── 📄 package.json             # Dependências e scripts
├── 📁 src/                     # Código fonte principal
│   ├── 📁 config/              # Configurações
│   │   ├── mongodb-connect.js  # Conexão com MongoDB
│   │   └── swagger.config.js   # Configuração do Swagger
│   ├── 📁 controllers/         # Controladores (lógica de negócio)
│   │   ├── customer.controller.js
│   │   ├── account.controller.js
│   │   ├── transaction.controller.js
│   │   └── consent.controller.js
│   ├── 📁 services/            # Camada de serviços
│   │   ├── customer.service.js
│   │   ├── account.service.js
│   │   ├── transaction.service.js
│   │   └── consent.service.js
│   ├── 📁 models/              # Modelos do MongoDB
│   │   ├── customer.model.js
│   │   ├── account.model.js
│   │   ├── transaction.model.js
│   │   ├── consent.model.js
│   │   └── counter.model.js
│   ├── 📁 routes/              # Definição de rotas
│   │   ├── customer.routes.js
│   │   ├── account.routes.js
│   │   ├── transaction.routes.js
│   │   └── consent.routes.js
│   ├── 📁 middlewares/         # Middlewares customizados
│   │   └── error.middleware.js
│   ├── 📁 exceptions/          # Tratamento de exceções
│   │   └── api-errors.exception.js
│   └── 📁 plugins/             # Plugins do Mongoose
│       └── custom-auto-increment-id.plugin.js
└── 📁 docs/                    # Documentação OpenAPI
    ├── openapi.yaml            # Especificação completa da API
    └── README.md               # Documentação da API
```

---

## 🚀 Instalação

### Pré-requisitos

- Node.js 20.x ou superior
- MongoDB 7.x ou superior
- npm ou yarn

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/wchrLeonardo/API-IF-COMPASS.git
   cd API-IF-COMPASS
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. **Execute o servidor**
   ```bash
   # Desenvolvimento
   npm run dev
   
   # Produção
   npm start
   ```

5. **Acesse a aplicação**
   - API: `http://localhost:5000`
   - Documentação: `http://localhost:5000/docs`

---

## 📚 Documentação

### 🌐 Interfaces Disponíveis

| Interface | URL | Descrição |
|-----------|-----|-----------|
| **ReDoc** | `/docs` | Interface elegante e responsiva |
| **Swagger UI** | `/docs/swagger` | Interface interativa para testes |
| **OpenAPI JSON** | `/docs/swagger.json` | Especificação raw em JSON |

### 📖 Guias de Uso

- [📘 Guia de Clientes](./docs#customers)
- [💳 Guia de Contas](./docs#accounts)
- [💰 Guia de Transações](./docs#transactions)
- [🔐 Guia de Consentimentos](./docs#consents)

---

## 🔗 Endpoints

### 👤 Clientes

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| `GET` | `/customers` | Lista clientes (paginado) | ✅ |
| `POST` | `/customers` | Cria novo cliente | ✅ |
| `GET` | `/customers/{id}` | Busca cliente por ID | ✅ |
| `PUT` | `/customers/{id}` | Atualiza cliente | ✅ |
| `DELETE` | `/customers/{id}` | Remove cliente | ✅ |

### 💳 Contas

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| `POST` | `/accounts/customers/{id}` | Cria conta para cliente | ✅ |
| `GET` | `/accounts/customers/{id}` | Lista contas do cliente | ✅ |
| `GET` | `/accounts/{id}` | Busca conta por ID | ✅ |
| `GET` | `/accounts/{id}/balance` | Consulta saldo da conta | ✅ |
| `GET` | `/accounts/{id}/aggregated-view` | Visão completa da conta | ✅ |
| `DELETE` | `/accounts/{id}` | Remove conta | ✅ |

### 💰 Transações

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| `POST` | `/transactions/accounts/{id}` | Cria transação | ✅ |
| `GET` | `/transactions/accounts/{id}` | Lista transações da conta | ✅ |
| `GET` | `/transactions/{id}` | Busca transação por ID | ✅ |

### 🔐 Consentimentos

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| `POST` | `/consents` | Cria consentimento | ✅ |
| `GET` | `/consents/customer/{id}` | Lista consentimentos do cliente | ✅ |
| `GET` | `/consents/account/{id}` | Busca consentimento da conta | ✅ |
| `PATCH` | `/consents/customer/{id}/revoke-all` | Revoga todos os consentimentos | ✅ |
| `PATCH` | `/consents/{id}/customer/{id}/revoke` | Revoga consentimento específico | ✅ |

---

## 💡 Exemplos de Uso

### Criar um Cliente

```bash
curl -X POST http://localhost:5000/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva Santos",
    "cpf": "12345678901",
    "email": "joao.silva@email.com"
  }'
```

**Resposta:**
```json
{
  "id": "cus_001",
  "name": "João Silva Santos",
  "cpf": "12345678901",
  "email": "joao.silva@email.com",
  "accounts": [],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Criar uma Conta

```bash
curl -X POST http://localhost:5000/accounts/customers/cus_001 \
  -H "Content-Type: application/json" \
  -d '{
    "type": "checking",
    "branch": "1234",
    "number": "567890",
    "owner": "cus_001"
  }'
```

### Registrar uma Transação

```bash
curl -X POST http://localhost:5000/transactions/accounts/acc_001 \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1500.00,
    "type": "credit",
    "description": "Depósito inicial",
    "category": "deposit"
  }'
```

---

## 🔧 Configuração

### Variáveis de Ambiente

```env
# Servidor
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/api_if_compass

# Outras configurações
NODE_ENV=development
```

### Scripts Disponíveis

```bash
npm start          # Inicia em produção
npm run dev        # Inicia em desenvolvimento com nodemon
npm test           # Executa testes (quando implementados)
npm run lint       # Verifica código com ESLint
```

---

## 🎨 Padrões e Convenções

### 🆔 Sistema de IDs

- **Clientes**: `cus_001`, `cus_002`, ...
- **Contas**: `acc_001`, `acc_002`, ...
- **Transações**: `txn_001`, `txn_002`, ...
- **Consentimentos**: `con_001`, `con_002`, ...

### 📅 Timestamps

Todos os recursos incluem:
- `createdAt`: Data de criação (ISO-8601)
- `updatedAt`: Data da última atualização (ISO-8601)

### 💰 Formato Monetário

- Valores sempre em **BRL**
- Precisão de **2 casas decimais**
- Formato: `1500.50`

---

## 🚨 Tratamento de Erros

A API retorna erros padronizados:

```json
{
  "message": "Erro de validação nos dados enviados",
  "details": {
    "cpf": "CPF deve conter 11 dígitos",
    "email": "Email já cadastrado"
  }
}
```

### Códigos de Status

| Código | Descrição |
|--------|-----------|
| `200` | Sucesso |
| `201` | Criado com sucesso |
| `204` | Sucesso sem conteúdo |
| `400` | Dados inválidos |
| `404` | Recurso não encontrado |
| `500` | Erro interno do servidor |

---

## 👨‍💻 Desenvolvedor

<div align="center">

**Leonardo Ferreira**

[![GitHub](https://img.shields.io/badge/GitHub-wchrLeonardo-black?logo=github)](https://github.com/wchrLeonardo)
[![Email](https://img.shields.io/badge/Email-leo.wlferreira%40email.com-red?logo=gmail)](mailto:leo.wlferreira@email.com)

</div>

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

</div>