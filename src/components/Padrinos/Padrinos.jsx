import { useState, useEffect } from 'react';
import { EVENT, IMAGES } from '../../utils/constants';
import s from './Padrinos.module.css';

export default function Padrinos({ active }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active && !visible) {
      const timer = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(timer);
    }
  }, [active, visible]);

  return (
    <section
      className={s.section}
      style={{ backgroundImage: `url(${IMAGES.scrollBlank})` }}
    >
      <div className={`${s.content} ${visible ? s.contentVisible : ''}`}>
        <p className={s.sparkle} style={{ '--i': 0 }}>
          ✨ Mis Padrinos ✨
        </p>

        <p className={s.quote} style={{ '--i': 1 }}>
          "Quienes con su amor y guía iluminan mi camino"
        </p>

        <div className={s.divider} style={{ '--i': 2 }}>
          <span className={s.dividerLine} />
          <span className={s.dividerIcon}>🕊️</span>
          <span className={s.dividerLine} />
        </div>

        <p className={s.label} style={{ '--i': 3 }}>
          Madrina
        </p>
        <p className={s.padrinoName} style={{ '--i': 4 }}>
          {EVENT.padrinos.madrina}
        </p>

        <p className={s.label} style={{ '--i': 5 }}>
          Padrino
        </p>
        <p className={s.padrinoName} style={{ '--i': 6 }}>
          {EVENT.padrinos.padrino}
        </p>
      </div>
    </section>
  );
}
