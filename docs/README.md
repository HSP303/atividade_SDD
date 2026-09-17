# Índice de especificações

Este diretório é a fonte de verdade do produto. Em conflito entre documentação e código, a mudança fica incompleta até que ambos voltem a concordar; a intenção aprovada vive aqui.

## Governança

- [Constituição SDD](constitution.md): princípios não negociáveis e quality gates.
- [Visão do produto](product/vision.md): problema, público, escopo e métricas.
- [Glossário](product/glossary.md): vocabulário comum.

## Arquitetura

- [Visão C4](architecture/c4.md)
- [ADR-0001: monorepo TypeScript](architecture/adrs/0001-typescript-monorepo.md)
- [ADR-0002: repositório em memória](architecture/adrs/0002-in-memory-repository.md)

## Segurança

- [Especificação de segurança](security/security-spec.md)
- [Modelo de ameaças](security/threat-model.md)
- [Matriz de verificação](security/verification-matrix.md)

## Features

- [001 — Registro de experimentos](features/001-experiment-registry/spec.md)
  - [Plano](features/001-experiment-registry/plan.md)
  - [Tarefas](features/001-experiment-registry/tasks.md)
  - [Contrato OpenAPI](features/001-experiment-registry/contracts/openapi.yaml)

## Padrão adotado

O fluxo segue o modelo Constitution → Specify → Clarify → Plan → Tasks → Implement → Verify, inspirado no [GitHub Spec Kit](https://github.com/github/spec-kit/blob/main/spec-driven.md). Contratos HTTP usam [OpenAPI 3.1.1](https://spec.openapis.org/oas/v3.1.1.html); arquitetura usa C4 apenas nos níveis úteis; controles usam [OWASP ASVS 5.0](https://owasp.org/projects/asvs), [OWASP API Security Top 10 2023](https://owasp.org/projects/api-security-project) e [NIST SSDF 1.1](https://csrc.nist.gov/pubs/sp/800/218/final).

Cada documento tem estado (`draft`, `review`, `approved`, `implemented`, `verified`), versão e data. Requisitos recebem IDs estáveis e nunca são reciclados.
