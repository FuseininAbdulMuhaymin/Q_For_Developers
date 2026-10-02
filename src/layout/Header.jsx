export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner page-wrap">
        {/* Brand links take the visitor back to the top of the page. */}
        <div className="site-header__brand">
          <a className="site-header__logo" href="#top" aria-label="Q for Developers home">
            Q
          </a>
          <span className="site-header__company">Presto Ghana</span>
        </div>

        {/* These links jump to page sections with matching IDs. */}
        <nav className="site-header__nav" aria-label="Main navigation">
          <a href="#capabilities">Capabilities</a>
          <a href="#how-it-works">How it works</a>
          <a href="#docs">Docs</a>
        </nav>

        {/* The main button takes visitors to the access request form. */}
        <div className="site-header__actions">
          <a className="button button--small" href="#early-access">Request Early Access</a>
          <span className="site-header__avatar" aria-label="Profile">P</span>
        </div>
      </div>
    </header>
  )
}
