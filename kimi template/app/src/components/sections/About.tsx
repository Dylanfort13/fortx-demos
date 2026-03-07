import { useEffect, useRef } from 'react';
import { Shield, Award, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Badge spin animation
      gsap.fromTo(
        badgeRef.current,
        { rotation: -180, scale: 0 },
        {
          rotation: 0,
          scale: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: badgeRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Parallax effect on image
      const imgElement = imageRef.current?.querySelector('img');
      if (imgElement) {
        gsap.to(imgElement, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          scale: 1.1,
          ease: 'none',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    'Membre de la Corporation des maîtres électriciens du Québec',
    'Équipés d\'un camion à nacelle pour interventions en hauteur',
    'Service aux secteurs résidentiel, commercial et industriel',
    'Expertise dans les industries forestières et minières',
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto container-padding relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/service_installation.jpg"
                alt="Panneau électrique moderne"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-amptech-dark/30 to-transparent" />
            </div>

            {/* CMEQ Badge */}
            <div
              ref={badgeRef}
              className="absolute bottom-6 right-6 z-10"
            >
              <div className="frosted-glass rounded-2xl p-4 shadow-xl max-w-[220px]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#1a6dff] flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs font-semibold text-amptech-dark leading-tight">
                    Membre de la Corporation des maîtres électriciens du Québec
                  </p>
                </div>
              </div>
            </div>

            {/* Experience badge */}
            <div className="absolute top-6 left-6 z-10">
              <div className="bg-[#1a6dff] rounded-2xl p-4 shadow-xl text-white">
                <div className="text-3xl font-bold">30+</div>
                <div className="text-sm opacity-90">Années d'expérience</div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="lg:pl-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-blue-subtle mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                À propos d'Amptech
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amptech-dark mb-6 leading-tight">
              Votre partenaire de confiance en{' '}
              <span className="text-gradient">électricité</span>
            </h2>

            <p className="text-lg text-amptech-gray-medium mb-6 leading-relaxed">
              Faites confiance aux professionnels de chez Amptech Inc. Notre
              équipe est à votre disposition pour effectuer des travaux
              d'installation sécuritaires et efficaces, répondant aux besoins
              des utilisateurs du réseau.
            </p>

            <p className="text-base text-amptech-gray-medium mb-8 leading-relaxed">
              En tant que membre de la Corporation des maîtres électriciens du
              Québec, Amptech Inc. possède tout le savoir-faire et les
              connaissances requises pour des travaux respectant les normes en
              vigueur. Équipés d'un camion à nacelle, nous avons la possibilité
              de faire des interventions en hauteur.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full gradient-blue flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-amptech-gray-dark group-hover:text-primary transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
