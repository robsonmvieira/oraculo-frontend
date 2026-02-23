# Sistema de Notificacoes Frontend com SSE

**Issue:** [#61](https://github.com/robsonmvieira/oraculo-frontend/issues/61)
**PR:** [#62](https://github.com/robsonmvieira/oraculo-frontend/pull/62)
**Branch:** `feat/notifications-sse-frontend`
**Status:** Done

---

## 1. Motivacao

O backend implementou um sistema de notificacoes com SSE (Issue #16), incluindo persistencia no PostgreSQL, Redis pub/sub, e endpoints REST. Porem, o frontend permanecia com um badge hardcoded "3" no sino da Topbar sem funcionalidade real. O usuario nao tinha como saber quando uma analise (deep dive, behavioral patterns, keywords, etc.) terminava sem recarregar a pagina manualmente.

---

## 2. Decisoes de Design

| Decisao | Justificativa |
|---------|---------------|
| Modulo `notifications/` seguindo Clean Architecture | Manter consistencia com os modulos existentes (auth, audience, community) — domain/infra/application |
| SSE via `EventSource` nativo | API nativa do browser com reconexao automatica; backend ja implementou SSE em vez de WebSocket |
| Autenticacao via `?token=jwt` na URL do SSE | `EventSource` nao suporta headers customizados — mesma abordagem do backend |
| Zustand store para estado real-time | Armazenar unreadCount e buffer de notificacoes SSE; atualizado instantaneamente sem esperar query refetch |
| React Query para dados paginados | Lista de notificacoes paginada usa useQuery com invalidacao automatica ao receber SSE ou marcar como lida |
| Hook `useNotificationSSE()` no MainLayout | Conexao SSE ativa em todas as paginas autenticadas; desconecta automaticamente no logout |
| Tab "Archived" = notificacoes lidas | Backend nao possui conceito de "archive" — reaproveitamos `is_read=true` como "arquivada" |
| Sem acao "Remove" | Backend nao possui endpoint de delete; cleanup automatico de lidas com 30+ dias e feito no servidor |
| Badge dinamico com cap "9+" | Evita overflow visual no badge circular; escondido quando count = 0 |
| Toast ao receber notificacao SSE | Feedback imediato com variant success/destructive conforme tipo da notificacao |
| i18n namespace `notifications` | Segue o padrao existente — um JSON por modulo em en/ e pt-BR/ |

---

## 3. Solucao Implementada

### Arquitetura do Modulo

```
src/modules/notifications/
  domain/
    entities/
      notification.entity.ts     ← Entidade com 10 tipos de notificacao, getters, toJSON()
      index.ts
    repositories/
      notification.repository.ts ← Interface INotificationRepository
      index.ts
    use-cases/
      list-notifications.use-case.ts
      get-unread-count.use-case.ts
      mark-notification-read.use-case.ts
      mark-all-read.use-case.ts
      index.ts
  infra/
    repositories/
      notification.repository.ts ← Implementacao HTTP (KyHttpClient)
      index.ts
    services/
      sse.service.ts             ← EventSource manager (connect/disconnect/isConnected)
  application/
    use-cases/
      list-notifications/index.ts
      get-unread-count/index.ts
      mark-notification-read/index.ts
      mark-all-read/index.ts
      index.ts
    hooks/
      useNotifications.ts        ← React Query hooks (useListNotifications, useUnreadCount, useMarkAsRead, useMarkAllAsRead)
      useNotificationSSE.ts      ← SSE connection hook (conecta/desconecta com ciclo de vida do auth)
    store/
      notification.store.ts      ← Zustand store (unreadCount, realtimeNotifications, isSSEConnected)
  index.ts                       ← Barrel export
```

### Componentes UI

```
src/components/notifications/
  NotificationIcon.tsx           ← Icone + cor por tipo (Brain, Search, TrendingUp, Tag, MessageSquare)
  NotificationCard.tsx           ← Card: icone, titulo, mensagem, dot nao-lida, acao "Mark as read", timestamp
  NotificationDropdown.tsx       ← Popover no sino da Topbar com lista das ultimas 5 e badge
  index.ts
```

### Pagina

```
src/pages/NotificationsPage.tsx  ← Tabs All/Unread/Archived, mark all as read, empty states, GSAP animations
```

### Fluxo de dados

```
1. SSE (tempo real):
   MainLayout monta → useNotificationSSE() → EventSource conecta
     → Servidor envia evento "notification"
       → SSE Service parseia JSON → cria entidade Notification
         → Zustand store: incrementUnreadCount + addRealtimeNotification
         → React Query: invalidateQueries(['notifications'])
         → Toast: mostra titulo + mensagem (success/destructive)

2. REST (paginado):
   NotificationsPage monta → useListNotifications({ limit, offset, unread_only })
     → React Query → ListNotificationsUseCase → NotificationRepository → GET /notifications
       → Renderiza lista de NotificationCards

3. Marcar como lida:
   Usuario clica "Mark as read" → useMarkAsRead.mutate(id)
     → MarkNotificationReadUseCase → PATCH /notifications/{id}/read
       → onSuccess: decrementUnreadCount + invalidateQueries

4. Marcar todas como lidas:
   Usuario clica "Mark all as read" → useMarkAllAsRead.mutate()
     → MarkAllReadUseCase → PATCH /notifications/read-all
       → onSuccess: resetUnreadCount + invalidateQueries
```

---

## 4. Arquivos

### Arquivos Criados (28)

| Arquivo | Descricao |
|---------|-----------|
| `src/modules/notifications/domain/entities/notification.entity.ts` | Entidade Notification com 10 tipos, getters, isSuccess(), isFailure(), toJSON() |
| `src/modules/notifications/domain/entities/index.ts` | Barrel export |
| `src/modules/notifications/domain/repositories/notification.repository.ts` | Interface INotificationRepository |
| `src/modules/notifications/domain/repositories/index.ts` | Barrel export |
| `src/modules/notifications/domain/use-cases/list-notifications.use-case.ts` | Interface IListNotificationsUseCase |
| `src/modules/notifications/domain/use-cases/get-unread-count.use-case.ts` | Interface IGetUnreadCountUseCase |
| `src/modules/notifications/domain/use-cases/mark-notification-read.use-case.ts` | Interface IMarkNotificationReadUseCase |
| `src/modules/notifications/domain/use-cases/mark-all-read.use-case.ts` | Interface IMarkAllReadUseCase |
| `src/modules/notifications/domain/use-cases/index.ts` | Barrel export |
| `src/modules/notifications/infra/repositories/notification.repository.ts` | Implementacao HTTP com mapeamento snake_case → camelCase |
| `src/modules/notifications/infra/repositories/index.ts` | Barrel export |
| `src/modules/notifications/infra/services/sse.service.ts` | NotificationSSEService com EventSource, connect/disconnect |
| `src/modules/notifications/application/use-cases/list-notifications/index.ts` | ListNotificationsUseCase |
| `src/modules/notifications/application/use-cases/get-unread-count/index.ts` | GetUnreadCountUseCase |
| `src/modules/notifications/application/use-cases/mark-notification-read/index.ts` | MarkNotificationReadUseCase |
| `src/modules/notifications/application/use-cases/mark-all-read/index.ts` | MarkAllReadUseCase |
| `src/modules/notifications/application/use-cases/index.ts` | Barrel export |
| `src/modules/notifications/application/hooks/useNotifications.ts` | React Query hooks: useListNotifications, useUnreadCount, useMarkAsRead, useMarkAllAsRead |
| `src/modules/notifications/application/hooks/useNotificationSSE.ts` | SSE connection hook com ciclo de vida vinculado ao auth |
| `src/modules/notifications/application/store/notification.store.ts` | Zustand store: unreadCount, realtimeNotifications, isSSEConnected |
| `src/modules/notifications/index.ts` | Barrel export do modulo |
| `src/components/notifications/NotificationIcon.tsx` | Icone contextual por tipo de notificacao com cores |
| `src/components/notifications/NotificationCard.tsx` | Card de notificacao com icone, titulo, mensagem, acoes, timestamp |
| `src/components/notifications/NotificationDropdown.tsx` | Dropdown popover no sino com ultimas 5 notificacoes |
| `src/components/notifications/index.ts` | Barrel export |
| `src/pages/NotificationsPage.tsx` | Pagina com tabs All/Unread/Archived e lista paginada |
| `src/locales/en/notifications.json` | Traducoes ingles (page, tabs, actions, dropdown, empty, types, time, toast) |
| `src/locales/pt-BR/notifications.json` | Traducoes portugues |

### Arquivos Modificados (7)

| Arquivo | Alteracao |
|---------|-----------|
| `src/modules/shared/infra/container/types.ts` | +5 TYPES: NotificationRepository, ListNotificationsUseCase, GetUnreadCountUseCase, MarkNotificationReadUseCase, MarkAllReadUseCase |
| `src/modules/shared/infra/container/container.ts` | +5 bindings Inversify para o modulo de notificacoes |
| `src/lib/i18n.ts` | +namespace `notifications` em EN e PT-BR |
| `src/components/layout/Topbar.tsx` | Badge dinamico (unreadCount), NotificationDropdown wrapping o sino, pulse animation condicional |
| `src/components/layout/Sidebar.tsx` | +item Bell → `/notifications` no nav |
| `src/components/layout/MainLayout.tsx` | +`useNotificationSSE()` para conexao SSE persistente |
| `src/router/index.tsx` | +rota `/notifications` com lazy load |

---

## 5. Endpoints Consumidos

| Metodo | Endpoint | Hook | Descricao |
|--------|----------|------|-----------|
| GET | `/notifications/stream?token=jwt` | useNotificationSSE | SSE (EventSource) — notificacoes em tempo real |
| GET | `/notifications?limit=&offset=&unread_only=` | useListNotifications | Lista paginada de notificacoes |
| GET | `/notifications/unread-count` | useUnreadCount | Contagem de nao lidas (refetch a cada 60s) |
| PATCH | `/notifications/{id}/read` | useMarkAsRead | Marca uma notificacao como lida |
| PATCH | `/notifications/read-all` | useMarkAllAsRead | Marca todas como lidas |

---

## 6. Tipos de Notificacao (10)

| Tipo | Icone | Cor | Quando |
|------|-------|-----|--------|
| behavioral_pattern_complete | Brain | Verde | Padroes comportamentais prontos |
| behavioral_pattern_failed | Brain | Vermelho | Padroes comportamentais falharam |
| deep_dive_complete | Search | Verde | Deep dive pronto |
| deep_dive_failed | Search | Vermelho | Deep dive falhou |
| pattern_analysis_complete | TrendingUp | Verde | Padroes cross-topic prontos |
| pattern_analysis_failed | TrendingUp | Vermelho | Padroes cross-topic falharam |
| keyword_analysis_complete | Tag | Verde | Keywords prontas |
| keyword_analysis_failed | Tag | Vermelho | Keywords falharam |
| topic_analysis_complete | MessageSquare | Verde | Topicos prontos |
| topic_analysis_failed | MessageSquare | Vermelho | Topicos falharam |

---

## 7. Como Testar

1. Fazer login — verificar no DevTools Network que conexao SSE `/notifications/stream` foi aberta (tipo: eventsource)
2. Navegar para `/notifications` — pagina renderiza com tabs e empty state (ou lista se houver notificacoes)
3. Clicar no sino na Topbar — dropdown abre com lista das ultimas 5 notificacoes
4. Verificar que badge mostra contagem real (0 = sem badge, >9 = "9+")
5. Disparar uma analise no backend (ex: Deep Dive) — ao finalizar, toast aparece e badge incrementa
6. Clicar "Mark as read" em uma notificacao — dot vermelho desaparece, badge decrementa
7. Clicar "Mark all as read" — todos os dots somem, badge esconde
8. Tabs: All (todas), Unread (is_read=false), Archived (is_read=true)
9. Trocar idioma no perfil para PT-BR — textos da pagina de notificacoes mudam
10. Alternar dark mode — todos os componentes renderizam corretamente

---

## 8. Relacao com Outras Issues

| Issue | Relacao |
|-------|---------|
| #16 (Backend) | Implementou SSE, Redis pub/sub, tabela notifications, endpoints REST — base que este frontend consome |
| #59 — i18n Setup | Infraestrutura de internacionalizacao reutilizada — adicionamos o namespace `notifications` |
| #13 — Auth Module Frontend | Token JWT de autenticacao usado para autenticar a conexao SSE via query param |
