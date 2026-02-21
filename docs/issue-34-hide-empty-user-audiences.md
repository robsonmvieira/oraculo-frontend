# Issue #34 — Ocultar secao 'Your Audiences' quando vazia e mover botao 'Add' para secao de templates

**Issue:** https://github.com/robsonmvieira/oraculo-frontend/issues/34
**PR:** https://github.com/robsonmvieira/oraculo-frontend/pull/35
**Branch:** `fix/hide-empty-user-audiences-section`
**Status:** Implementada

---

## 1. Motivacao

Quando o usuario nao possuia nenhuma audiencia criada, a secao "Your Audiences" era exibida vazia com apenas o card tracejado "Add new Audience" e uma mensagem informativa. Isso ocupava espaco desnecessario na tela e afastava visualmente o botao de criacao das audiencias template, que sao o ponto de partida natural para novos usuarios.

A mudanca melhora a experiencia visual movendo o botao "Add new Audience" para junto das audiencias template quando o usuario ainda nao tem audiencias proprias.

---

## 2. Decisoes de Design

### 2.1 Secao "Your Audiences" condicional

A secao retorna `null` quando `audiences.length === 0`, ocultando completamente o titulo, o grid e a mensagem de lista vazia.

### 2.2 Botao "Add" migra para secao de templates

O componente `TemplateAudiencesSection` recebeu duas novas props opcionais:
- `showAddCard?: boolean` — controla se o card "Add new Audience" deve ser renderizado
- `onAddClick?: () => void` — callback para abrir o modal de criacao

O card aparece como primeiro item do grid, antes dos cards de audiencias template.

### 2.3 Comportamento bidirecional

- **Sem audiencias do usuario:** secao "Your Audiences" oculta, botao "Add" na secao "Find Audiences"
- **Com audiencias do usuario:** secao "Your Audiences" visivel com botao "Add" dentro dela (comportamento original)

---

## 3. Solucao Implementada

### 3.1 Fluxo condicional

```
Audiences Page
  ├── userAudiences.length === 0?
  │     ├── SIM: UserAudiencesSection retorna null
  │     │         TemplateAudiencesSection renderiza AddAudienceCard
  │     └── NAO: UserAudiencesSection renderiza normalmente com AddAudienceCard
  │               TemplateAudiencesSection renderiza sem AddAudienceCard
```

---

## 4. Arquivos Modificados

| Arquivo | Alteracao |
|---------|-----------|
| `src/components/audiences/UserAudiencesSection.tsx` | Early return `null` quando `audiences.length === 0`; removida mensagem de lista vazia |
| `src/components/audiences/TemplateAudiencesSection.tsx` | Novas props `showAddCard` e `onAddClick`; importacao e renderizacao condicional do `AddAudienceCard` |
| `src/pages/Audiences.tsx` | Passa `showAddCard={userAudiences.length === 0}` e `onAddClick={openModal}` para `TemplateAudiencesSection` |

---

## 5. Dependencias

Nenhuma nova dependencia adicionada.
