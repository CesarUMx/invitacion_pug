import { useState, useEffect } from 'react';
import { EVENT, IMAGES } from '../../utils/constants';
import s from './InvitadosEspeciales.module.css';

export default function InvitadosEspeciales({ active }) {
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
          Invitados Especiales
        </h2>


        {/* En mi corazón me acompañan */}
        <div className={s.section1} style={{ '--i': 2 }}>
          <p className={s.legend}>En mi corazón me acompañan</p>
          <div className={s.namesGroup}>
            {EVENT.invitadosEspeciales.enMiCorazon.map((nombre, i) => (
              <p key={`corazon-${i}`} className={s.name} dangerouslySetInnerHTML={{ __html: nombre }} />
            ))}
          </div>
        </div>

        {/* De la mano de */}
        <div className={s.section2} style={{ '--i': 4 }}>
          <p className={s.legend}>De la mano de</p>
          <p className={s.name} dangerouslySetInnerHTML={{ __html: EVENT.invitadosEspeciales.deLaMano }} />
        </div>
      </div>
    </section>
  );
}
