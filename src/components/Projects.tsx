import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Кухня из белого мрамора",
    category: "Столешница Каррара",
    location: "Москва, частный дом",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/3d7cecf0-483c-4c65-8fe3-f3e297670ebc/files/14af6b3b-af1a-4fec-9283-c7029b6891dd.jpg",
  },
  {
    id: 2,
    title: "SPA-ванная в травертине",
    category: "Облицовка стен и пола",
    location: "Москва, апартаменты",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/3d7cecf0-483c-4c65-8fe3-f3e297670ebc/files/958bd941-bb94-48c6-bd26-a742633a2b02.jpg",
  },
  {
    id: 3,
    title: "Каминный портал из гранита",
    category: "Каминный декор",
    location: "Подмосковье, коттедж",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/3d7cecf0-483c-4c65-8fe3-f3e297670ebc/files/4ad49269-280c-467b-a8b6-5b894ce0c819.jpg",
  },
  {
    id: 4,
    title: "Акцентная стена из оникса",
    category: "Декоративная облицовка",
    location: "Санкт-Петербург, пентхаус",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/3d7cecf0-483c-4c65-8fe3-f3e297670ebc/files/8fd940d1-7fb7-4531-9d5c-2ec6e0ced169.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Избранные работы</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Реализованные проекты</h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Смотреть все проекты
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-muted-foreground/60 text-sm">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}