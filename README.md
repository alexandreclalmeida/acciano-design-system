# .claude/ — Contexto do Acciano Design System para o Claude

Esta pasta contém os arquivos de contexto do projeto Acciano para uso com o Claude (Claude.ai Projects ou Claude Code).

## Como usar

### No Claude.ai (Projects)
1. Crie um **Project** no Claude.ai chamado "Acciano Design System"
2. Em **Project Knowledge**, faça upload de todos os arquivos desta pasta
3. Em toda nova conversa dentro do projeto, o Claude terá acesso ao contexto automaticamente

### No Claude Code (terminal)
Os arquivos nesta pasta são lidos automaticamente pelo Claude Code quando você trabalha no repositório. Mantenha-os atualizados.

---

## Arquivos e o que fazem

| Arquivo | Conteúdo |
|---|---|
| `00_PROJECT_OVERVIEW.md` | O que é o Acciano, objetivos, status atual |
| `01_STACK_AND_TOOLS.md` | Ferramentas, frameworks e restrições de libraries |
| `02_ARCHITECTURE.md` | Estrutura de pastas e decisões arquiteturais |
| `03_CONVENTIONS.md` | Nomenclatura, estrutura de código, commits, CSS |
| `04_TOKENS.md` | Estrutura e categorias dos design tokens |
| `05_COMPONENTS.md` | Inventário de componentes e status de implementação |
| `06_CLAUDE_INSTRUCTIONS.md` | Regras de comportamento específicas para o Claude |

---

## Quando atualizar

| Evento | Arquivo a atualizar |
|---|---|
| Componente implementado | `05_COMPONENTS.md` |
| Tokens extraídos do Figma | `04_TOKENS.md` |
| Nova ferramenta adicionada | `01_STACK_AND_TOOLS.md` |
| Mudança na estrutura de pastas | `02_ARCHITECTURE.md` |
| Nova convenção adotada | `03_CONVENTIONS.md` |
| Nova regra para o Claude | `06_CLAUDE_INSTRUCTIONS.md` |

---

Mantenha estes arquivos atualizados — eles são a memória do projeto.
