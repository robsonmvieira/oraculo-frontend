# Issue #30 — Sugestões de Comunidades Curadas por IA no Modal de Edição

**Issue:** https://github.com/robsonmvieira/oraculo-frontend/issues/30
**PR:** https://github.com/robsonmvieira/oraculo-frontend/pull/31
**Branch:** `feat/get-audience-suggestions`
**Status:** Implementada

---

## 1. Motivação

Ao editar uma audiência, o modal exibia apenas comunidades do endpoint genérico `/communities/browse`. O backend disponibiliza um endpoint de sugestões curadas por IA (`GET /audiences/{id}/suggestions`) que retorna comunidades analisadas e ranqueadas por relevância para a audiência em questão.

Era necessário integrar esse endpoint para que, ao abrir o modal de edição, o usuário visse uma "superlista" priorizada:
1. Comunidades já adicionadas à audiência (no topo, pré-selecionadas)
2. Sugestões curadas por IA (com badge visual "AI Suggested")
3. Comunidades do browse (deduplicadas)

Além disso, o projeto não possuía nenhum sistema de notificação por toast para feedback de sucesso/erro em operações de mutation.

---

## 2. Decisões de Design

### 2.1 Use case no módulo Audience (não Community)

As sugestões são contextuais a uma audiência específica (`/audiences/{id}/suggestions`), então o use case foi criado no módulo `audience` e não no módulo `community`. O repository `IAudienceRepository` recebeu o novo método.

### 2.2 Conversão de sugestões para entidade Community

Para manter compatibilidade com o `CommunitySelectCard` existente, as sugestões da API são convertidas em instâncias de `Community`. Campos não disponíveis na resposta de sugestões (`icon_url`, `growth_month`, `category`) recebem valores padrão vazios/nulos.

### 2.3 Superlista com deduplicação

A lógica de merge no `useMemo` do modal garante:
- Comunidades já na audiência ficam no topo absoluto
- Sugestões IA que não estejam entre as já adicionadas vêm em seguida
- Browse communities são filtradas para remover duplicatas de ambos os grupos anteriores

### 2.4 Badge "AI Suggested" via prop no card

Em vez de criar um novo componente, foi adicionada uma prop opcional `isAiSuggested` ao `CommunitySelectCard`, mantendo o componente reutilizável e simples.

### 2.5 Toast com Radix UI (padrão shadcn)

O sistema de toast foi implementado seguindo o padrão shadcn/Radix UI, usando o pacote `radix-ui` (monorepo) já instalado no projeto. O hook `useToast` gerencia estado via listeners (sem Context), e a função `toast()` pode ser chamada imperativa fora de componentes.

### 2.6 onError em todas as mutations

Aproveitou-se a criação do sistema de toast para adicionar feedback de erro (`onError` com toast destructive) e sucesso (`onSuccess` com toast success) em todas as mutations do projeto: create audience, update audience e login.

---

## 3. Solução Implementada

### 3.1 Endpoint consumido

| Método | URL | Descrição |
|--------|-----|-----------|
| GET | `/audiences/{audience_id}/suggestions` | Sugestões de comunidades curadas por IA |

**Resposta:**
```json
{
  "audience_id": "...",
  "audience_name": "...",
  "audience_theme": "...",
  "suggestions": [
    {
      "subreddit_name": "digital_marketing",
      "title": "...",
      "description": "...",
      "subscribers": 324638,
      "size_tag": "Large",
      "activity_tag": null,
      "growth_week": null,
      "relevance_score": 1.0,
      "relevance_reason": "..."
    }
  ],
  "total_found": 10,
  "filtered_by_feedback": 0
}
```

### 3.2 Arquitetura — Use Case GetAudienceSuggestions

```
AudienceDetail Page (UI)
  └── Botão "Edit" → openEditModal()
        └── SelectAudienceModal (modo edit)
              ├── useGetAudienceSuggestions(audienceId) ← novo
              │     └── GetAudienceSuggestionsUseCase
              │           └── AudienceRepository.getAudienceSuggestions()
              │                 └── GET /audiences/{id}/suggestions
              │
              ├── useBrowseCommunities(search) ← existente
              │
              └── useMemo → superlist
                    ├── 1° selectedCommunities (já na audiência)
                    ├── 2° suggestionsNotInSelected (IA, dedup)
                    └── 3° remainingBrowse (browse, dedup)
```

### 3.3 Arquitetura — Sistema de Toast

```
App.tsx
  └── <Toaster /> (renderiza viewport global)
        └── useToast() → lê memoryState via listener

Qualquer componente/page
  └── toast({ title, description, variant })
        └── dispatch(ADD_TOAST) → notifica listeners → Toaster re-renderiza
```

---

## 4. Arquivos Criados

| Arquivo | Descrição |
|---------|-----------|
| `src/modules/audience/domain/use-cases/get-audience-suggestions.use-case.ts` | Interface `IGetAudienceSuggestionsUseCase` + tipos `GetAudienceSuggestionsParams`, `AudienceSuggestion`, `GetAudienceSuggestionsResult` |
| `src/modules/audience/application/use-cases/get-audience-suggestions-use-case/index.ts` | Implementação `GetAudienceSuggestionsUseCase` |
| `src/modules/audience/application/hooks/useGetAudienceSuggestions.ts` | Hook `useQuery` habilitado quando `audienceId` é truthy |
| `src/components/ui/toast.tsx` | Componentes Toast (Provider, Viewport, Root, Title, Description, Close, Action) com variantes `default`, `destructive`, `success` |
| `src/components/ui/toaster.tsx` | Componente `Toaster` que renderiza o viewport global |
| `src/hooks/useToast.ts` | Hook `useToast` + função imperativa `toast()` com state management via listeners |

## 5. Arquivos Modificados

| Arquivo | Alteração |
|---------|-----------|
| `src/modules/audience/domain/repositories/audience.repository.ts` | Novo método `getAudienceSuggestions` na interface |
| `src/modules/audience/domain/use-cases/index.ts` | Export dos novos tipos |
| `src/modules/audience/infra/repositories/audience.repository.ts` | Implementação com mapeamento snake_case → camelCase |
| `src/modules/audience/application/use-cases/index.ts` | Export da nova classe |
| `src/modules/audience/application/hooks/index.ts` | Export do novo hook |
| `src/modules/shared/infra/container/types.ts` | Novo symbol `GetAudienceSuggestionsUseCase` |
| `src/modules/shared/infra/container/container.ts` | Novo binding singleton |
| `src/components/shared/SelectAudienceModal.tsx` | Integração da superlista (selected + IA + browse) com deduplicação |
| `src/components/shared/CommunitySelectCard.tsx` | Prop `isAiSuggested` com badge Sparkles + `h-full` para altura uniforme |
| `src/hooks/index.ts` | Export de `useToast` e `toast` |
| `src/App.tsx` | `<Toaster />` adicionado ao tree |
| `src/pages/AudienceDetail.tsx` | `onError` + `onSuccess` toast no update audience |
| `src/pages/Audiences.tsx` | `onError` + `onSuccess` toast no create audience |
| `src/components/auth/LoginForm.tsx` | `onError` toast no login |

---

## 6. Dependências

Nenhuma nova dependência instalada. O componente Toast utiliza o pacote `radix-ui` (monorepo) já presente no projeto.
