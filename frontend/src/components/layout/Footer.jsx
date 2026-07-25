import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-bg border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <span className="font-poppins font-bold text-xl text-white">JohnDoe</span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Passionate Full Stack Developer crafting beautiful and performant web experiences. Let's work together to bring your ideas to life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Projects', 'Skills', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase()}`} className="text-gray-400 hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-card rounded-lg hover:bg-primary/20 transition-colors">
                <Github className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-card rounded-lg hover:bg-primary/20 transition-colors">
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-card rounded-lg hover:bg-primary/20 transition-colors">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a href="mailto:hello@johndoe.com" className="p-2 bg-dark-card rounded-lg hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> by JohnDoe © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
