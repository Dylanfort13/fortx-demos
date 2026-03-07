import { useState, useEffect } from 'react';
import { Navigation } from './components/sections/Navigation';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Sectors } from './components/sections/Sectors';
import { Gallery } from './components/sections/Gallery';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { DemoPopup } from './components/DemoPopup';
import './App.css';

function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  useEffect(() => {
    // Register GSAP plugins
    const initGSAP = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
    };
    initGSAP();
  }, []);

  const openDemoPopup = () => {
    setIsDemoOpen(true);
  };

  const closeDemoPopup = () => {
    setIsDemoOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation onDemoClick={openDemoPopup} />
      <main>
        <Hero onDemoClick={openDemoPopup} />
        <About />
        <Services onDemoClick={openDemoPopup} />
        <Sectors />
        <Gallery onDemoClick={openDemoPopup} />
        <WhyChooseUs />
        <Contact onDemoClick={openDemoPopup} />
      </main>
      <Footer />
      <DemoPopup isOpen={isDemoOpen} onClose={closeDemoPopup} />
    </div>
  );
}

export default App;
