# Issue #32 — Deletar Audiência do Usuário na Tela de Detalhes

**Issue:** https://github.com/robsonmvieira/oraculo-frontend/issues/32
**PR:** https://github.com/robsonmvieira/oraculo-frontend/pull/33
**Branch:** `feat/delete-audience`
**Status:** Implementada

---

## 1. Motivacao

O usuario nao tinha forma de deletar uma audiencia propria a partir da tela de detalhes. Era necessario adicionar essa funcionalidade com protecao adequada (modal de confirmacao) e feedback visual, seguindo a mesma arquitetura DDD do projeto.

O backend ja disponibilizava o endpoint:
- `DELETE /audiences/:audience_id` — deletar audiencia (retorna `{ "deleted": true }`)

---

## 2. Decisoes de Design

### 2.1 Botao Delete condicional

O botao "Delete" so e renderizado quando `isUserAudience === true` (query param `?type=user`). Audiencias template nao exibem o botao, pois o usuario nao e dono delas.

### 2.2 Modal de confirmacao com alerta de irreversibilidade

Usamos o componente `Modal` existente (size `sm`) com icone `AlertTriangle` em vermelho, texto explicativo informando que a acao e irreversivel e que todos os dados serao permanentemente removidos. O modal possui botoes "Cancel" e "Delete" com loading state.

### 2.3 Feedback visual com toasts

Apos a delecao bem-sucedida, exibimos toast de sucesso e redirecionamos para `/audiences`. Em caso de erro, exibimos toast de erro e o modal permanece aberto para o usuario tentar novamente.

### 2.4 Invalidacao de cache

O hook `useDeleteAudience` invalida `AUDIENCES_QUERY_KEY` no `onSuccess` da mutation, garantindo que a listagem de audiencias reflita a remocao ao retornar para `/audiences`.

---

## 3. Solucao Implementada

### 3.1 Endpoint utilizado

| Metodo | URL | Response | Descricao |
|--------|-----|----------|-----------|
| DELETE | `/audiences/:audience_id` | `{ "deleted": true }` | Deletar audiencia do usuario |

### 3.2 Arquitetura

```
AudienceDetail Page (UI)
  ├── Botao "Delete" (so para user audiences)
  │     └── setShowDeleteModal(true)
  │           └── Modal de confirmacao
  │                 └── Botao "Delete" (confirmar)
  │                       └── useDeleteAudience hook
  │                             └── DeleteAudienceUseCase → AudienceRepository.deleteAudience()
  │                                   └── DELETE /audiences/{id}
  │                                         └── onSuccess: toast + navigate('/audiences')
  │                                         └── onError: toast de erro
```

### 3.3 Use Case criado (DDD completo)

Seguindo o padrao existente com todas as camadas:

```
Domain Interface → Application Implementation → Repository Method → Hook → DI Container
```

1. **DeleteAudience** — `DELETE /audiences/:audience_id`

---

## 4. Arquivos Criados

| Arquivo | Descricao |
|---------|-----------|
| `src/modules/audience/domain/use-cases/delete-audience.use-case.ts` | Interface `IDeleteAudienceUseCase` + tipos `DeleteAudienceParams`, `DeleteAudienceResult` |
| `src/modules/audience/application/use-cases/delete-audience-use-case/index.ts` | Implementacao `DeleteAudienceUseCase` |
| `src/modules/audience/application/hooks/useDeleteAudience.ts` | Hook mutation — invalida `AUDIENCES_QUERY_KEY` |

## 5. Arquivos Modificados

| Arquivo | Alteracao |
|---------|-----------|
| `src/modules/audience/domain/use-cases/index.ts` | Export do novo use case type |
| `src/modules/audience/domain/repositories/audience.repository.ts` | Novo metodo `deleteAudience` na interface `IAudienceRepository` |
| `src/modules/audience/infra/repositories/audience.repository.ts` | Implementacao de `deleteAudience` — `DELETE audiences/${audienceId}` |
| `src/modules/audience/application/use-cases/index.ts` | Export da nova classe |
| `src/modules/audience/application/hooks/index.ts` | Export do novo hook |
| `src/modules/shared/infra/container/types.ts` | Novo symbol: `DeleteAudienceUseCase` |
| `src/modules/shared/infra/container/container.ts` | Novo binding singleton no Inversify container |
| `src/pages/AudienceDetail.tsx` | Botao Delete condicional, modal de confirmacao, integracao com hook e toasts |

---

## 6. Ajustes Visuais Incluidos

Alem da feature principal, a PR incluiu ajustes visuais solicitados durante a revisao:

| Arquivo | Ajuste |
|---------|--------|
| `src/components/shared/CommunitySelectCard.tsx` | `min-h-[163px]` para equalizar altura dos cards de comunidade no modal de edicao |
| `src/pages/AudienceDetail.tsx` | Layout da aba Topics de `w-1/3` para `w-1/2` (50/50 entre tabela e painel de detalhes) |
| `src/components/audiences/detail/TopicsTable.tsx` | Nome do topico alinhado a esquerda com largura fixa (`w-32`), demais itens agrupados a direita com sparklines alinhados na mesma posicao horizontal |

---

## 7. Dependencias

Nenhuma nova dependencia adicionada.
