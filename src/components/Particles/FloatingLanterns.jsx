import { useMemo } from 'react';
import s from './FloatingLanterns.module.css';

function generateLanterns(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `l-${i}`,
    left: `${5 + Math.random() * 90}%`,
    size: 18 + Math.random() * 14,
    dur: `${14 + Math.random() * 12}s`,
    delay: `${-(Math.random() * 20)}s`,
    drift: `${-30 + Math.random() * 60}px`,
    rotate: `${-8 + Math.random() * 16}deg`,
    glowDur: `${2 + Math.random() * 2}s`,
  }));
}

export default function FloatingLanterns() {
  const lanterns = useMemo(() => generateLanterns(8), []);

  return (
    <div className={s.field}>
      {lanterns.map((l) => (
        <div
          key={l.id}
          className={s.lantern}
          style={{
            left: l.left,
            '--size': `${l.size}px`,
            '--dur': l.dur,
            '--delay': l.delay,
            '--drift': l.drift,
            '--rotate': l.rotate,
            '--glow-dur': l.glowDur,
          }}
        >
          <div className={s.body}>
            <div className={s.flame} />
          </div>
        </div>
      ))}
    </div>
  );
}