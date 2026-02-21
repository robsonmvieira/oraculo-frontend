# Issue #20 — Use Case de Criação de Audiência (POST /audiences)

**Issue:** https://github.com/robsonmvieira/oraculo-frontend/issues/20
**PR:** https://github.com/robsonmvieira/oraculo-frontend/pull/21
**Branch:** `feat/create-audience-use-case`
**Status:** Implementada

---

## 1. Motivação

O modal de criação de audiência (`SelectAudienceModal`) já existia com toda a UI funcional — campo de nome, busca de comunidades com infinite scroll, e seleção de comunidades. Porém, o callback `onCreateAudience` apenas fazia `console.log`, sem integração com a API.

Com o endpoint `POST /audiences` disponível no backend, era necessário conectar o frontend para que audiências fossem efetivamente criadas e persistidas.

---

## 2. Decisões de Design

### 2.1 Seguir o padrão DDD/Clean Arch existente

A implementação segue exatamente o mesmo padrão das demais features (`auth`, `community`, `audience-templates`):

```
domain/    → Interface ICreateAudienceUseCase + tipos (params/result) + extensão da IAudienceRepository
application/ → Implementação CreateAudienceUseCase + hook useCreateAudience (useMutation)
infra/     → Implementação createAudience no AudienceRepository via HttpClient
```

### 2.2 useMutation (React Query) para a operação de escrita

Diferente das queries de leitura (useQuery/useInfiniteQuery), a criação de audiência é uma mutation que:

- Envia dados ao servidor (POST)
- Invalida o cache de audiências no sucesso (`AUDIENCES_QUERY_KEY`)
- Gerencia estados de `isPending` e `isError` automaticamente

### 2.3 Description enviada como string vazia

O campo `description` do payload é enviado como string vazia por decisão do produto. O campo visual não foi adicionado ao modal nesta iteração.

---

## 3. Solução Implementada

### 3.1 Endpoint

```
POST /audiences
Authorization: Bearer <access_token>
Content-Type: application/json
```

### 3.2 Payload

```json
{
  "name": "Tech Communities",
  "description": "",
  "subreddit_names": ["python", "javascript", "rust"]
}
```

### 3.3 Resposta esperada (201)

```json
{
  "id": "<uuid>",
  "name": "Tech Communities",
  "description": "",
  "user_id": "<id-do-token>",
  "communities_count": 3
}
```

### 3.4 Fluxo

1. Usuário abre o modal, preenche o nome e seleciona comunidades
2. Clica "Create Audience"
3. `useCreateAudience` (useMutation) chama `CreateAudienceUseCase.execute()`
4. Use case delega para `AudienceRepository.createAudience()`
5. Repository faz `POST /audiences` via `HttpClient.post()` (Bearer token injetado automaticamente)
6. Sucesso (201): modal fecha, store reseta, lista de audiências é invalidada via React Query
7. Erro: o botão volta ao estado normal (React Query gerencia `isPending`)

---

## 4. Arquitetura

```
SelectAudienceModal (UI)
  └── Audiences page (onCreateAudience callback)
        └── useCreateAudience() hook (useMutation)
              └── CreateAudienceUseCase.execute()
                    └── AudienceRepository.createAudience()
                          └── HttpClient.post('audiences', payload)
                                └── Bearer token (automático via beforeRequest hook)
```

---

## 5. Arquivos Criados

| Arquivo | Descrição |
|---------|-----------|
| `src/modules/audience/domain/use-cases/create-audience.use-case.ts` | Interface `ICreateAudienceUseCase` + tipos `CreateAudienceParams` e `CreateAudienceResult` |
| `src/modules/audience/application/use-cases/create-audience-use-case/index.ts` | Implementação `CreateAudienceUseCase` |
| `src/modules/audience/application/hooks/useCreateAudience.ts` | Hook `useCreateAudience` com `useMutation` + invalidação de cache |

## 6. Arquivos Modificados

| Arquivo | Alteração |
|---------|-----------|
| `src/modules/audience/domain/repositories/audience.repository.ts` | Adicionado `createAudience()` na interface `IAudienceRepository` |
| `src/modules/audience/domain/use-cases/index.ts` | Export da nova interface e tipos |
| `src/modules/audience/application/use-cases/index.ts` | Export da classe `CreateAudienceUseCase` |
| `src/modules/audience/application/hooks/index.ts` | Export do hook `useCreateAudience` |
| `src/modules/audience/infra/repositories/audience.repository.ts` | Implementação de `createAudience()` com `httpClient.post()` |
| `src/modules/shared/infra/container/types.ts` | Symbol `CreateAudienceUseCase` |
| `src/modules/shared/infra/container/container.ts` | Binding do `CreateAudienceUseCase` no Inversify |
| `src/pages/Audiences.tsx` | Integração com `useCreateAudience` substituindo o `console.log` |

---

## 7. Dependências

Nenhuma nova dependência adicionada. Utiliza as bibliotecas já existentes:
- `@tanstack/react-query` (useMutation)
- `ky` (HTTP client)
- `inversify` (DI container)
- `zustand` (store existente)
