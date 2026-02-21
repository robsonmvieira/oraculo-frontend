# Issue #26 — Redirecionar Usuário Autenticado da Página de Login

**Issue:** https://github.com/robsonmvieira/oraculo-frontend/issues/26
**PR:** https://github.com/robsonmvieira/oraculo-frontend/pull/27
**Branch:** `fix/redirect-authenticated-user-from-login`
**Status:** Implementada

---

## 1. Motivação

O usuário logado conseguia navegar manualmente para `/login` e ver o formulário de login novamente, mesmo com sessão ativa. Isso representava um problema de UX, pois o usuário poderia tentar fazer login novamente com um token já ativo, causando confusão.

A rota raiz `/` já possuía o componente `AuthRedirect` que redirecionava usuários autenticados para `/dashboard`, mas a rota `/login` não possuía proteção equivalente.

---

## 2. Decisões de Design

### 2.1 Componente `RedirectIfAuthenticated`

Criamos um guard simétrico ao `RequireAuth` já existente, seguindo o mesmo padrão arquitetural:

- `RequireAuth` — protege rotas privadas, redirecionando usuários **não autenticados** para `/login`
- `RedirectIfAuthenticated` — protege rotas públicas, redirecionando usuários **autenticados** para `/dashboard`

Ambos verificam o estado de hidratação (`isHydrated`) antes de tomar qualquer decisão, evitando flashes de redirecionamento durante o carregamento inicial da aplicação.

### 2.2 Abordagem escolhida

Alternativas consideradas:

- **Lógica inline na rota** — descartada por não ser reutilizável e fugir do padrão existente
- **Lógica dentro do `LoginPage`** — descartada por misturar responsabilidades (UI vs. navegação)
- **Componente guard dedicado** — escolhida por seguir o padrão do `RequireAuth` e ser reutilizável para outras rotas públicas no futuro (ex: `/register`)

---

## 3. Solução Implementada

### 3.1 Componente `RedirectIfAuthenticated`

```tsx
function RedirectIfAuthenticated({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isHydrated } = useAuthStore()

  if (!isHydrated) {
    return <PageLoader />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
```

### 3.2 Rota `/login` protegida

```tsx
{
  path: '/login',
  element: (
    <RedirectIfAuthenticated>
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    </RedirectIfAuthenticated>
  ),
}
```

### 3.3 Fluxo de comportamento

| Cenário | Antes | Depois |
|---------|-------|--------|
| Usuário autenticado acessa `/login` | Exibe formulário de login | Redireciona para `/dashboard` |
| Usuário não autenticado acessa `/login` | Exibe formulário de login | Exibe formulário de login (sem alteração) |
| Usuário autenticado acessa `/` | Redireciona para `/dashboard` | Redireciona para `/dashboard` (sem alteração) |

---

## 4. Arquivos Modificados

| Arquivo | Alteração |
|---------|-----------|
| `src/router/index.tsx` | Adicionado componente `RedirectIfAuthenticated` e envolvida a rota `/login` com o guard |

---

## 5. Dependências

Nenhuma nova dependência adicionada.
