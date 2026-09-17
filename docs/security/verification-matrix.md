# Matriz de verificação de segurança

**Versão:** 1.0.0 | **Estado:** implemented

| Requisito | Evidência atual | Estado |
|---|---|---|
| SEC-DATA-001 | visão do produto, limites do contrato e aviso explícito na UI | implementado |
| SEC-DATA-002 | logger não serializa body; revisão de `app.ts` | implementado |
| SEC-DATA-003 | ADR-0002 e README | implementado |
| SEC-API-001 | schemas Zod strict; teste de campo desconhecido | verificado |
| SEC-API-002 | `bodyLimit`, plugin rate-limit | implementado |
| SEC-API-003 | error handler; teste de não vazamento | verificado |
| SEC-API-004 | OpenAPI e rotas `/api/v1` | implementado |
| SEC-API-005 | allowlist e teste de origem hostil | verificado |
| SEC-WEB-001 | Helmet na API | parcial: headers do host web dependem do deploy |
| SEC-WEB-002 | requisito de implantação | pendente até existir deploy |
| SEC-WEB-003 | React text nodes; busca/revisão por HTML dinâmico | implementado |
| SEC-IAM-001 | bind `127.0.0.1`, visão e threat model | implementado no escopo local |
| SEC-CFG-001 | `loadConfig` e recusa de `*` em produção | implementado |
| SEC-CFG-002 | `.env.example`, `.env` ignorado | implementado |
| SEC-SUP-001 | versões fixadas; `package-lock.json` após instalação | implementado |
| SEC-SUP-002 | nenhum workflow CI nesta fatia | pendente |
| SEC-OPS-001 | sem artefato de deploy | pendente |
| SEC-OPS-002 | logger Fastify/request ID | implementado |
| SEC-OPS-003 | processo definido na especificação | especificado |

“Pendente” significa que o requisito não autoriza produção; não significa aceitação silenciosa do risco.
