interface Props {
	children: React.ReactNode
}

const Section = ({ children }: Props) => (
	<section className='mt-8 place-items-center place-content-center justify-center text-center'>
		{children}
	</section>
)

export default Section
