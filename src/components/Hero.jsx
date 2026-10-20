import { useEffect, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from 'framer-motion'
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaGitAlt } from 'react-icons/fa'
import { SiTailwindcss, SiVite, SiSupabase, SiNextdotjs, SiVercel } from 'react-icons/si'
import profile from '../assets/profile.jpg'

const NAME = 'Franz Daryl Fernando'
const roles = ['Web Developer', 'IT Student']

const techs = [
  { name: 'HTML', Icon: FaHtml5 },
  { name: 'CSS', Icon: FaCss3Alt },
  { name: 'JavaScript', Icon: FaJs },
  { name: 'React', Icon: FaReact },
  { name: 'Tailwind', Icon: SiTailwindcss },
  { name: 'Vite', Icon: SiVite },
  { name: 'Supabase', Icon: SiSupabase },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'Git', Icon: FaGitAlt },
  { name: 'Vercel', Icon: SiVercel },
]

function useTime() {
  const get = () =>
    new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Manila',
    })
  const [time, setTime] = useState(get())

  useEffect(() => {
    const id = setInterval(() => setTime(get()), 30000)
    return () => clearInterval(id)
  }, [])

  return time
}

function Hero() {
  const time = useTime()

  // Rotating roles
  const [roleIndex, setRoleIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length)
    }, 2500)
    return () => clearInterval(id)
  }, [])

  // Mouse position (0 to 1) for spotlight and tilt
  const nx = useMotionValue(0.5)
  const ny = useMotionValue(0.35)

  const sx = useSpring(nx, { stiffness: 80, damping: 20 })
  const sy = useSpring(ny, { stiffness: 80, damping: 20 })
  const spotX = useTransform(sx, (v) => `${v * 100}%`)
  const spotY = useTransform(sy, (v) => `${v * 100}%`)
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotX} ${spotY}, rgba(255,255,255,0.12), transparent 70%)`

  const rotateY = useSpring(useTransform(nx, [0, 1], [-10, 10]), {
    stiffness: 120,
    damping: 15,
  })
  const rotateX = useSpring(useTransform(ny, [0, 1], [8, -8]), {
    stiffness: 120,
    damping: 15,
  })

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    nx.set((e.clientX - rect.left) / rect.width)
    ny.set((e.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    nx.set(0.5)
    ny.set(0.35)
  }

  const words = NAME.split(' ')

  return (
    <section
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative min-h-screen overflow-hidden px-4 sm:px-6 pt-24 pb-8 flex flex-col"
    >
      {/* Soft white glow at the top */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[28rem] sm:w-[40rem] h-[24rem] rounded-full bg-white/10 blur-3xl" />

      {/* Faint dotted grid */}
      <div className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      {/* Spotlight that follows the cursor */}
      <motion.div
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0"
      />

      {/* Top row: time + availability */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between text-xs sm:text-sm mt-12"
      >
        <span className="font-mono tracking-widest text-zinc-400 uppercase">
          PH • {time}
        </span>

        <span className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-950/70 px-3 py-1.5 text-white">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          Ready for work
        </span>
      </motion.div>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
        {/* Photo with tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ rotateX, rotateY, transformPerspective: 900 }}
          className="w-60 sm:w-80 md:w-96"
        >
          <motion.img
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            src={profile}
            alt="Franz Daryl Fernando"
            className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition duration-700 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"
          />
        </motion.div>

        {/* Name, letter by letter */}
        <h1
          aria-label={NAME}
          className="-mt-12 sm:-mt-16 flex flex-wrap justify-center gap-x-3 sm:gap-x-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-widest text-white [text-shadow:0_0_30px_rgba(255,255,255,0.4)]"
        >
          {words.map((word, wi) => {
            const offset = words.slice(0, wi).join('').length
            return (
              <span key={wi} aria-hidden="true" className="inline-block">
                {word.split('').map((ch, ci) => (
                  <motion.span
                    key={ci}
                    initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5 + (offset + ci) * 0.04,
                    }}
                    className="inline-block"
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            )
          })}
        </h1>

        {/* Rotating roles */}
        <div className="mt-5 h-8 flex items-center justify-center text-lg sm:text-2xl text-zinc-300">
          <AnimatePresence mode="wait">
            <motion.span
              key={roles[roleIndex]}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="inline-block"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="ml-1 inline-block h-5 sm:h-6 w-0.5 bg-white"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-3 max-w-xl text-sm sm:text-base text-zinc-500"
        >
          Building useful websites that everyone can use.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border border-zinc-700 text-white hover:border-white transition-colors"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Tech icons marquee */}
      <div className="relative z-10 mt-10 w-full">
        <p className="text-center text-xs tracking-widest uppercase text-zinc-600 mb-4">
          Tools I work with
        </p>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex w-max"
          >
            {[...techs, ...techs].map(({ name, Icon }, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-6 sm:px-8 text-zinc-500 hover:text-white transition-colors"
              >
                <Icon className="text-2xl sm:text-3xl" />
                <span className="text-sm sm:text-base font-medium">{name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero