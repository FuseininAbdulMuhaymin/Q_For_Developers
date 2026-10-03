import { capabilities } from '../data/capabilities.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Capabilities() {
  return (
    // Read the feature cards from a list so we do not repeat the same markup.
    <section className="content-section content-section--darker" id="capabilities">
      <div className="page-wrap">
        <div className="section-heading">
          <h2>What you can build</h2>
          <p>Developer building blocks for creating real products and integrations.</p>
        </div>

        <div className="card-grid">
          {capabilities.map((capability) => (
            <article className="feature-card" key={capability.number}>
              <div className="feature-card__icon" aria-hidden="true">
                <FontAwesomeIcon icon={capability.icon} />
              </div>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <a href="#docs">{capability.link} <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
