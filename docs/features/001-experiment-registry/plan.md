# Plano — Feature 001

**Estado:** implemented

## Abordagem

Implementar schemas no pacote de contratos; uma interface de repositório e adaptador em memória na API; rotas Fastify sob `/api/v1`; uma interface React que cria e lista registros.

## Constitution check

| Princípio | Evidência |
|---|---|
| Especificação primeiro | `spec.md` e contrato versionados |
| Rastreabilidade | IDs no spec, tarefas e matriz abaixo |
| Contrato primeiro | `contracts/openapi.yaml` e Zod |
| Segurança por design | threat model e security spec atualizados |
| Simplicidade | ADR-0002 evita infraestrutura prematura |

## Sequência

1. Contratos e tipos.
2. Repositório e rotas API.
3. Testes de contrato/comportamento/segurança.
4. Cliente web acessível.
5. Verificação completa e atualização de estado.

## Matriz de rastreabilidade

| Requisito | Tarefa | Evidência |
|---|---|---|
| FR-001, FR-002 | T-002, T-004 | teste “creates and lists”; schemas Zod |
| FR-003 | T-003, T-004 | teste de listagem e repository |
| FR-004–FR-007 | T-003, T-008 | rotas + OpenAPI + testes de get/update/delete/ordenação |
| NFR-001 | T-001 | OpenAPI 3.1.1 |
| NFR-002 | T-005 | labels, role=alert, CSS responsivo |
| NFR-003 | T-007 | pendente: benchmark antes de produção |
| NFR-004 | T-006 | README + ADR-0002 |
| NFR-005 | T-004, T-006 | testes e matriz de segurança |

## Riscos

Drift entre OpenAPI e Zod é revisado manualmente nesta fase; automação de contract testing é próxima melhoria. Não há autenticação: bind local e proibição de deploy público são controles de escopo, não substitutos permanentes.
