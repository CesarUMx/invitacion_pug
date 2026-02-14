import { useState, useEffect, useRef } from 'react';
import { EVENT, IMAGES } from '../../utils/constants';
import useCountdown from '../../hooks/useCountdown';
import s from './CountdownTimer.module.css';

const BLOCKS = [
  { key: 'days', label: 'Días' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Minutos' },
  { key: 'seconds', label: 'Segundos' },
];

function FlipNumber({ value }) {
  const [display, setDisplay] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current !== value) {
      setFlipping(true);
      const timer = setTimeout(() => {
        setDisplay(value);
        setFlipping(false);
      }, 250);
      prevRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <span className={`${s.number} ${flipping ? s.numberFlip : ''}`}>
      {String(display).padStart(2, '0')}
    </span>
  );
}

export default function CountdownTimer({ active }) {
  const [visible, setVisible] = useState(false);
  const { days, hours, minutes, seconds, isExpired } = useCountdown(EVENT.targetISO);

  useEffect(() => {
    if (active && !visible) {
      const timer = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(timer);
    }
  }, [active, visible]);

  if (isExpired) {
    return (
      <section className={s.section} style={{ backgroundImage: `url(${IMAGES.fondo})` }}>
        <div className={s.overlay} />
        <div className={s.expired}>
          <p className={s.expiredText}>✨ ¡El gran día ha llegado! ✨</p>
        </div>
      </section>
    );
  }

  return (
    <section className={s.section} style={{ backgroundImage: `url(${IMAGES.fondo})` }}>
      <div className={s.overlay} />
      <h2 className={`${s.title} ${visible ? s.titleVisible : ''}`}>
        Faltan...
      </h2>

      <div className={`${s.blocks} ${visible ? s.blocksVisible : ''}`}>
        {BLOCKS.map((b, i) => (
          <div className={s.blockWrapper} key={b.key} style={{ '--i': i }}>
            {i > 0 && <span className={s.separator}>✦</span>}
            <div className={s.block}>
              <FlipNumber value={{ days, hours, minutes, seconds }[b.key]} />
              <span className={s.label}>{b.label}</span>
            </div>
          </div>
        ))}
      </div>

      <p className={`${s.readyText} ${visible ? s.readyTextVisible : ''}`}>
        ¿Ya estas listo?
      </p>
    </section>
  );
}