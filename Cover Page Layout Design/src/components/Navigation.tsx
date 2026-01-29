import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Menu, X, User, Sparkles } from "lucide-react";

interface NavigationProps {
  onProfileClick: () => void;
}

export function Navigation({ onProfileClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Hotels", href: "#hotels" },
    { label: "Cars", href: "#cars" },
    { label: "Bikes", href: "#bikes" },
    { label: "Cafes", href: "#cafes" },
    { label: "Food", href: "#food" },
    { label: "Attractions", href: "#attractions" },
    { label: "Guides", href: "#guides" },
    { label: "Safety", href: "#safety" },
    { label: "Support", href: "#support" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-white font-bold text-xl">Explore Rajasthan</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className="text-white hover:bg-white/20 transition-all duration-300"
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}
            
            {/* AI Trip Planner Special Button */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * navItems.length }}
            >
              <Button
                onClick={() => scrollToSection("#ai-planner")}
                className="text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 ml-2"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Trip Planner
              </Button>
            </motion.div>
          </div>

          {/* Profile & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Profile Button */}
            <Button
              onClick={onProfileClick}
              variant="ghost"
              className="text-white hover:bg-white/20 border border-white/30"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              className="lg:hidden text-white hover:bg-white/20"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/10 backdrop-blur-md border-t border-white/20"
          >
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className="w-full justify-start text-white hover:bg-white/20"
                >
                  {item.label}
                </Button>
              ))}
              <Button
                onClick={() => scrollToSection("#ai-planner")}
                className="w-full justify-start text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Trip Planner
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}