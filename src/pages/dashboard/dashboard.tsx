import { useState, useEffect } from 'react'

import BasicTable from '../../components/table/basic-table'
import FormUser from './components/form-user'
import Button from '../../components/ui/button/simple-buton'

import type { IAccount } from '../../types'

import { UserApiService } from '../../services/user-service'

import { toast } from 'react-toastify'

function Dashboard() {
	const [users, setUsers] = useState<IAccount[]>([])
	const [selectedUser, setSelectedUser] = useState<IAccount | null>()

	useEffect(() => {
		fetchListUser()
	}, [])

	const fetchListUser = async () => {
		const getListUser = await UserApiService.getList()
		const listUser = getListUser.data

		if (!listUser) {
			setUsers([])
			return
		}
		setUsers(listUser)
	}

	const handleAddUser = async (user: Omit<IAccount, 'id'>) => {
		const res = await UserApiService.post(user, 'signup')

		if (res.isSucess === true) {
			await fetchListUser()
			setSelectedUser(null)
			toast.success('Successfully')
			return
		}
		toast.error(`Error: ${res.msg}`)
	}

	const handleDeleteUser = async (id: string) => {
		const res = await UserApiService.delete(id)

		if (res?.isSucess == true) {
			setUsers(users => users.filter(user => user._id !== id))
			toast.success('Successfully')
			return
		}
		toast.error(`Error: ${res?.msg}`)
	}

	const handleUpdateUser = async (updatedUser: IAccount) => {
		const res = await UserApiService.put(updatedUser._id, updatedUser)

		if (res?.isSucess === true) {
			setUsers(prev => prev.map(user => (user._id === updatedUser._id ? { ...user, ...updatedUser } : user)))
			setSelectedUser(null)
			toast.success('Successfully')
			return
		}
		toast.error(`Error: ${res?.msg}`)
	}

	const handleShowUser = (id: string) => {
		const foundUser = users.find(user => user._id === id)

		if (foundUser) {
			setSelectedUser(foundUser)
			return
		}
		setSelectedUser(null)
	}

	return (
		<div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
			<div className="container max-w-screen-lg mx-auto">
				<div>
					<h2 className="font-semibold text-xl text-gray-600">Responsive Form</h2>
					<p className="text-gray-500 mb-6">Form is mobile responsive. Give it a try.</p>
					<div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
						<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
							<div className="text-gray-600">
								<p className="font-medium text-lg">Personal Details</p>
								<p>Please fill out all the fields.</p>
							</div>
							<div className="lg:col-span-2">
								<FormUser
									onAddUser={handleAddUser}
									onUpdateUser={handleUpdateUser}
									selectedUser={selectedUser ? selectedUser : null}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="relative overflow-x-auto">
					<BasicTable headers={['First Name', 'Last Name', 'Email', 'Role', 'Action']}>
						{users.map((item: IAccount) => (
							<tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
								<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{item.first_name}
								</th>
								<td className="px-6 py-4">{item.last_name}</td>
								<td className="px-6 py-4">{item.email}</td>
								<td className="px-6 py-4">{item.role}</td>
								<td className="px-6 py-4">
									<Button type="button" className="text-blue-500" onClick={() => handleShowUser(item._id)}>
										Edit
									</Button>
									<Button type="button" className="text-red-500" onClick={() => handleDeleteUser(item._id)}>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</BasicTable>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
