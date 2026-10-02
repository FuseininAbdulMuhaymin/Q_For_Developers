export function Arrow({ diagonal = false }) {
  return <svg aria-hidden="true" viewBox="0 0 20 20" className={diagonal ? 'arrow-icon diagonal' : 'arrow-icon'}><path d="M4 10h11M10 5l5 5-5 5" /></svg>
}

export default function Button({ children, className = '', type = 'button', disabled = false, ...props }) {
  return <button className={`button ${className}`} type={type} disabled={disabled} {...props}>{children}</button>
}
