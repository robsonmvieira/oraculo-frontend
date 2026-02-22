# Issue #53 — Topic Deep Dive inline no painel de detalhes do topico

**Issue:** https://github.com/robsonmvieira/oraculo-frontend/issues/53
**PR:** https://github.com/robsonmvieira/oraculo-frontend/pull/54
**Branch:** `feat/topic-deep-dive-inline`
**Status:** In Review

---

## 1. Motivacao

Na aba Topics, ao selecionar um topico, o painel lateral direito (`TopicDetailPanel`) exibia apenas informacoes basicas: nome, frequencia de mencao, crescimento, descricao e lista de subreddits. O botao "Browse All" existia mas nao tinha funcionalidade.

O backend do Topic Deep Dive (Issue #38 do backend) ja estava implementado e retorna uma analise rica com 7 secoes: summary, subtopics, common questions, sentiment analysis, mentioned products, representative posts e actionable insights.

O usuario precisava entender **o que** estava sendo discutido dentro de cada topico, nao apenas saber que o topico existia.

---

## 2. Decisoes de Design

### 2.1 Inline vs. nova pagina

Optamos por expandir o deep dive **inline no proprio painel**, abaixo da lista de subreddits, ao inves de navegar para uma pagina dedicada. Motivo: manter o usuario no contexto da aba Topics, permitindo comparar topicos sem navegacao adicional.

### 2.2 Analise sob demanda

O deep dive so e disparado quando o usuario clica "Browse All". Isso evita custo desnecessario de LLM no backend, ja que nem todo topico sera explorado.

### 2.3 Polling automatico

O hook `useGetTopicDeepDive` usa `refetchInterval` do React Query para polling a cada 3 segundos enquanto o status e "processing". Quando muda para "ready" ou "failed", o polling para automaticamente.

### 2.4 Reset ao trocar de topico

Quando o usuario seleciona outro topico, o estado do deep dive e resetado (`deepDiveActive = false`), evitando exibir dados do topico anterior.

### 2.5 Separacao visual entre secoes

Cada secao do deep dive e separada por `border-t border-gray-100 dark:border-zinc-800` com titulo proprio, mantendo a informacao escaneavel.

---

## 3. Solucao Implementada

### 3.1 Fluxo completo

```
Usuario clica "Browse All"
  ↓
useTriggerTopicDeepDive → POST /audiences/{id}/topics/{topicId}/deep-dive/refresh (202)
  ↓
deepDiveActive = true → ativa useGetTopicDeepDive
  ↓
useGetTopicDeepDive → GET /audiences/{id}/topics/{topicId}/deep-dive
  ↓ refetchInterval: 3s enquanto "processing"
status === "ready" → renderiza 7 secoes
status === "failed" → mensagem de erro + botao "Retry"
```

### 3.2 Stack DDD implementada

Seguindo o padrao existente no projeto:

| Camada | Arquivo | Responsabilidade |
|--------|---------|------------------|
| Domain Entity | `TopicDeepDive.entity.ts` | Classe com props privadas + getters para todos os dados do deep dive |
| Domain Use Case | `get-topic-deep-dive.use-case.ts` | Interface `IGetTopicDeepDiveUseCase` + tipos `GetTopicDeepDiveResult` |
| Domain Use Case | `trigger-topic-deep-dive.use-case.ts` | Interface `ITriggerTopicDeepDiveUseCase` + tipos |
| Domain Repository | `audience.repository.ts` | +2 metodos na interface `IAudienceRepository` |
| Application Use Case | `get-topic-deep-dive-use-case/` | Implementacao delegando para repositorio |
| Application Use Case | `trigger-topic-deep-dive-use-case/` | Implementacao delegando para repositorio |
| Application Hook | `useGetTopicDeepDive.ts` | `useQuery` com polling via `refetchInterval` |
| Application Hook | `useTriggerTopicDeepDive.ts` | `useMutation` com invalidacao de cache |
| Infra Repository | `audience.repository.ts` | HTTP GET/POST com mapeamento snake_case→camelCase |
| DI Container | `types.ts`, `container.ts` | Symbols + bindings Inversify |

### 3.3 Componentes de secao

Todos em `src/components/audiences/detail/deep-dive/`:

| Componente | Dados exibidos |
|-----------|---------------|
| `DeepDiveSummarySection` | Texto de resumo da analise |
| `DeepDiveSubtopicsSection` | Grid de subtopicos (nome, descricao, post_count) |
| `DeepDiveQuestionsSection` | Perguntas frequentes com badges de frequencia (high/medium/low) |
| `DeepDiveSentimentSection` | Sentimento geral + barras de ratio (positive/negative/neutral) + highlights |
| `DeepDiveProductsSection` | Produtos mencionados com sentimento, categoria e contagem |
| `DeepDivePostsSection` | Posts representativos com score, subreddit e link para Reddit |
| `DeepDiveInsightsSection` | Insights accionaveis com tipo (opportunity/gap/risk/trend) e confianca |

### 3.4 Estados do painel

| Estado | UI |
|--------|-----|
| Antes do clique | Painel basico normal (sem mudanca) |
| Clicou "Browse All" | Botao muda para "Analyzing..." (disabled) com spinner |
| `processing` | Spinner + "Analyzing topic... This may take a couple of minutes" |
| `failed` | Icone de erro + "Analysis failed" + botao "Retry" |
| `no_analysis` | Mensagem + botao "Start Analysis" |
| `ready` | Header "Deep Dive" com botao "Refresh" + 7 secoes |

---

## 4. Arquivos Criados

| Arquivo | Camada |
|---------|--------|
| `src/modules/audience/domain/entities/TopicDeepDive.entity.ts` | Domain |
| `src/modules/audience/domain/use-cases/get-topic-deep-dive.use-case.ts` | Domain |
| `src/modules/audience/domain/use-cases/trigger-topic-deep-dive.use-case.ts` | Domain |
| `src/modules/audience/application/use-cases/get-topic-deep-dive-use-case/index.ts` | Application |
| `src/modules/audience/application/use-cases/trigger-topic-deep-dive-use-case/index.ts` | Application |
| `src/modules/audience/application/hooks/useGetTopicDeepDive.ts` | Application |
| `src/modules/audience/application/hooks/useTriggerTopicDeepDive.ts` | Application |
| `src/components/audiences/detail/deep-dive/DeepDiveSummarySection.tsx` | UI |
| `src/components/audiences/detail/deep-dive/DeepDiveSubtopicsSection.tsx` | UI |
| `src/components/audiences/detail/deep-dive/DeepDiveQuestionsSection.tsx` | UI |
| `src/components/audiences/detail/deep-dive/DeepDiveSentimentSection.tsx` | UI |
| `src/components/audiences/detail/deep-dive/DeepDiveProductsSection.tsx` | UI |
| `src/components/audiences/detail/deep-dive/DeepDivePostsSection.tsx` | UI |
| `src/components/audiences/detail/deep-dive/DeepDiveInsightsSection.tsx` | UI |
| `src/components/audiences/detail/deep-dive/index.ts` | UI |

---

## 5. Arquivos Modificados

| Arquivo | Alteracao |
|---------|-----------|
| `src/modules/audience/domain/repositories/audience.repository.ts` | +2 metodos na interface: `getTopicDeepDive`, `triggerTopicDeepDive` |
| `src/modules/audience/domain/use-cases/index.ts` | Export dos novos types |
| `src/modules/audience/infra/repositories/audience.repository.ts` | +2 metodos HTTP com interfaces de API response e mapeamento snake_case→camelCase |
| `src/modules/audience/application/use-cases/index.ts` | Export das novas use cases |
| `src/modules/audience/application/hooks/index.ts` | Export dos novos hooks |
| `src/modules/shared/infra/container/types.ts` | +2 symbols: `GetTopicDeepDiveUseCase`, `TriggerTopicDeepDiveUseCase` |
| `src/modules/shared/infra/container/container.ts` | +2 bindings Inversify |
| `src/components/audiences/detail/TopicDetailPanel.tsx` | onClick "Browse All" + secao deep dive inline + estados de loading/processing/failed/ready |
| `src/components/audiences/detail/AudienceDetailTabs.tsx` | Nova prop `audienceId` passada para `TopicDetailPanel` |
| `src/pages/AudienceDetail.tsx` | Passa `audienceId` para `AudienceDetailTabs` |

---

## 6. Dependencias

Nenhuma nova dependencia adicionada. Utiliza React Query, Inversify, Lucide React e Tailwind CSS ja presentes no projeto.

---

## 7. Relacao com Outras Issues

| Issue | Relacao |
|-------|---------|
| #38 (backend) | Backend que fornece os endpoints de deep dive consumidos aqui |
| #43 — Connect Topics API | Base: conectou a API de topicos, esta issue consome os topicos para disparar deep dive |
| #51 — Dynamic Topics Preview | Usa o mesmo fluxo de dados de topicos propagado via props |
