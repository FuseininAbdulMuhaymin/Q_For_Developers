import Header from './layout/Header.jsx'
import Footer from './layout/Footer.jsx'
import Hero from './sections/Hero.jsx'
import Capabilities from './sections/Capabilities.jsx'
import HowItWorks from './sections/HowItWorks.jsx'
import EarlyAccess from './sections/EarlyAccess.jsx'

export default function App() {
  return (
    <div className="site-shell">
      <Header />
      <main id="top">
        <Hero />
        <Capabilities />
        <HowItWorks />
        <EarlyAccess />
      </main>
      <Footer />
    </div>
  )
}
