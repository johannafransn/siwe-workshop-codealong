import React from 'react'
import Link from 'next/link'
import type { Url } from 'next/dist/shared/lib/router/router'

interface ButtonProps {
	text: string
	to?: string | Url | undefined
	disabled?: boolean
	buttonStyle?: 'purple' | 'white'

	onClick?: () => void

	arrowRight?: boolean
	arrowUp?: boolean
	download?: boolean
	cross?: boolean
	wallet?: boolean
	edit?: boolean
}

const Button: React.FC<ButtonProps> = ({
	text,
	arrowRight,
	arrowUp,
	disabled,
	download,
	cross,
	edit,
	wallet,
	to,
	buttonStyle = 'purple',
	onClick,
}) => {
	return (
		<Link className='cursor-not-allowed' href={to || ''}>
			<div
				className={`w-[313px] h-14 px-6 py-4 rounded-md justify-center items-center gap-2 inline-flex ${
					disabled
						? 'bg-stone-300 dark:bg-stone-700 cursor-not-allowed'
						: buttonStyle === 'purple'
							? 'bg-purple-950 hover:bg-stone-600 hover:cursor-pointer dark: border-2 dark:border-purple-500'
							: 'bg-white border-2 border-stone-950 text-stone-950 hover:bg-stone-200 hover:text-white hover:border-stone-600 hover:cursor-pointer'
				}`}
				style={{ pointerEvents: disabled ? 'none' : 'auto' }}
				onClick={onClick}
			>
				<div
					className={`text-xl font-semibold flex items-center ${
						disabled
							? 'text-white dark:text-stone-400'
							: buttonStyle === 'white'
								? 'text-stone-950 dark:text-stone-950'
								: 'text-white'
					}`}
				>
					{text}
					<div className='pl-2'>
						{arrowRight && (
							<svg
								className='ml-1'
								width='24'
								height='25'
								viewBox='0 0 24 25'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M13.2126 4.71387L20.9988 12.5L13.2126 20.2861'
									stroke='white'
									strokeWidth='3'
									strokeLinecap='round'
								/>
								<path
									d='M21 12.5L3 12.5'
									stroke='white'
									strokeWidth='3'
									strokeLinecap='round'
								/>
							</svg>
						)}
						{arrowUp && (
							<svg
								width='24'
								height='25'
								viewBox='0 0 24 25'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M4.2503 11.5989L12 3.84915L19.7498 11.5989'
									stroke='white'
									strokeWidth='3'
									strokeLinecap='round'
								/>
								<path
									d='M12 6.51541L12 21.1509'
									stroke='white'
									strokeWidth='3'
									strokeLinecap='round'
								/>
							</svg>
						)}
						{disabled
							? download && (
									<svg
										width='24'
										height='25'
										viewBox='0 0 24 25'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M7.50238 6.87809H4.12917C3.53275 6.87809 2.96076 7.11501 2.53903 7.53674C2.1173 7.95848 1.88037 8.53047 1.88037 9.12689V19.2465C1.88037 19.8429 2.1173 20.4149 2.53903 20.8366C2.96076 21.2584 3.53275 21.4953 4.12917 21.4953H19.8708C20.4672 21.4953 21.0392 21.2584 21.4609 20.8366C21.8827 20.4149 22.1196 19.8429 22.1196 19.2465V9.12689C22.1196 8.53047 21.8827 7.95848 21.4609 7.53674C21.0392 7.11501 20.4672 6.87809 19.8708 6.87809H16.4976M15.3732 11.3757L12 14.7489M12 14.7489L8.62678 11.3757M12 14.7489V3.50488'
											strokeWidth='2.58612'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								)
							: download && (
									<svg
										width='24'
										height='25'
										viewBox='0 0 24 25'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M7.50238 6.87809H4.12917C3.53275 6.87809 2.96076 7.11501 2.53903 7.53674C2.1173 7.95848 1.88037 8.53047 1.88037 9.12689V19.2465C1.88037 19.8429 2.1173 20.4149 2.53903 20.8366C2.96076 21.2584 3.53275 21.4953 4.12917 21.4953H19.8708C20.4672 21.4953 21.0392 21.2584 21.4609 20.8366C21.8827 20.4149 22.1196 19.8429 22.1196 19.2465V9.12689C22.1196 8.53047 21.8827 7.95848 21.4609 7.53674C21.0392 7.11501 20.4672 6.87809 19.8708 6.87809H16.4976M15.3732 11.3757L12 14.7489M12 14.7489L8.62678 11.3757M12 14.7489V3.50488'
											stroke='white'
											strokeWidth='2.58612'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								)}
						{cross && (
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<rect
									x='1.5'
									y='1.5'
									width='21'
									height='21'
									rx='10.5'
									stroke='#0D0D0D'
									strokeWidth='3'
								/>
								<path
									d='M8.99121 8.99121L15.0085 15.0085'
									stroke='#0D0D0D'
									strokeWidth='3'
									strokeLinecap='round'
								/>
								<path
									d='M15.0085 8.99121L8.99121 15.0085'
									stroke='#0D0D0D'
									strokeWidth='3'
									strokeLinecap='round'
								/>
							</svg>
						)}
						{disabled
							? wallet && (
									<svg
										width='25'
										height='24'
										viewBox='0 0 25 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M22.1 1.19995H4.1C2.1152 1.19995 0.5 2.81515 0.5 4.79995V19.1999C0.5 21.1847 2.1152 22.7999 4.1 22.7999H22.1C23.4236 22.7999 24.5 21.7236 24.5 20.4V3.59995C24.5 2.27635 23.4236 1.19995 22.1 1.19995ZM4.1 20.4C3.4376 20.4 2.9 19.8612 2.9 19.1999V4.79995C2.9 4.13875 3.4376 3.59995 4.1 3.59995H22.1V7.19995H14.9C13.5764 7.19995 12.5 8.27635 12.5 9.59995V14.4C12.5 15.7236 13.5764 16.8 14.9 16.8H22.1012V20.4H4.1ZM22.1 9.59995V14.4H14.9V9.59995H22.1Z' />
									</svg>
								)
							: wallet && (
									<svg
										width='25'
										height='24'
										viewBox='0 0 25 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M22.1 1.19995H4.1C2.1152 1.19995 0.5 2.81515 0.5 4.79995V19.1999C0.5 21.1847 2.1152 22.7999 4.1 22.7999H22.1C23.4236 22.7999 24.5 21.7236 24.5 20.4V3.59995C24.5 2.27635 23.4236 1.19995 22.1 1.19995ZM4.1 20.4C3.4376 20.4 2.9 19.8612 2.9 19.1999V4.79995C2.9 4.13875 3.4376 3.59995 4.1 3.59995H22.1V7.19995H14.9C13.5764 7.19995 12.5 8.27635 12.5 9.59995V14.4C12.5 15.7236 13.5764 16.8 14.9 16.8H22.1012V20.4H4.1ZM22.1 9.59995V14.4H14.9V9.59995H22.1Z'
											fill={buttonStyle === 'purple' ? 'white' : 'purple'}
										/>
									</svg>
								)}
						{disabled
							? edit && (
									<svg
										width='23'
										height='18'
										viewBox='0 0 23 18'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M15.9976 16.3086H19.3708C19.9672 16.3086 20.5392 16.0717 20.961 15.6499C21.3827 15.2282 21.6196 14.6562 21.6196 14.0598V3.94018C21.6196 3.34376 21.3827 2.77177 20.961 2.35004C20.5392 1.92831 19.9672 1.69138 19.3708 1.69138L3.62921 1.69138C3.03279 1.69138 2.4608 1.92831 2.03907 2.35004C1.61734 2.77177 1.38041 3.34376 1.38041 3.94018V14.0598C1.38041 14.6562 1.61734 15.2282 2.03907 15.6499C2.4608 16.0717 3.03279 16.3086 3.62921 16.3086H7.00241M8.12682 11.811L11.5 8.43779M11.5 8.43779L14.8732 11.811M11.5 8.43779L11.5 16.3086'
											strokeWidth='2.58612'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								)
							: edit && (
									<svg
										width='23'
										height='18'
										viewBox='0 0 23 18'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M15.9976 16.3086H19.3708C19.9672 16.3086 20.5392 16.0717 20.961 15.6499C21.3827 15.2282 21.6196 14.6562 21.6196 14.0598V3.94018C21.6196 3.34376 21.3827 2.77177 20.961 2.35004C20.5392 1.92831 19.9672 1.69138 19.3708 1.69138L3.62921 1.69138C3.03279 1.69138 2.4608 1.92831 2.03907 2.35004C1.61734 2.77177 1.38041 3.34376 1.38041 3.94018V14.0598C1.38041 14.6562 1.61734 15.2282 2.03907 15.6499C2.4608 16.0717 3.03279 16.3086 3.62921 16.3086H7.00241M8.12682 11.811L11.5 8.43779M11.5 8.43779L14.8732 11.811M11.5 8.43779L11.5 16.3086'
											fill={buttonStyle === 'purple' ? 'white' : 'purple'}
											strokeWidth='2.58612'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								)}
					</div>
				</div>
			</div>
		</Link>
	)
}

export default Button
