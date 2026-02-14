import { useState, useEffect } from 'react';
import { EVENT, IMAGES } from '../../utils/constants';
import s from './EventDetails.module.css';

export default function EventDetails({ active }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active && !visible) {
      const timer = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(timer);
    }
  }, [active, visible]);

  return (
    <section className={s.section} style={{ backgroundImage: `url(${IMAGES.fondo})` }}>
      <div className={s.overlay} />
      <h2 className={`${s.title} ${visible ? s.titleVisible : ''}`}>
        Detalles del Evento
      </h2>

      <div className={s.cards}>
        {/* Tarjeta Misa */}
        <div className={`${s.card} ${visible ? s.cardLeft : ''}`}>
          <span className={s.icon}>⛪</span>
          <h3 className={s.cardTitle}>{EVENT.iglesia.nombre}</h3>
          <p className={s.time}>{EVENT.iglesia.hora}</p>
          <p className={s.address}>{EVENT.iglesia.direccion}</p>
          <p className={s.city}>{EVENT.iglesia.ciudad}</p>
          <a
            href={EVENT.iglesia.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={s.mapBtn}
          >
            📍 Ver ubicación
          </a>
        </div>

        {/* Tarjeta Recepción */}
        <div className={`${s.card} ${visible ? s.cardRight : ''}`}>
          <span className={s.icon}>🏰</span>
          <h3 className={s.cardTitle}>{EVENT.salon.nombre}</h3>
          <p className={s.time}>{EVENT.salon.hora}</p>
          <p className={s.address}>{EVENT.salon.direccion}</p>
          <p className={s.city}>{EVENT.salon.ciudad}</p>
          <a
            href={EVENT.salon.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={s.mapBtn}
          >
            📍 Ver ubicación
          </a>
        </div>
      </div>
    </section>
  );
}