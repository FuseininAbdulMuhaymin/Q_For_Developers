export default function Card({ number, icon, title, children }) {
  return <article className="capability-card"><div className="cap-top"><span>{number}</span><span className="cap-icon" aria-hidden="true">{icon}</span></div><h3>{title}</h3><p>{children}</p><span className="card-arrow" aria-hidden="true"><svg viewBox="0 0 20 20" className="arrow-icon diagonal"><path d="M4 10h11M10 5l5 5-5 5" /></svg></span></article>
}
