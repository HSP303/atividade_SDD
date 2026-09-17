# Modelo de ameaças — STRIDE

**Versão:** 1.0.0 | **Estado:** implemented | **Atualizado:** 2026-09-16

## Ativos

Integridade dos experimentos, disponibilidade local, código/lockfile, configuração e logs. Não há dado pessoal permitido.

## Atores e fronteiras

- pessoa local legítima;
- página/site malicioso no navegador;
- cliente HTTP arbitrário;
- dependência comprometida;
- operador que configura o processo incorretamente.

## Ameaças priorizadas

| ID | STRIDE | Cenário | Impacto | Controles | Residual |
|---|---|---|---|---|---|
| TM-01 | Spoofing/Elevation | serviço é exposto na rede e qualquer cliente altera registros | alto | bind local padrão; SEC-IAM-001 | proibido expor antes de autenticação |
| TM-02 | Tampering | cliente envia campos inesperados/mass assignment | médio | schemas strict; SEC-API-001 | baixo |
| TM-03 | Repudiation | ação não pode ser correlacionada | baixo no MVP | request ID e logs; SEC-OPS-002 | não há identidade de usuário |
| TM-04 | Information disclosure | erro ou log revela entrada/interno | médio | error handler e SEC-API-003/DATA-002 | baixo |
| TM-05 | Denial of service | corpos ou frequência esgotam processo | médio | 16 KiB, rate limit; SEC-API-002 | memória do repositório ainda não tem quota global |
| TM-06 | Tampering | site hostil usa navegador para chamar API | médio | allowlist CORS; SEC-API-005 | clientes não-browser ignoram CORS |
| TM-07 | Supply chain | pacote malicioso entra no build | alto | lockfile, versões fixas, revisão; SEC-SUP-* | scanners de CI ainda pendentes |
| TM-08 | XSS | texto do experimento vira HTML executável | alto | renderização React como texto; SEC-WEB-003 | baixo |

## Gatilhos de nova análise

Autenticação, persistência, upload, URL fornecida por usuário, chamada a terceiros, PII, deploy público, proxy reverso, filas ou execução de código exigem revisão antes da implementação.
