import { useEffect, useRef } from 'react';
import { Wrench, Search, Settings, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  onDemoClick: () => void;
}

const services = [
  {
    icon: Wrench,
    title: 'Installation électrique',
    description:
      'Installation complète de systèmes électriques pour vos projets résidentiels, commerciaux et industriels. Nous assurons une mise en conformité avec les normes en vigueur.',
    image: '/images/service_installation.jpg',
    features: [
      'Installation neuve',
      'Rénovation électrique',
      'Tableaux électriques',
      'Éclairage',
    ],
  },
  {
    icon: Search,
    title: 'Inspection électrique',
    description:
      "Vérification de la conformité de vos installations électriques. Seul un maître électricien est habilité à diagnostiquer tout problème existant ou danger potentiel.",
    image: '/images/service_inspection.jpg',
    features: [
      'Vérification de conformité',
      'Diagnostic de problèmes',
      'Rapport détaillé',
      'Conseils personnalisés',
    ],
  },
  {
    icon: Settings,
    title: 'Entretien électrique',
    description:
      "Maintenance préventive et corrective de vos systèmes électriques. Nous assurons le bon fonctionnement de vos installations et prévenons les pannes.",
    image: '/images/service_maintenance.jpg',
    features: [
      'Maintenance préventive',
      'Réparations',
      'Mise à niveau',
      'Service d\'urgence',
    ],
  },
];

export function Services({ onDemoClick }: ServicesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current?.children || [],
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
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

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // SVG line draw animation
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding bg-amptech-gray relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-50">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <path
            ref={lineRef}
            d="M0 400 Q 300 200, 600 400 T 1200 400"
            stroke="#1a6dff"
            strokeWidth="2"
            fill="none"
            opacity="0.2"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto container-padding relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white mb-6">
            <Settings className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Nos services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amptech-dark mb-4">
            Des solutions électriques{' '}
            <span className="text-gradient">complètes</span>
          </h2>
          <p className="text-lg text-amptech-gray-medium max-w-2xl mx-auto">
            Nous offrons une gamme complète de services électriques pour répondre
            à tous vos besoins, de l'installation à la maintenance.
          </p>
        </div>

        {/* Service Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-white rounded-3xl overflow-hidden shadow-lg hover-lift"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amptech-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 rounded-xl gradient-blue flex items-center justify-center shadow-lg">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-amptech-dark mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-amptech-gray-medium text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center gap-2 text-sm text-amptech-gray-dark"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={onDemoClick}
                  variant="ghost"
                  className="text-primary hover:text-primary-dark hover:bg-primary/10 p-0 h-auto font-medium group/btn"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 frosted-glass rounded-2xl p-6 shadow-lg">
            <div className="text-left">
              <p className="font-semibold text-amptech-dark">
                Besoin d'un service personnalisé ?
              </p>
              <p className="text-sm text-amptech-gray-medium">
                Contactez-nous pour discuter de votre projet
              </p>
            </div>
            <Button
              onClick={onDemoClick}
              className="gradient-blue text-white hover:opacity-90 rounded-full px-6 electric-fill whitespace-nowrap"
            >
              Nous contacter
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
