import { useState, useEffect } from 'react';
import { EVENT, IMAGES } from '../../utils/constants';
import s from './InvitationScroll.module.css';

export default function InvitationScroll({ active }) {
  const [visible, setVisible] = useState(false);

  // Activar animación cuando la página del carrusel es visible
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
      {/* Texto de la invitación superpuesto */}
      <div className={`${s.content} ${visible ? s.contentVisible : ''}`}>
        <p className={s.sparkle} style={{ '--i': 0 }}>
          ✨ Estás cordialmente invitada/o a ✨
        </p>

        <p className={s.quote} style={{ '--i': 1 }}>
          "Con la bendición de dios y en compañía de nuestros seres queridos, tenemos el honor de invitarle a celebrar los XV de nuestra querida"
        </p>

        <h2 className={s.name} style={{ '--i': 2 }}>
          {EVENT.shortName}
        </h2>

        <p className={s.body} style={{ '--i': 4 }}>
          Con el amor y la bendición de sus papás
        </p>

        <p className={s.parents} style={{ '--i': 5 }}>
          {EVENT.padres.mama}
          <br />
          &amp;
          <br />
          {EVENT.padres.papa}
        </p>
      </div>
    </section>
  );
}