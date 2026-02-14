import { useState } from 'react';
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
import { EVENT, IMAGES } from './utils/constants';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {/* Partículas de fondo — siempre visibles */}
      <StarField />
      <FloatingLanterns />

      {/* Intro — z-index 100, cubre todo hasta que termina */}
      {!introComplete && (
        <WindowScene onComplete={() => setIntroComplete(true)} />
      )}

      {/* Contenido siempre renderizado (detrás del intro) para precargar imágenes */}
      <PageCarousel>
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
          ciudad={EVENT.iglesia.ciudad}
          mapsUrl={EVENT.iglesia.mapsUrl}
        />
        <LocationSection
          bgImage={IMAGES.scrollMapSalon}
          icon="🏰"
          title="Recepción y Fiesta"
          hora={EVENT.salon.hora}
          direccion={EVENT.salon.direccion}
          ciudad={EVENT.salon.ciudad}
          mapsUrl={EVENT.salon.mapsUrl}
        />
        <DressReveal />
        <RSVP />
        <Footer />
      </PageCarousel>
    </>
  );
}

export default App;