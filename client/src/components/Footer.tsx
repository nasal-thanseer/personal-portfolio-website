import { Link } from "wouter";
import { Instagram, Twitter, Dribbble, Linkedin, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { 
    icon: Instagram, 
    href: "https://instagram.com/", 
    label: "Instagram" 
  },
  { 
    icon: Twitter, 
    href: "https://twitter.com/", 
    label: "Twitter" 
  },
  { 
    icon: Dribbble, 
    href: "https://dribbble.com/", 
    label: "Dribbble" 
  },
  { 
    icon: Linkedin, 
    href: "https://linkedin.com/", 
    label: "LinkedIn" 
  }
];

const footerLinks = [
  { label: "Work", href: "/work" },
  { label: "Play", href: "/play" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 border-t border-border">
      <div className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo & Contact */}
          <div>
            <Link href="/" className="block mb-4">
              <span className="text-2xl font-bold tracking-tighter">STUDIO</span>
            </Link>
            <p className="text-sm text-muted mb-4">
              Design Studio based in Berlin.<br />
              Working internationally.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4" />
              <a href="mailto:hello@studio.com" className="text-primary hover:text-accent transition-colors">
                hello@studio.com
              </a>
            </div>
          </div>
          
          {/* Column 2: Site Links */}
          <div>
            <h3 className="text-sm font-medium uppercase mb-4">Sitemap</h3>
            <ul className="space-y-3">
              {footerLinks.map(link => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="inline-flex items-center text-primary hover:text-accent transition-colors group"
                  >
                    <span>{link.label}</span>
                    <motion.span 
                      className="inline-block ml-1 opacity-0 group-hover:opacity-100"
                      initial={{ x: -5 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="h-3 w-3" />
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Social Links */}
          <div>
            <h3 className="text-sm font-medium uppercase mb-4">Connect</h3>
            <ul className="space-y-3">
              {socialLinks.map(social => (
                <li key={social.label}>
                  <a 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-primary hover:text-accent transition-colors"
                  >
                    <social.icon className="h-4 w-4 mr-2" />
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-sm font-medium uppercase mb-4">Stay Updated</h3>
            <p className="text-sm text-muted mb-4">
              Subscribe to our newsletter to receive updates on new projects, insights and announcements.
            </p>
            <div className="flex items-center border-b border-border pb-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-transparent border-none outline-none text-sm flex-1"
              />
              <button className="text-accent hover:text-accent/70 transition-colors">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Copyright */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center text-xs text-muted">
          <p>© {currentYear} Design Studio. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
