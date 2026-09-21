import { Link } from "@tanstack/react-router";
import { ArrowRight, DatabaseZap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

export function PageHero({eyebrow,title,description,icon:Icon}: {eyebrow:string;title:string;description:string;icon:LucideIcon}) { return <section className="page-hero"><div className="section-wrap"><span className="eyebrow"><Icon/> {eyebrow}</span><h1>{title}</h1><p>{description}</p></div></section> }
export function EmptyState({title,detail,action,href}: {title:string;detail:string;action?:string;href?:"/markets"|"/agent"|undefined}) { const btn=<Button variant="outline"><RefreshCw/>{action||"RETRY"}</Button>; return <div className="empty-state"><DatabaseZap/><span className="status unavailable">○ UNAVAILABLE</span><h2>{title}</h2><p>{detail}</p>{href?<Button asChild variant="outline"><Link to={href}>{action}<ArrowRight/></Link></Button>:btn}</div> }
export function DataPanel({title,children}:{title:string;children?:React.ReactNode}) { return <section className="data-panel"><div className="panel-head"><h2>{title}</h2><span className="status unavailable">○ DATA UNAVAILABLE</span></div>{children||<p className="muted">Connect a validated provider to populate this module.</p>}</section> }
export function Metric({label,value="DATA UNAVAILABLE"}:{label:string;value?:string}) { return <div className="metric"><span>{label}</span><strong>{value}</strong></div> }
export function meta(title:string, description:string){ return {meta:[{title:`${title} — ARCOVA`},{name:"description",content:description},{property:"og:title",content:`${title} — ARCOVA`},{property:"og:description",content:description},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}; }
