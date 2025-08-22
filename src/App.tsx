import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { StudioWorkspace } from './components/StudioWorkspace'
import MarketDemo from './components/MarketDemo';
import { FlowDemo } from './components/FlowDemo'
import { MobileApp } from './components/MobileApp'
import { AboutUs } from './components/AboutUs'
import { Careers } from './components/Careers'
import { Footer } from './components/Footer'
import { FeedbackSystem } from './components/FeedbackSystem'
import { WelcomeModal } from './components/WelcomeModal'

export type DemoSection = 'overview' | 'studio' | 'market' | 'flow' | 'mobile' | 'about' | 'careers'

function App() {
  const [activeSection, setActiveSection] = useState<DemoSection>('overview')

  const renderSection = () => {
    switch (activeSection) {
      case 'studio':
        return <StudioWorkspace />
      case 'market':
        return <MarketDemo />
      case 'flow':
        return <FlowDemo />
      case 'mobile':
        return <MobileApp />
      case 'about':
        return <AboutUs />
      case 'careers':
        return <Careers />
      default:
        return <Hero setActiveSection={setActiveSection} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="pt-16"
        >
          {renderSection()}
        </motion.main>
      </AnimatePresence>

      <Footer setActiveSection={setActiveSection} />
      <FeedbackSystem />
      <WelcomeModal />
    </div>
  )
}

export default App