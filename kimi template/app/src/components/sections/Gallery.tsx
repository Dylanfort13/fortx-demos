import { useEffect, useRef, useState } from 'react';
import { Camera, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: '/images/gallery_residential.jpg',
    title: 'Projet résidentiel',
    category: 'Résidentiel',
  },
  {
    src: '/images/gallery_mining.jpg',
    title: 'Installation minière',
    category: 'Mines',
  },
  {
    src: '/images/gallery_forestry.jpg',
    title: 'Scierie - Secteur forestier',
    category: 'Foresterie',
  },
  {
    src: '/images/gallery_commercial.jpg',
    title: 'Service commercial',
    category: 'Commercial',
  },
];

interface GalleryProps {
  onDemoClick: () => void;
}

export function Gallery({ onDemoClick }: GalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      const items = gridRef.current?.querySelectorAll('.gallery-item');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
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

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const newIndex =
      direction === 'prev'
        ? (selectedImage - 1 + galleryImages.length) % galleryImages.length
        : (selectedImage + 1) % galleryImages.length;
    setSelectedImage(newIndex);
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-padding bg-amptech-dark relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto container-padding relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-6">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white/90">Galerie</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Notre <span className="text-gradient">galerie de photos</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Découvrez nos réalisations et projets électriques dans divers secteurs
            d'activité.
          </p>
        </div>

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item group relative rounded-3xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredIndex === index ? 'scale-110' : 'scale-100'
                  }`}
                />
              </div>

              {/* Overlay - always visible gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-amptech-dark/90 via-amptech-dark/30 to-transparent" />

              {/* Content - always visible */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-[#1a6dff]/30 text-white text-xs font-medium mb-2 backdrop-blur-sm">
                  {image.category}
                </span>
                <h3 className="text-xl font-bold text-white drop-shadow-lg">{image.title}</h3>
              </div>

              {/* View indicator */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  hoveredIndex === index
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-75'
                }`}
              >
                <div className="w-16 h-16 rounded-full gradient-blue flex items-center justify-center shadow-glow-lg">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            onClick={onDemoClick}
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 rounded-full px-8"
          >
            Voir plus de réalisations
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-amptech-dark/95 backdrop-blur-lg flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('prev');
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('next');
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[80vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].title}
              className="max-w-full max-h-[70vh] object-contain rounded-2xl"
            />
            <div className="mt-4 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-2">
                {galleryImages[selectedImage].category}
              </span>
              <h3 className="text-2xl font-bold text-white">
                {galleryImages[selectedImage].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
