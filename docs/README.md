# 📚 Guia da Documentação OpenAPI

<div align="center">

![OpenAPI](https://img.shields.io/badge/OpenAPI-3.1.0-orange?logo=openapi-initiative)
![ReDoc](https://img.shields.io/badge/ReDoc-latest-green)
![Swagger UI](https://img.shields.io/badge/Swagger_UI-latest-blue)

**Documentação completa da API IF COMPASS**

</div>

---

## 📖 Sobre a Documentação

Este diretório contém a especificação completa da API IF COMPASS usando o padrão OpenAPI 3.1.0. A documentação é gerada automaticamente a partir do arquivo `openapi.yaml` e disponibilizada em diferentes formatos para facilitar o uso e a compreensão.

A documentação é a fonte principal de informações sobre endpoints, modelos de dados e formatos de requisição/resposta da API.

## 📁 Estrutura Atual

```
docs/
├── openapi.yaml     # Arquivo principal (consolidado)
├── README.md        # Este guia
└── components/      # Diretório reservado para componentes (futuro)
```

> **Nota**: Atualmente, toda a documentação está consolidada em um único arquivo `openapi.yaml` para facilitar a manutenção.

## 🔍 Como Navegar na Documentação

A documentação está organizada por tags que representam os principais recursos da API:

| Tag | Descrição | Endpoints |
|-----|-----------|-----------|
| **Customers** | Gestão de clientes | 5 endpoints |
| **Accounts** | Gestão de contas bancárias | 6 endpoints |
| **Transactions** | Operações financeiras | 3 endpoints |
| **Consents** | Gerenciamento de permissões | 5 endpoints |

## 🚀 Interfaces de Documentação

A API oferece três maneiras diferentes de acessar a documentação:

### 1. ReDoc (Recomendado)
Interface elegante e responsiva para consulta.
- **URL**: `http://localhost:5000/docs`
- **Características**: 
  - Navegação intuitiva
  - Seções expansíveis
  - Renderização de markdown
  - Visualização de exemplos

### 2. Swagger UI
Interface interativa para teste e exploração.
- **URL**: `http://localhost:5000/docs/swagger`
- **Características**:
  - Execute requisições em tempo real
  - Formulários interativos
  - Visualize respostas
  - Debug de endpoints

### 3. Especificação JSON
Formato bruto para integração com outras ferramentas.
- **URL**: `http://localhost:5000/docs/swagger.json`

## 🧩 Módulos Documentados

Todos os módulos da API estão completamente documentados:

### 👤 Customers (Clientes)
- `GET /customers` - Lista paginada de clientes
- `POST /customers` - Criação de cliente
- `GET /customers/{id}` - Detalhes de um cliente
- `PUT /customers/{id}` - Atualização de cliente
- `DELETE /customers/{id}` - Remoção de cliente

### � Accounts (Contas)
- `POST /accounts/customers/{id}` - Criação de conta
- `GET /accounts/customers/{id}` - Contas de um cliente
- `GET /accounts/{id}` - Detalhes de uma conta
- `GET /accounts/{id}/balance` - Saldo da conta
- `GET /accounts/{id}/aggregated-view` - Visão consolidada
- `DELETE /accounts/{id}` - Remoção de conta

### 💰 Transactions (Transações)
- `POST /transactions/accounts/{id}` - Nova transação
- `GET /transactions/accounts/{id}` - Listar transações
- `GET /transactions/{id}` - Detalhes da transação

### 🔐 Consents (Consentimentos)
- `POST /consents` - Criar consentimento
- `GET /consents/customer/{id}` - Listar consentimentos
- `GET /consents/account/{id}` - Consentimento da conta
- `PATCH /consents/{id}/customer/{id}/revoke` - Revogar específico
- `PATCH /consents/customer/{id}/revoke-all` - Revogar todos

## � Modelos de Dados

A documentação inclui definições completas dos seguintes modelos:

| Modelo | Descrição | Propriedades |
|--------|-----------|-------------|
| `Customer` | Cliente bancário | 7 propriedades |
| `Account` | Conta bancária | 8 propriedades |
| `Transaction` | Operação financeira | 7 propriedades |
| `Consent` | Permissão de acesso | 8 propriedades |
| `Error` | Resposta de erro | 2 propriedades |

## 🛠️ Como Contribuir com a Documentação

Para manter a documentação atualizada:

1. **Edite o arquivo `openapi.yaml`** para adicionar/modificar endpoints
2. **Mantenha a consistência** nos formatos de resposta
3. **Adicione exemplos realistas** para cada operação
4. **Teste a visualização** no ReDoc e Swagger UI

## 📋 Padrões e Convenções

A documentação segue convenções específicas:

- **IDs Customizados**: Formato padronizado com prefixos (ex: `cus_001`)
- **Paginação**: Metadados consistentes em todas as listas
- **Timestamps**: `createdAt` e `updatedAt` em todos os recursos
- **Respostas de Erro**: Formato padronizado com `message` e `details`
- **Exemplos**: Dados realistas para todas as operações

## 🔗 Links Úteis

- [Guia OpenAPI 3.1.0](https://spec.openapis.org/oas/v3.1.0)
- [Melhores Práticas ReDoc](https://github.com/Redocly/redoc)
- [Documentação Swagger UI](https://swagger.io/docs/open-source-tools/swagger-ui/usage/configuration/)
- [JSON Schema](https://json-schema.org/understanding-json-schema/)

---

<div align="center">

**Desenvolvido para o desafio COMPASS por Leonardo Ferreira**

</div>