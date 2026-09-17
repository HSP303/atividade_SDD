# ADR-0002 — Repositório em memória no primeiro incremento

**Estado:** accepted | **Data:** 2026-09-16 | **Revisar quando:** persistência for requisito

## Contexto

O objetivo inicial é provar o processo SDD e a integração web/API sem impor Docker, conta externa ou migrações.

## Decisão

Implementar `ExperimentRepository` e um adaptador em memória. Dados são descartados ao reiniciar e o servidor é destinado a laboratório local de um usuário.

## Consequências e risco

Não há durabilidade nem coordenação entre réplicas. Deploy público e dados reais são proibidos nesta fase. Uma implementação persistente exigirá ADR, migrações reversíveis, backup, retenção, controle de acesso e atualização do modelo de ameaças.
