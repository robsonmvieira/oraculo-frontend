# Issue #17 — Página de Perfil do Usuário

**Issue:** https://github.com/robsonmvieira/oraculo-frontend/issues/17
**PR:** https://github.com/robsonmvieira/oraculo-frontend/pull/18
**Branch:** `feat/profile-page`
**Status:** Implementada

---

## 1. Motivação

A aplicação não possuía uma página de perfil para o usuário logado. O único ponto de contato com a identidade do usuário era o avatar no Topbar, que não era clicável e exibia dados hardcoded. O cenário era:

- **Sem página de perfil** — nenhuma rota `/profile` existia
- **Avatar no Topbar sem interação** — botão do avatar não abria nenhum menu
- **Dados do usuário não exibidos** — apesar do auth store ter `fullName` e `email`, nenhum componente os utilizava
- **Sem fluxo de edição** — não existia UI para o usuário visualizar ou editar suas informações

Resultado: o usuário não tinha como ver, editar ou compartilhar seu perfil.

---

## 2. Decisões de Design

### 2.1 Dados dinâmicos + mock data

A entidade `AuthUser` possui apenas 5 campos: `id`, `email`, `full_name`, `is_active`, `is_superuser`. O design da página exige campos adicionais (telefone, localização, bio, avatar, stats).

**Abordagem:** usar dados reais do `useAuthStore()` para `fullName`, `email` e `role` (derivado de `isSuperuser`), e mock data para os campos que a API ainda não fornece.

```typescript
const currentUser = useMemo(() => ({
  ...profileUser,          // mock: phone, location, bio, avatar, stats
  fullName: user?.getFullName() || profileUser.fullName,
  email: user?.getEmail() || profileUser.email,
  role: user?.getIsSuperuser() ? 'Admin' : 'Member',
}), [user])
```

Quando a API evoluir para incluir esses campos, basta substituir o spread do mock pelo objeto real.

### 2.2 Três estados da página

O design prevê três estados distintos, todos controlados via state local (sem necessidade de store global):

| Estado | Trigger | Comportamento |
|--------|---------|---------------|
| **Visualização** | Default | Campos read-only com ícones |
| **Edição** | Clicar "Edit Profile" | Campos viram inputs editáveis + "Save Changes" |
| **Modal público** | Clicar "View Public Profile" | Modal overlay com cover, badge e "Share Profile" |

### 2.3 shadcn DropdownMenu no Topbar

O avatar no Topbar foi transformado em um dropdown usando o componente `DropdownMenu` do shadcn (baseado em `@radix-ui/react-dropdown-menu`). Vantagens sobre a implementação manual anterior:

- **Acessibilidade** built-in (keyboard navigation, focus trap, ARIA attributes)
- **Click outside** automático (sem `useEffect` manual com `mousedown`)
- **Animações** de entrada/saída via Tailwind (data-state attributes)
- **Composição** declarativa (DropdownMenu > Trigger > Content > Item)

### 2.4 Componentização granular

A página foi dividida em 5 componentes independentes + 1 página container:

| Componente | Responsabilidade | State local |
|------------|------------------|-------------|
| `ProfileCard` | Avatar, nome, role, stats, botão "View Public Profile" | Nenhum |
| `PersonalInfoCard` | Info pessoal, toggle edit/view, form | `isEditing`, `formData` |
| `ConnectedAccountsCard` | Lista de contas com toggle connect | `localAccounts` |
| `RecentActivityCard` | Timeline de atividades | Nenhum |
| `PublicProfileModal` | Modal do perfil público | Nenhum (controlled via props) |
| `ProfilePage` | Container, layout grid, orquestração | `isPublicProfileOpen` |

### 2.5 Reutilização de componentes UI existentes

Toda a implementação reutiliza o design system existente:

| Necessidade | Componente | Já existia |
|-------------|-----------|------------|
| Cards | `Card`, `CardHeader`, `CardContent` | Sim |
| Botões | `Button` (primary, outline, dark, danger) | Sim |
| Avatar | `Avatar` (sm, md, lg, xl) | Sim (adicionado `2xl`) |
| Inputs | `Input` | Sim |
| Modal | `Modal` | Sim |
| Ícones | Lucide React | Sim |
| Animações | GSAP + `useReducedMotion` | Sim |
| Dropdown | shadcn `DropdownMenu` | **Novo** |

---

## 3. Solução Implementada

### 3.1 Estrutura de arquivos

