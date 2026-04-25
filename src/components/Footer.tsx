import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Twitter, Music, Mail } from "lucide-react";

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Music", path: "/music" },
  { name: "Videos", path: "/videos" },
  { name: "Shows", path: "/shows" },
  { name: "Booking", path: "/booking" },
  { name: "EPK", path: "/epk" },
  { name: "Store", path: "/store" },
  { name: "Gallery", path: "/gallery" },
  { name: "Fan Club", path: "/fan-club" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Music, href: "#", label: "Spotify" },
];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-3xl font-semibold text-gold-gradient mb-4">Lily Hollows</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              Singer-Songwriter · Performer · Actress
            </p>
            <p className="text-muted-foreground font-body text-sm mt-2">
              JHB · CPT · South Africa
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-4">Navigate</h4>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-muted-foreground hover:text-primary text-sm font-body transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-4">Connect</h4>
            <div className="space-y-2 mb-6">
              <a href="mailto:miss.L.hollows@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors">
                <Mail size={14} />
                miss.L.hollows@gmail.com
              </a>
              <p className="text-muted-foreground text-sm">+27 83 997 0398</p>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                  onClick={
                    social.href === "#"
                      ? (e) => {
                          e.preventDefault();
                        }
                      : undefined
                  }
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-xs font-body tracking-wider">
            © {new Date().getFullYear()} Lily Hollows. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
