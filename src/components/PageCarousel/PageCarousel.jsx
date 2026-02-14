import { useState, useRef, useCallback, cloneElement, isValidElement } from 'react';
import s from './PageCarousel.module.css';

export default function PageCarousel({ children, onPageChange }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(null); // 'next' | 'prev'
  const [animating, setAnimating] = useState(false);
  const touchRef = useRef({ startX: 0, startY: 0 });
  const pages = Array.isArray(children) ? children : [children];
  const total = pages.length;

  const goTo = useCallback((index, dir) => {
    if (animating || index < 0 || index >= total || index === current) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      onPageChange?.(index);
      setAnimating(false);
      setDirection(null);
    }, 600);
  }, [animating, current, total, onPageChange]);

  const next = useCallback(() => {
    if (current < total - 1) goTo(current + 1, 'next');
  }, [current, total, goTo]);

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1, 'prev');
  }, [current, goTo]);

  // Touch / swipe handlers
  const handleTouchStart = useCallback((e) => {
    touchRef.current.startX = e.touches[0].clientX;
    touchRef.current.startY = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.startX;
    const dy = e.changedTouches[0].clientY - touchRef.current.startY;
    // Solo swipe horizontal si el movimiento horizontal es mayor que el vertical
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
  }, [next, prev]);

  // Determinar clases de animación
  const getPageClass = () => {
    if (!animating) return s.pageActive;
    if (direction === 'next') return s.pageExitLeft;
    if (direction === 'prev') return s.pageExitRight;
    return s.pageActive;
  };

  const getIncomingClass = () => {
    if (!animating) return '';
    if (direction === 'next') return s.pageEnterRight;
    if (direction === 'prev') return s.pageEnterLeft;
    return '';
  };

  const nextIndex = direction === 'next' ? current + 1 : current - 1;

  return (
    <div
      className={s.carousel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Página actual */}
      <div className={`${s.page} ${getPageClass()}`} key={`page-${current}`}>
        {isValidElement(pages[current])
          ? cloneElement(pages[current], { active: true })
          : pages[current]}
      </div>

      {/* Página entrante durante animación */}
      {animating && nextIndex >= 0 && nextIndex < total && (
        <div className={`${s.page} ${getIncomingClass()}`} key={`page-${nextIndex}`}>
          {isValidElement(pages[nextIndex])
            ? cloneElement(pages[nextIndex], { active: true })
            : pages[nextIndex]}
        </div>
      )}

      {/* Indicadores de página */}
      <div className={s.dots}>
        {pages.map((_, i) => (
          <span
            key={i}
            className={`${s.dot} ${i === current && !animating ? s.dotActive : ''}`}
          />
        ))}
      </div>

      {/* Flechas de navegación */}
      {current > 0 && !animating && (
        <button className={`${s.arrow} ${s.arrowLeft}`} onClick={prev} aria-label="Anterior">
          ‹
        </button>
      )}
      {current < total - 1 && !animating && (
        <button className={`${s.arrow} ${s.arrowRight}`} onClick={next} aria-label="Siguiente">
          ›
        </button>
      )}
    </div>
  );
}
