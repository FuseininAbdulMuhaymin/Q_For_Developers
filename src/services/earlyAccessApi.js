const API_BASE = import.meta.env.VITE_API_BASE || 'https://qsandbox.prestoghana.com'

export async function requestEarlyAccess(data) {
  const response = await fetch(`${API_BASE}/developers/early-access`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, email: String(data.email || '').trim().toLowerCase() }),
  })
  const body = await response.json()
  if (!response.ok || !body.success) {
    return { success: false, message: body.message || 'Something went wrong. Please try again.' }
  }
  return { success: true, duplicate: Boolean(body.duplicate) }
}
