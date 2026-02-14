import { useState, useEffect } from 'react';
import s from './LocationSection.module.css';

export default function LocationSection({
  active,
  bgImage,
  title,
  hora,
  direccion,
  nombre,
  mapsUrl,
}) {
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
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Título fuera del pergamino */}
      <h2 className={`${s.title} ${visible ? s.titleVisible : ''}`}>
        {title}
      </h2>

      {/* Contenido posicionado en la mitad inferior del pergamino */}
      <div className={`${s.content} ${visible ? s.contentVisible : ''}`}>
        <p className={s.hora} style={{ '--i': 0 }}>
          {hora}
        </p>

        <p className={s.address} style={{ '--i': 1 }}>
          {nombre}
        </p>

        <p className={s.city} style={{ '--i': 2 }}>
          {direccion}
        </p>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={s.mapBtn}
          style={{ '--i': 3 }}
        >
          📍 Ver ubicación
        </a>
      </div>
    </section>
  );
}