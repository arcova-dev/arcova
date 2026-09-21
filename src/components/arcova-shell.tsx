import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Radio, X, Wallet, LogOut, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/arcova-logo.png.asset.json";
import { navItems } from "@/lib/arcova";
import type { ReactNode } from "react";

export function ArcovaShell({ children }: { children: ReactNode }) {
 const path=useRouterState({select:s=>s.location.pathname}); const navigate=useNavigate(); const qc=useQueryClient();
 const [contract,setContract]=useState(false); const [email,setEmail]=useState<string|null>(null);
 useEffect(()=>{ void supabase.auth.getUser().then(({data})=>setEmail(data.user?.email??null)); const {data}=supabase.auth.onAuthStateChange((_e,s)=>setEmail(s?.user.email??null)); return()=>data.subscription.unsubscribe();},[]);
 const signOut=async()=>{await qc.cancelQueries();qc.clear();await supabase.auth.signOut();await navigate({to:"/",replace:true});};
 const links=<>{navItems.map(([label,to])=><Link key={to} to={to} activeOptions={{exact:to==="/"}} className="nav-link" activeProps={{className:"nav-link nav-link-active"}}>{label}</Link>)}</>;
 return <div className="min-h-screen bg-background text-foreground">
  <header className="site-header"><Link to="/" className="brand"><img src={logo.url} alt="ARCOVA"/><span>ARCOVA</span></Link><nav className="desktop-nav">{links}</nav>
   <div className="header-actions"><button className="network-pill" aria-label="Arc Mainnet status"><Radio/> ARC MAINNET <span>UNAVAILABLE</span></button>{email?<Button variant="ghost" size="sm" onClick={signOut}><LogOut/>SIGN OUT</Button>:<Button variant="outline" size="sm" asChild><Link to="/auth"><UserRound/>SIGN IN</Link></Button>}<Button size="sm" asChild><Link to="/agent">LAUNCH AGENT</Link></Button><Sheet><SheetTrigger asChild><Button className="mobile-menu" variant="ghost" size="icon" aria-label="Open navigation"><Menu/></Button></SheetTrigger><SheetContent className="border-border bg-background pt-16"><nav className="mobile-nav">{links}</nav></SheetContent></Sheet></div>
  </header>
  <main>{children}</main>
  <footer className="site-footer"><div><div className="brand"><img src={logo.url} alt=""/><span>ARCOVA</span></div><p>Autonomous Intelligence for Tokenized Markets.</p><p className="legal">ARCOVA provides software, market intelligence and analytical tools. Model outputs are informational and may be inaccurate. Forecasts and scenarios are not guarantees of future performance.</p></div><div><span className="footer-label">SYSTEM</span>{links}</div><div><span className="footer-label">MARKET</span><a href="https://argus.world" target="_blank" rel="noreferrer">Buy on Argus</a><a href="https://argus.world" target="_blank" rel="noreferrer">Chart on Argus</a><a href={import.meta.env.VITE_X_URL || "https://x.com/"} target="_blank" rel="noreferrer">X</a></div><div><span className="footer-label">NETWORK</span><span>Arc Mainnet</span><span>$ARCV</span><button onClick={()=>setContract(true)}>Contract: Coming soon</button><small>© 2026 ARCOVA</small></div></footer>
  <nav className="bottom-nav">{navItems.slice(0,5).map(([label,to,Icon])=><Link key={to} to={to} className={path===to?"active":""}><Icon/><span>{label}</span></Link>)}</nav>
  <Dialog open={contract} onOpenChange={setContract}><DialogContent className="surface"><DialogHeader><DialogTitle>CONTRACT · COMING SOON</DialogTitle><DialogDescription>Contract address will be published after official deployment.</DialogDescription></DialogHeader></DialogContent></Dialog>
 </div>;
}
