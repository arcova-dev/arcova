import { featurePages } from "@/lib/arcova";
import { EmptyState, PageHero } from "@/components/page-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
export function FeaturePage({kind}:{kind:keyof typeof featurePages}) { const p=featurePages[kind]; return <><PageHero eyebrow={p.eyebrow} title={p.title} description={p.description} icon={p.icon}/><div className="section-wrap workspace"><div className="toolbar"><div className="search"><Search/><Input aria-label="Search assets" placeholder="Search verified assets"/></div><Button variant="outline"><SlidersHorizontal/>FILTERS</Button></div><div className="table-shell"><div className="table-head"><span>ASSET</span><span>PRICE</span><span>24H</span><span>LIQUIDITY</span><span>MODEL VIEW</span></div><EmptyState title={p.empty} detail={p.detail} action={p.action} href={("href" in p?p.href:undefined) as "/markets"|"/agent"|undefined}/></div></div></> }
