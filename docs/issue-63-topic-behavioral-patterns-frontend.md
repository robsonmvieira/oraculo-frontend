# Frontend de Padroes Comportamentais por Topico

**Issue:** [#63](https://github.com/robsonmvieira/oraculo-frontend/issues/63)
**PR:** [#64](https://github.com/robsonmvieira/oraculo-frontend/pull/64)
**Branch:** `feat/topic-behavioral-patterns-frontend`
**Status:** In Review

---

## 1. Motivacao

O backend (Issue #40) implementou a deteccao de padroes comportamentais por topico com dois endpoints REST. O botao "Patterns" ja existia no `TopicDetailPanel.tsx` como placeholder sem funcionalidade. Esta issue conecta esse botao a funcionalidade completa, seguindo o mesmo padrao arquitetural do Deep Dive.

Enquanto o Deep Dive responde "o que esta acontecendo neste topico?", os Behavioral Patterns respondem **"o que as pessoas estao FAZENDO?"** — ferramentas usadas, gambiarras criadas, friccoes, migracoes entre ferramentas e demandas nao atendidas.

---

## 2. Decisoes de Design

| Decisao | Justificativa |
|---------|---------------|
| Mesmo padrao arquitetural do Deep Dive | Consistencia no codebase — entity, use-case, repository, hook, componentes |
| Polling de 3s via `refetchInterval` do React Query | Padrao ja estabelecido no deep-dive; evita complexidade de WebSocket |
| 6 componentes de secao separados | Cada secao tem layout especifico; facilita manutencao e reutilizacao |
| Exibicao inline no TopicDetailPanel | Mesmo padrao visual do Deep Dive — sem modal, sem pagina nova |
| Cores semanticas por tipo de dado | Satisfacao (verde/vermelho/amarelo), severidade (vermelho/amarelo/cinza), frequencia (vermelho/amarelo/cinza) |
| Evidencia em italico com aspas | Destaca que sao quotes reais dos posts/comentarios do Reddit |

---

## 3. Solucao Implementada

### Fluxo de dados

```
TopicDetailPanel.tsx
  ├── Click "Patterns"
  │     ├── setPatternsActive(true)
  │     └── triggerPatterns.mutate() → POST /behavioral-patterns/refresh
  │
  ├── useGetTopicBehavioralPatterns (polling 3s quando processing)
  │     └── GET /behavioral-patterns → status: processing | ready | failed | no_analysis
  │
  └── Render por status:
        ├── processing → Spinner + "Detecting behavioral patterns..."
        ├── failed → AlertCircle + Retry button
        ├── no_analysis → "No analysis found" + Start Analysis button
        └── ready → 6 secoes de padroes comportamentais
```

### Endpoints consumidos

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | `/audiences/{id}/topics/{topic_id}/behavioral-patterns` | Consulta resultado da analise |
| POST | `/audiences/{id}/topics/{topic_id}/behavioral-patterns/refresh` | Dispara analise em background |

### Estrutura de dados (5 secoes comportamentais)

1. **Tool Patterns** — ferramentas usadas, caso de uso, satisfacao, pain points, evidencia, comunidades
2. **Workaround Patterns** — problema, gambiarra, frequencia, evidencia, comunidades
3. **Friction Patterns** — friccao, categoria, severidade, ferramentas afetadas, evidencia
4. **Shift Patterns** — de (ferramenta), para (ferramenta), razao, estagio, evidencia
5. **Demand Signals** — sinal, tipo de sinal, frequencia, comunidades, evidencia

---

## 4. Arquivos Criados

### Entidade
- `src/modules/audience/domain/entities/TopicBehavioralPattern.entity.ts` — Classe com interfaces ToolPattern, WorkaroundPattern, FrictionPattern, ShiftPattern, DemandSignal e getters

### Use Case Interfaces
- `src/modules/audience/domain/use-cases/get-topic-behavioral-patterns.use-case.ts` — Interface IGetTopicBehavioralPatternsUseCase, params, result, status type
- `src/modules/audience/domain/use-cases/trigger-topic-behavioral-patterns.use-case.ts` — Interface ITriggerTopicBehavioralPatternsUseCase, params, result

### Use Cases Concretos
- `src/modules/audience/application/use-cases/get-topic-behavioral-patterns-use-case/index.ts` — Delega para audienceRepository.getTopicBehavioralPatterns()
- `src/modules/audience/application/use-cases/trigger-topic-behavioral-patterns-use-case/index.ts` — Delega para audienceRepository.triggerTopicBehavioralPatterns()

### Hooks
- `src/modules/audience/application/hooks/useGetTopicBehavioralPatterns.ts` — useQuery com refetchInterval de 3s quando processing
- `src/modules/audience/application/hooks/useTriggerTopicBehavioralPatterns.ts` — useMutation com invalidacao de query

### Componentes
- `src/components/audiences/detail/behavioral-patterns/index.ts` — Barrel export
- `src/components/audiences/detail/behavioral-patterns/BehavioralPatternsSummarySection.tsx` — Summary text
- `src/components/audiences/detail/behavioral-patterns/ToolPatternsSection.tsx` — Ferramentas com satisfacao e pain points
- `src/components/audiences/detail/behavioral-patterns/WorkaroundPatternsSection.tsx` — Gambiarras com problema e solucao
- `src/components/audiences/detail/behavioral-patterns/FrictionPatternsSection.tsx` — Friccoes com categoria e severidade
- `src/components/audiences/detail/behavioral-patterns/ShiftPatternsSection.tsx` — Migracoes from → to com razao
- `src/components/audiences/detail/behavioral-patterns/DemandSignalsSection.tsx` — Sinais de demanda com tipo e frequencia

---

## 5. Arquivos Modificados

| Arquivo | Alteracao |
|---------|-----------|
| `src/modules/audience/domain/repositories/audience.repository.ts` | +2 metodos na interface IAudienceRepository |
| `src/modules/audience/infra/repositories/audience.repository.ts` | +2 implementacoes com mapeamento snake_case → camelCase |
| `src/modules/audience/domain/use-cases/index.ts` | +2 exports de tipos |
| `src/modules/audience/application/use-cases/index.ts` | +2 exports de use cases |
| `src/modules/audience/application/hooks/index.ts` | +2 exports de hooks |
| `src/modules/shared/infra/container/types.ts` | +2 Symbols para DI |
| `src/modules/shared/infra/container/container.ts` | +2 bindings Inversify |
| `src/components/audiences/detail/TopicDetailPanel.tsx` | Conexao do botao Patterns com hooks e componentes |
| `src/locales/en/audiences.json` | +12 chaves de traducao em topicDetail |
| `src/locales/pt-BR/audiences.json` | +12 chaves de traducao em topicDetail |

---

## 6. Como Testar

1. Navegar para `/audiences/:id` → aba Topics → selecionar um topico
2. Clicar em "Patterns" → deve disparar POST e mostrar spinner "Detecting behavioral patterns..."
3. Aguardar polling (3s) → quando status='ready', renderiza as 5 secoes
4. Testar estado 'failed' → deve mostrar botao Retry
5. Trocar de topico → deve resetar o estado de behavioral patterns

---

## 7. Relacao com Outras Issues

| Issue | Relacao |
|-------|---------|
| #40 (backend) | Fornece os endpoints consumidos |
| Deep Dive (frontend) | Mesmo padrao arquitetural replicado |
| #59 — i18n Setup | Reutiliza infraestrutura de traducoes |
