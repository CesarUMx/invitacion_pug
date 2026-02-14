import { useMemo } from 'react';
import s from './StarField.module.css';

function generateStars(count, bright = false) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${bright ? 'b' : 's'}-${i}`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: bright ? Math.random() * 3 + 2 : Math.random() * 2 + 0.5,
    dur: `${Math.random() * 3 + 2}s`,
    delay: `${Math.random() * 5}s`,
    bright,
  }));
}

export default function StarField() {
  const stars = useMemo(() => [
    ...generateStars(150),
    ...generateStars(8, true),
  ], []);

  return (
    <div className={s.field}>
      {stars.map((st) => (
        <span
          key={st.id}
          className={st.bright ? s.bright : s.star}
          style={{
            left: st.left,
            top: st.top,
            width: st.size,
            height: st.size,
            '--dur': st.dur,
            '--delay': st.delay,
          }}
        />
      ))}
    </div>
  );
}