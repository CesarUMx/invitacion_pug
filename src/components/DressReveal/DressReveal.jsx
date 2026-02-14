import { useState, useEffect } from 'react';
import { IMAGES } from '../../utils/constants';
import s from './DressReveal.module.css';

const RESERVED_COLORS = [
  { name: 'Lila', hex: '#C8A2D0' },
  { name: 'Lavanda', hex: '#B19CD9' },
  { name: 'Púrpura', hex: '#9370DB' },
  { name: 'Violeta', hex: '#8B5CF6' },
  { name: 'Morado', hex: '#7C3AED' },
];

export default function DressReveal({ active }) {
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

        <h2 className={s.title} style={{ '--i': 1 }}>
          Código de Vestimenta
        </h2>

        <p className={s.subtitle} style={{ '--i': 2 }}>
          Colores Reservados para la Quinceañera
        </p>

        <div className={s.colorsGrid} style={{ '--i': 3 }}>
          {RESERVED_COLORS.map((color, i) => (
            <div key={color.hex} className={s.colorCard}>
              <div
                className={s.colorSwatch}
                style={{ backgroundColor: color.hex }}
              />
              <span className={s.colorName}>{color.name}</span>
            </div>
          ))}
        </div>

        <p className={s.note} style={{ '--i': 4 }}>
          ✨ Por favor, evita estos tonos en tu atuendo ✨
        </p>
      </div>
    </section>
  );
}
