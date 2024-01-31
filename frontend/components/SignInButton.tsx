// Import necessary dependencies
import ApiService from '@/api/service'
import React, { useEffect, useState } from 'react'
import { SiweMessage } from 'siwe'
import { useAccount, useConnect, useSignMessage } from 'wagmi'
import Button from './button'
import { disconnect } from '@wagmi/core'
import { removeCookie, setCookie, shortenAddress } from '@/helper/utils'
import LoadingSpinner from './loading-spinner'

export function SignInButton({
	onSuccess,
	onError,
}: {
	onSuccess: (args: { publicAddress: string }) => void
	onError: (args: { error: Error }) => void
}) {
	const [state, setState] = useState({
		loading: false,
		nonce: '',
		error: null,
	})
	const { address } = useAccount()
	const { connectAsync, connectors } = useConnect()
	const { signMessageAsync } = useSignMessage()

	const fetchNonce = async () => {
		try {
			const nonceRes = await ApiService.getNonce()
			const nonce = nonceRes.nonce as string
			setState((prev) => ({ ...prev, nonce }))
		} catch (error) {
			setState((prev) => ({ ...prev, error }))
		}
	}

	const logOut = async () => {
		try {
			removeCookie()
			disconnect()
		} catch (error) {
			setState((prev) => ({ ...prev, error }))
		}
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			fetchNonce()
		}
	}, []) // Empty dependency array ensures this effect runs once after mount

	const signIn = async () => {
		try {
			const connectResult = await connectAsync({ connector: connectors[1] })
			const publicAddress = connectResult.account
			const chainId = connectResult.chain.id
			if (!publicAddress || !chainId) {
				throw Error('No account connected through Wagmi!')
			}

			setState((prev) => ({ ...prev, loading: true }))
			const message = new SiweMessage({
				domain: window.location.host,
				address: publicAddress,
				statement: 'Sign in with Ethereum to the SIWE-EXAMPLE',
				uri: window.location.origin,
				version: '1',
				chainId,
				nonce: state.nonce,
			})
			const signature = await signMessageAsync({
				message: message.prepareMessage(),
			})
			const verifyRes = await ApiService.verifySiweMessage(message, signature)

			if (!verifyRes) {
				throw Error('Could not verify!')
			}

			setCookie(verifyRes.data.jwt)
			setState((prev) => ({ ...prev, loading: false }))
			onSuccess({ publicAddress })
		} catch (error) {
			console.log(error, 'Error during sign-in')
			setState((prev) => ({ ...prev, loading: false, nonce: '' }))
			onError({ error })
			fetchNonce()
		}
	}

	return (
		<>
			{!address ? (
				<Button text={'Sign In'} disabled={!state.nonce} onClick={signIn} />
			) : (
				<>
					{state.loading ? (
						<LoadingSpinner />
					) : (
						<>
							<h4 className='font-gotham-regular text-white-700 lg:text-7s text-5s text-center px-8 md:p-20 pb-10'>
								Success you logged in and authenticated! <br />
								{shortenAddress(address)}
							</h4>
							<Button text={'Log out'} onClick={logOut} />
						</>
					)}
				</>
			)}
		</>
	)
}
