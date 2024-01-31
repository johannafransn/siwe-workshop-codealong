import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'
import { Web3Modal } from '@/context/Web3Modal'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			<Web3Modal>
				<Component {...pageProps} />
			</Web3Modal>
		</ThemeProvider>
	)
}
