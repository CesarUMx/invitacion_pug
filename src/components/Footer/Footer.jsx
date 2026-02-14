import { useState, useEffect } from 'react';
import { EVENT } from '../../utils/constants';
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
        {/* Sol de Corona decorativo */}
        <div className={s.sunWrapper} style={{ '--i': 0 }}>
          <div className={s.sun}>☀️</div>
        </div>

        {/* Quote de Rapunzel */}
        <blockquote className={s.quote} style={{ '--i': 1 }}>
          <p className={s.quoteText}>
            "Al fin puedo ver a dónde voy..."
          </p>
          <cite className={s.quoteCite}>— Rapunzel</cite>
        </blockquote>

        {/* Divider decorativo */}
        <div className={s.divider} style={{ '--i': 2 }}>✦</div>

        {/* Texto final */}
        <p className={s.finalText} style={{ '--i': 3 }}>
          Con amor — {EVENT.quinceañera}
        </p>
        <p className={s.date} style={{ '--i': 4 }}>
          {EVENT.fecha}
        </p>
      </div>
    </section>
  );
}
