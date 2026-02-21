# Issue #39 — Substituir sugestoes de subreddits hardcoded por dados dinamicos do endpoint de suggestions

**Issue:** https://github.com/robsonmvieira/oraculo-frontend/issues/39
**PR:** https://github.com/robsonmvieira/oraculo-frontend/pull/40
**Branch:** `feat/dynamic-audience-suggestions`
**Status:** Implementada

---

## 1. Motivacao

Na aba Subreddits da pagina de detalhes da audiencia (`AudienceDetail`), a secao "Expand your audience with similar communities" exibia dados mock hardcoded (`similarCommunitiesData` do arquivo `audienceDetailMocks.ts`), com 9 comunidades estaticas que nao tinham relacao com a audiencia visualizada.

Esses dados precisavam ser substituidos por sugestoes dinamicas vindas do endpoint `GET /audiences/{audience_id}/suggestions`, que retorna comunidades relevantes com base na analise de IA do backend.

---

## 2. Decisoes de Design

### 2.1 Reutilizacao da infraestrutura existente

Toda a infraestrutura DDD ja estava implementada (domain use case, repository, hook React Query, DI container). A tarefa foi puramente de conexao na camada de UI.

### 2.2 Mapeamento de tipos

A API retorna `AudienceSuggestion` (camelCase, mapeado pelo repository) que foi transformado para `SimilarCommunity` (interface do componente UI):

| API (`AudienceSuggestion`) | UI (`SimilarCommunity`) |
|---|---|
| `subredditName` | `id` e `name` (com prefixo `r/`) |
| `subscribers` | `members` |
| `growthWeek` | `weeklyGrowth` (fallback `0`) |
| `sizeTag` | `sizeCategory` (fallback `''`) |
| `activityTag` | `activityLevel` (fallback `''`) |
| `description` | `description` |

### 2.3 Loading e empty states

O componente `SimilarCommunitiesGrid` recebeu dois novos estados:
- **Loading**: 6 skeleton cards animados com `animate-pulse` que espelham a estrutura visual dos cards reais
- **Empty**: mensagem centralizada "No suggestions available for this audience yet."

---

## 3. Solucao Implementada

### 3.1 Endpoint utilizado

| Metodo | URL | Descricao |
|--------|-----|-----------|
| GET | `/audiences/{audience_id}/suggestions` | Buscar sugestoes de comunidades similares |

**Resposta:**

```json
{
  "audience_id": "uuid",
  "audience_name": "Marketing",
  "audience_theme": "...",
  "suggestions": [
    {
      "subreddit_name": "socialmedia",
      "title": "Social Media",
      "description": "A sub for professional discussion...",
      "subscribers": 2089209,
      "size_tag": "Massive",
      "activity_tag": null,
      "growth_week": null,
      "relevance_score": 1.0,
      "relevance_reason": "Professional discussions..."
    }
  ],
  "total_found": 10,
  "filtered_by_feedback": 0
}
```

### 3.2 Arquitetura — Fluxo de dados

```
AudienceDetail Page (UI)
  └── useGetAudienceSuggestions(audienceId)
        └── GetAudienceSuggestionsUseCase → AudienceRepository.getAudienceSuggestions()
              └── GET /audiences/{id}/suggestions → mapeia snake_case → AudienceSuggestion[]
                    └── Mapeado para SimilarCommunity[] na pagina
                          └── SubredditsTabContent → SimilarCommunitiesGrid
```

---

## 4. Arquivos Modificados

| Arquivo | Alteracao |
|---------|-----------|
| `src/pages/AudienceDetail.tsx` | Importa `useGetAudienceSuggestions`, chama o hook, mapeia `AudienceSuggestion[]` → `SimilarCommunity[]`, remove import de `similarCommunitiesData` |
| `src/components/audiences/detail/SubredditsTabContent.tsx` | Nova prop `isLoadingSuggestions?: boolean` repassada ao `SimilarCommunitiesGrid` |
| `src/components/audiences/detail/SimilarCommunitiesGrid.tsx` | Nova prop `isLoading?: boolean`, skeleton cards (`SkeletonCard`), empty state |
| `src/data/audienceDetailMocks.ts` | Removido `similarCommunitiesData` (83 linhas de mock nao mais utilizado) |

---

## 5. Dependencias

Nenhuma nova dependencia adicionada.
