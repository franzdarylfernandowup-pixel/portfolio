import { motion } from 'framer-motion'
import Reveal from './Reveal'

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Tailwind CSS',
  'Vite',
  'Git',
  'Next.js (learning)',
]

const facts = [
  { label: 'Location', value: 'Philippines' },
  { label: 'Focus', value: 'Web Development' },
  { label: 'Status', value: 'IT Student' },
]

function About() {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-zinc-500 uppercase tracking-widest text-sm mb-2">
            About
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            A little about me
          </h2>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Bio + facts */}
          <div>
            <Reveal delay={0.1}>
              <p className="text-zinc-400 leading-relaxed text-base sm:text-lg">
                I'm an IT student who loves building useful websites that
                everyone can use. I work with JavaScript, Tailwind, and Vite,
                and I'm currently learning Next.js to level up my skills.
              </p>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {facts.map((fact, i) => (
                <Reveal key={fact.label} delay={0.2 + i * 0.1}>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 hover:border-zinc-600 transition-colors">
                    <p className="text-zinc-500 text-sm">{fact.label}</p>
                    <p className="text-white font-semibold mt-1">
                      {fact.value}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <Reveal delay={0.1}>
              <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
            </Reveal>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="px-4 py-2 rounded-full border border-zinc-700 text-zinc-300 hover:border-white hover:text-white transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About