```
src/
├── data/
│   └── profile.ts                              ← Mock data para perfil
├── components/
│   ├── profile/
│   │   ├── ProfileCard.tsx                     ← Card do perfil (avatar, stats)
│   │   ├── PersonalInfoCard.tsx                ← Info pessoal (view/edit)
│   │   ├── ConnectedAccountsCard.tsx           ← Contas conectadas
│   │   ├── RecentActivityCard.tsx              ← Timeline de atividades
│   │   ├── PublicProfileModal.tsx              ← Modal perfil público
│   │   └── index.ts                            ← Barrel export
│   └── ui/
│       └── dropdown-menu.tsx                   ← Componente shadcn (novo)
├── pages/
│   └── ProfilePage.tsx                         ← Página container
└── ...
```

### 3.2 Mock Data (`src/data/profile.ts`)

Tipos exportados para tipagem forte:

| Interface | Campos | Uso |
|-----------|--------|-----|
| `ProfileUser` | fullName, email, phone, location, bio, avatarUrl, role, isVerified, stats | Perfil completo |
| `ConnectedAccount` | id, provider, label, username, connected | GitHub/Facebook |
| `ActivityItem` | id, title, timestamp, isRecent | Timeline |

Constantes exportadas: `profileUser`, `connectedAccounts`, `recentActivity`.

### 3.3 ProfileCard

- Avatar `xl` com filtro `grayscale` (conforme design)
- Botão de câmera sobreposto ao avatar (posicionamento absoluto)
- Stats em row com `gap-6` (sem separadores visuais, espaçamento)
- Botão "View Public Profile" (variant `outline`, full width)

### 3.4 PersonalInfoCard — Toggle View/Edit

**Modo visualização:**
- Grid 2 colunas (`md:grid-cols-2`) para Full Name, Email, Phone, Location
- Cada campo: label + ícone Lucide + valor em texto
- Bio em parágrafo abaixo do grid

**Modo edição:**
- Mesmos campos, mas renderizados como `<Input>` editáveis
- Bio como `<textarea>` com mesmas classes do Input
- Botão "Cancel Edit" reseta o `formData` para os valores originais
- Botão "Save Changes" (mock — apenas volta ao modo view)

```typescript
const [isEditing, setIsEditing] = useState(false)
const [formData, setFormData] = useState({
  fullName: user.fullName,
  email: user.email,
  phone: user.phone,
  location: user.location,
  bio: user.bio,
})
```

### 3.5 ConnectedAccountsCard

- Estado local `localAccounts` para toggle de connect/disconnect
- Ícones customizados: `GithubIcon` (circle dark + Lucide Github) e `FacebookIcon` (circle blue + "f")
- Botões com cor semântica: "Disconnect" em vermelho, "Connect" em lime

### 3.6 RecentActivityCard

- Ícone `Activity` no título
- Timeline com dots coloridos: `bg-lime` para recentes, `bg-gray-300` para antigos
- Timestamp com ícone `Clock`

### 3.7 PublicProfileModal

Usa o componente `Modal` existente com `size="sm"` e sem title/header (layout customizado):

| Seção | Implementação |
|-------|---------------|
| Cover | `div` com `bg-gradient-to-br from-gray-900 to-gray-700` (h-32) |
| Avatar | `Avatar` size `2xl` com borda branca, posicionado com `-mt-12` |
| Badge verificado | `CheckCircle` do Lucide com fill lime |
| Info | Nome, role (em lime), location + email com ícones |
| Bio | Parágrafo com `leading-relaxed` |
| Stats | Row com separadores (`border-l`) |
| Share | `Button` variant `dark`, size `full` com ícone `Share2` |

Botão de fechar customizado (não usa o header do Modal): circle dark semi-transparente no canto superior direito do cover.

### 3.8 ProfilePage — Container

- Layout grid responsivo: `grid-cols-1 lg:grid-cols-[1fr_2fr]`
- Dados do usuário via `useMemo` mesclando auth store + mock
- Animação GSAP de entrada com stagger nos cards da coluna direita
- Respeita `prefers-reduced-motion`

### 3.9 Topbar — Dropdown do Avatar

**Antes:** botão do avatar sem funcionalidade.

**Depois:** `DropdownMenu` shadcn com:

| Item | Ícone | Ação |
|------|-------|------|
| Header (label) | — | Exibe nome e role do usuário logado |
| Profile | `User` | `navigate('/profile')` |
| Settings | `Settings` | `navigate('/settings')` |
| Help Center | `HelpCircle` | `navigate('/help')` |
| Logout | `LogOut` | (visual — a ser conectado ao `authStore.logout()`) |

