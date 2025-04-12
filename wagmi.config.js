import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

// Define your custom chain
export const teaSepolia = {
  id: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  name: process.env.NEXT_PUBLIC_CHAIN_NAME || "Tea Sepolia",
  network: process.env.NEXT_PUBLIC_CHAIN_TICKER || "tea-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "TEA",
    symbol: "TEA",
  },
  rpcUrls: {
    public: { http: [process.env.NEXT_PUBLIC_CHAIN_RPC_DEFAULT] },
    default: { http: [process.env.NEXT_PUBLIC_CHAIN_RPC_DEFAULT] },
  },
  blockExplorers: {
    default: {
      name: "TeaExplorer",
      url: process.env.NEXT_PUBLIC_BLOCK_EXPLORER || "https://sepolia.tea.xyz"
    },
  },
  testnet: true,
};

// Create config only once
export const config = createConfig({
  chains: [teaSepolia, sepolia, mainnet],
  connectors: [
    injected(),
    coinbaseWallet({ appName: "Confession DApp" }),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_PROJECT_ID }),
  ],
  transports: {
    [teaSepolia.id]: http(process.env.NEXT_PUBLIC_CHAIN_RPC),
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: true,
});

// Optional: Add type safety
export default config;