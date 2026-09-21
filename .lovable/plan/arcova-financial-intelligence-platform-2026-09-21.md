# ARCOVA Financial Intelligence Platform

## Goal
Build ARCOVA as a complete, connected institutional financial-intelligence application for tokenized markets on Arc. The experience will use the supplied original logo, banner, and environment artwork as its central identity, never fabricate market or blockchain information, and consistently frame outputs as scenarios, model views, confidence levels, assumptions, and risks.

## Experience and visual system
- Establish a near-black and graphite interface with restrained cold-blue and champagne highlights sampled from the supplied artwork, thin borders, modest radii, generous spacing, and high-contrast typography.
- Use the original uploaded images directly: the environment as the atmospheric app background, the banner in promotional/editorial sections, and the square logo for navigation, agent identity, loading, footer, favicon, Apple touch icon, and social metadata.
- Create a persistent desktop header, compact mobile menu, mobile bottom navigation for the five primary workspaces, route-aware navigation, X-only social linking, Argus-only buy/chart links, and a professional contract-coming-soon dialog.
- Add calm motion: image parallax, restrained scan/grid layers, viewport reveals, live-status pulses, chart transitions, and terminal cursor behavior, all reduced when the visitor prefers reduced motion.

## Public website
- Build `/` with the required 16-section order: cinematic hero, live-data strip, agent introduction, system pipeline, market intelligence, market explorer, scenario engine, decision example, portfolio intelligence, policy controls, audit trail, Arc infrastructure, roadmap, FAQ, final CTA, and footer.
- Build `/about`, `/roadmap`, `/faq`, and `/token` with the supplied copy and explicit “COMING SOON” states for every unpublished token statistic or contract field.
- Build `/docs` plus `/docs/architecture`, `/docs/agent`, `/docs/tokenized-markets`, `/docs/execution`, and `/docs/risk` using a shared technical-documentation layout.
- Add unique metadata to every content route, organization JSON-LD, sitemap and robots handling, with the official ARCOVA banner/logo used for supported social previews.

## Market and intelligence workspaces
- Build `/markets`, `/markets/$asset`, `/scanner`, `/compare`, `/intelligence`, and `/watchlist` around shared search, filter, status, verification, chart, table, and empty-state components.
- Create replaceable provider contracts for market data, OHLCV, fundamentals, news, tokenized-asset verification, onchain activity, and Arc network health.
- Providers will read only configured server-side endpoints and credentials. Until configured, every affected surface shows `UNAVAILABLE`, `DATA PROVIDER NOT CONNECTED`, or an equivalent retryable empty state—never sample assets, prices, percentages, news, transaction hashes, or token statistics.
- Asset detail routes will expose all requested analysis panels, verification fields, timeframes, and Argus actions without inventing an asset-specific Argus path.

## Agent and threaded conversations
- Build `/agent` as the thread index and `/agent/$threadId` as the dedicated conversation URL. Creating or switching a conversation navigates to its stable route.
- Use AI Elements for the transcript, messages, reasoning/loading states, tools, and prompt composer; assistant messages remain unboxed while user messages use a high-contrast semantic surface.
- Connect streaming analysis to Lovable AI using the required server-only model path. The orchestration prompt will enforce the requested pipeline: classify intent, retrieve configured data, validate it, analyze, model scenarios, assess risk, explain, and only then offer optional execution.
- Every analytical response will disclose data used, timestamps, assumptions, risks, and confidence. Missing source data must be acknowledged rather than inferred.
- Store thread metadata and AI SDK message history in Lovable Cloud, scoped to the signed-in user. Provide email/password and Google sign-in so history is available across devices.

## Portfolio, policy, execution, and audit
- Build `/portfolio`, `/agent/settings`, `/activity`, `/agent/performance`, and `/reports` with connected controls, tables, charts, filters, and professional no-data states.
- Persist watchlists, in-app alerts, agent policies, threads/messages, generated report metadata, decisions, and transaction records as user-owned rows with row-level protection.
- Implement a policy validation layer for maximum transaction, daily exposure, position limits, allowed/excluded assets, withdrawals, trading, and rebalancing mode.
- Transaction actions remain simulation/review flows until Arc RPC, chain ID, contracts, routers, and wallet configuration are supplied. No transaction can be submitted without a configured network and explicit user approval; automatic mode still obeys stored policy.
- Performance metrics remain unavailable until auditable decisions and outcomes exist. When available, direction accuracy, scenario accuracy, execution success, and methodology are shown separately.
- Reports support on-screen generation plus JSON export, browser print/PDF, and native share where supported without inventing report content.

## Terminal
- Build `/terminal` as a full-height command center with responsive watchlist, chart, ARCOVA agent, and activity regions.
- Support the specified command vocabulary by routing commands to the same validated agent/data services used elsewhere.
- Keep the stronger monospace/terminal language isolated to this workspace, with mobile tabs or stacked panels preserving usability.

## Backend and security
- Create Cloud tables with explicit grants, row-level security, ownership checks, timestamps, and useful indexes. No privileged role state will be stored on user profiles.
- Keep model keys, provider credentials, RPC URLs, explorer URLs, chain configuration, contract addresses, and WalletConnect configuration server-side or in appropriate publishable environment variables.
- Validate every server input, rate-limit agent requests, use authenticated server boundaries for private data, and never request or store seed phrases/private keys.
- Add an Arc configuration module with no invented values. Network status is derived from a configured official endpoint; otherwise it reports unavailable.

## Route and component architecture
- Use the project’s supported TanStack Start stack (React 19, TypeScript, Tailwind v4, TanStack Query) rather than replacing the application runtime. Add Motion, Zustand, wallet libraries, charting, and the AI SDK only where required.
- Create shared shells for marketing, application, documentation, status panels, empty/error states, asset verification, market data tables, charts, dialogs, and mobile navigation so every requested route is connected and visually consistent.
- Make all primary controls operational: internal navigation, search/filter state, retries, dialog actions, thread creation/switching, settings persistence, exports, X links, and Argus links.

## Validation
- Apply and inspect the Cloud schema and security policies, generate database types, and run backend lint checks.
- Run project lint/build checks and resolve all errors.
- Verify desktop and mobile layouts, every route, active navigation, contract dialog, unavailable-data behavior, thread creation/restoration, sign-in entry points, agent streaming, external links, and accessibility focus behavior in the browser.
- Test at least two authenticated threads across reloads and confirm their messages remain isolated.
