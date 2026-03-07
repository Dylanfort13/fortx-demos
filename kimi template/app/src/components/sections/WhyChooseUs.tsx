import { useEffect, useRef } from 'react';
import { Clock, Shield, Award, Phone, MapPin, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Clock,
    title: '30+ ans d\'expérience',
    description:
      "Depuis 1990, nous mettons notre expertise au service de nos clients avec professionnalisme et rigueur.",
  },
  {
    icon: Shield,
    title: 'Certifiés CMEQ',
    description:
      "Membre de la Corporation des maîtres électriciens du Québec, nous respectons les normes les plus strictes.",
  },
  {
    icon: Award,
    title: 'Service de qualité',
    description:
      "L'excellence de nos services professionnels fait notre renommée depuis plus de trois décennies.",
  },
  {
    icon: Phone,
    title: 'Disponibilité 24/7',
    description:
      "Plusieurs numéros de téléphone pour vous permettre de nous joindre, même après les heures de bureau.",
  },
  {
    icon: MapPin,
    title: 'Chibougamau & environs',
    description:
      "Nous desservons la région de Chibougamau et les secteurs environnants avec rapidité et efficacité.",
  },
  {
    icon: Users,
    title: 'Équipe qualifiée',
    description:
      "Notre équipe de professionnels qualifiés possède l'expertise nécessaire pour tous types de projets.",
  },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.reason-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-amptech-gray to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="why-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 0 L30 20 M30 40 L30 60 M0 30 L20 30 M40 30 L60 30"
                stroke="#1a6dff"
                strokeWidth="1"
                fill="none"
              />
              <circle cx="30" cy="30" r="3" fill="#1a6dff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#why-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto container-padding relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm mb-6">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Pourquoi nous choisir
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amptech-dark mb-4">
            Les avantages <span className="text-gradient">Amptech</span>
          </h2>
          <p className="text-lg text-amptech-gray-medium max-w-2xl mx-auto">
            Découvrez pourquoi nos clients nous font confiance depuis plus de
            30 ans pour leurs projets électriques.
          </p>
        </div>

        {/* Reasons Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="reason-card group frosted-glass rounded-3xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl gradient-blue flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <reason.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-amptech-dark mb-2 group-hover:text-primary transition-colors">
                {reason.title}
              </h3>
              <p className="text-sm text-amptech-gray-medium leading-relaxed">
                {reason.description}
              </p>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 frosted-glass-dark rounded-3xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '1990', label: 'Année de fondation' },
              { value: '1000+', label: 'Projets réalisés' },
              { value: '5', label: 'Secteurs desservis' },
              { value: '4', label: 'Numéros de contact' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
