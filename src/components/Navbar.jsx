import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'

const links = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
]

function Navbar() {
  const [light, setLight] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'light'
    } catch {
      return false
    }
  })

   useEffect(() => {
    const root = document.documentElement
    root.classList.add('theme-fade')
    root.classList.toggle('light', light)
    try {
      localStorage.setItem('theme', light ? 'light' : 'dark')
    } catch {
      // ignore
    }
    const t = setTimeout(() => root.classList.remove('theme-fade'), 700)
    return () => clearTimeout(t)
  }, [light])

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
    >
      <nav className="flex items-center gap-0.5 sm:gap-1 rounded-full border border-zinc-800 bg-zinc-950/60 backdrop-blur-xl p-1.5 shadow-[0_0_40px_rgba(255,255,255,0.08)]">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="px-2.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {link.name}
          </a>
        ))}

        <a
          href="#contact"
          className="px-2.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-zinc-200 transition-colors"
        >
          Contact
        </a>

        <button
          onClick={() => setLight(!light)}
          aria-label="Toggle day and night mode"
          className="ml-0.5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          {light ? <FiMoon /> : <FiSun />}
        </button>
      </nav>
    </motion.header>
  )
}

export default Navbar