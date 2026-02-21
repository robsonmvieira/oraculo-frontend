# Issue #43 — Conectar tab Topics na pagina de detalhes da audiencia com endpoint do backend

**Issue:** https://github.com/robsonmvieira/oraculo-frontend/issues/43
**PR:** https://github.com/robsonmvieira/oraculo-frontend/pull/44
**Branch:** `feat/connect-topics-api`
**Status:** Implementada

---

## 1. Motivacao

A tab **Topics** na pagina de detalhes de uma audiencia exibia dados hardcoded importados de `src/data/audienceDetailMocks.ts`. O count no tab trigger estava fixo em `200`, e a lista de topicos era estatica, sem conexao com o backend.

O objetivo era conectar a tab ao endpoint `GET /audiences/{audience_id}/topics` para exibir dados reais, seguindo o mesmo padrao Clean Architecture usado nas issues anteriores (#37 keywords, #39 suggestions, #41 actions).

---

## 2. Decisoes de Design

### 2.1 Entidade Topic com mapeamento de periodo

A API retorna `mention_period` como string (`"month"`, `"week"`, `"day"`), mas os componentes UI usam o formato abreviado (`"mo"`, `"week"`, `"day"`). O mapeamento e feito no componente `AudienceDetailTabs` ao transformar a entidade em `TopicTableItem` e `TopicDetail`.

### 2.2 Mapeamento duplo: tabela e painel de detalhes

A entidade `Topic` armazena todos os campos do backend. No componente, ela e transformada em dois formatos:
- **TopicTableItem** — para a tabela (id, name, growth, frequency, frequencyUnit, subreddits como string[])
- **TopicDetail** — para o painel de detalhes ao clicar (inclui description e subreddits com postCount)

### 2.3 Loading state

Enquanto os dados sao carregados, um spinner e exibido no lugar da tabela de topicos, mantendo o padrao visual do projeto.

---

## 3. Solucao Implementada

### 3.1 Endpoint utilizado

| Metodo | URL | Descricao |
|--------|-----|-----------|
| GET | `/audiences/{audience_id}/topics` | Buscar topicos da audiencia |

**Response:**

```json
{
  "status": "ready",
  "analysis_id": "uuid",
  "total_topics": 559,
  "completed_at": "2026-02-21T18:25:38.305359+00:00",
  "topics": [
    {
      "id": "uuid",
      "name": "Social Media Growth Strategies",
      "description": "Discussions on effective methods...",
      "growth_percentage": 200.0,
      "mention_frequency": 15.0,
      "mention_period": "month",
      "post_count": 20,
      "communities": [
        { "name": "SocialMediaMarketing", "post_count": 15 }
      ],
      "rank": 1
    }
  ]
}
```

### 3.2 Arquitetura — Fluxo de dados

```
AudienceDetail Page
  └── useGetAudienceTopics(audienceId)
        └── GetAudienceTopicsUseCase
              └── AudienceRepository.getAudienceTopics()
                    └── GET /audiences/{id}/topics
                          └── Mapeia snake_case → Topic entity
```

### 3.3 Mapeamento de campos API → UI

| API (snake_case) | Entity (camelCase) | TopicTableItem | TopicDetail |
|------------------|--------------------|----------------|-------------|
| `id` | `id` | `id` | `id` |
| `name` | `name` | `name` | `name` |
| `growth_percentage` | `growthPercentage` | `growth` | `growth` |
| `mention_frequency` | `mentionFrequency` | `frequency` | `frequency` |
| `mention_period` | `mentionPeriod` | `frequencyUnit`* | `frequencyUnit`* |
| `description` | `description` | — | `description` |
| `communities[].name` | `communities[].name` | `subreddits[]` | `subreddits[].name` |
| `communities[].post_count` | `communities[].postCount` | — | `subreddits[].postCount` |

*`"month"` → `"mo"`, `"week"` → `"week"`, `"day"` → `"day"`

---

## 4. Arquivos Criados

| Arquivo | Descricao |
|---------|-----------|
| `src/modules/audience/domain/entities/Topic.entity.ts` | Entidade Topic com getters e toJSON |
| `src/modules/audience/domain/use-cases/get-audience-topics.use-case.ts` | Interface `IGetAudienceTopicsUseCase`, params e result types |
| `src/modules/audience/application/use-cases/get-audience-topics-use-case/index.ts` | Implementacao do use-case |
| `src/modules/audience/application/hooks/useGetAudienceTopics.ts` | Hook React Query com `useQuery` |

---

## 5. Arquivos Modificados

| Arquivo | Alteracao |
|---------|-----------|
| `src/modules/audience/domain/use-cases/index.ts` | Export dos novos tipos |
| `src/modules/audience/domain/repositories/audience.repository.ts` | Novo metodo `getAudienceTopics` na interface |
| `src/modules/audience/infra/repositories/audience.repository.ts` | Implementacao HTTP com interfaces de resposta API e mapeamento para entidade |
| `src/modules/audience/application/use-cases/index.ts` | Export do `GetAudienceTopicsUseCase` |
| `src/modules/audience/application/hooks/index.ts` | Export do `useGetAudienceTopics` e `AUDIENCE_TOPICS_QUERY_KEY` |
| `src/modules/shared/infra/container/types.ts` | Novo symbol `GetAudienceTopicsUseCase` |
| `src/modules/shared/infra/container/container.ts` | Binding do use-case no container Inversify |
| `src/pages/AudienceDetail.tsx` | Chamada do hook `useGetAudienceTopics`, passagem de props (topics, totalTopics, isLoadingTopics) |
| `src/components/audiences/detail/AudienceDetailTabs.tsx` | Novas props, remocao do import de mock `topicsData`, mapeamento Topic entity → TopicTableItem/TopicDetail, loading state |

---

## 6. Dependencias

Nenhuma nova dependencia adicionada.
