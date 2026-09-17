# Regras para agentes e contribuidores

Este repositorio usa SDD. Antes de alterar codigo:

1. Leia `docs/constitution.md` e o `spec.md` da feature.
2. Se nao existir uma especificacao, crie-a a partir de `docs/templates/feature-spec.md`.
3. Nao invente requisitos silenciosamente: marque `[NEEDS CLARIFICATION]` e resolva antes da implementacao.
4. Mantenha rastreabilidade `requisito -> tarefa -> teste`.
5. Mudancas de API exigem atualizar primeiro o contrato OpenAPI.
6. Mudancas em fronteiras de confianca, dados, autenticacao ou autorizacao exigem atualizar `docs/security/`.
7. Nunca registre segredos, tokens, cookies, corpos sensiveis ou dados pessoais.
8. Execute `npm run check` antes de declarar uma tarefa concluida.

Requisitos normativos usam MUST/SHOULD/MAY conforme RFC 2119. Excecoes a um MUST exigem ADR, risco, responsavel e prazo.
