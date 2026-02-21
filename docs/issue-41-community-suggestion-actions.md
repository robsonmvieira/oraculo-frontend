# Issue #41 — Conectar botoes "Add to Audience" e "Not Relevant" nas sugestoes de comunidades

**Issue:** https://github.com/robsonmvieira/oraculo-frontend/issues/41
**PR:** https://github.com/robsonmvieira/oraculo-frontend/pull/42
**Branch:** `feat/community-suggestion-actions`
**Status:** Implementada

---

## 1. Motivacao

Na aba Subreddits da pagina de detalhes da audiencia, a secao "Similar Communities" exibia cards de sugestao com dois botoes — **Add to Audience** e **Not Relevant** — que nao tinham nenhuma acao conectada. Eram puramente visuais.

O objetivo era conectar ambos os botoes a logica de negocio:
- **Add to Audience** → adicionar a comunidade a audiencia do usuario via endpoint existente
- **Not Relevant** → enviar feedback negativo ao backend para que a comunidade nao apareca mais nas sugestoes

---

## 2. Decisoes de Design

### 2.1 Novo use-case: MarkCommunityNotRelevant

Criado um use-case completo seguindo o padrao Clean Architecture do projeto (domain interface → application implementation → repository → DI container), pois a acao de "Not Relevant" nao existia no sistema.

### 2.2 Reutilizacao do AddCommunityToAudience

O botao "Add to Audience" reutiliza o hook `useAddCommunityToAudience` ja existente, sem necessidade de criar infraestrutura nova.

### 2.3 Optimistic Update para Not Relevant

Como o endpoint `POST /feedback/community` pode demorar, foi implementado optimistic update com React Query:
- O card e removido instantaneamente da lista ao clicar
- Se a requisicao falhar, o card e restaurado (rollback) e um toast de erro aparece
- Isso previne cliques duplicados e melhora a experiencia do usuario

### 2.4 Alinhamento dos cards com flex

Os cards de sugestao estavam desalinhados quando as descricoes tinham tamanhos diferentes. Corrigido com `flex flex-col` no container, `flex-1` na descricao e `mt-auto` nos botoes.

---

## 3. Solucao Implementada

### 3.1 Endpoints utilizados

| Metodo | URL | Descricao |
|--------|-----|-----------|
| POST | `/audiences/{audience_id}/communities` | Adicionar comunidade a audiencia (ja existia) |
| POST | `/feedback/community` | Enviar feedback de "not relevant" (novo) |

**Body do feedback:**

```json
{
  "subreddit_name": "emailmarketing",
  "feedback": "not_relevant",
  "context_type": "audience",
  "context_id": "uuid-da-audiencia"
}
```

### 3.2 Arquitetura — Fluxo de dados

```
AudienceDetail Page (UI)
  ├── handleAddToAudience(subredditName)
  │     └── useAddCommunityToAudience → AddCommunityToAudienceUseCase
  │           └── AudienceRepository.addCommunityToAudience()
  │                 └── POST /audiences/{id}/communities
  │
  └── handleMarkNotRelevant(subredditName)
        └── useMarkCommunityNotRelevant (optimistic update)
              └── MarkCommunityNotRelevantUseCase
                    └── AudienceRepository.markCommunityNotRelevant()
                          └── POST /feedback/community
```

### 3.3 Propagacao de callbacks na arvore de componentes

```
AudienceDetail
  └── AudienceDetailTabs (onAddToAudience, onMarkNotRelevant)
        └── SubredditsTabContent (onAddToAudience, onMarkNotRelevant)
              └── SimilarCommunitiesGrid (onAddToAudience, onMarkNotRelevant)
                    └── Buttons com onClick
```

---

## 4. Arquivos Criados

| Arquivo | Descricao |
|---------|-----------|
| `src/modules/audience/domain/use-cases/mark-community-not-relevant.use-case.ts` | Interface do domain: `IMarkCommunityNotRelevantUseCase` e `MarkCommunityNotRelevantParams` |
| `src/modules/audience/application/use-cases/mark-community-not-relevant-use-case/index.ts` | Implementacao do use-case |
| `src/modules/audience/application/hooks/useMarkCommunityNotRelevant.ts` | Hook React Query com `useMutation` e optimistic update |

---

## 5. Arquivos Modificados

| Arquivo | Alteracao |
|---------|-----------|
| `src/modules/audience/domain/use-cases/index.ts` | Export dos novos tipos |
| `src/modules/audience/domain/repositories/audience.repository.ts` | Novo metodo `markCommunityNotRelevant` na interface |
| `src/modules/audience/infra/repositories/audience.repository.ts` | Implementacao do `markCommunityNotRelevant` com POST |
| `src/modules/audience/application/use-cases/index.ts` | Export do `MarkCommunityNotRelevantUseCase` |
| `src/modules/audience/application/hooks/index.ts` | Export do `useMarkCommunityNotRelevant` |
| `src/modules/shared/infra/container/types.ts` | Novo symbol `MarkCommunityNotRelevantUseCase` |
| `src/modules/shared/infra/container/container.ts` | Binding do use-case no container Inversify |
| `src/components/audiences/detail/SimilarCommunitiesGrid.tsx` | Props `onAddToAudience` e `onMarkNotRelevant`, onClick nos botoes, fix de alinhamento com flex |
| `src/components/audiences/detail/SubredditsTabContent.tsx` | Repasse dos callbacks para `SimilarCommunitiesGrid` |
| `src/components/audiences/detail/AudienceDetailTabs.tsx` | Repasse dos callbacks para `SubredditsTabContent` |
| `src/pages/AudienceDetail.tsx` | Import dos hooks, criacao dos handlers, passagem de props |

---

## 6. Dependencias

Nenhuma nova dependencia adicionada.
