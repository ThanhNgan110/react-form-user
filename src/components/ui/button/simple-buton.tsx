import type React from 'react'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	className?: string
	type: 'button' | 'submit'
	onClick?: () => void
	children: React.ReactNode
}

const Button = ({ className, type, onClick, children, ...restProps }: ButtonProps) => {
	return (
		<button
			type={type}
			className={`font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer ${className}`}
			onClick={onClick}
			{...restProps}
		>
			{children}
		</button>
	)
}

export default Button
