import Head from 'next/head'
import Appbar from '@/components/appbar'

interface Props {
	title?: string
	children: React.ReactNode
}

const Page = ({ title, children }: Props) => {
	return (
		<>
			{title ? (
				<Head>
					<title>Siwe Workshop | {title}</title>
				</Head>
			) : null}
			<Appbar />
			<main className='mx-auto max-w-screen-md pt-28 px-safe sm:pb-0'>
				<div>{children}</div>
			</main>
		</>
	)
}

export default Page
