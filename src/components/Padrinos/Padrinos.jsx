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
        <h2 className={s.title} style={{ '--i': 0 }}>
          Padrinos
        </h2>

        <p className={s.quote} style={{ '--i': 1 }}>
          "Con su bendición y apoyo, este sueño se hace realidad"
        </p>

        <div className={s.divider} style={{ '--i': 2 }}>✦</div>

        <div className={s.padrinosGrid} style={{ '--i': 3 }}>
          {/* Madrinas */}
          {EVENT.padrinos.madrinas.map((madrina, i) => (
            <div key={`madrina-${i}`} className={s.padrinoItem}>
              <span className={s.label}>Madrina</span>
              <p className={s.name} dangerouslySetInnerHTML={{ __html: madrina }} />
            </div>
          ))}

          {/* Padrinos */}
          {EVENT.padrinos.padrinos.map((padrino, i) => (
            <div key={`padrino-${i}`} className={s.padrinoItem}>
              <span className={s.label}>Padrino</span>
              <p className={s.name}>{padrino}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
