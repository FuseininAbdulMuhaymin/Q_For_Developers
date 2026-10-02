import Card from '../components/Card.jsx'
import { capabilities } from '../data/capabilities.js'

export default function Capabilities() {
  return <section className="build-section section-pad" id="build"><div className="section-intro"><div><div className="eyebrow dark-eyebrow">THE BUILDING BLOCKS</div><h2>One connection.<br /><em>Many possibilities.</em></h2></div><p>Everything you need to turn a good idea into something people can use—connected through one platform.</p></div><div className="capability-grid">{capabilities.map((item) => <Card key={item.number} number={item.number} icon={item.icon} title={item.title}>{item.description}</Card>)}</div></section>
}
