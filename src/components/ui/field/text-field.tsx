import clsx from 'clsx';

interface TextFieldProps {
  label: string,
  id: string,
  className?: string
}

function TextField({ label, id, className = '', ...restProps }: TextFieldProps) {
  return (
   <>
      <label htmlFor="full_name">{label}</label>
      <input
        type="text"
        name={id}
        id={id}
        className={clsx(
          'h-10 border mt-1 rounded px-4 w-full bg-gray-50',
          className
        )}
        {...restProps}
      />
    </>
  )
}

export default TextField