import Button from '../components/Button.jsx'
import './Header.css'

export default function Header() {
  return (
    <header className="site-header" id="top">
      <div className="site-header__inner wrap">
        <div className="site-header__left">
          <a className="site-header__wordmark" href="#top">
            Q for Developers
          </a>

          <nav className="site-header__nav" aria-label="Main">
            <a href="#capabilities">Capabilities</a>
            <a href="#how-it-works">How it works</a>
          </nav>
        </div>

        <Button href="#early-access" size="sm" className="site-header__button">
          <span className="label-long">Request early access</span>
          <span className="label-short">Request access</span>
        </Button>
      </div>
    </header>
  )
}
