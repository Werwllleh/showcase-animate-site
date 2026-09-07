import {motion} from "motion/react";
import Form from "./form.tsx";
import {spring} from "motion";

const Feedback = () => {
  return (
    <div
      className="relative min-h-dvh  flex flex-col justify-center before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-olive-900/50 before:z-1 before:backdrop-blur-[3px]">
      <div className="relative z-2 py-20 max-w-337.5 mx-auto px-10">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(300px,.7fr)_minmax(0,1fr)] gap-8 xl:gap-16 items-stretch">
          <motion.div
            transition={{type: spring}}
            viewport={{
              amount: 0.5,
              once: true
            }}
            initial={{
              opacity: 0,
              transform: "translateY(-100px)",
            }}
            whileInView={{
              opacity: 1,
              transform: "translateY(0)",
            }}
            className="flex flex-col items-center gap-4"
          >
            <h4 className="text-3xl/normal text-white xl:text-4xl/normal font-bold">
              Создадим ваше идеальное путешествие в&nbsp;<span className="uppercase">Исландию</span>
            </h4>
            <p className="text-xl/normal font-extralight text-white max-w-3xl mx-auto mt-4 leading-relaxed">
              Исландия&nbsp;&mdash; это не&nbsp;просто точка на&nbsp;карте, а&nbsp;мир контрастов.
              Мы поможем вам увидеть северное сияние, искупаться в&nbsp;геотермальных источниках
              и&nbsp;пройти по&nbsp;черным пляжам. Заполните форму, чтобы получить уникальный маршрут,
              адаптированный под ваши интересы.
            </p>
          </motion.div>
          <motion.div
            transition={{type: spring}}
            viewport={{
              amount: 0.5,
              once: true
            }}
            initial={{
              opacity: 0,
              transform: "translateX(100px)",
            }}
            whileInView={{
              opacity: 1,
              transform: "translateX(0)",
            }}
          >
            <Form/>
          </motion.div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-0 ">
        <img className="w-full h-full object-cover" src="/assets/image/6.webp" alt="Image"/>
      </div>
    </div>
  );
};

export default Feedback;