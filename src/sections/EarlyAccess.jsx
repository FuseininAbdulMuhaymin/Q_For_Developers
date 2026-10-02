import { useState } from 'react'
import Button, { Arrow } from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import { requestEarlyAccess } from '../services/earlyAccessApi.js'

export default function EarlyAccess() {
  const [status, setStatus] = useState({ type: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (!data.email || !form.elements.email.checkValidity()) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      form.elements.email.focus()
      return
    }
    setSubmitting(true)
    setStatus({ type: 'pending', message: 'Sending your request…' })
    try {
      const result = await requestEarlyAccess(data)
      if (!result.success) {
        setStatus({ type: 'error', message: result.message })
        return
      }
      setStatus({ type: 'success', message: result.duplicate ? "You've already requested access. We'll be in touch." : "Thanks! We've received your request. Check your inbox for a confirmation." })
      form.reset()
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return <section className="access-section section-pad" id="early-access"><div className="access-copy"><div className="eyebrow dark-eyebrow">YOUR NEXT PROJECT STARTS HERE</div><h2>Let’s build<br /><em>something useful.</em></h2><p>Request early access and tell us a little about what you have in mind. We’ll be in touch with your sandbox details.</p><div className="access-note"><span>✳</span><p><b>Small group. Big ideas.</b><br />We’re inviting developers in as we grow the platform.</p></div></div><div className="form-panel"><div className="form-heading"><span>EARLY ACCESS</span><span>● OPEN</span></div><h3>Get started with Q</h3><p className="form-subtitle">Drop us a note and we’ll take it from here.</p><form onSubmit={handleSubmit} noValidate>
    <div className="field-row"><Input label="Name" name="name" optional maxLength="120" autoComplete="name" placeholder="Your name" /><Input label="Company" name="company" optional maxLength="120" autoComplete="organization" placeholder="Where you work" /></div>
    <Input label="Email address" name="email" as="input" type="email" maxLength="255" required autoComplete="email" placeholder="you@example.com" />
    <Input label="What do you want to build?" name="use_case" as="textarea" optional maxLength="2000" rows="4" placeholder="A little about your idea…" />
    <div className="honeypot" aria-hidden="true"><label>Website <input type="text" name="website" tabIndex="-1" autoComplete="off" /></label></div>
    <Button className="button-dark submit-button" type="submit" disabled={submitting}>{submitting ? <><span className="spinner" /> Sending request…</> : <>Request early access <Arrow /></>}</Button>
    <p className={`form-status ${status.type}`} role="status" aria-live="polite">{status.message}</p><p className="privacy-note">By submitting, you agree to hear from the Presto team about Q.</p>
  </form></div></section>
}
