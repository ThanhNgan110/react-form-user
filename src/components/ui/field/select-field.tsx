interface IOption {
	label: string
	value: string
}

interface SelectFieldProps {
	label: string
	id: string
	options: IOption[]
}

function SelectField({ label, id, options, ...restProps }: SelectFieldProps) {
	return (
		<>
			<label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-900">
				{label}
			</label>
			<select
				id={id}
				className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-3 h-[40px]"
				{...restProps}
			>
				<option defaultValue={''}>Choose a item</option>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</>
	)
}

export default SelectField
