'use client'

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { mainnet } from 'viem/chains'

interface Props {
	children: React.ReactNode
}

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || ''
if (!projectId) {
	throw new Error('NEXT_PUBLIC_WC_PROJECT_ID is not set')
}

// 2. Create wagmiConfig
const metadata = {
	name: 'Addresso',
	description: 'Connect to Addresso',
	url: 'https://web3modal.com',
	icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

/* const { publicClient, webSocketPublicClient } = configureChains(
[mainnet],
[publicProvider()],
) */

const chains = [mainnet]
const wagmiConfig = defaultWagmiConfig({
	chains,
	projectId,
	metadata,
})

export function Web3Modal({ children }: Props) {
	// 3. Create modal
	createWeb3Modal({
		wagmiConfig,
		projectId,
		chains,
		themeMode: 'light',
	})
	return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}
