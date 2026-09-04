import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {useEffect, useRef, useState} from "react";
import {items} from "../data.ts";
import {useMediaQuery} from "../hooks/useMediaQuery.ts";
import * as React from "react";

type Size = {
  width: number;
  height: number;
};

type CardProps = {
  item: (typeof items)[number];
  index: number;
  progress: MotionValue<number>;
  containerSize: Size;
  cardSize: Size;
  measureRef?: React.Ref<HTMLDivElement>;
};

const Card = ({
                item,
                index,
                progress,
                containerSize,
                cardSize,
                measureRef
              }: CardProps) => {
  const total = items.length;

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const position = total > 1 ? index / (total - 1) : 0;

  const step = total > 1 ? 1 / (total - 1) : 1;

  const start = index === 0 ? 0 : isDesktop ? (index - 1) * step : (index - 1) * step;
  const end = index === 0 ? 1 : isDesktop ? index * step : index * step;

  const desktopStartY = index === 0 ? 0 : containerSize.height + index * 80;
  const desktopEndY = 0;

  // const mobileStartY = containerSize.height + Math.max(0, index - 1) * (cardSize.height * 0.35);
  const mobileStartY = containerSize.height + Math.max(0, index - 1) * (cardSize.height * 0.35);
  const mobileEndY = 0;

  const availableX = Math.max(0, containerSize.width - cardSize.width);

  const startX = isDesktop ? availableX * position : 0;

  const rawX = useTransform(
    progress,
    [start, end],
    [startX, startX]
  );

  const rawY = useTransform(
    progress,
    [start, end],
    index === 0
      ? [0, 0]
      : [
        isDesktop ? desktopStartY : mobileStartY,
        isDesktop ? desktopEndY : mobileEndY
      ]
  );

  const x = useSpring(rawX, {
    stiffness: 90,
    damping: 25,
    mass: 0.5,
  });

  const y = useSpring(rawY, {
    stiffness: 90,
    damping: 25,
    mass: 0.5,
  });

  return (
    <motion.div
      ref={measureRef}
      style={{
        x,
        y,
        zIndex: index + 1,
        width: isDesktop
          ? "calc(100vh - 4rem)"
          : "calc(100% - 4rem)",
        height: "calc(100vh - 4rem)",
      }}
      className={`absolute left-0 top-0 aspect-square overflow-hidden will-change-transform p-8  ${isDesktop ? "w-[calc(100vh-4rem)]" : "w-[calc(100%-4rem)]"}`}
    >
      <div className="relative z-10 flex h-full flex-col justify-between">
        <span className="text-5xl md:text-8xl xl:text-10xl font-bold text-pink-500 opacity-80">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="text-white">
          <p className="text-3xl font-bold">{item.title}</p>
          <span className="text-2xl">{item.text}</span>
        </div>
      </div>

      <img src={item.img} alt={item.title} className="absolute inset-0 h-full w-full object-cover"/>
    </motion.div>
  );
};

const UpCards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardMeasureRef = useRef<HTMLDivElement>(null);

  // const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [containerSize, setContainerSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const [cardSize, setCardSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const container = stickyRef.current;
    const card = cardMeasureRef.current;

    if (!container || !card) return;

    const updateSizes = () => {
      setContainerSize({
        width: container.clientWidth,
        height: container.clientHeight,
      });

      setCardSize({
        width: card.offsetWidth,
        height: card.offsetHeight,
      });
    };

    updateSizes();

    const resizeObserver = new ResizeObserver(updateSizes);

    resizeObserver.observe(container);
    resizeObserver.observe(card);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        height: `${100 + (items.length - 1) * 100}vh`,
      }}
    >
      <div ref={stickyRef}
           className={`sticky top-0 h-dvh`}
      >
        {items.map((item, index) => (
          <Card
            key={index}
            item={item}
            index={index}
            progress={scrollYProgress}
            containerSize={containerSize}
            cardSize={cardSize}
            measureRef={index === 0 ? cardMeasureRef : undefined}
          />
        ))}
      </div>
    </section>
  );
};

export default UpCards;