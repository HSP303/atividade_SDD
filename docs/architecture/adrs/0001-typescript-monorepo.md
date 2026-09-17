# ADR-0001 — Monorepo TypeScript com contratos compartilhados

**Estado:** accepted | **Data:** 2026-09-16

## Contexto

O laboratório precisa reduzir atrito para uma fatia full stack e manter contrato, cliente e servidor alinhados sem duplicar tipos.

## Decisão

Usar npm workspaces com `apps/web`, `apps/api` e `packages/contracts`. TypeScript estrito é obrigatório. O pacote de contratos contém validação em runtime e tipos derivados; aplicações dependem somente de sua API pública.

## Consequências

Uma instalação e um comando validam tudo. O acoplamento ao formato compartilhado é intencional. OpenAPI continua sendo o contrato interoperável; Zod não o substitui e drift deve ser revisado.
