import { Arrow } from '../components/Button.jsx'

function Mark() { return <span className="brand-mark" aria-hidden="true"><span>Q</span><i /></span> }

export default function Header() {
  return <header className="site-header"><a href="#top" className="brand" aria-label="Q for Developers home"><Mark /><span>for developers</span></a><nav className="main-nav" aria-label="Main navigation"><a href="#build">Build with Q</a><a href="#how-it-works">How it works</a></nav><a className="header-cta" href="#early-access">Get early access <Arrow diagonal /></a></header>
}
