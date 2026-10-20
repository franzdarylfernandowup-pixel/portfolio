import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa'
import { FiMail, FiCopy, FiCheck } from 'react-icons/fi'
import Reveal from './Reveal'

const EMAIL = 'franzdarylfernandowup@gmail.com'

const socials = [
  {
    name: 'GitHub',
    handle: 'franzdarylfernandowup-pixel',
    href: 'https://github.com/franzdarylfernandowup-pixel',
    Icon: FaGithub,
  },
  {
    name: 'Facebook',
    handle: 'yiifnd',
    href: 'https://www.facebook.com/yiifnd/',
    Icon: FaFacebook,
  },
  {
    name: 'Instagram',
    handle: '@yi_fnd',
    href: 'https://www.instagram.com/yi_fnd/',
    Icon: FaInstagram,
  },
  {
    name: 'Email',
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    Icon: FiMail,
  },
]

function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden pt-20 sm:pt-28 px-4 sm:px-6"
    >
      {/* Soft glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[28rem] sm:w-[40rem] h-[20rem] rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <Reveal>
          <p className="text-zinc-500 uppercase tracking-widest text-sm mb-2">
            Contact
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white [text-shadow:0_0_30px_rgba(255,255,255,0.3)]">
            Let's work together
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            Have a project in mind or just want to say hi? My inbox is always
            open.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
            >
              Say hello
            </a>
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-white hover:border-white transition-colors"
            >
              {copied ? <FiCheck /> : <FiCopy />}
              {copied ? 'Copied!' : 'Copy email'}
            </button>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {socials.map(({ name, handle, href, Icon }, i) => (
            <Reveal key={name} delay={0.2 + i * 0.1}>
              <motion.a
                href={href}
                target={name === 'Email' ? undefined : '_blank'}
                rel="noreferrer"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex h-full flex-col items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 hover:border-zinc-500 transition-colors"
              >
                <Icon className="text-3xl text-white" />
                <span className="font-semibold text-white">{name}</span>
                <span className="max-w-full truncate text-xs sm:text-sm text-zinc-500">
                  {handle}
                </span>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-20 border-t border-zinc-800 py-6 text-center text-xs sm:text-sm text-zinc-500">
        © {new Date().getFullYear()} Franz Daryl Fernando. Built with React,
        Tailwind & Vite.
      </div>
    </section>
  )
}

export default Contact