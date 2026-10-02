import { steps } from '../data/steps.js'

export default function HowItWorks() {
  return (
    // Each onboarding step is rendered from the steps list.
    <section className="content-section" id="how-it-works">
      <div className="page-wrap">
        <div className="section-heading">
          <h2>How it works</h2>
          <p>A simple path from your idea to a working product.</p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <span className="step-card__number">STEP {step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <span className="step-card__footer">{step.footer}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
