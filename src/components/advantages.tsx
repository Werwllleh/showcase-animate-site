import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import {useRef} from "react";
import * as React from "react";

type IAdvantagesItem = {
  title: React.ReactNode;
  text: string;
  image: string;
};

const advantagesItems: IAdvantagesItem[] = [
  {
    title: <>Страна льда и&nbsp;огня: 600 горячих источников</>,
    text: "Несмотря на название, Исландия — это геотермальный рай. На острове расположено более 600 горячих источников, а также действующие вулканы и гейзеры. Благодаря этому около 90% домов в стране отапливаются за счет возобновляемой геотермальной энергии.",
    image: "./assets/image/1.webp"
  },
  {
    title: <>Отсутствие постоянной армии</>,
    text: "Исландия — одна из немногих стран в мире, у которой нет регулярной армии, флота или военно-воздушных сил. С момента обретения независимости страна придерживается политики нейтралитета и демилитаризации, полагаясь на дипломатию и международные соглашения.",
    image: "./assets/image/2.webp"
  },
  {
    title: <>Самая высокая плотность писателей на&nbsp;душу населения</>,
    text: "Исландия занимает первое место в мире по количеству публикуемых книг на одного жителя. В стране с населением всего около 370 000 человек ежегодно издается более 1000 новых названий.",
    image: "./assets/image/3.webp"
  },
  {
    title: <>Здесь нет комаров</>,
    text: "Исландия — одна из немногих обитаемых территорий на Земле, где полностью отсутствуют комары. Ученые связывают это с уникальным климатом: быстрые перепады температур между замерзанием и оттаиванием не позволяют личинкам комаров завершить цикл развития.",
    image: "./assets/image/4.webp"
  },
  {
    title: <>Страна без&nbsp;фамилий в&nbsp;привычном понимании</>,
    text: "В Исландии действует уникальная система именования: у большинства жителей нет семейных фамилий. Вместо этого используется патроним (или матроним) — к имени ребенка добавляется имя отца (или матери) с окончанием -son (сын) для мальчиков и -dóttir (дочь) для девочек.",
    image: "./assets/image/5.webp"
  },

  {
    title: <>Единственное место в&nbsp;мире, где можно увидеть тупиков на&nbsp;суше</>,
    text: "Исландия является домом для крупнейшей в мире колонии атлантических тупиков (около 60% от всей мировой популяции). Эти яркие птицы с разноцветными клювами гнездятся на скалистых берегах острова, особенно на западных фьордах и полуострове Вестфирдир.",
    image: "./assets/image/6.webp"
  },
];

const AdvantagesItem = ({title, text, image, index, progress}: IAdvantagesItem & {
  index: number;
  progress: MotionValue<number>;
}) => {
  const total = advantagesItems.length;

  const cardsStart = 0.3;
  const cardsEnd = 0.9;

  const availableProgress = cardsEnd - cardsStart;
  const step = availableProgress / total;

  const start = cardsStart + index * step;
  const end = start + step * 0.6;

  const opacity = useTransform(
    progress,
    [0, start, end, 1],
    [0, 0, 1, 1]
  );

  const y = useTransform(
    progress,
    [0, start, end, 1],
    [30, 30, 0, 0]
  );

  return (
    <motion.div
      style={{opacity, y}}
      className={`relative flex flex-col gap-12 justify-between bg-white/15 rounded-2xl min-h-70 p-8 backdrop-blur-sm overflow-hidden shading`}
    >
      <h4 className="text-center font-bold text-3xl text-gray-200">{title}</h4>
      <p className="relative z-10 text-[1rem]/[1.2] text-gray-200 font-light">{text}</p>
      {image && (
        <img loading="lazy" className="absolute -z-1 top-0 left-0 w-full h-full object-cover object-center opacity-35 backdrop-blur-sm" src={image} alt={`${title}`} />
      )}
    </motion.div>
  );
};

const Advantages = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    ["100vh", "0vh", "0vh"]
  );

  return (
    <div ref={sectionRef} className="relative z-20 h-[400vh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <motion.div style={{y}} className="absolute inset-0 bg-black/75 flex flex-col justify-center">
          <div className="grid grid-cols-3 max-w-360  max-h-[90%] items-stretch gap-4 w-full mx-auto">
            {advantagesItems.map((item, index) => (
              <AdvantagesItem key={index} {...item} index={index} progress={scrollYProgress} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Advantages;