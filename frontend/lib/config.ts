'use client';

import { http, createStorage, cookieStorage } from 'wagmi'
import { sepolia, bscTestnet, blastSepolia, filecoin, filecoinCalibration } from 'wagmi/chains'
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit'

const projectId = `2528166ed9a6a4e6c957af5fe1f13e3f`;

const supportedChains: Chain[] = [filecoinCalibration, filecoin];

export const config = getDefaultConfig({
   appName: `WalletConnection`,
   projectId,
   chains: supportedChains as any,
   ssr: true,
   storage: createStorage({
    storage: cookieStorage,
   }),
  transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {})
});
  