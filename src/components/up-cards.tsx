import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { items } from "../data.ts";

type CardProps = {
  item: (typeof items)[number];
  index: number;
  progress: MotionValue<number>;
};

const CARD_X_OFFSET = 70;
const CARD_Y_OFFSET = 90;

const Card = ({
                item,
                index,
                progress,
              }: CardProps) => {
  const total = items.length;

  /*
   * В начале вся пачка находится ниже.
   * По мере скролла каждая карточка движется вверх,
   * но сохраняет свой X/Y offset.
   */
  const start = index / (total + 2);
  const end = Math.min(start + 0.55, 1);

  const y = useTransform(
    progress,
    [start, end],
    [
      `${100 + index * 12}vh`,
      `${index * CARD_Y_OFFSET}px`,
    ]
  );

  const x = index * CARD_X_OFFSET;

  return (
    <motion.div
      style={{
        x,
        y,
        zIndex: index + 1,
      }}
      className="
        absolute
        left-[12vw]
        top-0
        w-200
        aspect-square
        overflow-hidden
        will-change-transform
      "
    >
      <div className="
        relative
        z-10
        flex
        h-full
        flex-col
        justify-between
        p-8
      ">
        <span className="
          text-6xl
          font-bold
          text-pink-500
        ">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div>
          <p className="text-3xl font-bold text-white">
            {item.title}
          </p>
          <span>{item.text}</span>
        </div>
      </div>

      <img src={item.img} alt={item.title}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />
    </motion.div>
  );
};

const UpCards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [
      "start start",
      "end end",
    ],
  });

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[500vh]
      "
    >
      <div className="
        sticky
        top-0
        h-dvh
        overflow-hidden
      ">
        {items.map((item, index) => (
          <Card
            key={index}
            item={item}
            index={index}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};

export default UpCards;
