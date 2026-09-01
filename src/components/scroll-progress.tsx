import { useScroll, motion } from "motion/react"

const ScrollProgress = () => {

  const { scrollYProgress } = useScroll()

  return <motion.div
    className="fixed top-0 left-0 right-0 h-[5px] z-10"
    style={{
      scaleX: scrollYProgress,
      originX: 0,
      backgroundColor: "var(--primary)",
    }}
  />
};

export default ScrollProgress;