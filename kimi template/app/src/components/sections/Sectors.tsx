import { useEffect, useRef, useState } from 'react';
import { Home, Building2, Factory, TreePine, Mountain } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectors = [
  {
    icon: Home,
    title: 'Résidentiel',
    description:
      'Installation et rénovation électrique pour maisons, condos et appartements. Sécurité et conformité garanties.',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: Building2,
    title: 'Commercial',
    description:
      "Solutions électriques pour bureaux, commerces et établissements publics. Installation professionnelle et fiable.",
    color: 'from-indigo-400 to-indigo-600',
  },
  {
    icon: Factory,
    title: 'Industriel',
    description:
      "Services électriques pour usines et installations industrielles. Haute tension et équipements spécialisés.",
    color: 'from-slate-400 to-slate-600',
  },
  {
    icon: TreePine,
    title: 'Foresterie',
    description:
      "Expertise dans les installations électriques pour scieries et équipements forestiers. Environnement exigeant.",
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    icon: Mountain,
    title: 'Mines',
    description:
      "Services électriques pour l'industrie minière. Sécurité et fiabilité dans des conditions extrêmes.",
    color: 'from-amber-400 to-amber-600',
  },
];

export function Sectors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Grid items animation
      const items = gridRef.current?.querySelectorAll('.sector-card');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, rotateX: 90 },
          {
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePos({ x, y });
    setHoveredIndex(index);
  };

  return (
    <section
      id="sectors"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-7xl mx-auto container-padding relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-blue-subtle mb-6">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Secteurs desservis
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amptech-dark mb-4">
            Une expertise dans tous les{' '}
            <span className="text-gradient">secteurs</span>
          </h2>
          <p className="text-lg text-amptech-gray-medium max-w-2xl mx-auto">
            Nous desservons une variété de secteurs avec des solutions électriques
            adaptées à chaque environnement.
          </p>
        </div>

        {/* Sectors Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="sector-card group relative"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transform:
                  hoveredIndex === index
                    ? `translate(${mousePos.x}px, ${mousePos.y}px)`
                    : 'translate(0, 0)',
                transition: 'transform 0.2s ease-out',
              }}
            >
              <div
                className={`relative h-full p-6 rounded-3xl border border-gray-200 bg-white transition-all duration-300 overflow-hidden ${
                  hoveredIndex === index
                    ? 'border-primary shadow-glow'
                    : 'hover:border-primary/50'
                }`}
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${sector.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sector.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <sector.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-amptech-dark mb-2 group-hover:text-primary transition-colors">
                  {sector.title}
                </h3>
                <p className="text-amptech-gray-medium text-sm leading-relaxed">
                  {sector.description}
                </p>

                {/* Animated border */}
                <div
                  className={`absolute inset-0 rounded-3xl border-2 border-primary transition-all duration-300 ${
                    hoveredIndex === index
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95'
                  }`}
                  style={{ pointerEvents: 'none' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 frosted-glass rounded-full px-6 py-3 shadow-md">
            <span className="text-sm text-amptech-gray-medium">
              Services disponibles en :
            </span>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Français
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                English
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
