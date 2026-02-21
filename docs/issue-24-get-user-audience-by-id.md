# Issue #24 — Buscar Audiência do Usuário por ID

**Issue:** https://github.com/robsonmvieira/oraculo-frontend/issues/24
**PR:** https://github.com/robsonmvieira/oraculo-frontend/pull/25
**Branch:** `feat/get-user-audience-by-id`
**Status:** Implementada

---

## 1. Motivação

A página de detalhes de audiência (`/audiences/:id`) buscava apenas audiências do tipo **template** via `GET /audience-templates/{id}`. Quando o usuário clicava em uma audiência própria (criada via `POST /audiences`), a página falhava silenciosamente pois o ID não existia nos templates. Era necessário implementar o fluxo completo para buscar uma audiência do usuário via `GET /audiences/{id}`.

---

## 2. Decisões de Design

### 2.1 Diferenciação via query parameter

Para distinguir se o detalhe deve buscar uma audiência do usuário ou um template, adotamos `?type=user` como query parameter:

- `/audiences/abc-123` → busca template (comportamento padrão, retrocompatível)
- `/audiences/abc-123?type=user` → busca audiência do usuário

Alternativas consideradas:
- Rotas separadas (`/audiences/:id` vs `/template-audiences/:id`) — descartada por impactar router
- Try/catch em cascata — descartada por ser imprevisível e lenta

### 2.2 Correção do mapeamento no repositório

O método `getAudienceById` usava `AudienceResponse` (que esperava campo `id` e communities com formato nested `display`). A API real retorna `audience_id` e communities no formato simples (`subreddit_name`, `icon_url`, `subscribers`) — mesmo formato do endpoint de listagem. Corrigimos para reutilizar `UserAudienceListResponse`.

### 2.3 Hooks condicionais via `enabled`

Ambos os hooks (`useGetAudienceTemplateById` e `useGetAudienceById`) são chamados no componente, mas apenas um é habilitado com base no `isUserAudience`. O hook desabilitado recebe string vazia e `enabled: false` via `!!id`.

### 2.4 Refatoração da página Audiences

Aproveitamos para extrair a página `Audiences.tsx` (257 linhas) em componentes menores, reduzindo para 126 linhas:

- `AudiencesToolbar` — sort, display toggle, search
- `UserAudiencesSection` — seção "Your Audiences" com grid e empty state
- `TemplateAudiencesSection` — seção "Find Audiences" com grid e empty state
- `audiences.types.ts` — tipos compartilhados e utilitário `gridClassName`

---

## 3. Solução Implementada

### 3.1 Endpoint

- **Método:** GET
- **URL:** `/audiences/{audience_id}`
- **Resposta:**

```json
{
  "audience_id": "9141013a-bc35-4aab-b9cc-2af8464dd1a4",
  "name": "Marketing Custom",
  "description": "",
  "total_subs": 3,
  "total_members": 2318607,
  "growth_week": 0.94,
  "growth_month": 5.29,
  "communities": [
    {
      "subreddit_name": "digitalmarketing",
      "icon_url": "https://...",
      "subscribers": 364201
    }
  ]
}
```

### 3.2 Arquitetura

```
AudienceDetail Page (UI)
  ├── useGetAudienceById(id)          [quando ?type=user]
  │     └── GetAudienceByIdUseCase → AudienceRepository.getAudienceById()
  │           └── GET /audiences/{id} → normaliza audience_id + communities
  └── useGetAudienceTemplateById(id)  [quando sem ?type]
        └── GetAudienceTemplateByIdUseCase → AudienceRepository.getAudienceTemplateById()
              └── GET /audience-templates/{id}

Audiences Page (UI)
  ├── AudiencesToolbar        → controles de sort/view/search
  ├── UserAudiencesSection    → grid de audiências do usuário (type="user")
  └── TemplateAudiencesSection → grid de templates
```

---

## 4. Arquivos Criados

| Arquivo | Descrição |
|---------|-----------|
| `src/modules/audience/domain/use-cases/get-audience-by-id.use-case.ts` | Interface `IGetAudienceByIdUseCase` |
| `src/modules/audience/application/use-cases/get-audience-by-id-use-case/index.ts` | Implementação `GetAudienceByIdUseCase` |
| `src/modules/audience/application/hooks/useGetAudienceById.ts` | Hook React Query com query key `['audience', id]` |
| `src/components/audiences/audiences.types.ts` | Tipos `SortOption`, `ViewMode`, `AudienceDisplayItem` + utilitário `gridClassName` |
| `src/components/audiences/AudiencesToolbar.tsx` | Componente de controles (sort, display, search) |
| `src/components/audiences/UserAudiencesSection.tsx` | Seção "Your Audiences" |
| `src/components/audiences/TemplateAudiencesSection.tsx` | Seção "Find Audiences" |

## 5. Arquivos Modificados

| Arquivo | Alteração |
|---------|-----------|
| `src/modules/audience/domain/use-cases/index.ts` | Export de `IGetAudienceByIdUseCase` |
| `src/modules/audience/application/use-cases/index.ts` | Export de `GetAudienceByIdUseCase` |
| `src/modules/audience/application/hooks/index.ts` | Export de `useGetAudienceById` |
| `src/modules/shared/infra/container/types.ts` | Novo symbol `GetAudienceByIdUseCase` |
| `src/modules/shared/infra/container/container.ts` | Binding singleton para `GetAudienceByIdUseCase` |
| `src/modules/audience/infra/repositories/audience.repository.ts` | Corrigido mapeamento `audience_id` → `id`, removida interface `AudienceResponse` não usada |
| `src/components/audiences/AudienceCard.tsx` | Novo prop `type` (`'user' \| 'template'`), navegação com `?type=user` |
| `src/components/audiences/index.ts` | Re-exports dos novos componentes e tipos |
| `src/pages/Audiences.tsx` | Refatorada para usar componentes extraídos (257 → 126 linhas) |
| `src/pages/AudienceDetail.tsx` | Suporte a ambos os tipos de audiência via `useSearchParams` |

---

## 6. Dependências

Nenhuma nova dependência adicionada.
