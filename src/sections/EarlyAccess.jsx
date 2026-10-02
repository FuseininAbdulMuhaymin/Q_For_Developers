import { useState } from 'react'
import { requestEarlyAccess } from '../services/earlyAccessApi.js'

const emptyForm = {
  fullName: '',
  email: '',
  company: '',
  projectDescription: '',
  website_hp: '',
}

export default function EarlyAccess() {
  // React remembers what the visitor types and whether the form is sending.
  const [formData, setFormData] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    // Ignore submissions that fill in the hidden bot-check field.
    if (formData.website_hp) return

    setIsSubmitting(true)

    try {
      // Send the form fields to the existing early-access API helper.
      const result = await requestEarlyAccess(formData)

      if (!result.success) {
        setMessage(result.message)
      } else if (result.duplicate) {
        setMessage('You are already on the list. Check your email for updates.')
        setFormData(emptyForm)
      } else {
        setMessage('Thanks! We will email you when your sandbox is ready.')
        setFormData(emptyForm)
      }
    } catch {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    // The browser checks that email is valid before this form is submitted.
    <section className="access-section" id="early-access">
      <div className="access-section__inner page-wrap">
        <div className="section-heading section-heading--center">
          <h2>Build on Q</h2>
          <p>Tell us what you're building and we'll help you get started.</p>
        </div>

        <form className="access-form" onSubmit={handleSubmit}>
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website_hp">Leave this field empty</label>
            <input
              id="website_hp"
              name="website_hp"
              value={formData.website_hp}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="form-row">
            <label>
              Name <span>(optional)</span>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your name"
              />
            </label>
            <label>
              Email <span className="required">*</span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
              />
            </label>
          </div>

          <label>
            Company <span>(optional)</span>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company or startup"
            />
          </label>

          <label>
            What do you want to build? <span>(optional)</span>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              placeholder="Tell us briefly what you're building..."
              rows="4"
            />
          </label>

          {message && <p className="form-message" role="status">{message}</p>}

          <button className="button access-form__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending request…' : 'Request early access'}
            {!isSubmitting && <span aria-hidden="true">→</span>}
          </button>
        </form>
      </div>
    </section>
  )
}
