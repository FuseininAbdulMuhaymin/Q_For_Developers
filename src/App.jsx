import Header from './layout/Header.jsx'
import Footer from './layout/Footer.jsx'
import Hero from './sections/Hero.jsx'
import Capabilities from './sections/Capabilities.jsx'
import HowItWorks from './sections/HowItWorks.jsx'
import EarlyAccess from './sections/EarlyAccess.jsx'
import Button from './components/Button.jsx'

export default function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Capabilities />
        <HowItWorks />
        <EarlyAccess />
        <section className="button-demo wrap" aria-labelledby="button-demo-title">
          <h2 id="button-demo-title">Button examples</h2>
          <Button>Default button</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button size="small">Small button</Button>
        </section>
      </main>
      <Footer />
    </div>
  )
}
