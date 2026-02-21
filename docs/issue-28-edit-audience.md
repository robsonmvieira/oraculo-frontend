# Issue #28 — Editar Audiência a partir da Página de Detalhe

**Issue:** https://github.com/robsonmvieira/oraculo-frontend/issues/28
**PR:** https://github.com/robsonmvieira/oraculo-frontend/pull/29
**Branch:** `feat/edit-audience`
**Status:** Implementada

---

## 1. Motivação

O botão "Edit" na página de detalhe de audiência (`AudienceDetail`) não tinha funcionalidade. O usuário precisava ser capaz de editar o nome e as comunidades de uma audiência existente diretamente a partir dessa página, reutilizando o modal de criação (`SelectAudienceModal`) em modo de edição.

Além disso, o backend já disponibilizava endpoints para gerenciamento de comunidades em audiências que não estavam sendo consumidos pelo frontend:
- `PUT /audiences/:id` — atualizar audiência completa
- `POST /audiences/:id/communities` — adicionar comunidade individual
- `DELETE /audiences/:id/communities/:name` — remover comunidade individual

---

## 2. Decisões de Design

### 2.1 Reutilização do modal existente em modo dual

Em vez de criar um novo componente de edição, optamos por estender o `SelectAudienceModal` para suportar dois modos: `create` e `edit`. Isso evita duplicação de código e mantém a experiência visual consistente.

### 2.2 Estado de modo no Zustand store

O store `useCreateAudienceStore` foi estendido com:
- `mode: 'create' | 'edit'` — diferencia o comportamento do modal
- `editingAudienceId: string | null` — armazena o ID da audiência em edição
- `openEditModal(audienceId, name, communities)` — action que popula o store e abre o modal em modo edit

O `closeModal()` e `reset()` continuam resetando tudo para o estado inicial (mode='create').

### 2.3 PUT para salvar edição

Ao salvar no modo de edição, usamos o endpoint `PUT /audiences/:id` que substitui nome, descrição e a lista completa de `subreddit_names`. Essa abordagem é mais simples e atômica do que fazer múltiplas chamadas de add/remove individual.

### 2.4 Conversão de CommunityProps → Community entity

As comunidades da audiência (`Audience.getCommunities()`) retornam `CommunityProps`, que tem estrutura diferente da entidade `Community` usada no store do modal. Ao abrir o modal em modo de edição, convertemos cada `CommunityProps` para uma instância de `Community` com os campos mapeados:
- `display.display_name` → `name` e `title`
- `display.subscribers` → `subscribers`
- `display.community_icon` → `icon_url`
- `category` → `''` (não disponível na API de audiência)

### 2.5 Botão Edit condicional

O botão "Edit" só é renderizado quando `isUserAudience === true` (query param `?type=user`). Audiências de template são read-only.

---

## 3. Solução Implementada

### 3.1 Endpoints utilizados

| Método | URL | Body | Descrição |
|--------|-----|------|-----------|
| PUT | `/audiences/:audience_id` | `{ name, description, subreddit_names[] }` | Atualizar audiência |
| POST | `/audiences/:audience_id/communities` | `{ subreddit_name }` | Adicionar comunidade |
| DELETE | `/audiences/:audience_id/communities/:name` | — | Remover comunidade |

### 3.2 Arquitetura

```
AudienceDetail Page (UI)
  ├── Botão "Edit" (só para user audiences)
  │     └── openEditModal(id, name, communities)
  │           └── Zustand store → mode='edit', preenche dados
  │                 └── SelectAudienceModal abre preenchido
  │
  └── SelectAudienceModal (modo edit)
        └── onUpdateAudience(audienceId, name, communityNames)
              └── useUpdateAudience hook
                    └── UpdateAudienceUseCase → AudienceRepository.updateAudience()
                          └── PUT /audiences/{id}
                                └── onSuccess: invalidate queries + closeModal
```

### 3.3 Use Cases criados (DDD completo)

Cada use case segue o padrão existente com todas as camadas:

```
Domain Interface → Application Implementation → Repository Method → Hook → DI Container
```

1. **UpdateAudience** — `PUT /audiences/:id`
2. **AddCommunityToAudience** — `POST /audiences/:id/communities`
3. **RemoveCommunityFromAudience** — `DELETE /audiences/:id/communities/:name`

---

## 4. Arquivos Criados

| Arquivo | Descrição |
|---------|-----------|
| `src/modules/audience/domain/use-cases/update-audience.use-case.ts` | Interface `IUpdateAudienceUseCase` + tipos `UpdateAudienceParams`, `UpdateAudienceResult` |
| `src/modules/audience/domain/use-cases/add-community-to-audience.use-case.ts` | Interface `IAddCommunityToAudienceUseCase` + tipo `AddCommunityToAudienceParams` |
| `src/modules/audience/domain/use-cases/remove-community-from-audience.use-case.ts` | Interface `IRemoveCommunityFromAudienceUseCase` + tipo `RemoveCommunityFromAudienceParams` |
| `src/modules/audience/application/use-cases/update-audience-use-case/index.ts` | Implementação `UpdateAudienceUseCase` |
| `src/modules/audience/application/use-cases/add-community-to-audience-use-case/index.ts` | Implementação `AddCommunityToAudienceUseCase` |
| `src/modules/audience/application/use-cases/remove-community-from-audience-use-case/index.ts` | Implementação `RemoveCommunityFromAudienceUseCase` |
| `src/modules/audience/application/hooks/useUpdateAudience.ts` | Hook mutation — invalida `AUDIENCES_QUERY_KEY` e `AUDIENCE_QUERY_KEY(id)` |
| `src/modules/audience/application/hooks/useAddCommunityToAudience.ts` | Hook mutation para adicionar comunidade individual |
| `src/modules/audience/application/hooks/useRemoveCommunityFromAudience.ts` | Hook mutation para remover comunidade individual |

## 5. Arquivos Modificados

| Arquivo | Alteração |
|---------|-----------|
| `src/modules/audience/domain/use-cases/index.ts` | Export dos 3 novos use case types |
| `src/modules/audience/domain/repositories/audience.repository.ts` | 3 novos métodos na interface `IAudienceRepository` |
| `src/modules/audience/infra/repositories/audience.repository.ts` | Implementação de `updateAudience`, `addCommunityToAudience`, `removeCommunityFromAudience` |
| `src/modules/audience/application/use-cases/index.ts` | Export das 3 novas classes |
| `src/modules/audience/application/hooks/index.ts` | Export dos 3 novos hooks |
| `src/modules/shared/infra/container/types.ts` | 3 novos symbols: `UpdateAudienceUseCase`, `AddCommunityToAudienceUseCase`, `RemoveCommunityFromAudienceUseCase` |
| `src/modules/shared/infra/container/container.ts` | 3 novos bindings singleton no Inversify container |
| `src/modules/audience/application/store/create-audience.store.ts` | Adicionados `mode`, `editingAudienceId`, `openEditModal()` ao state |
| `src/components/shared/SelectAudienceModal.tsx` | Nova prop `onUpdateAudience`, título/botão/submit dinâmicos por modo |
| `src/pages/AudienceDetail.tsx` | Botão Edit condicional, conversão CommunityProps→Community, renderização do modal com handler de update |

---

## 6. Dependências

Nenhuma nova dependência adicionada.
