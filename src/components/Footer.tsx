import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { CONTACT } from '../data/portfolio';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', url: CONTACT.social.github, icon: Github },
    { name: 'LinkedIn', url: CONTACT.social.linkedin, icon: Linkedin },
    { name: 'Twitter', url: CONTACT.social.twitter, icon: Twitter },
    { name: 'Email', url: `mailto:${CONTACT.email}`, icon: Mail },
  ];

  return (
    <footer className="bg-[#0A0E11] border-t border-neutral-800 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-neutral-900 hover:bg-[#00FF41] text-neutral-400 hover:text-black transition-all duration-200 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IconComponent size={20} className="group-hover:scale-110 transition-transform" />
                </motion.a>
              );
            })}
          </div>

          {/* Terminal-style copyright */}
          <div className="font-mono text-sm text-neutral-500 text-center">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-[#FF4757]">$</span>
              <span className="text-[#00FF41]">cat</span>
              <span>copyright.txt</span>
            </div>
            <div className="mt-2 space-y-1 text-xs">
              <p>© {currentYear} Akash K | AWS DevOps Engineer</p>
              <p>Built with React, TypeScript, and CI/CD</p>
              <p className="text-[#00FF41]">Status: AWS Certified | Based in Bangalore</p>
            </div>
          </div>

          {/* Tech stack indicator */}
          <div className="flex items-center space-x-4 text-xs font-mono text-neutral-600">
            <span>Powered by:</span>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-neutral-900 rounded text-[#00FF41]">React</span>
              <span className="px-2 py-1 bg-neutral-900 rounded text-[#00FF41]">TypeScript</span>
              <span className="px-2 py-1 bg-neutral-900 rounded text-[#00FF41]">Tailwind</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};