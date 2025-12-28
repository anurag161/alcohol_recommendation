import Link from 'next/link';
import { Wine, Shield, Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Discover Spirits', href: '/discover' },
    { name: 'Brand Catalog', href: '/brands' },
    { name: 'AI Recommendations', href: '/' },
  ],
  support: [
    { name: 'Responsible Drinking', href: '/responsible' },
    { name: 'Help & Support', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Age Verification', href: '/age-verification' },
  ],
};

const helpLines = [
  { name: 'National Helpline', number: '1800-XXX-XXXX', description: '24/7 Alcohol Support' },
  { name: 'Emergency', number: '112', description: 'Medical Emergency' },
  { name: 'Local Support', number: 'Contact Local Authorities', description: 'Regional Help Services' },
];

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Wine className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold amber-text">Daru GPT</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Your premium AI sommelier for personalized spirit recommendations.
              Discover the perfect drink for every occasion with intelligent matching.
            </p>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>Age 21+ Only</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Help */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Help Lines */}
            <div>
              <h4 className="text-foreground font-medium mb-3 flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>Help Lines</span>
              </h4>
              <div className="space-y-2">
                {helpLines.map((line) => (
                  <div key={line.name} className="text-xs">
                    <div className="font-medium text-foreground">{line.name}</div>
                    <div className="text-primary font-semibold">{line.number}</div>
                    <div className="text-muted-foreground">{line.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© 2024 Daru GPT. All rights reserved.</span>
              <span className="hidden md:block">•</span>
              <span>Made with ❤️ for responsible drinking</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/contact"
                className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                <span>Contact</span>
              </Link>
              <Link
                href="/locations"
                className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <MapPin className="h-4 w-4" />
                <span>Locations</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
