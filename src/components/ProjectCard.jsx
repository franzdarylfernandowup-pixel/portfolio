import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiCheck } from 'react-icons/fi'

function ProjectCard({ project, index }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group h-full rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col hover:border-zinc-500 transition-colors"
    >
      {/* Mini browser with a live preview */}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="ml-3 flex-1 truncate rounded-full bg-zinc-950 px-3 py-0.5 text-xs text-zinc-500">
              {project.live.replace('https://', '')}
            </span>
          </div>

          <div className="relative aspect-video overflow-hidden bg-zinc-900">
            <iframe
              src={project.live}
              title={`${project.title} preview`}
              loading="lazy"
              tabIndex={-1}
              className="pointer-events-none absolute top-0 left-0 w-[400%] h-[400%] origin-top-left scale-[0.25] border-0 transition-transform duration-700 group-hover:scale-[0.27]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-colors duration-300">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full bg-white text-black px-4 py-2 text-sm font-semibold">
                Open live demo ↗
              </span>
            </div>
          </div>
        </a>
      )}

      {/* Info */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        <p className="text-zinc-600 text-sm font-mono mb-3">0{index + 1}</p>

        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {project.title}
        </h3>

        <p className="mt-3 text-zinc-400 leading-relaxed">
          {project.description}
        </p>

        {project.features && (
          <ul className="mt-4 space-y-2 flex-grow">
            {project.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-zinc-400"
              >
                <FiCheck className="mt-0.5 shrink-0 text-white" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs sm:text-sm rounded-full border border-zinc-800 text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-5">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white hover:text-zinc-400 transition-colors"
            >
              <FiExternalLink /> Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white hover:text-zinc-400 transition-colors"
            >
              <FiGithub /> Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard