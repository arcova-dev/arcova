import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ArcovaShell } from "@/components/arcova-shell";
import { Button } from "@/components/ui/button";
function NotFoundComponent(){return <div className="empty-screen"><span className="eyebrow">ARCOVA / 404</span><h1>Signal not found.</h1><p>The requested surface is unavailable.</p><Button asChild><Link to="/">RETURN HOME</Link></Button></div>}
function ErrorComponent({error,reset}:{error:Error;reset:()=>void}){const router=useRouter();useEffect(()=>{reportLovableError(error,{boundary:"tanstack_root_error_component"})},[error]);return <div className="empty-screen"><h1>This page did not load.</h1><p>No data was substituted. Retry the request or return home.</p><div className="flex gap-2 justify-center"><Button onClick={()=>{router.invalidate();reset()}}>RETRY</Button><Button variant="outline" asChild><Link to="/">HOME</Link></Button></div></div>}
export const Route=createRootRouteWithContext<{queryClient:QueryClient}>()({head:()=>({meta:[{charSet:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{name:"theme-color",content:"#080a0e"},{name:"author",content:"ARCOVA"}],links:[{rel:"stylesheet",href:appCss},{rel:"icon",href:"/favicon.png",type:"image/png"},{rel:"apple-touch-icon",href:"/apple-touch-icon.png"}]}),shellComponent:RootShell,component:RootComponent,notFoundComponent:NotFoundComponent,errorComponent:ErrorComponent});
function RootShell({children}:{children:ReactNode}){return <html lang="en" className="dark"><head><HeadContent/></head><body>{children}<Scripts/></body></html>}
function RootComponent(){const {queryClient}=Route.useRouteContext();return <QueryClientProvider client={queryClient}><ArcovaShell><Outlet/></ArcovaShell></QueryClientProvider>}
