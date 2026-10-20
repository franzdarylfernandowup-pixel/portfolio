import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Game from './components/Game'
import Contact from './components/Contact'

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Game />
      <Contact />
    </div>
  )
}

export default App