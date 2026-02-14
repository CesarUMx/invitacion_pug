import { useState, useEffect, useRef } from 'react';
import { EVENT, IMAGES } from '../../utils/constants';
import s from './HeroSection.module.css';

export default function HeroSection({ introComplete }) {
  const [visible, setVisible] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef(null);

  // Activar stagger solo después de que el intro termine completamente
  useEffect(() => {
    if (introComplete && !visible) {
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, [introComplete, visible]);

  // Parallax suave en la imagen de fondo
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = -rect.top / window.innerHeight;
      setOffsetY(progress * 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className={s.hero}>
      {/* Imagen de fondo con parallax */}
      <div
        className={s.bgImage}
        style={{
          backgroundImage: `url(${IMAGES.princessDress})`,
          transform: `translateY(${offsetY}px)`,
        }}
      />

      {/* Overlay gradiente */}
      <div className={s.overlay} />

      {/* Contenido */}
      <div className={`${s.content} ${visible ? s.contentVisible : ''}`}>
        <p className={s.line1} style={{ '--i': 0 }}>
          Con la gracia de Dios y el amor de su familia...
        </p>

        <h1 className={s.name} style={{ '--i': 1 }}>
          {EVENT.quinceanera}
        </h1>

        <p className={s.line2} style={{ '--i': 2 }}>
          Celebra sus XV Años
        </p>

        {/* Divider decorativo */}
        <div className={s.divider} style={{ '--i': 3 }}>
          <span className={s.dividerLine} />
          <span className={s.dividerIcon}>👑</span>
          <span className={s.dividerLine} />
        </div>

        <p className={s.date} style={{ '--i': 4 }}>
          {EVENT.date}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className={s.scrollHint}>
        <span className={s.scrollArrow}>↓</span>
      </div>
    </section>
  );
}