import Header from './layout/Header.jsx'
import Hero from './sections/Hero.jsx'
import Capabilities from './sections/Capabilities.jsx'
import HowItWorks from './sections/HowItWorks.jsx'
import EarlyAccess from './sections/EarlyAccess.jsx'
import Footer from './layout/Footer.jsx'
import './styles/page.css'

export default function App() {
  return (
    <div className="site-shell" id="top">
      {/* Lets keyboard users skip the header and go straight to the page content. */}
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Each page area is kept in its own component to make this file easy to scan. */}
      <Header />
      <main id="main">
        <Hero />
        <Capabilities />
        <HowItWorks />
        <EarlyAccess />
      </main>
      <Footer />
    </div>
  )
}
