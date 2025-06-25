import type React from 'react'

interface TableProps extends React.PropsWithChildren {
	headers: string[]
}

function BasicTable({ headers, children }: TableProps) {

	return (
		<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
			<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					{headers.map(header => (
						<th key={header} scope="col" className="px-6 py-3">
							{header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</table>
	)
}

export default BasicTable
