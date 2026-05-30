import { useEffect } from 'react'
import { initSmoothScroll } from './lib/smooth-scroll'
import Navigation from './components/Navigation'
import DotNavigation from './components/DotNavigation'
import CustomCursor from './components/CustomCursor'
import MountainScene from './components/MountainScene'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Markets from './sections/Markets'
import MapSection from './sections/MapSection'
import Process from './sections/Process'
import FMCG from './sections/FMCG'
import Sustainability from './sections/Sustainability'
import WhyUs from './sections/WhyUs'
import Contact from './sections/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    initSmoothScroll()
  }, [])

  return (
    <>
      <CustomCursor />
      <Navigation />
      <DotNavigation />

      {/* Persistent Fullscreen fixed WebGL Scene Layer */}
      <MountainScene />

      {/* Content overlays cleanly above canvas */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Markets />
        <MapSection />
        <Process />
        <FMCG />
        <Sustainability />
        <WhyUs />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
