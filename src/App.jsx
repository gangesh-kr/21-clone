import { useEffect } from 'react'
import { initSmoothScroll } from './lib/smooth-scroll'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import Ticker from './components/Ticker'
import About from './sections/About'
import Services from './sections/Services'
import Markets from './sections/Markets'
import Process from './sections/Process'
import FMCG from './sections/FMCG'
import WhyUs from './sections/WhyUs'
import CTABanner from './components/CTABanner'
import Contact from './sections/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    initSmoothScroll()
  }, [])

  return (
    <>
      <Navigation />

      <main>
        <Hero />
        <Ticker />
        <About />
        <Services />
        <Markets />
        <Process />
        <FMCG />
        <WhyUs />
        <CTABanner />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
