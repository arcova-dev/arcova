import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/network-status")({
  server: { handlers: { GET: async () => {
    const rpcUrl = process.env['ARC_RPC_URL'];
    if (!rpcUrl) return Response.json({ status: "unavailable", network: "Arc Mainnet", settlement: "USDC" });
    try {
      const response = await fetch(rpcUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_chainId", params: [] }),
        signal: AbortSignal.timeout(4000),
      });
      if (!response.ok) return Response.json({ status: "degraded", network: "Arc Mainnet", settlement: "USDC" });
      const payload = await response.json() as { result?: string };
      return Response.json({ status: payload.result ? "live" : "degraded", network: "Arc Mainnet", settlement: "USDC" });
    } catch {
      return Response.json({ status: "offline", network: "Arc Mainnet", settlement: "USDC" });
    }
  } } },
});