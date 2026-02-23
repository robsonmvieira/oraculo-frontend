# Seletor de Idioma de Analise no Perfil do Usuario

**Issue:** [#57](https://github.com/robsonmvieira/oraculo-frontend/issues/57)
**PR:** [#58](https://github.com/robsonmvieira/oraculo-frontend/pull/58)
**Branch:** `feat/language-preference-profile`
**Status:** Done

---

## 1. Motivacao

O backend (Issue #54) implementou suporte multi-idioma nas analises dos agentes LLM, adicionando o campo `preferred_language` ao modelo User e o endpoint `PATCH /me/language`. No frontend, nao existia nenhuma forma do usuario selecionar seu idioma preferido, impossibilitando o uso dessa funcionalidade.

---

## 2. Decisoes de Design

| Decisao | Justificativa |
|---------|---------------|
| Card separado do `PersonalInfoCard` | O idioma de analise e uma configuracao distinta de dados pessoais — merece destaque proprio |
| Modal de confirmacao ao trocar idioma | Analises anteriores permanecem no idioma original — usuario precisa estar ciente antes de confirmar |
| Dropdown customizado (sem lib externa) | Segue o padrao visual do projeto com Tailwind, sem adicionar dependencias |
| Use case dedicado (`UpdateLanguageUseCase`) | Backend tem endpoint separado (`PATCH /me/language`) — nao faz sentido misturar com `updateProfile` |
| Constante `SUPPORTED_LANGUAGES` local ao componente | Uso unico, sem necessidade de arquivo compartilhado |
| Toast de erro com estilo mais suave | O estilo anterior (vermelho solido + texto preto) tinha baixa legibilidade |

---

## 3. Solucao Implementada

### Fluxo da atualizacao de idioma

```
LanguagePreferenceCard (dropdown)
  → Usuario seleciona idioma diferente
    → ChangeLanguageModal (confirmacao)
      → Usuario confirma
        → useUpdateLanguage() hook (React Query mutation)
          → UpdateLanguageUseCase.execute(language)
            → AuthRepository.updateLanguage(language)
              → httpClient.patch('auth/me/language', { preferred_language })
                → Backend PATCH /me/language
        ← AuthUser atualizado
        ← setUser() no Zustand store
        ← Toast de sucesso
        ← Modal fecha, dropdown atualiza
```

### Camadas afetadas

1. **Domain Layer:** `AuthUser` entity (+`preferredLanguage`) + `IUpdateLanguageUseCase` interface + `IAuthRepository` atualizado
2. **Infrastructure Layer:** `AuthRepository.updateLanguage()` implementando PATCH
3. **Application Layer:** `UpdateLanguageUseCase` + `useUpdateLanguage` hook
4. **DI Container:** Registro do `UpdateLanguageUseCase`
5. **Components:** `LanguagePreferenceCard` + `ChangeLanguageModal` + `ProfilePage` integrado

---

## 4. Arquivos

### Arquivos Criados (5)

| Arquivo | Descricao |
|---------|-----------|
| `src/modules/auth/domain/use-cases/update-language.use-case.ts` | Interface `IUpdateLanguageUseCase` |
| `src/modules/auth/application/use-cases/update-language-use-case/index.ts` | Implementacao do use case |
| `src/modules/auth/application/hooks/useUpdateLanguage.ts` | Hook React Query com mutation, store update e toast |
| `src/components/profile/LanguagePreferenceCard.tsx` | Card com dropdown de idiomas e logica de selecao |
| `src/components/profile/ChangeLanguageModal.tsx` | Modal de confirmacao com warning e loading state |

### Arquivos Modificados (14)

| Arquivo | Alteracao |
|---------|-----------|
| `src/modules/auth/domain/entities/auth-user.entity.ts` | +campo `preferredLanguage` com getter |
| `src/modules/auth/domain/repositories/auth.repository.ts` | +metodo `updateLanguage(language)` na interface |
| `src/modules/auth/infra/repositories/auth.repository.ts` | Implementacao do PATCH + `AuthUserResponse` atualizado |
| `src/modules/shared/infra/container/types.ts` | +Symbol `UpdateLanguageUseCase` |
| `src/modules/shared/infra/container/container.ts` | Binding do `UpdateLanguageUseCase` |
| `src/components/ui/toast.tsx` | Variant `destructive` com cores mais legíveis |
| `src/pages/ProfilePage.tsx` | Integra `LanguagePreferenceCard` entre PersonalInfo e ConnectedAccounts |
| Barrel exports (7 arquivos) | Exportacoes dos novos artefatos |

---

## 5. Estrutura de Dados

### PATCH /auth/me/language (request)

```json
{
  "preferred_language": "pt-BR"
}
```

### Idiomas Suportados

| Codigo | Idioma |
|--------|--------|
| en | English |
| pt-BR | Portugues (Brasil) |
| es | Espanol |
| fr | Francais |
| de | Deutsch |
| it | Italiano |
| ja | 日本語 |
| ko | 한국어 |
| zh | 中文 |

### AuthUser entity (campo adicionado)

```typescript
getPreferredLanguage(): string | null
```

---

## 6. Como Testar

1. Abrir pagina de profile — card "Analysis Language" aparece abaixo de Personal Information
2. Verificar que o dropdown exibe os 9 idiomas suportados
3. Selecionar idioma diferente — modal de confirmacao aparece com aviso sobre analises anteriores
4. Clicar "Cancel" — idioma nao muda, modal fecha
5. Selecionar novamente e clicar "Confirm Change" — spinner no botao, chamada PATCH, toast de sucesso
6. Verificar que o dropdown atualiza para o novo idioma selecionado
7. Recarregar pagina — idioma persiste (vindo do backend)

---

## 7. Relacao com Outras Issues

| Issue | Relacao |
|-------|---------|
| #54 (Backend) | Base: implementou `PATCH /me/language`, campo `preferred_language` no User e diretiva de idioma nos prompts |
| #55 — Profile API Integration | Estrutura base: entidade `AuthUser`, `AuthRepository`, padrao de update via use case |

---

## 8. Melhoria Extra

O variant `destructive` do toast foi ajustado para melhor legibilidade:
- **Antes:** fundo vermelho solido (`bg-destructive`) com texto preto — baixo contraste
- **Depois:** fundo vermelho suave (`bg-red-50` / `dark:bg-red-950`) com texto escuro (`text-red-900` / `dark:text-red-200`) — alto contraste
