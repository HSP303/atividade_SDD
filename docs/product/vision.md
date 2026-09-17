# Visão do produto — LabSpec

**Versão:** 1.0.0 | **Estado:** approved | **Atualizado:** 2026-09-16

## Problema

Equipes em laboratório frequentemente começam pelo framework e perdem a ligação entre hipótese, requisito, decisão e prova. O LabSpec oferece uma base pequena na qual cada experimento de software nasce como especificação rastreável.

## Usuário primário

Pessoa desenvolvedora aprendendo ou avaliando práticas full stack e SDD em ambiente local, sem dados reais ou sensíveis.

## Resultado desejado

Em até 15 minutos, uma pessoa deve conseguir instalar o projeto, iniciar web e API, registrar um experimento e localizar o requisito e o teste que definem esse comportamento.

## Escopo MVP

- criar, consultar, atualizar e remover registros de experimentos;
- estado `draft`, `running` ou `completed`;
- API HTTP versionada e interface web responsiva;
- armazenamento efêmero em memória;
- execução local para um único usuário, sem autenticação e sem dados pessoais.

## Fora de escopo

Multiusuário, autenticação, anexos, colaboração, produção pública, persistência durável e dados pessoais. A entrada de qualquer item exige nova feature, modelo de ameaças revisado e, para autenticação/persistência, ADR próprio.

## Métricas

- 100% dos requisitos MUST com tarefa e evidência na matriz;
- `npm run check` verde no branch principal;
- zero segredo ou dado pessoal no repositório e nos logs;
- primeira execução local documentada em até 15 minutos.
