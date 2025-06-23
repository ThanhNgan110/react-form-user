import { useForm, Controller, type SubmitHandler } from 'react-hook-form'

interface IFormInput {
	first_name: string
	last_name: string
	email: string
	address: string
	city: string
	country: string
	state: string
	role: string
	password: string
}

import SelectField from '../../../components/ui/field/select-field'
import TextField from '../../../components/ui/field/text-field'
import { toast } from 'react-toastify'

function FormUser() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
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

	const onSubmit: SubmitHandler<IFormInput> = data => {
		console.log(data)

		toast.success('🦄 Successfully!', {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		})
	}

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
								value: 6,
								message: 'Please input value minium 6',
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
								value: 6,
								message: 'Please input value minium 6',
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
									{ label: 'Na Noi', value: 'HN' },
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
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
					</div>
				</div>
			</div>
		</form>
	)
}

export default FormUser
