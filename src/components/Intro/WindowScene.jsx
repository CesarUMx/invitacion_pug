import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { IMAGES, SOUNDS } from '../../utils/constants';
import s from './WindowScene.module.css';

function generateStars(count, bright = false) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${bright ? 'b' : 's'}-${i}`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 70}%`,
    size: bright ? Math.random() * 3 + 2 : Math.random() * 2 + 1,
    dur: `${Math.random() * 3 + 2}s`,
    delay: `${Math.random() * 4}s`,
    bright,
  }));
}

// Posición del arco dentro de la imagen original (en % de la imagen 1024x1536)
const IMG_NATURAL_W = 1024;
const IMG_NATURAL_H = 1536;
const ARCH = { top: 0.36, left: 0.40, width: 0.17, height: 0.09 };
const ZOOM_SCALE = 8;

// Calcula el rect real de la imagen visible dentro del elemento <img> con object-fit:contain
function getRenderedImageRect(imgEl) {
  const elW = imgEl.clientWidth;
  const elH = imgEl.clientHeight;
  const elRatio = elW / elH;
  const imgRatio = IMG_NATURAL_W / IMG_NATURAL_H;

  let renderW, renderH, offsetX, offsetY;

  if (imgRatio > elRatio) {
    // Imagen más ancha que el elemento → limitada por ancho
    renderW = elW;
    renderH = elW / imgRatio;
    offsetX = 0;
    offsetY = (elH - renderH) / 2;
  } else {
    // Imagen más alta que el elemento → limitada por alto
    renderH = elH;
    renderW = elH * imgRatio;
    offsetX = (elW - renderW) / 2;
    offsetY = 0;
  }

  const elRect = imgEl.getBoundingClientRect();
  return {
    x: elRect.left + offsetX,
    y: elRect.top + offsetY,
    width: renderW,
    height: renderH,
  };
}

