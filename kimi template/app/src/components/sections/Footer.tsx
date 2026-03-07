import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Secteurs', href: '#sectors' },
  { label: 'Galerie', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-amptech-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
      </div>

      {/* Circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="footer-pattern"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M40 0 L40 30 M40 50 L40 80 M0 40 L30 40 M50 40 L80 40"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
              />
              <circle cx="40" cy="40" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto container-padding relative">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <img
              src="/images/logo_white.png"
              alt="Amptech Inc"
              className="h-18 w-auto object-contain mb-6"
              style={{ maxHeight: '80px' }}
            />
            <p className="text-white/60 mb-6 max-w-md leading-relaxed">
              Entrepreneur en électricité depuis 1990. Installation, inspection
              et entretien électrique pour les secteurs résidentiel, commercial
              et industriel à Chibougamau.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="tel:418-748-7613"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="mailto:amptech@lino.com"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://maps.google.com/?q=158+1re+Av,+Chibougamau,+QC+G8P+1Y1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/60 hover:text-primary transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  158 1re Av
                  <br />
                  Chibougamau, QC G8P 1Y1
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:418-748-7613"
                  className="text-white/60 text-sm hover:text-primary transition-colors"
                >
                  418-748-7613
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:amptech@lino.com"
                  className="text-white/60 text-sm hover:text-primary transition-colors"
                >
                  amptech@lino.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            Tous droits réservés © {new Date().getFullYear()} Amptech Inc.
            <span className="hidden md:inline"> • </span>
            <br className="md:hidden" />
            <a href="#" className="hover:text-primary transition-colors">
              Politique de confidentialité
            </a>
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors group"
          >
            <span className="text-sm">Retour en haut</span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
