# Frontend de Analise de Sentimento por Topico

**Issue:** [#68](https://github.com/robsonmvieira/oraculo-frontend/issues/68)
**PR:** [#69](https://github.com/robsonmvieira/oraculo-frontend/pull/69)
**Branch:** `feat/topic-sentiment-analysis`
**Status:** In Review

---

## 1. Motivacao

O backend (Issue #59) implementou a analise de sentimento por topico com dois endpoints REST. O botao "Sentiment" ja existia no `TopicDetailPanel.tsx` como placeholder sem funcionalidade. Esta issue conecta esse botao a funcionalidade completa, seguindo o mesmo padrao arquitetural do Deep Dive e Behavioral Patterns.

Enquanto o Deep Dive responde "o que esta acontecendo neste topico?" e os Behavioral Patterns respondem "o que as pessoas estao fazendo?", a Analise de Sentimento responde **"como as pessoas se SENTEM?"** — emocoes predominantes, drivers de sentimento, pontos de tensao, dor e oportunidades.

---

## 2. Decisoes de Design

| Decisao | Justificativa |
|---------|---------------|
| Mesmo padrao arquitetural do Deep Dive e Patterns | Consistencia no codebase — entity, use-case, repository, hook, componentes |
| Polling de 3s via `refetchInterval` do React Query | Padrao ja estabelecido; evita complexidade de WebSocket |
| 8 componentes de secao separados | Cada secao tem layout especifico; facilita manutencao e reutilizacao |
| Exibicao inline no TopicDetailPanel | Mesmo padrao visual — sem modal, sem pagina nova |
| Exclusividade mutua entre Browse All, Patterns e Sentiment | Apenas um painel ativo por vez; ao ativar Sentiment, desativa os outros |
| Icone Heart para botao Sentiment | Semanticamente adequado para representar sentimento/emocao |
| Cores semanticas por tipo de dado | Score (verde/vermelho/cinza), intensidade (vermelho/amarelo/cinza), confianca (verde/amarelo/cinza) |
| Barras de progresso para distribuicao | Visualizacao intuitiva de ratios positivo/negativo/neutro |

---

## 3. Solucao Implementada

### Fluxo de dados

```
TopicDetailPanel.tsx
  ├── Click "Sentiment"
  │     ├── setSentimentActive(true)
  │     ├── setBrowseAllActive(false)
  │     ├── setPatternsActive(false)
  │     └── useGetTopicSentiment (enabled: true)
  │
  ├── useGetTopicSentiment (polling 3s quando processing)
  │     └── GET /sentiment → status: processing | ready | failed | no_analysis
  │
  ├── Estado no_analysis:
  │     └── Click "Start Analysis" → triggerSentiment.mutate() → POST /sentiment/refresh
  │
  └── Render por status:
        ├── loading → Spinner + "Analyzing sentiment..."
        ├── processing → Spinner + "Analyzing sentiment..." + "This may take 2-3 minutes"
        ├── failed → AlertCircle + Retry button
        ├── no_analysis → "No analysis found" + Start Analysis button
        └── ready → 8 secoes de analise de sentimento
```

### Endpoints consumidos

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | `/audiences/{id}/topics/{topic_id}/sentiment` | Consulta resultado da analise |
| POST | `/audiences/{id}/topics/{topic_id}/sentiment/refresh` | Dispara analise em background (202) |

### Estrutura de dados (8 secoes de sentimento)

1. **Overall Sentiment** — score geral, distribuicao positivo/negativo/neutro com barras de progresso
2. **Emotional Map** — emocoes detectadas com intensidade, porcentagem e exemplo
3. **Sentiment by Community** — sentimento por comunidade com barras empilhadas e emocao dominante
4. **Sentiment by Subtopic** — subtopicos com label de sentimento, score e key driver
5. **Sentiment Drivers** — drivers positivos e negativos com frequencia, mencoes e quotes
6. **Tension Points** — pontos de tensao com ratio for/against, intensidade e resumo
7. **Pain Points** — pontos de dor com severidade, frequencia, comunidades e verbatim
8. **Sentiment Opportunities** — oportunidades com confianca, base e audiencia-alvo

---

## 4. Arquivos Criados

### Entidade
- `src/modules/audience/domain/entities/TopicSentiment.entity.ts` — Classe com interfaces OverallSentiment, EmotionalMapEntry, SentimentByCommunity, SentimentBySubtopic, SentimentDriver, SentimentDrivers, TensionPoint, PainPoint, SentimentOpportunity e getters

### Use Case Interfaces
- `src/modules/audience/domain/use-cases/get-topic-sentiment.use-case.ts` — Interface IGetTopicSentimentUseCase, params, result, TopicSentimentStatus type
- `src/modules/audience/domain/use-cases/trigger-topic-sentiment.use-case.ts` — Interface ITriggerTopicSentimentUseCase, params, result

### Use Cases Concretos
- `src/modules/audience/application/use-cases/get-topic-sentiment-use-case/index.ts` — Delega para audienceRepository.getTopicSentiment()
- `src/modules/audience/application/use-cases/trigger-topic-sentiment-use-case/index.ts` — Delega para audienceRepository.triggerTopicSentiment()

### Hooks
- `src/modules/audience/application/hooks/useGetTopicSentiment.ts` — useQuery com refetchInterval de 3s quando processing
- `src/modules/audience/application/hooks/useTriggerTopicSentiment.ts` — useMutation com invalidacao de query

### Componentes
- `src/components/audiences/detail/sentiment/index.ts` — Barrel export
- `src/components/audiences/detail/sentiment/SentimentOverallSection.tsx` — Score badge + barras de distribuicao positivo/negativo/neutro
- `src/components/audiences/detail/sentiment/EmotionalMapSection.tsx` — Cards de emocao com intensity badge, porcentagem e exemplo
- `src/components/audiences/detail/sentiment/SentimentByCommunitySection.tsx` — Barras empilhadas por comunidade + emocao dominante
- `src/components/audiences/detail/sentiment/SentimentBySubtopicSection.tsx` — Subtopicos com label de sentimento, score e key driver
- `src/components/audiences/detail/sentiment/SentimentDriversSection.tsx` — Grupos positivo/negativo com ThumbsUp/ThumbsDown, frequencia, mencoes, quotes
- `src/components/audiences/detail/sentiment/TensionPointsSection.tsx` — Ratio for/against, intensity badge e resumo
- `src/components/audiences/detail/sentiment/PainPointsSection.tsx` — Severity + frequency badges, verbatim, community tags
- `src/components/audiences/detail/sentiment/SentimentOpportunitiesSection.tsx` — Confidence badge, basedOn, targetAudience tag

---

## 5. Arquivos Modificados

| Arquivo | Alteracao |
|---------|-----------|
| `src/modules/audience/domain/repositories/audience.repository.ts` | +2 metodos na interface IAudienceRepository |
| `src/modules/audience/infra/repositories/audience.repository.ts` | +2 implementacoes com mapeamento snake_case → camelCase + interfaces de API |
| `src/modules/audience/domain/use-cases/index.ts` | +2 exports de tipos |
| `src/modules/audience/application/use-cases/index.ts` | +2 exports de use cases |
| `src/modules/audience/application/hooks/index.ts` | +2 exports de hooks |
| `src/modules/shared/infra/container/types.ts` | +2 Symbols para DI |
| `src/modules/shared/infra/container/container.ts` | +2 bindings Inversify |
| `src/components/audiences/detail/TopicDetailPanel.tsx` | Conexao do botao Sentiment com hooks, estados e 8 componentes |
| `src/locales/en/audiences.json` | +16 chaves em topicDetail + secao topicSentiment com labels |
| `src/locales/pt-BR/audiences.json` | +16 chaves em topicDetail + secao topicSentiment com labels |

---

## 6. Como Testar

1. Navegar para `/audiences/:id` → aba Topics → selecionar um topico
2. Clicar em "Sentiment" → deve ativar secao e buscar status via GET
3. Se `no_analysis` → mostrar estado vazio com botao "Start Analysis"
4. Clicar "Start Analysis" → POST /sentiment/refresh → polling a cada 3s
5. Enquanto `processing` → spinner + "Analyzing sentiment..." + "This may take 2-3 minutes"
6. Quando `ready` → renderizar as 8 secoes com dados do backend
7. Se `failed` → mostrar erro + botao Retry
8. Trocar de topico → deve resetar estado de sentimento
9. Clicar em "Browse All" ou "Patterns" → deve desativar Sentiment (exclusividade mutua)

---

## 7. Relacao com Outras Issues

| Issue | Relacao |
|-------|---------|
| #59 (backend) | Fornece os endpoints de sentimento consumidos |
| #63 — Behavioral Patterns Frontend | Mesmo padrao arquitetural replicado |
| Deep Dive (frontend) | Mesmo padrao arquitetural original |
| #66 — i18n Migration | Reutiliza infraestrutura de traducoes |
| #67 — Remove Deep Dive Sentiment | Separou sentimento do deep dive para este modulo dedicado |
