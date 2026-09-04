import {motion, useScroll, useTransform} from "motion/react"
import {useEffect, useRef, useState} from "react"
import {items} from "../data.ts";
import {useMediaQuery} from "../hooks/useMediaQuery.ts";

const TAILWIND_UNIT: number = 4

const GAP: number = 2.5 * TAILWIND_UNIT

const Cards = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stickyRef = useRef<HTMLDivElement | null>(null)

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [viewportWidth, setViewportWidth] = useState<number>(0);
  const [cardWidth, setCardWidth] = useState<number>(0);

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const updateWidth = () => {
      if (!stickyRef.current) return

      const viewportWidthSize = stickyRef.current.clientWidth;

      setViewportWidth(viewportWidthSize)
      setCardWidth(isDesktop ? 240 * TAILWIND_UNIT : viewportWidthSize * 0.9)
    }

    updateWidth()

    window.addEventListener("resize", updateWidth)

    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [isDesktop])

  const totalWidth = items.length * cardWidth + (items.length - 1) * GAP

  const maxTranslate = Math.max(
    0,
    totalWidth - viewportWidth
  )

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -maxTranslate]
  )


  return (
    <div
      ref={containerRef}
      style={{height: `calc(100dvh + ${maxTranslate}px)`}}
      className="relative"
    >
      <div
        ref={stickyRef}
        className={`sticky top-0 w-full overflow-hidden h-dvh`}
      >
        <motion.div
          className="flex h-full items-stretch will-change-transform"
          style={{
            x,
            gap: GAP
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`relative flex aspect-square shrink-0 flex-col items-center justify-center text-white shading`}
              style={{width: cardWidth}}
            >
              <h4 className="font-bold text-2xl">
                {item.title}
              </h4>
              <p>{item.text}</p>
              <img
                loading="lazy"
                src={item.img}
                alt={item.title}
                className="absolute inset-0 -z-1 h-full w-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Cards;
