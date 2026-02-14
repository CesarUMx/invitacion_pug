import { useState, useEffect } from 'react';
import { IMAGES } from '../../utils/constants';
import s from './ThankYou.module.css';

export default function ThankYou({ active }) {
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
        <div className={s.icon} style={{ '--i': 0 }}>✨</div>

        <h2 className={s.title} style={{ '--i': 1 }}>
          Agradecimiento
        </h2>

        <div className={s.divider} style={{ '--i': 2 }}>✦</div>

        <p className={s.message} style={{ '--i': 3 }}>
          Agradecería tu presencia en mis XV años para compartir juntos este inolvidable y mágico momento.
        </p>

        <p className={s.message} style={{ '--i': 4 }}>
          Gracias por Acompañarme y Formar parte de tan Hermoso Recuerdo
        </p>

        <div className={s.heart} style={{ '--i': 5 }}>💜</div>
      </div>
    </section>
  );
}
