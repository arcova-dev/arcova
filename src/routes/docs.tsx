import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
const items=[["Overview","/docs"],["Architecture","/docs/architecture"],["Agent","/docs/agent"],["Tokenized Markets","/docs/tokenized-markets"],["Execution","/docs/execution"],["Risk","/docs/risk"]] as const;
export const Route=createFileRoute("/docs")({component:DocsLayout});
function DocsLayout(){const path=useRouterState({select:s=>s.location.pathname});return <section className="docs-shell"><aside><span className="eyebrow">ARCOVA DOCS</span>{items.map(([label,to])=><Link key={to} to={to} className={path===to?"active":""}>{label}</Link>)}</aside><article><Outlet/></article></section>}
