export default function Input({ label, name, optional = false, required = false, as = 'input', ...props }) {
  const Field = as
  return <label>{label} <span className={required ? 'required' : ''}>{required ? 'REQUIRED' : optional ? 'OPTIONAL' : ''}</span><Field name={name} aria-required={required || undefined} required={required} {...props} /></label>
}
