# Especificação de segurança

**Versão:** 1.0.0 | **Estado:** implemented | **Baseline:** OWASP ASVS 5.0 nível 1 adaptado ao escopo

As palavras MUST, SHOULD e MAY são normativas. Esta especificação complementa, não declara certificação com, OWASP ASVS, OWASP API Top 10 e NIST SSDF.

## Dados e privacidade

- **SEC-DATA-001 (MUST):** o MVP aceita apenas metadados técnicos não sensíveis. UI e documentação MUST orientar a não inserir dados pessoais, credenciais ou segredos.
- **SEC-DATA-002 (MUST):** logs MUST NOT registrar corpos de requisição, tokens, segredos ou dados pessoais.
- **SEC-DATA-003 (MUST):** coleta e retenção são minimizadas; armazenamento atual é efêmero e essa limitação MUST ser visível.

## Entrada, saída e API

- **SEC-API-001 (MUST):** todo parâmetro, corpo e configuração externa é validado no servidor com allowlist, tipo, tamanho e limites de faixa; propriedades desconhecidas são rejeitadas.
- **SEC-API-002 (MUST):** corpos HTTP são limitados a 16 KiB e requisições a 100 por minuto por origem de rede por padrão.
- **SEC-API-003 (MUST):** erros externos usam `application/problem+json`, não contêm stack, nomes internos, entrada rejeitada ou detalhes de dependência.
- **SEC-API-004 (MUST):** endpoints ficam sob `/api/v1`; o contrato OpenAPI lista toda operação publicada.
- **SEC-API-005 (MUST):** CORS usa allowlist explícita. CORS MUST NOT ser tratado como autenticação ou autorização.

## Navegador e transporte

- **SEC-WEB-001 (MUST):** respostas incluem headers defensivos, ao menos anti-MIME-sniffing, anti-framing, política de referer e CSP apropriada ao tipo de conteúdo.
- **SEC-WEB-002 (MUST):** produção pública exige TLS 1.2+ no proxy e redirecionamento de HTTP; desenvolvimento local é a única exceção.
- **SEC-WEB-003 (MUST):** conteúdo fornecido pelo usuário é renderizado como texto; `dangerouslySetInnerHTML`, HTML não sanitizado e execução dinâmica são proibidos.

## Identidade e acesso

- **SEC-IAM-001 (MUST):** o sistema atual é single-user local e não oferece garantias de isolamento entre usuários. Antes de exposição em rede ou inclusão de dados reais, autenticação e autorização deny-by-default MUST ser especificadas e implementadas.
- **SEC-IAM-002 (MUST):** toda futura leitura/escrita por ID verifica autorização no objeto e na função, cobrindo OWASP API1/API5; possuir um UUID não concede acesso.
- **SEC-IAM-003 (SHOULD):** autenticação futura usa provedor OIDC/OAuth 2.1 estabelecido; não criar criptografia ou gestão de senha própria.

## Configuração, segredos e cadeia de suprimento

- **SEC-CFG-001 (MUST):** configuração é validada ao iniciar; produção falha fechada para wildcard CORS. `trustProxy` só muda com topologia documentada.
- **SEC-CFG-002 (MUST):** segredos vêm de secret manager ou ambiente, nunca de Git, logs, URL ou variável `VITE_*`.
- **SEC-SUP-001 (MUST):** lockfile é versionado e CI usa instalação reprodutível; dependências diretas são fixadas e revisadas.
- **SEC-SUP-002 (SHOULD):** CI executa análise de dependências, secret scanning, SAST e atualização automatizada. Vulnerabilidade crítica explorável bloqueia release.

## Operação e resposta

- **SEC-OPS-001 (MUST):** produção usa usuário sem privilégio, filesystem/read-only quando possível e limites de CPU/memória.
- **SEC-OPS-002 (MUST):** logs são estruturados, possuem request ID e distinguem evento operacional de detalhe sensível.
- **SEC-OPS-003 (MUST):** incidente confirmado requer contenção, preservação de evidência, correção, rotação de segredo afetado e análise de causa.

## Política de exceção

Exceção a MUST requer ADR com controle compensatório, risco residual, proprietário e data de expiração. “Ambiente de laboratório” não é justificativa para segredo no código ou validação ausente.
