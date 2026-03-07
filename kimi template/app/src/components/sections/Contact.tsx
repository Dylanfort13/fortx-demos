import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  onDemoClick: () => void;
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adresse',
    content: '158 1re Av, Chibougamau, QC G8P 1Y1',
    link: 'https://maps.google.com/?q=158+1re+Av,+Chibougamau,+QC+G8P+1Y1',
  },
  {
    icon: Phone,
    title: 'Téléphone',
    content: '418-748-7613',
    subContent: 'Après heures: 418-770-7169',
    link: 'tel:418-748-7613',
  },
  {
    icon: Mail,
    title: 'Courriel',
    content: 'amptech@lino.com',
    link: 'mailto:amptech@lino.com',
  },
  {
    icon: Clock,
    title: 'Heures d\'ouverture',
    content: 'Lundi - Vendredi: 8h - 17h',
    subContent: 'Weekend: Fermé',
  },
];

export function Contact({ onDemoClick }: ContactProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

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

      // Line animation
      gsap.fromTo(
        lineRef.current,
        { height: '0%' },
        {
          height: '100%',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Content animation
      const leftCol = contentRef.current?.querySelector('.left-col');
      const rightCol = contentRef.current?.querySelector('.right-col');

      if (leftCol) {
        gsap.fromTo(
          leftCol.children,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (rightCol) {
        gsap.fromTo(
          rightCol.children,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto container-padding relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-blue-subtle mb-6">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amptech-dark mb-4">
            Contactez-<span className="text-gradient">nous</span>
          </h2>
          <p className="text-lg text-amptech-gray-medium max-w-2xl mx-auto">
            Besoin d'un devis ou d'informations ? Nous sommes là pour vous aider.
            Contactez-nous dès aujourd'hui.
          </p>
        </div>

        {/* Content */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 lg:gap-0 relative">
          {/* Divider line */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-1/2 top-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
            style={{ height: '0%' }}
          />

          {/* Left Column - Contact Info */}
          <div className="left-col lg:pr-16 space-y-6">
            <h3 className="text-2xl font-bold text-amptech-dark mb-6">
              Informations de contact
            </h3>

            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-amptech-gray transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl gradient-blue flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <info.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-amptech-dark mb-1">
                    {info.title}
                  </h4>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-amptech-gray-medium hover:text-primary transition-colors"
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={
                        info.link.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-amptech-gray-medium">{info.content}</p>
                  )}
                  {info.subContent && (
                    <p className="text-sm text-amptech-gray-medium/70 mt-1">
                      {info.subContent}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Phone numbers */}
            <div className="mt-8 p-6 rounded-2xl gradient-blue-subtle">
              <h4 className="font-semibold text-amptech-dark mb-4">
                Nos numéros de téléphone
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-amptech-gray-medium">Principal:</span>
                  <a
                    href="tel:418-748-7613"
                    className="text-primary font-medium hover:underline"
                  >
                    418-748-7613
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-amptech-gray-medium">Secondaire:</span>
                  <a
                    href="tel:418-770-6789"
                    className="text-primary font-medium hover:underline"
                  >
                    418-770-6789
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-amptech-gray-medium">
                    Après les heures:
                  </span>
                  <span className="text-amptech-gray-dark">418-770-7169</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amptech-gray-medium">Télécopieur:</span>
                  <span className="text-amptech-gray-dark">418-748-2029</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="right-col lg:pl-16">
            <div className="frosted-glass rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-amptech-dark mb-6">
                Envoyez-nous un message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-amptech-dark">
                    Nom *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-amptech-dark">
                    Courriel *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-amptech-dark">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Décrivez votre projet..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  onClick={onDemoClick}
                  className={`w-full rounded-xl py-6 text-lg font-medium transition-all ${
                    isSubmitted
                      ? 'bg-green-500 hover:bg-green-500'
                      : 'gradient-blue hover:opacity-90'
                  } text-white electric-fill`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Message envoyé!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
