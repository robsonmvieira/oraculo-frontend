# Issue #45 — Animacao GSAP suave para entrada da secao Your Audiences

**Issue:** https://github.com/robsonmvieira/oraculo-frontend/issues/45
**PR:** https://github.com/robsonmvieira/oraculo-frontend/pull/46
**Branch:** `feat/gsap-user-audiences-animation`
**Status:** In Review

---

## 1. Motivacao

Na tela de audiencias existem duas secoes:
- **Find Audiences** (templates) — carrega primeiro
- **Your Audiences** (do usuario) — carrega depois

Quando as audiencias do usuario chegavam, a secao `Your Audiences` aparecia abruptamente na tela. O componente `UserAudiencesSection` retornava `null` enquanto nao havia dados e, ao receber os dados, entrava no DOM sem nenhuma transicao visual.

O objetivo era adicionar uma animacao GSAP para que a secao entre de forma suave, evitando a aparicao abrupta.

---

## 2. Decisoes de Design

### 2.1 Animacao encapsulada no componente

Em vez de manter a logica de animacao centralizada no `Audiences.tsx` (pagina pai), a animacao do user grid foi movida para dentro do proprio `UserAudiencesSection`. Isso garante que a animacao roda no momento exato em que o componente monta (quando os dados chegam), eliminando o problema de timing.

### 2.2 Dupla animacao: secao + cards

A animacao e feita em duas camadas:
- **Secao inteira** — fade in (`opacity: 0 → 1`) + slide up (`y: 40 → 0`) com `duration: 0.6s`
- **Cards individuais** — stagger de `0.06s` com `delay: 0.15s`, criando efeito cascata

### 2.3 Animacao unica via `hasAnimated` ref

Um `useRef(false)` garante que a animacao roda apenas uma vez (na primeira carga dos dados). Recarregamentos subsequentes (ex: cache do React Query) nao disparam a animacao novamente.

### 2.4 Acessibilidade

A animacao respeita a preferencia `prefers-reduced-motion` do sistema operacional via hook `useReducedMotion` ja existente no projeto.

---

## 3. Solucao Implementada

### 3.1 Fluxo da animacao

```
UserAudiencesSection monta (audiences.length > 0)
  └── useEffect detecta dados
        ├── Anima <section> (fade + slide up)
        └── Anima children do [data-user-grid] (stagger)
```

### 3.2 Parametros GSAP

| Alvo | Propriedade | De | Para | Duracao | Delay | Ease |
|------|-------------|-----|------|---------|-------|------|
| `<section>` | opacity | 0 | 1 | 0.6s | 0 | power2.out |
| `<section>` | y | 40 | 0 | 0.6s | 0 | power2.out |
| Cards (children) | opacity | 0 | 1 | 0.5s | 0.15s | power2.out |
| Cards (children) | y | 30 | 0 | 0.5s | stagger 0.06s | power2.out |

---

## 4. Arquivos Modificados

| Arquivo | Alteracao |
|---------|-----------|
| `src/components/audiences/UserAudiencesSection.tsx` | Adicionada animacao GSAP na montagem; removida prop `gridRef`; adicionado `data-user-grid` no grid; `style={{ opacity: 0 }}` inicial na section |
| `src/pages/Audiences.tsx` | Removida ref `userGridRef`; removida chamada `animate(userGridRef.current)` do useEffect; animacao agora cobre apenas templates; adicionado cleanup com `gsap.context` |

---

## 5. Dependencias

Nenhuma nova dependencia adicionada. Utiliza GSAP (`gsap@^3.14.2`) e `@gsap/react@^2.1.2` ja presentes no projeto.
