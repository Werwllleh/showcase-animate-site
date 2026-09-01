import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';

type LoaderPhase =
  | 'initial'
  | 'line'
  | 'reveal'
  | 'done';

type StartLoaderProps = {
  active: boolean;
  setLoaderActive: Dispatch<SetStateAction<boolean>>;
  lineDuration?: number;
  holdDuration?: number;
};

const REVEAL_DURATION = 900;
const LINE_FADE_DELAY = 180;
const LINE_FADE_DURATION = 180;

const StartLoader = ({
                       active, setLoaderActive, lineDuration = 700, holdDuration = 300
                     }: StartLoaderProps) => {
  const [phase, setPhase] =
    useState<LoaderPhase>('initial');

  useEffect(() => {
    if (!active) {
      return;
    }

    setPhase('initial');

    const lineTimer = setTimeout(() => {
      setPhase('line');
    }, 50);

    const revealTimer = setTimeout(() => {
      setPhase('reveal');
    }, 50 + lineDuration + holdDuration);

    const doneTimer = setTimeout(() => {
      setPhase('done');
      setLoaderActive(false);
    }, 50 + lineDuration + holdDuration + REVEAL_DURATION);

    return () => {
      clearTimeout(lineTimer);
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
    };
  }, [
    active,
    lineDuration,
    holdDuration,
    setLoaderActive,
  ]);

  const revealed =
    phase === 'reveal' ||
    phase === 'done';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none bg-transparent">
      {/* левая штора */}
      <div
        className="
          absolute
          top-0
          left-0
          w-1/2
          h-full
          bg-pink-500
          will-change-transform
        "
        style={{
          transform: revealed
            ? 'translateX(-100%)'
            : 'translateX(0)',
          transition: `transform ${REVEAL_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      />

      {/* правая штора */}
      <div
        className="
          absolute
          top-0
          right-0
          w-1/2
          h-full
          bg-pink-500
          will-change-transform
        "
        style={{
          transform: revealed
            ? 'translateX(100%)'
            : 'translateX(0)',
          transition: `transform ${REVEAL_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      />

      {/* центральная линия */}
      <span
        className="absolute left-1/2 top-1/2 z-10 w-[2px] bg-white
          -translate-x-1/2
          -translate-y-1/2
          origin-center
          will-change-[height,opacity]
        "
        style={{
          height:
            phase === 'initial'
              ? '0%'
              : '100%',

          opacity:
            phase === 'done'
              ? 0
              : phase === 'reveal'
                ? 0
                : 1,

          transition:
            phase === 'reveal'
              ? `opacity ${LINE_FADE_DURATION}ms linear ${LINE_FADE_DELAY}ms`
              : `height ${lineDuration}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      />
    </div>
  );
};

export default StartLoader;
