import Reveal from './Reveal'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-zinc-500 uppercase tracking-widest text-sm mb-2">
            Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Things I've built
          </h2>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.15}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects