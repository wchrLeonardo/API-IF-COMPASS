# Documentação da API IF COMPASS

Esta pasta contém toda a documentação OpenAPI 3.1.0 da API IF COMPASS organizada de forma modular.

## 📁 Estrutura do Diretório

```
docs/
├── openapi.yaml           # Arquivo principal da documentação
├── components/            # Respostas e componentes reutilizáveis
├── paths/                 # Definições de endpoints (em breve)
└── schemas/               # Modelos de dados
    ├── README.md          
    ├── customer.yaml      # Schemas de clientes
    ├── account.yaml       # Schemas de contas
    ├── transaction.yaml   # Schemas de transações
    ├── consent.yaml       # Schemas de consentimentos
    └── common.yaml        # Schemas comuns (Error, etc.)
```

## 🚀 Como Acessar

1. **ReDoc** (Interface elegante): `http://localhost:5000/docs`
2. **Swagger UI** (Interface funcional): `http://localhost:5000/docs/swagger`
3. **JSON puro**: `http://localhost:5000/docs/swagger.json`

## 📚 Módulos Documentados

### ✅ Customers (Clientes)
- `POST /customers` - Criar cliente
- `GET /customers` - Listar clientes (paginado)
- `GET /customers/{id}` - Buscar cliente por ID
- `PUT /customers/{id}` - Atualizar cliente
- `DELETE /customers/{id}` - Excluir cliente

### 🔄 Em Desenvolvimento
- **Accounts** - Gestão de contas bancárias
- **Transactions** - Registro e consulta de transações
- **Consents** - Gerenciamento de consentimentos

## 🛠️ Tecnologias

- **OpenAPI 3.1.0** - Especificação moderna
- **ReDoc** - Interface de documentação elegante
- **Swagger UI** - Interface tradicional com teste
- **YAML** - Formato limpo e legível

## 📋 Padrões Utilizados

- **IDs Customizados**: `cus_001`, `acc_001`, `txn_001`, `con_001`
- **Paginação Automática**: Suporte completo com metadados
- **Timestamps**: `createdAt` e `updatedAt` automáticos
- **Validações**: Schemas rigorosos com padrões específicos
- **Exemplos**: Dados realistas para cada endpoint