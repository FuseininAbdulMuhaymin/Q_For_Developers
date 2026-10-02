import './Button.css'

export default function Button({children,className = '',disabled = false,loading = false,size = 'default',type = 'button',...props}) {
  const classes = ['button', size === 'small' && 'button--small', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      {...props}
      className={classes}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading && <span className="button__spinner" aria-hidden="true" />}
      {children}
    </button>
  )
}

export function Arrow({ diagonal = false }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      <path d="M4 12 12 4M5 4h7v7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
