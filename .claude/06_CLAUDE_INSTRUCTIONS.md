# Acciano Design System — Instruções para o Claude

> Este arquivo define como o Claude deve se comportar ao trabalhar neste projeto.
> É o arquivo mais importante do contexto — leia-o sempre primeiro.

---

## Identidade do projeto

Você está trabalhando no **Acciano Design System**, um sistema de design criado do zero por um designer/desenvolvedor. Todos os componentes têm origem no Figma e são autorais — não existem referências externas de outras libraries.

---

## Comportamento geral

### Pergunte antes de assumir

Se algum contexto necessário não foi fornecido — um valor de token, o comportamento esperado de um componente, uma decisão de arquitetura — **pergunte antes de prosseguir**. Uma pergunta objetiva é sempre preferível a código baseado em suposição.

### Quando não souber, diga

Se não tiver certeza sobre algo (uma API do React, um padrão de Storybook, uma decisão de acessibilidade), diga **"não tenho certeza"** e ofereça alternativas ou sugira verificar a documentação. Nunca invente uma resposta para parecer confiante.

### Importante: Esteja sempre atualizado

Nunca se antecipe e sugira qualquer coisa sem sempre antes verificar a documentação atualizada dos software e pacotes que estamos usando. Você deve ter certeza de que está instalando versões atualizadas e compatíveis com a estrutura que estamos construindo. A ausência desse critério pode gerar retrabalho desnecessário e comprometer o bom funcionamento do projeto como um todo.

### Sempre atualize os arquivos da pasta .claude

Não atualize somente o `project_state.md` a cada nova inclusão de componente ou alteração significativa. Atualize também os arquivos da pasta .claude, que continuam sendo os arquivos que você deve consultar para atuar no projeto.

---

## Regras inegociáveis

### 1. Nunca usar libraries de componentes

Jamais sugira, importe ou use: Shadcn/UI, Chakra UI, MUI, Ant Design, ou qualquer outra library de componentes prontos. Se for necessário algum primitivo de acessibilidade, use Radix UI **apenas** para comportamento (ex: gerenciar foco em Dialog), nunca para visual.

### 2. Nunca hardcodar valores visuais

Todo valor de cor, tipografia, espaçamento, radius ou sombra deve usar uma CSS custom property de token. Se o token ainda não existe, sinalize isso — não invente um valor. Componentes consomem apenas `Color`, `Typography` e `Foundations` — nunca `Theme` diretamente (que é para customização do usuário) e nunca `_Primitive Color` ou `_Tailwind CSS`.

### 3. Figma é a fonte da verdade — use o MCP

Quando houver dúvida sobre aparência, comportamento, nome de variante ou estrutura de um componente, **consulte o Figma via MCP antes de prosseguir**. Nunca assuma ou invente valores visuais — a resposta está no arquivo, siga-o estritamente.

### 4. Estrutura de arquivos canônica

Siga sempre a estrutura definida em `02_ARCHITECTURE.md`. Não crie arquivos em locais não previstos sem justificar e perguntar antes.

### 5. Convenções sempre

Siga as convenções de `03_CONVENTIONS.md` em todo código gerado: nomenclatura, estrutura de componente, commits, CSS Modules.

### 6. Confirmar conclusão antes de avançar

**Nunca** sugira seguir para o próximo componente ou etapa sem ter confirmação de que a etapa atual foi concluída com sucesso — visualmente no Storybook ou por outro meio concreto. Declarar "está pronto" apenas por ter aplicado uma mudança de código é insuficiente. Em caso de dúvida, assuma que está incompleto e investigue.

---

## Figma MCP — acesso ao arquivo de design

O Claude Code está conectado ao Figma via MCP server oficial (`https://mcp.figma.com/mcp`). Isso permite consultar o arquivo do Acciano diretamente, sem depender de suposições ou descrições intermediárias.

### Quando usar o Figma MCP

**Sempre** usar antes de implementar qualquer componente:

- Para ler a estrutura real de variantes e propriedades
- Para confirmar nomes de componentes (inclusive quais têm prefixo `_`)
- Para verificar estados (hover, focus, disabled, etc.)
- Para conferir espaçamentos, radius e tipografia aplicados
- Para entender hierarquia entre componentes (quais são primitivos, quais são compostos)

**Também usar** quando houver qualquer dúvida visual — não pergunte ao usuário se o Figma pode responder.

### Como usar

Cole o link do frame ou componente no Figma e solicite a leitura:

```
Leia o componente em: https://www.figma.com/design/uiFtDBaCNOzuTtDZgza3Zb/Acciano-UI-Design-Kit/node-id=...
```

### Convenção de componentes internos

Componentes cujo nome começa com `_` são **primitivos internos** — não devem ser expostos como API pública do design system, da mesma forma que as collections de tokens com `_`. Ao mapear componentes, identifique e documente essa separação.

---

## Como responder e trabalhar

### Ao criar um componente novo

1. Consultar o Figma via MCP para ler a estrutura real do componente
2. Verificar se ele está mapeado no `05_COMPONENTS.md` e atualizar o status
3. **Identificar elementos internos que já existem como componentes** — checar `packages/components/src/index.ts` antes de implementar qualquer sub-elemento manualmente. Usar a instância real do componente (ex: `<Dot>`, `<Count>`, `<Badge>`) e adicionar apenas CSS de posicionamento via `className`. Isso garante consistência e evita reimplementar correções já aplicadas no componente original.
4. Seguir o template de estrutura de componente de `03_CONVENTIONS.md`
5. Criar os 4 arquivos: `.tsx`, `.module.css`, `.stories.tsx`, `index.ts`
6. Usar apenas tokens já definidos em `04_TOKENS.md`
7. Garantir acessibilidade básica (role, aria-label quando necessário, suporte a teclado)

### Ao criar tokens

1. Seguir a estrutura de `04_TOKENS.md`
2. Perguntar se os valores já foram extraídos do Figma — não inventar valores
3. Nomear sempre em inglês, kebab-case

### Ao sugerir mudanças estruturais

1. Explicar o motivo
2. Mostrar o antes e depois
3. Perguntar se pode prosseguir antes de fazer

### Ao encontrar ambiguidade

Pergunte antes de assumir. É preferível uma pergunta rápida do que código que precisa ser refeito.

---

## Tom e comunicação

- Seja direto e técnico
- Use português (pt-BR) nas respostas
- Ao mostrar código, sempre explique brevemente o que foi feito e por quê
- Se identificar algo que vai contra as convenções do projeto, aponte antes de implementar
- Prefira soluções simples às engenhosas quando o resultado for o mesmo

---

## O que este projeto NÃO é

- Não é um projeto com prazo — é um projeto de estudo e vitrine
- Não há cliente externo — o criador é o único usuário
- Não precisa ser compatível com nenhuma outra base de código existente
- Não deve seguir padrões de outras design systems (Material, Fluent, etc.) — o Acciano tem identidade própria

---

## Checklist rápido antes de gerar código

- [ ] Consultei o Figma via MCP para ler a estrutura real do componente?
- [ ] Verifiquei se algum elemento interno já existe como componente no DS (checar `index.ts`)?
- [ ] Estou usando CSS custom properties (não valores hardcoded)?
- [ ] Estou seguindo a estrutura de pastas de `02_ARCHITECTURE.md`?
- [ ] Estou usando as convenções de nomenclatura de `03_CONVENTIONS.md`?
- [ ] Não estou importando nenhuma library de componentes proibida?
- [ ] O componente tem acessibilidade básica?
- [ ] Se há dúvida sobre algum valor, perguntei antes de assumir?
