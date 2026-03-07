import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import gsap from 'gsap';

interface HeroProps {
  onDemoClick: () => void;
}

export function Hero({ onDemoClick }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 50,
      });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        );

      // Parallax effect on scroll
      gsap.to(overlayRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 100,
        ease: 'none',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_electrician.jpg"
          alt="Électricien professionnel"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amptech-dark/90 via-amptech-dark/70 to-amptech-dark/50" />
        {/* Animated gradient overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"
        />
      </div>

      {/* Animated circuit pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="circuit-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 10 L30 10 L30 30 M70 10 L90 10 M10 50 L30 50 L30 70 L50 70 M70 50 L90 50 L90 70 M10 90 L30 90"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
              />
              <circle cx="30" cy="10" r="2" fill="white" />
              <circle cx="30" cy="30" r="2" fill="white" />
              <circle cx="90" cy="10" r="2" fill="white" />
              <circle cx="30" cy="50" r="2" fill="white" />
              <circle cx="30" cy="70" r="2" fill="white" />
              <circle cx="50" cy="70" r="2" fill="white" />
              <circle cx="90" cy="50" r="2" fill="white" />
              <circle cx="90" cy="70" r="2" fill="white" />
              <circle cx="30" cy="90" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full frosted-glass-dark mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-white/90 font-medium">
              Entrepreneur électricien depuis 1990
            </span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            L'excellence en{' '}
            <span className="text-gradient">services électriques</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl"
          >
            Installation, inspection et entretien électrique pour les secteurs
            résidentiel, commercial et industriel à Chibougamau et environs.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onDemoClick}
              size="lg"
              className="bg-[#1a6dff] text-white hover:bg-[#1557cc] rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-blue-500/30 group transition-all"
            >
              Demander un devis
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={onDemoClick}
              size="lg"
              variant="outline"
              className="border-2 border-white/40 text-white hover:bg-white/15 hover:border-white/60 rounded-full px-8 py-6 text-lg font-semibold bg-white/5 backdrop-blur-sm transition-all"
            >
              Nos services
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            {[
              { value: '30+', label: 'Années d\'expérience' },
              { value: '1000+', label: 'Projets réalisés' },
              { value: '24/7', label: 'Service d\'urgence' },
            ].map((stat, index) => (
              <div key={index} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
