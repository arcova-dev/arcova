import {
  Activity, BarChart3, BookOpen, Bot, BrainCircuit, ChartCandlestick, FileText,
  Gauge, Globe2, Layers3, Radar, Scale, ScanSearch, Settings2, ShieldCheck,
  Target, Telescope, WalletCards, Zap,
} from "lucide-react";

export const ARGUS_URL = import.meta.env.VITE_ARGUS_URL || "https://argus.world";
export const X_URL = import.meta.env.VITE_X_URL || "https://x.com/";
export const arcConfig = {
  name: "Arc Mainnet",
  settlement: "USDC",
  nativeGas: "USDC",
  rpcUrl: import.meta.env.VITE_ARC_RPC_URL || "",
  chainId: import.meta.env.VITE_ARC_CHAIN_ID || "",
  explorerUrl: import.meta.env.VITE_ARC_EXPLORER_URL || "",
};

export const navItems = [
  ["Home", "/", Globe2], ["Agent", "/agent", Bot], ["Markets", "/markets", ChartCandlestick],
  ["Terminal", "/terminal", Gauge], ["Portfolio", "/portfolio", WalletCards],
  ["Reports", "/reports", FileText], ["Activity", "/activity", Activity], ["Docs", "/docs", BookOpen],
] as const;

export const processSteps = [
  ["Observe", "Monitor tokenized markets and market conditions.", Telescope],
  ["Research", "Collect fundamentals, technical data, news and relevant market information.", ScanSearch],
  ["Analyze", "Evaluate price structure, liquidity, fundamentals, sentiment and risk.", BrainCircuit],
  ["Model", "Generate scenario-based forecasts with assumptions and confidence.", Layers3],
  ["Decide", "Produce an explainable agent decision based on configured strategy.", Target],
  ["Execute", "Execute only transactions permitted by user policy.", Zap],
  ["Monitor", "Continuously monitor positions and market conditions.", Radar],
  ["Report", "Generate transparent performance and decision reports.", FileText],
] as const;

export const featurePages = {
  markets: { eyebrow: "TOKENIZED MARKET EXPLORER", title: "Markets", description: "Verified tokenized assets, liquidity, pricing and agent model views from connected providers.", icon: ChartCandlestick, empty: "NO VERIFIED TOKENIZED ASSETS FOUND", detail: "Connect a market data and asset-registry provider to begin discovery.", action: "RETRY DATA" },
  scanner: { eyebrow: "MARKET SCANNER", title: "Find signal without inventing it.", description: "Screen real tokenized assets by momentum, value, liquidity, volume, volatility, market cap, risk and sentiment.", icon: ScanSearch, empty: "DATA PROVIDER OFFLINE", detail: "Scanner results appear only when validated market data is available.", action: "RETRY SCAN" },
  compare: { eyebrow: "MULTI-ASSET RESEARCH", title: "Compare assets", description: "Compare price, performance, fundamentals, liquidity, sentiment, model view and risk on one institutional canvas.", icon: Scale, empty: "NO ASSETS SELECTED", detail: "Search verified symbols after the asset registry is connected.", action: "ADD ASSET" },
  intelligence: { eyebrow: "NEWS & SENTIMENT", title: "Market intelligence", description: "Source-attributed market, macro, earnings, regulation and tokenization intelligence.", icon: BrainCircuit, empty: "NEWS DATA PROVIDER NOT CONNECTED", detail: "Articles are never generated or substituted when the source feed is unavailable.", action: "RETRY NEWS" },
  watchlist: { eyebrow: "MONITOR", title: "My watchlist", description: "Track verified assets, risk changes, model views, price movement and analysis freshness.", icon: Radar, empty: "NO WATCHLIST ASSETS", detail: "Add an asset from Markets when verified registry data becomes available.", action: "EXPLORE MARKETS", href: "/markets" },
  portfolio: { eyebrow: "PORTFOLIO INTELLIGENCE", title: "Portfolio", description: "Wallet-aware allocation, exposure, performance and policy-controlled strategy scenarios.", icon: WalletCards, empty: "NO PORTFOLIO CONNECTED", detail: "Connect a supported wallet after Arc chain configuration is available.", action: "CONNECT WALLET" },
  reports: { eyebrow: "TRANSPARENT REPORTING", title: "Reports", description: "Generate market, portfolio, asset, performance, risk and execution reports from validated inputs.", icon: FileText, empty: "NO REPORTS GENERATED", detail: "Reports will appear here with source timestamps, assumptions and methodology.", action: "GENERATE REPORT" },
  activity: { eyebrow: "AUDIT HISTORY", title: "Agent activity", description: "A complete, timestamped record of decisions, confidence, rationale and authorized transactions.", icon: Activity, empty: "NO AGENT HISTORY", detail: "Decisions and transaction confirmations appear only after they occur.", action: "LAUNCH AGENT", href: "/agent" },
} as const;

export type DataStatus = "live" | "delayed" | "unavailable" | "error";
export interface MarketDataProvider { fetchAsset(symbol:string):Promise<unknown>; fetchPrice(symbol:string):Promise<unknown>; fetchOHLCV(symbol:string,timeframe:string):Promise<unknown>; fetchVolume(symbol:string):Promise<unknown>; fetchLiquidity(symbol:string):Promise<unknown>; }
export interface NewsProvider { fetchNews(symbol?:string):Promise<unknown>; }
export interface FundamentalDataProvider { fetchFundamentals(symbol:string):Promise<unknown>; }
export interface OnchainProvider { fetchOnchainActivity(address?:string):Promise<unknown>; }
export interface AssetRegistryProvider { fetchAsset(symbol:string):Promise<unknown>; fetchAssets():Promise<unknown>; }
export interface ArcNetworkProvider { fetchStatus():Promise<DataStatus>; }
export class UnconfiguredProvider implements MarketDataProvider, NewsProvider, FundamentalDataProvider, OnchainProvider, AssetRegistryProvider, ArcNetworkProvider {
  private unavailable(): never { throw new Error("DATA_PROVIDER_NOT_CONFIGURED"); }
  async fetchAsset(_symbol:string){ return this.unavailable(); }
  async fetchAssets(){ return this.unavailable(); }
  async fetchPrice(_symbol:string){ return this.unavailable(); }
  async fetchOHLCV(_symbol:string,_timeframe:string){ return this.unavailable(); }
  async fetchVolume(_symbol:string){ return this.unavailable(); }
  async fetchLiquidity(_symbol:string){ return this.unavailable(); }
  async fetchNews(_symbol?:string){ return this.unavailable(); }
  async fetchFundamentals(_symbol:string){ return this.unavailable(); }
  async fetchOnchainActivity(_address?:string){ return this.unavailable(); }
  async fetchStatus():Promise<DataStatus>{ return "unavailable"; }
}
export const provider = new UnconfiguredProvider();
