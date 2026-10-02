import { steps } from '../data/steps.js'

export default function HowItWorks() {
  return <section className="how-section" id="how-it-works"><div className="how-inner section-pad"><div className="eyebrow"><span className="eyebrow-dot" /> A SIMPLE START</div><div className="how-heading"><h2>From idea to<br /><em>in the world.</em></h2><p>We’re opening the doors to a small group of developers. Here’s how to get started.</p></div><div className="steps">{steps.map((step) => <article key={step.number}><span className="step-number">{step.number}</span><span className="step-line" /><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>
}
