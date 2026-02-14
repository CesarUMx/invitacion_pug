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
        <h2 className={s.title} style={{ '--i': 0 }}>
          Agradecimiento
        </h2>

        <p className={s.message} style={{ '--i': 1 }}>
          Agradecería tu presencia en mis XV años para compartir juntos esta noche inolvidable y mágico momento.
        </p>

        <img 
          src={IMAGES.fin} 
          alt="Fin" 
          className={s.finImage} 
          style={{ '--i': 2 }}
        />

        <p className={s.message} style={{ '--i': 3 }}>
          Gracias por Acompañarme y Formar parte de tan Hermoso Recuerdo
        </p>
      </div>
    </section>
  );
}
