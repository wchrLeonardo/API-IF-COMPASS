# Schemas - Componentes da API

Este diretório contém todos os schemas (modelos de dados) da API IF COMPASS.

## Estrutura:

- `customer.yaml` - Schemas relacionados aos clientes
- `account.yaml` - Schemas relacionados às contas bancárias  
- `transaction.yaml` - Schemas relacionados às transações
- `consent.yaml` - Schemas relacionados aos consentimentos
- `common.yaml` - Schemas comuns (Error, ValidationError, etc.)

## Como usar:

Todos estes arquivos são referenciados no `openapi.yaml` principal através do comando `$ref`.

Exemplo:
```yaml
$ref: './schemas/customer.yaml#/Customer'
```