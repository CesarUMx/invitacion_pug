import { useState, useEffect } from 'react';
import { EVENT, IMAGES } from '../../utils/constants';
import s from './Footer.module.css';

export default function Footer({ active }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active && !visible) {
      const timer = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(timer);
    }
  }, [active, visible]);

  return (
    <section className={s.section}>
      <div className={`${s.content} ${visible ? s.contentVisible : ''}`}>
        {/* Imagen del cofre */}
        <div className={s.iconWrapper} style={{ '--i': 0 }}>
          <img src={IMAGES.cofre} alt="Cofre de regalos" className={s.chestImage} />
        </div>

        {/* Título */}
        <h2 className={s.title} style={{ '--i': 1 }}>
          Mesa de regalos:
        </h2>

        {/* Mensaje principal */}
        <p className={s.message} style={{ '--i': 2 }}>
          Tu compañía es suficiente para mi
        </p>

        <p className={s.message} style={{ '--i': 3 }}>
          Si gustas hacerme un detalle. Lo agradecería de corazón.
        </p>

        {/* Divider decorativo */}
        <div className={s.divider} style={{ '--i': 4 }}>✦</div>

        {/* Datos de Liverpool */}
        <div className={s.liverpoolInfo} style={{ '--i': 5 }}>
          <p className={s.eventName}>Mis XV Lis</p>
          <p className={s.eventNumber}>Evento: 51942434</p>
        </div>

        {/* Botón Liverpool */}
        <a
          href={EVENT.liverpoolUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={s.liverpoolBtn}
          style={{ '--i': 6 }}
        >
          🏰 Ver Mesa de Regalos
        </a>
      </div>
    </section>
  );
}
