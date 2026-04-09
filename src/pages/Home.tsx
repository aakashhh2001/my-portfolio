import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Linkedin, FileText } from 'lucide-react';
import { Grid3DBackground } from '../components/Grid3D';
import { Typewriter } from '../components/Typewriter';
import { HERO_CONTENT, SKILLS, CONTACT } from '../data/portfolio';

export const Home = () => {
  const stats = [
    { label: 'Specialized Training', value: '9 Months' },
    { label: 'AWS Certifications', value: '4' },
    { label: 'Architectures Built', value: '7+' },
    { label: 'Core Technologies', value: '15+' },
  ];

  const featuredSkills = SKILLS.slice(0, 8);

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      <Grid3DBackground />
      
      {/* Main Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Terminal prompt */}
            <div className="font-mono text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide">
              <span className="text-[#FF4757] mr-3">&gt;</span>
              <span className="text-[#00FF41]">Akash_K</span>
            </div>

            {/* Typewriter heading */}
            <div className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#00FF41]">
              <Typewriter text="AWS DevOps Engineer" delay={80} />
              <span className="terminal-cursor ml-2" />
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-xl md:text-2xl text-[#C5CDD3] max-w-4xl mx-auto leading-relaxed font-mono"
            >
              {HERO_CONTENT}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 font-mono uppercase tracking-wider"
            >
              {/* GET RESUME BUTTON */}
              <a
                href="/Akash_Resume.pdf" 
                download="Akash_Resume.pdf"
                className="group inline-flex items-center px-8 py-4 border border-[#00FF41] text-black bg-[#00FF41] hover:bg-[#00CC33] hover:border-[#00CC33] transition-all duration-200 font-bold rounded shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:shadow-[0_0_25px_rgba(0,255,65,0.5)]"
              >
                <FileText className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Get Resume
              </a>

              {/* LINKEDIN PROFILE BUTTON */}
              <a
                href={CONTACT.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-8 py-4 border border-[#00FF41] text-[#00FF41] bg-[#0A0E11] hover:bg-neutral-900 transition-all duration-200 font-bold rounded"
              >
                <Linkedin className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                LinkedIn Profile
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative z-10 bg-[#0A0E11]/80 backdrop-blur-sm border-t border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-[#0A0E11] border border-neutral-800 p-6 rounded shadow-[0_0_10px_rgba(0,255,65,0.05)] hover:shadow-[0_0_15px_rgba(0,255,65,0.15)] transition-all duration-300 hover:border-[#00FF41]/50">
                  <div className="font-mono text-3xl md:text-4xl font-bold text-[#00FF41] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-500 font-mono uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Skills Section */}
      <section className="py-24 relative z-10 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-[#00FF41] mb-4">
              &gt; CORE_STACK
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto font-mono">
              Primary tools utilized for infrastructure automation and CI/CD pipelines
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6"
          >
            {featuredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-[#0A0E11] border border-neutral-800 p-4 rounded text-center hover:border-[#00FF41]/50 transition-all duration-300 group shadow-[0_0_10px_rgba(0,255,65,0.05)]"
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-8 h-8 mx-auto mb-3 filter brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                />
                <div className="font-mono text-sm text-[#C5CDD3] font-medium">
                  {skill.name}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/skills"
              className="inline-flex items-center text-[#E1B12C] hover:text-[#FF4757] font-mono font-bold group transition-colors"
            >
              <span className="mr-2">Execute Full Skills Scan</span>
              <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10 bg-gradient-to-b from-transparent to-[#0A0E11]/80 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#0A0E11] border border-[#00FF41]/20 p-12 rounded shadow-[0_0_30px_rgba(0,255,65,0.1)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-50" />
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-[#00FF41] mb-6">
              Initiate Deployment Sequence?
            </h2>
            <p className="text-xl text-[#C5CDD3] mb-8 leading-relaxed font-mono">
              Ready to architect resilient cloud infrastructure or automate your delivery pipelines? Contact me to discuss your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center font-mono uppercase tracking-wider text-sm">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#00FF41] text-black font-bold rounded hover:bg-[#00CC33] transition-all duration-200 shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:shadow-[0_0_25px_rgba(0,255,65,0.5)]"
              >
                Open Comms Link
              </Link>
              <a
                href={CONTACT.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-neutral-600 text-neutral-300 hover:border-[#E1B12C] hover:text-[#E1B12C] font-bold rounded transition-all duration-200"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};