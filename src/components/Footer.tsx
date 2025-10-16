import { Recycle, Instagram, Twitter, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Recycle className="w-8 h-8 text-primary-light" />
              <span className="text-2xl font-bold">ReWear</span>
            </div>
            <p className="text-secondary-foreground/80 mb-4 max-w-md">
              Making sustainable fashion fun and rewarding. Join our community of eco-conscious students giving clothes a second life.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary-light transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-light transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-light transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><a href="#" className="hover:text-primary-light transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">Donate</a></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">Browse</a></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">Rewards</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>Shop 21, University Campus</li>
              <li>hello@rewear.com</li>
              <li>Mon-Fri: 9AM - 6PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>&copy; 2025 ReWear. All rights reserved. Built with 💚 for sustainability.</p>
        </div>
      </div>
    </footer>
  );
};
