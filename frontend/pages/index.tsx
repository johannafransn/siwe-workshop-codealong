import React, { useState } from 'react'
import Page from '@/components/page'
import Section from '@/components/section'
import Button from '@/components/button'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { useRouter } from 'next/navigation'
import { SignInButton } from '@/components/SignInButton'
import ApiService from '@/api/service'

const Index = () => {
	const [dataFetched, setDataFetched] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const { address } = useAccount()

	const handleFetchData = async () => {
		try {
			const data = await ApiService.getAuthenticatedData()
			setDataFetched(data.data)
			setError(null)
		} catch (err) {
			setError(err.message)
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen'>
			<Page>
				<Section>
					<div className='flex flex-col items-center justify-center gap-6 min-h-full'>
						<h2 className='font-gotham-regular text-purple-700 dark:text-purple-200 lg:text-7xl text-5xl text-center px-8 md:p-20 pb-10'>
							SIWE Example
						</h2>

						<SignInButton
							onSuccess={({ publicAddress }) => {
								// Handle success, if needed
							}}
							onError={({ error }) => {
								// Handle error, if needed
							}}
						/>
						<Button onClick={handleFetchData} text={'Fetch data'} />
						{error ? `${error} Unauthorized` : dataFetched}
					</div>
				</Section>
			</Page>
		</div>
	)
}

export default Index
