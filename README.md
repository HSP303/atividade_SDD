# LabSpec

Monorepo full stack TypeScript para experimentar **Specification-Driven Development (SDD)**. A especificacao e a fonte de verdade: toda mudanca funcional comeca em `docs/features/` e so depois segue para plano, tarefas, contratos, codigo e testes.

## Stack

- `apps/web`: React + Vite
- `apps/api`: Fastify
- `packages/contracts`: esquemas Zod e tipos compartilhados
- `docs`: constituicao, arquitetura, seguranca, ADRs e especificacoes por feature

## Comece aqui

Requisitos: Node.js 22+ e npm 10+.

```bash
npm install
cp .env.example .env
npm run dev
```

- Web: http://localhost:5173
- API: http://localhost:3000
- Health check: http://localhost:3000/health

## Validacao

```bash
npm run check
```

Esse comando executa verificacao de tipos, build e testes. A API usa armazenamento em memoria nesta primeira fatia; os dados reiniciam com o processo. A decisao e os limites estao registrados em `docs/architecture/adrs/0002-in-memory-repository.md`.

## Fluxo SDD obrigatorio

1. Copie os modelos de `docs/templates/` para `docs/features/NNN-nome/`.
2. Escreva `spec.md` com requisitos `FR-*`, cenarios Given/When/Then e criterios mensuraveis.
3. Resolva ambiguidades antes do codigo.
4. Escreva `plan.md`, contratos e modelo de dados.
5. Produza `tasks.md`, sempre ligando tarefas aos requisitos.
6. Atualize o modelo de ameacas e a matriz de verificacao quando houver impacto de seguranca.
7. Implemente e prove conformidade com testes.

Veja o [indice da documentacao](docs/README.md) e a [constituicao SDD](docs/constitution.md).