Dados dinâmicos via `useAuthStore()`:

```typescript
const { user } = useAuthStore()
const userName = user?.getFullName() || 'User'
const userRole = user?.getIsSuperuser() ? 'Admin' : 'Member'
```

### 3.10 Avatar — Novo tamanho `2xl`

Adicionado ao componente existente:

| Tamanho | Classes | Uso |
|---------|---------|-----|
| `2xl` | `w-32 h-32 text-2xl` | Modal do perfil público |

---

## 4. Arquivos

### 4.1 Criados (9 arquivos)

| Arquivo | Descrição |
|---------|-----------|
| `src/data/profile.ts` | Mock data: ProfileUser, ConnectedAccount, ActivityItem |
| `src/components/profile/ProfileCard.tsx` | Card do perfil com avatar, stats e View Public Profile |
| `src/components/profile/PersonalInfoCard.tsx` | Informações pessoais com toggle edit/view |
| `src/components/profile/ConnectedAccountsCard.tsx` | Contas conectadas GitHub/Facebook |
| `src/components/profile/RecentActivityCard.tsx` | Timeline de atividades recentes |
| `src/components/profile/PublicProfileModal.tsx` | Modal do perfil público |
| `src/components/profile/index.ts` | Barrel export |
| `src/components/ui/dropdown-menu.tsx` | Componente shadcn DropdownMenu |
| `src/pages/ProfilePage.tsx` | Página container com grid layout |

### 4.2 Modificados (7 arquivos)

| Arquivo | Mudança |
|---------|---------|
| `src/router/index.tsx` | +rota `/profile` com lazy loading |
| `src/components/layout/Topbar.tsx` | Dropdown shadcn no avatar com dados dinâmicos do auth store |
| `src/components/ui/avatar.tsx` | +tamanho `2xl` (w-32 h-32) |
| `src/styles/globals.css` | Variáveis CSS shadcn (theme inline, dark mode, base layer) |
| `src/lib/utils.ts` | Restaurado após sobrescrita do shadcn init (manteve formatters existentes) |
| `tsconfig.json` | +compilerOptions com paths alias para compatibilidade shadcn |
| `components.json` | Configuração shadcn (novo arquivo na raiz) |

### 4.3 Dependências adicionadas

| Package | Versão | Motivo |
|---------|--------|--------|
| `radix-ui` | latest | Primitivas acessíveis para DropdownMenu |
| `tw-animate-css` | latest | Animações CSS para componentes shadcn |

---

## 5. Fluxos da Página

### 5.1 Navegação para Profile

```
Topbar → Avatar dropdown → "Profile"
  → navigate('/profile')
    → React Router lazy load ProfilePage
      → useAuthStore() → mescla user real + mock
        → renderiza grid com 4 cards
```

### 5.2 Editar Informações

```
PersonalInfoCard → "Edit Profile"
  → setIsEditing(true)
    → campos viram <Input> editáveis
      → usuário edita campos
        ├─ "Cancel Edit" → reseta formData → setIsEditing(false)
        └─ "Save Changes" → (mock) → setIsEditing(false)
```

### 5.3 Ver Perfil Público

```
ProfileCard → "View Public Profile"
  → setIsPublicProfileOpen(true)
    → PublicProfileModal renderiza via Portal
      → Cover gradient + Avatar + Badge + Info + Stats
        ├─ "Share Profile" → (mock — sem ação)
        ├─ Botão X → onClose()
        └─ Click fora → onClose()
```

### 5.4 Connect/Disconnect Conta

```
ConnectedAccountsCard → "Disconnect" (GitHub)
  → toggleConnection(id)
    → localAccounts atualiza connected: false
      → Botão muda para "Connect" (lime)
```

---

## 6. Próximos Passos

- [ ] Conectar botão "Save Changes" à API quando endpoint de update profile existir
- [ ] Conectar botão "Logout" do dropdown ao `authStore.logout()`
- [ ] Upload real de avatar (botão de câmera)
- [ ] Conectar contas OAuth reais (GitHub, Facebook)
- [ ] Buscar atividades recentes de uma API real
- [ ] Adicionar campos extras ao `AuthUser` na API (phone, location, bio, avatar_url)
- [ ] Implementar funcionalidade do "Share Profile" (copiar link ou share API)
- [ ] Adicionar validação com zod no form de edição
