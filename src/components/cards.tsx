import {motion, useScroll, useTransform} from "motion/react"
import {useEffect, useRef, useState} from "react"

interface IItems {
  title: string;
  text?: string;
  img?: string;
}

const items: IItems[] = [
  {
    title: "Card1",
    text: "TextCard1",
    img: "https://goarctic.ru/upload/iblock/c62/c62ed60ecc2fceb90fa2d7dace3dfe5a.JPG"
  },
  {
    title: "Card2",
    text: "TextCard2",
    img: "https://livingheritage.ru/photos/brand/3692.jpg"
  },
  {
    title: "Card3",
    text: "TextCard3",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/2010-10-07_20-26-46_Wrangel_Boris.jpg"
  },
  {
    title: "Card4",
    text: "TextCard4",
    img: "http://nature.kremlin.ru/media/photo/1024x576_2x/Pjb1GE7xN1zEowffPdy31UJbR7BstGSG.jpg"
  },
  {
    title: "Card5",
    text: "TextCard5",
    img: "https://avatars.mds.yandex.net/i?id=690b92f8597cd5cacfdc5c83377cdb21_l-11008180-images-thumbs&n=13"
  }
]

const TAILWIND_UNIT: number = 4
const ITEM_WIDTH: number = 240 * TAILWIND_UNIT
const GAP: number = 2.5 * TAILWIND_UNIT

const Cards = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stickyRef = useRef<HTMLDivElement | null>(null)

  const [viewportWidth, setViewportWidth] = useState(0)

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const updateWidth = () => {
      if (!stickyRef.current) return

      setViewportWidth(stickyRef.current.clientWidth)
    }

    updateWidth()

    window.addEventListener("resize", updateWidth)

    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [])

  const totalWidth =
    items.length * ITEM_WIDTH +
    (items.length - 1) * GAP

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
      className="relative h-[400vh]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-dvh w-full overflow-hidden"
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
              className="relative flex h-full shrink-0 flex-col items-center justify-center text-white shading"
              style={{width: ITEM_WIDTH}}
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