import { cn } from '~/lib/utils'

export function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label htmlFor={htmlFor}>
      {children} {required && <i>*</i>}
    </label>
  )
}

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />

export const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} />
)

export function Select({
  placeholder,
  options,
  ...props
}: { placeholder: string; options: readonly string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

export function Field({
  id,
  label,
  required,
  children,
  className,
}: {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children}
    </div>
  )
}
