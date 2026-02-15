import { useState, useEffect } from 'react';
import { EVENT, IMAGES } from '../../utils/constants';
import s from './RSVP.module.css';

export default function RSVP({ active }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active && !visible) {
      const timer = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(timer);
    }
  }, [active, visible]);

  const mensaje = encodeURIComponent(
    `Hola! Confirmo mi asistencia a los XV Años de ${EVENT.quinceañera} ✨\n` +
    `Nombre: \n` +
    `Asistentes: `
  );

  const whatsappUrl = `https://wa.me/${EVENT.whatsappNumber}?text=${mensaje}`;

  return (
    <section
      className={s.section}
      style={{ backgroundImage: `url(${IMAGES.scrollBlank})` }}
    >
      {/* Contenido */}
      <div className={`${s.content} ${visible ? s.contentVisible : ''}`}>
        <img src={IMAGES.flor} alt="Flor" className={s.crown} style={{ '--i': 0 }} />

        <h2 className={s.title} style={{ '--i': 1 }}>
          ¿Nos acompañas en esta noche especial?
        </h2>

        <p className={s.subtitle} style={{ '--i': 2 }}>
          Confirma tu asistencia antes del 4 de Abril
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={s.whatsappBtn}
          style={{ '--i': 3 }}
        >
          💬 Confirmar por WhatsApp
        </a>

        <p className={s.note} style={{ '--i': 4 }}>
          Solo necesitamos tu nombre y cuántas personas nos acompañarán 🌟
        </p>
      </div>
    </section>
  );
}
