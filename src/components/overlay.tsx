import {motion} from "motion/react";

const Overlay = () => {

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{amount: 0.15}}
      variants={{
        offscreen: {
          // y: 0,
          scale: 0.75
        },
        onscreen: {
          // y: '-100%',
          scale: 1,
          transition: {
            type: "spring",
            duration: 2,
          },
        },
      }}
      className="relative h-dvh flex items-center justify-center font-bold text-white text-5xl"
    >
      <div className="relative z-1 flex flex-col items-center justify-center text-center">
        <p>DESCRIPTION</p>
      </div>
      <div className="absolute z-0 inset-0 w-full h-full shading">
        <img loading="lazy" className="w-full h-full object-cover"
             src="https://images.squarespace-cdn.com/content/v1/654261d9e93e3721fbd123f4/5adae0cf-a5f1-4b91-8228-b6f336f2bca9/WALL-WL-DJI_0387-04-05-2022-2.jpg" alt=""/>
      </div>
    </motion.div>
  );
};

export default Overlay;
