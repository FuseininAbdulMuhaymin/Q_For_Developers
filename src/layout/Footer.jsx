export default function Footer() {
  return (
    // The footer holds the copyright notice and policy links.
    <footer className="site-footer">
      <div className="site-footer__inner page-wrap">
        <p>© 2024 Presto Ghana. Q for Developers. All rights reserved.</p>
        <nav aria-label="Footer navigation">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#status">API Status</a>
        </nav>
      </div>
    </footer>
  )
}
