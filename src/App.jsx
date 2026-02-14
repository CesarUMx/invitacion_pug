import { useState, useRef, useEffect } from 'react';
import WindowScene from './components/Intro/WindowScene';
import StarField from './components/Particles/StarField';
import FloatingLanterns from './components/Particles/FloatingLanterns';
import PageCarousel from './components/PageCarousel/PageCarousel';
import HeroSection from './components/HeroSection/HeroSection';
import InvitationScroll from './components/InvitationScroll/InvitationScroll';
import Padrinos from './components/Padrinos/Padrinos';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';
import LocationSection from './components/LocationSection/LocationSection';
import DressReveal from './components/DressReveal/DressReveal';
import RSVP from './components/RSVP/RSVP';
import Footer from './components/Footer/Footer';
import ThankYou from './components/ThankYou/ThankYou';
import { EVENT, IMAGES, SOUNDS } from './utils/constants';

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const heroAudioRef = useRef(null);
  const celebrationAudioRef = useRef(null);

  // Iniciar audio cuando el intro termine
  useEffect(() => {
    if (introComplete && heroAudioRef.current && currentPage <= 2) {
      const timer = setTimeout(() => {
        heroAudioRef.current.play().catch(err => {
          console.log('Hero audio play error:', err);
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [introComplete]);

  // Controlar audio basado en la página activa
  useEffect(() => {
    if (!heroAudioRef.current || !celebrationAudioRef.current || !introComplete) return;

    // Páginas 0 (HeroSection), 1 (InvitationScroll) y 2 (Padrinos): reproducir audio hero
    if (currentPage <= 2) {
      heroAudioRef.current.play().catch(err => {
        console.log('Hero audio play error:', err);
      });
      celebrationAudioRef.current.pause();
    } 
    // Página 3 (CountdownTimer) en adelante: reproducir audio celebration
    else {
      heroAudioRef.current.pause();
      celebrationAudioRef.current.play().catch(err => {
        console.log('Celebration audio play error:', err);
      });
    }
  }, [currentPage, introComplete]);

  return (
    <>
      {/* Partículas de fondo — siempre visibles */}
      <StarField />
      <FloatingLanterns />

      {/* Intro — z-index 100, cubre todo hasta que termina */}
      {!introComplete && (
        <WindowScene onComplete={() => setIntroComplete(true)} />
      )}

      {/* Audio de HeroSection/InvitationScroll/Padrinos */}
      <audio ref={heroAudioRef} src={SOUNDS.hero} loop />
      
      {/* Audio de CountdownTimer y páginas siguientes */}
      <audio ref={celebrationAudioRef} src={SOUNDS.celebration} loop />

      {/* Contenido siempre renderizado (detrás del intro) para precargar imágenes */}
      <PageCarousel onPageChange={setCurrentPage}>
        <HeroSection introComplete={introComplete} />
        <InvitationScroll />
        <Padrinos />
        <CountdownTimer />
        <LocationSection
          bgImage={IMAGES.scrollMap}
          icon="⛪"
          title="Misa Religiosa"
          hora={EVENT.iglesia.hora}
          direccion={EVENT.iglesia.direccion}
          nombre={EVENT.iglesia.nombre}
          mapsUrl={EVENT.iglesia.mapsUrl}
        />
        <LocationSection
          bgImage={IMAGES.scrollMapSalon}
          icon="🏰"
          title="Recepción del Evento"
          hora={EVENT.salon.hora}
          direccion={EVENT.salon.direccion}
          nombre={EVENT.salon.nombre}
          mapsUrl={EVENT.salon.mapsUrl}
        />
        <DressReveal />
        <RSVP />
        <Footer />
        <ThankYou />
      </PageCarousel>
    </>
  );
}

export default App;