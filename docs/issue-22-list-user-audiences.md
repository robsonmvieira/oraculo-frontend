# Issue #22 — Seção "Your Audiences" na Página de Audiências

**Issue:** https://github.com/robsonmvieira/oraculo-frontend/issues/22
**PR:** https://github.com/robsonmvieira/oraculo-frontend/pull/23
**Branch:** `feat/list-user-audiences`
**Status:** Implementada

---

## 1. Motivação

A página `/audiences` exibia apenas audiências templates (pré-definidas via `GET /audience-templates`). Não havia visibilidade sobre as audiências que o próprio usuário logado criou. Era necessário adicionar uma seção dedicada para listar as audiências do usuário, consumindo o endpoint `GET /audiences`.

---

## 2. Decisões de Design

### 2.1 Refactor: `listGenericAudiences` → `listUserAudiences`

O nome `listGenericAudiences` era impreciso — o endpoint retorna audiências criadas pelo usuário, não "genéricas". Renomeamos em todas as camadas para `listUserAudiences`:

- Interface: `IListGenericAudiencesUseCase` → `IListUserAudiencesUseCase`
- Classe: `ListGenericAudiencesUseCases` → `ListUserAudiencesUseCase`
- Hook: `useListGenericAudiences` → `useListUserAudiences`
- Repository: `listGenericAudiences()` → `listUserAudiences()`
- DI Container: `TYPES.ListGenericAudiencesUseCase` → `TYPES.ListUserAudiencesUseCase`

### 2.2 Mapeamento da API `GET /audiences`

O endpoint retorna um formato diferente do `GET /audiences/:id`:

```json
{
  "audiences": [
    {
      "audience_id": "uuid",
      "name": "Marketing Custom",
      "total_subs": 3,
      "total_members": 2318607,
      "growth_week": 0.94,
      "communities": [
        {
          "subreddit_name": "digitalmarketing",
          "icon_url": "https://...",
          "subscribers": 364201
        }
      ]
    }
  ]
}
```

Diferenças do formato de detalhe:
- `audience_id` em vez de `id`
- Communities simplificadas: `subreddit_name`/`icon_url`/`subscribers` em vez do formato nested com `display`
- Resposta encapsulada em objeto `{ audiences: [...] }`, não array direto

O repository faz a normalização para o formato da entidade `Audience`.

### 2.3 Getters na entidade Audience

A entidade `Audience` só expunha `getId()`, `getName()`, `getDescription()` e `toJSON()`. Adicionamos getters tipados para acesso direto às propriedades necessárias no mapeamento da página:

- `getTotalSubs()` — quantidade de comunidades
- `getTotalMembers()` — soma de subscribers
- `getCommunities()` — lista de comunidades (readonly)
- `getGrowthWeek()` — crescimento semanal

### 2.4 Layout da página

A página agora tem 3 blocos:

1. **Controles globais** (Sort, Display, Search) — alinhados à direita no topo
2. **Your Audiences** — audiências do usuário + card "Add new Audience"
3. **Find Audiences** — templates pré-definidos (mantém título original)

---

## 3. Solução Implementada

### 3.1 Fluxo

1. Página carrega → `useListUserAudiences()` e `useFetchDefaultAudiences()` disparam em paralelo
2. `ListUserAudiencesUseCase.execute()` → `AudienceRepository.listUserAudiences()`
3. Repository faz `GET /audiences`, normaliza resposta para entidade `Audience`
4. Página renderiza seção "Your Audiences" com os dados + seção "Find Audiences" com templates

### 3.2 Arquitetura

```
Audiences Page (UI)
  ├── useListUserAudiences() → ListUserAudiencesUseCase → AudienceRepository.listUserAudiences()
  │     └── GET /audiences → normaliza audience_id + communities simplificadas
  └── useFetchDefaultAudiences() → FetchDefaultAudiencesUseCase → AudienceRepository.fetchDefaultAudiences()
        └── GET /audience-templates
```

---

## 4. Arquivos Criados

| Arquivo | Descrição |
|---------|-----------|
| `src/modules/audience/application/hooks/useListUserAudiences.ts` | Hook renomeado (era `useListGenericAudiences`) |
| `src/modules/audience/application/use-cases/list-user-audiences-use-case/index.ts` | Use case renomeado |
| `src/modules/audience/domain/use-cases/list-user-audiences.use-case.ts` | Interface renomeada |

## 5. Arquivos Modificados

| Arquivo | Alteração |
|---------|-----------|
| `src/pages/Audiences.tsx` | Reestruturada com seção "Your Audiences" + "Find Audiences", controles globais no topo |
| `src/modules/audience/domain/entities/Audience.entity.ts` | Adicionados getters: `getTotalSubs`, `getTotalMembers`, `getCommunities`, `getGrowthWeek` |
| `src/modules/audience/infra/repositories/audience.repository.ts` | Novo tipo `UserAudienceListResponse`, mapeamento da API para entidade |
| `src/modules/audience/domain/repositories/audience.repository.ts` | Rename `listGenericAudiences` → `listUserAudiences` |
| `src/modules/audience/application/hooks/index.ts` | Export atualizado |
| `src/modules/audience/application/hooks/useCreateAudience.ts` | Import atualizado |
| `src/modules/audience/application/use-cases/index.ts` | Export atualizado |
| `src/modules/audience/domain/use-cases/index.ts` | Export atualizado |
| `src/modules/shared/infra/container/types.ts` | Symbol renomeado |
| `src/modules/shared/infra/container/container.ts` | Binding renomeado |

## 6. Arquivos Removidos

| Arquivo | Motivo |
|---------|--------|
| `src/modules/audience/application/hooks/useListGenericAudiences.ts` | Substituído por `useListUserAudiences.ts` |
| `src/modules/audience/application/use-cases/list-generic-audiences-use-cases/index.ts` | Substituído por `list-user-audiences-use-case` |
| `src/modules/audience/domain/use-cases/list-generic-audiences.use-case.ts` | Substituído por `list-user-audiences.use-case.ts` |

---

## 7. Dependências

Nenhuma nova dependência adicionada.
