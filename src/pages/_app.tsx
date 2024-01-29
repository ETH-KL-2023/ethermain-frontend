import "@/styles/globals.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { sepolia, mantleTestnet, localhost, polygonMumbai } from "viem/chains";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";



export default function App({ Component, pageProps }: AppProps) {
  const { chains, publicClient } = configureChains(
    [sepolia, mantleTestnet, polygonMumbai, localhost],
    [
      publicProvider()
    ]

    // [
    //   // //Mantle
    //   // jsonRpcProvider({
    //   //   rpc: chain => ({
    //   //     http: `https://rpc.testnet.mantle.xyz`,
    //   //   }),
    //   // }),
    //   // //Taiko
    //   // jsonRpcProvider({
    //   //   rpc: (chain) => ({
    //   //     http: `https://rpc.jolnir.taiko.xyz`,
    //   //   }),
    //   // }),
    // ]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "d36ea301e4422955da199fa95fec8ee7",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}





