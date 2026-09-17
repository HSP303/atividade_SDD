# Constituição SDD

**Versão:** 1.0.0  
**Ratificada:** 2026-09-16  
**Estado:** approved

## I. Especificação é a fonte de verdade

Toda mudança observável MUST ter especificação aprovada antes do código. A especificação descreve intenção e resultado, não detalhes acidentais da implementação. Mudança emergencial MAY começar no código somente se a especificação e o registro da exceção forem corrigidos antes do merge.

## II. Rastreabilidade bilateral

Cada requisito MUST ter ID imutável (`FR-*`, `NFR-*`, `SEC-*`). Plano, tarefas, contrato e testes MUST apontar para esses IDs. Código sem requisito e requisito implementado sem evidência são falhas do mesmo nível.

## III. Contrato antes da integração

Interfaces entre aplicações e pacotes MUST ser descritas antes da implementação. HTTP usa OpenAPI; esquemas de runtime ficam em `packages/contracts`. Mudança incompatível MUST criar nova versão de API ou plano explícito de migração.

## IV. Segurança e privacidade por design

Toda feature MUST classificar dados, fronteiras de confiança, abuso previsível e impacto nos controles. Entrada externa é não confiável. Menor privilégio, deny-by-default, minimização de dados, limites de recursos, mensagens de erro seguras e gestão externa de segredos são obrigatórios. Nenhum dado pessoal é permitido no MVP.

## V. Testes demonstram conformidade

Critérios de aceitação MUST ser testáveis. Regras de domínio têm testes unitários; contratos e controles de fronteira têm testes de integração; jornadas críticas SHOULD ter testes end-to-end. Um teste deve citar o requisito que demonstra sempre que não for óbvio pelo nome.

## VI. Simplicidade e fronteiras explícitas

A menor arquitetura que satisfaz os requisitos prevalece. Aplicações não importam código interno umas das outras; compartilham apenas pacotes com contrato público. Novos serviços, bancos, filas ou frameworks exigem ADR.

## VII. Observabilidade sem vazamento

Operações MUST produzir IDs de correlação e logs estruturados apropriados ao ambiente. Logs MUST NOT conter segredos, credenciais, corpos integrais ou dados pessoais. Falhas externas não expõem stack trace nem detalhes internos.

## Quality gates

Uma feature só chega a `verified` quando:

1. não há `[NEEDS CLARIFICATION]` aberto;
2. os MUST da constituição foram checados no plano;
3. contrato, implementação e testes concordam;
4. análise de segurança e matriz de rastreabilidade estão atualizadas;
5. `npm run check` passa;
6. limitações e riscos residuais têm responsável e decisão registrada.

## Emendas

Mudanças exigem justificativa, revisão, avaliação de compatibilidade e incremento SemVer desta constituição. MAJOR remove ou redefine princípio; MINOR adiciona/expande obrigação; PATCH esclarece sem alterar significado.