export default function WindowScene({ onComplete }) {
  const [step, setStep] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [rapPos, setRapPos] = useState(null);
  const [audioStarted, setAudioStarted] = useState(false);
  const containerRef = useRef(null);
  const towerImgRef = useRef(null);
  const audioRef = useRef(null);

  const stars = useMemo(() => [
    ...generateStars(120),
    ...generateStars(8, true),
  ], []);

  // Calcula la posición de Rapunzel relativa al towerContainer
  const updateRapunzelPos = useCallback(() => {
    const img = towerImgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    const imgR = getRenderedImageRect(img);
    const contR = container.getBoundingClientRect();

    // Posición relativa al container (no a la pantalla)
    setRapPos({
      top: (imgR.y - contR.top) + imgR.height * ARCH.top,
      left: (imgR.x - contR.left) + imgR.width * ARCH.left,
      width: imgR.width * ARCH.width,
      height: imgR.height * ARCH.height,
    });
  }, []);

  // Intentar reproducir audio automáticamente al cargar
  useEffect(() => {
    const tryAutoplay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setAudioStarted(true); // Si funciona, marcar como iniciado
        } catch (err) {
          // Si falla el autoplay, el botón permanecerá visible
          console.log('Autoplay bloqueado - mostrando botón:', err);
        }
      }
    };
    
    // Intentar después de un pequeño delay
    const timer = setTimeout(tryAutoplay, 100);
    return () => clearTimeout(timer);
  }, []);

  // Iniciar audio y animación cuando el usuario hace clic en "Iniciar"
  const handleStart = useCallback(() => {
    setAudioStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log('Audio play error:', err);
      });
    }
  }, []);

  // Detener audio cuando se sale del intro
  useEffect(() => {
    if (exiting && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [exiting]);

  useEffect(() => {
    if (!audioStarted) return;
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [audioStarted]);

  // Recalcular posición en resize
  useEffect(() => {
    window.addEventListener('resize', updateRapunzelPos);
    return () => window.removeEventListener('resize', updateRapunzelPos);
  }, [updateRapunzelPos]);

  const handleImageLoad = useCallback(() => {
    updateRapunzelPos();
  }, [updateRapunzelPos]);

  const handleTowerClick = useCallback(() => {
    if (zooming) return;

    const img = towerImgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    const imgR = getRenderedImageRect(img);
    const contR = container.getBoundingClientRect();

    // Centro del arco relativo al container (en px)
    const originX = (imgR.x - contR.left) + imgR.width * (ARCH.left + ARCH.width / 2);
    const originY = (imgR.y - contR.top) + imgR.height * (ARCH.top + ARCH.height / 2);

    setZoomStyle({
      transformOrigin: `${originX}px ${originY}px`,
      transform: `scale(${ZOOM_SCALE})`,
      transition: 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    });

    setZooming(true);

    setTimeout(() => {
      setExiting(true);
      setTimeout(() => onComplete?.(), 1000);
    }, 2000 + 3000);
  }, [zooming, onComplete]);

  return (
    <div className={`${s.scene} ${exiting ? s.sceneExit : ''}`}>
      {/* Audio de inicio */}
      <audio ref={audioRef} src={SOUNDS.intro} loop />

      {/* Botón de inicio - Sobre de invitación */}
      {!audioStarted && (
        <div className={s.startOverlay}>
          <button onClick={handleStart} className={s.envelopeButton}>
            <div className={s.envelopeTop}>
              <img src={IMAGES.flor} alt="Flor" className={s.florIcon} />
            </div>
            <div className={s.envelopeBody}>
              <p className={s.envelopeTitle}>Invitación</p>
              <p className={s.envelopeSubtitle}>XV Años</p>
              <p className={s.envelopeName}>Paola Lissette</p>
              <p className={s.envelopeAction}>Toca para abrir</p>
            </div>
          </button>
        </div>
      )}

      {/* Estrellas */}
      <div className={s.stars}>
        {stars.map((st) => (
          <span
            key={st.id}
            className={st.bright ? s.starBright : s.star}
            style={{
              left: st.left,
              top: st.top,
              width: st.size,
              height: st.size,
              '--dur': st.dur,
              '--delay': st.delay,
            }}
          />
        ))}
      </div>

      {/* Título — parte superior */}
      <div className={`${s.titleGroup} ${step >= 1 ? s.titleGroupVisible : ''} ${zooming ? s.titleHide : ''}`}>
        <h1 className={s.titleName}>XV Años</h1>
        <p className={s.titleXV}>Paola&nbsp;&nbsp;&nbsp;&nbsp;Lissette</p>
      </div>

      {/* Torre clickeable */}
      <div className={`${s.towerWrapper} ${step >= 1 ? s.towerWrapperVisible : ''}`}>
        <div
          ref={containerRef}
          className={s.towerContainer}
          onClick={handleTowerClick}
          role="button"
          tabIndex={0}
          aria-label="Toca la torre para iniciar"
          onKeyDown={(e) => e.key === 'Enter' && handleTowerClick()}
          style={{ cursor: zooming ? 'default' : 'pointer', ...zoomStyle }}
        >
          {/* Rapunzel — DENTRO del container, se mueve con el zoom */}
          {rapPos && (
            <div
              className={`${s.rapunzelWindow} ${step >= 2 ? s.rapunzelVisible : ''}`}
              style={{
                top: rapPos.top,
                left: rapPos.left,
                width: rapPos.width,
                height: rapPos.height,
              }}
            >
              <img
                src={IMAGES.rapunzelWindow}
                alt="Rapunzel en la ventana"
                className={s.rapunzelImage}
              />
            </div>
          )}

          {/* Imagen de la torre — encima de Rapunzel */}
          <img
            ref={towerImgRef}
            className={s.towerImage}
            src={IMAGES.torre}
            alt="Torre de Rapunzel"
            onLoad={handleImageLoad}
          />
        </div>
      </div>

      {/* Leyenda inferior */}
      <div className={`${s.hint} ${step >= 3 && !zooming ? s.hintVisible : ''} ${zooming ? s.hintHide : ''}`}>
        <span className={s.hintIcon}>👆</span>
        <p className={s.hintText}>Toca la torre para iniciar</p>
      </div>
    </div>
  );
}