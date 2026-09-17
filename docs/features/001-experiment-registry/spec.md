# Feature 001 — Registro de experimentos

**Versão:** 1.0.0 | **Estado:** implemented | **Prioridade:** P1

## Intenção

Permitir que uma pessoa em laboratório registre e consulte experimentos técnicos, criando uma primeira fatia vertical que demonstre o fluxo SDD completo.

## Histórias e cenários

### US-001 — Registrar experimento

Como pessoa desenvolvedora, quero registrar título e descrição para tornar explícito o que estou investigando.

```gherkin
Dado que a aplicação local está disponível
Quando envio título válido e descrição opcional
Então o experimento é criado como draft
E recebo seu UUID e timestamps
```

### US-002 — Consultar registro

Como pessoa desenvolvedora, quero ver os experimentos mais recentes primeiro para retomar meu trabalho.

```gherkin
Dado que existem dois experimentos
Quando consulto o registro
Então recebo ambos ordenados do mais recente para o mais antigo
```

### US-003 — Evoluir e remover

Como pessoa desenvolvedora, quero editar estado/conteúdo ou remover um registro incorreto.

```gherkin
Dado um UUID existente
Quando altero campos permitidos ou solicito remoção
Então somente esse experimento é alterado ou removido
```

## Requisitos funcionais

- **FR-001:** criar experimento com título de 3–100 caracteres e descrição de até 1000.
- **FR-002:** gerar UUID, estado `draft` e timestamps ISO 8601 no servidor.
- **FR-003:** listar experimentos em ordem decrescente de criação.
- **FR-004:** obter um experimento por UUID; inexistente retorna 404 seguro.
- **FR-005:** atualizar título, descrição e/ou estado; objeto vazio é inválido.
- **FR-006:** remover por UUID e retornar 204; inexistente retorna 404.
- **FR-007:** estados válidos são `draft`, `running`, `completed`.

## Não funcionais

- **NFR-001:** API versionada e documentada em OpenAPI 3.1.1.
- **NFR-002:** web utilizável a partir de 320 px e com labels/alertas acessíveis.
- **NFR-003:** respostas locais sem carga devem completar em até 200 ms no p95 em máquina de desenvolvimento; medição automatizada é futura.
- **NFR-004:** dados são efêmeros e não podem ser tratados como backup ou fonte durável.
- **NFR-005:** todos os controles `SEC-API-*`, `SEC-DATA-*` e `SEC-WEB-003` aplicáveis são gates.

## Fora de escopo

Login, múltiplos usuários, paginação, busca, anexos, persistência e execução do experimento.

## Critério de conclusão

Contrato, web, API e testes passam; matriz requisito-tarefa-teste não possui requisito órfão; limitações estão visíveis.
