import { useEffect } from 'react'

import { useForm, Controller, type SubmitHandler } from 'react-hook-form'

import SelectField from '../../../components/ui/field/select-field'
import TextField from '../../../components/ui/field/text-field'
import Button from '../../../components/ui/button/simple-buton'

import type { IAccount } from '../../../types'

interface FormUserProps {
	handleAddUser: (user: Omit<IAccount, 'id'>) => void
	selectedUser?: IAccount | null
	handleUpdateUser: (user: Omit<IAccount, 'id'>) => void
}

function FormUser({ handleAddUser, handleUpdateUser, selectedUser = null }: FormUserProps) {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Omit<IAccount, 'id'>>({
		defaultValues: {
			first_name: '',
			last_name: '',
			email: '',
			address: '',
			city: '',
			country: '',
			state: '',
			role: '',
			password: '123456',
		},
	})

	const onSubmit: SubmitHandler<Omit<IAccount, 'id'>> = user => {
		if (selectedUser) {
			handleUpdateUser({ ...selectedUser, ...user })
		} else {
			handleAddUser(user)
		}
    reset({
      first_name: '',
      last_name: '',
      email: '',
      address: '',
      city: '',
      country: '',
      state: '',
      role: '',
      password: '123456',
    })
	}

	useEffect(() => {
		if (selectedUser) {
			reset(selectedUser)
		}
	}, [selectedUser])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
				<div className="md:col-span-3">
					<Controller
						name="first_name"
						control={control}
						rules={{
							required: 'Please input value',
							minLength: {
								value: 3,
								message: 'Please input value minium 3',
							},
						}}
						render={({ field }) => <TextField label="First Name" id="firstName" {...field} />}
					/>
					{errors.first_name && <div className="text-red-500">{errors.first_name.message}</div>}
				</div>
				<div className="md:col-span-2">
					<Controller
						name="last_name"
						control={control}
						rules={{
							required: 'Please input value',
							minLength: {
								value: 3,
								message: 'Please input value minium 3',
							},
						}}
						render={({ field }) => <TextField label="Last Name" id="lastName" {...field} />}
					/>
					{errors.last_name && <div className="text-red-500">{errors.last_name.message}</div>}
				</div>
				<div className="md:col-span-5">
					<Controller
						name="email"
						control={control}
						rules={{
							required: 'Please input value',
							pattern: {
								value:
									/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: 'Email format wrong. Ex: tony@gmail.com',
							},
						}}
						render={({ field }) => <TextField label="Email Address" id="email" {...field} />}
					/>
					{errors.email && <div className="text-red-500">{errors.email.message}</div>}
				</div>
				<div className="md:col-span-3">
					<Controller
						name="address"
						control={control}
						rules={{
							required: 'Please input value',
						}}
						render={({ field }) => <TextField label="Address / Street" id="address" {...field} />}
					/>
					{errors.address && <div className="text-red-500">{errors.address.message}</div>}
				</div>
				<div className="md:col-span-2">
					<Controller
						name="city"
						control={control}
						rules={{
							required: 'Please input value',
						}}
						render={({ field }) => (
							<SelectField
								id="city"
								label="City"
								options={[
									{ label: 'Ho Chi Minh', value: 'HCM' },
									{ label: 'Ha Noi', value: 'HN' },
									{ label: 'Da Lat', value: 'DL' },
								]}
								{...field}
							/>
						)}
					/>
					{errors.city && <div className="text-red-500">{errors.city.message}</div>}
				</div>
				<div className="md:col-span-2">
					<Controller
						name="country"
						control={control}
						rules={{
							required: 'Please input value',
						}}
						render={({ field }) => (
							<SelectField
								id="country"
								label="Country / region"
								options={[
									{ label: 'Viet Nam', value: 'VN' },
									{ label: 'China', value: 'CN' },
								]}
								{...field}
							/>
						)}
					/>
					{errors.country && <div className="text-red-500">{errors.country.message}</div>}
				</div>
				<div className="md:col-span-2">
					<Controller
						name="state"
						control={control}
						rules={{
							required: 'Please input value',
						}}
						render={({ field }) => (
							<SelectField
								id="state"
								label="State / province"
								options={[
									{ label: 'Q. Phu Nhuan', value: 'PN' },
									{ label: 'Q.1', value: 'Q1' },
								]}
								{...field}
							/>
						)}
					/>
					{errors.state && <div className="text-red-500">{errors.state.message}</div>}
				</div>
				<div className="md:col-span-1">
					<Controller
						name="role"
						control={control}
						rules={{
							required: 'Please input value',
						}}
						render={({ field }) => (
							<SelectField
								id="role"
								label="Role"
								options={[
									{ label: 'Admin', value: 'admin' },
									{ label: 'Operator', value: 'operator' },
									{ label: 'Member', value: 'member' },
								]}
								{...field}
							/>
						)}
					/>
					{errors.role && <div className="text-red-500">{errors.role.message}</div>}
				</div>
				<div className="md:col-span-5 text-right">
					<div className="inline-flex items-end">
						<Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
							Submit
						</Button>
					</div>
				</div>
			</div>
		</form>
	)
}

export default FormUser
