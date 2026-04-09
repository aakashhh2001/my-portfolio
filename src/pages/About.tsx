import { motion } from 'framer-motion';
import { TerminalHeader } from '../components/TerminalHeader';
import { Typewriter } from '../components/Typewriter';
import { Calendar, MapPin, Code, Zap, Award } from 'lucide-react';
import { ABOUT_TEXT, SKILLS } from '../data/portfolio';

export const About = () => {
  const timeline = [
    {
      year: '2025 - 2026',
      title: 'AWS DevOps Specialization',
      company: '9-Month Intensive Program',
      description: 'Mastered cloud infrastructure, CI/CD pipelines, container orchestration, and automated deployments using AWS, Docker, Kubernetes, and Terraform.',
      icon: Code,
    },
    {
      year: '2021 - 2025',
      title: 'B.E. Computer Science',
      company: 'SNS College of Engineering, Coimbatore',
      description: 'Foundational degree focusing on software engineering, distributed systems, and core computer science principles.',
      icon: Calendar,
    },
  ];

  const philosophyPoints = [
    {
      icon: Zap,
      title: 'Automation First',
      description: 'Every manual process should be automated, every deployment should be reproducible.',
    },
    {
      icon: Code,
      title: 'Infrastructure as Code',
      description: 'Treat infrastructure with the same discipline, version control, and testing as application code.',
    },
    {
      icon: MapPin,
      title: 'Cloud Native',
      description: 'Build for the cloud from day one, embrace containerization, observability, and orchestration.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Terminal Header */}
      <TerminalHeader
        command="cat about.txt"
        description="Displaying professional background and technical philosophy"
      />

      {/* Bio Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Bio Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="bg-[#0A0E11] border border-neutral-800 rounded-xl p-8 shadow-[0_0_20px_rgba(0,255,65,0.05)]">
                <div className="font-mono text-lg mb-6">
                  <span className="text-[#FF4757]">$</span>
                  <span className="text-[#00FF41]"> cat</span>
                  <span className="text-neutral-500"> bio.txt</span>
                </div>
                <div className="space-y-4 text-[#C5CDD3] leading-relaxed font-mono text-sm">
                  <Typewriter
                    text="Hello, I'm Akash K, and I turn code into production reality."
                    delay={30}
                    className="text-[#00FF41] font-bold block mb-6 text-base"
                  />
                  {ABOUT_TEXT.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="bg-[#0A0E11] border border-neutral-800 rounded-xl p-6">
                <h3 className="font-mono text-[#00FF41] font-bold mb-4 text-lg border-b border-neutral-800 pb-2">
                  <span className="text-[#FF4757] mr-2">&gt;</span> Quick_Stats
                </h3>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Location</span>
                    <span className="text-[#C5CDD3]">Bangalore, India</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Focus</span>
                    <span className="text-[#C5CDD3]">AWS / DevOps</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Certifications</span>
                    <span className="text-[#00FF41]">4 Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Core Skills</span>
                    <span className="text-[#00FF41]">{SKILLS.length}+</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A0E11] border border-neutral-800 rounded-xl p-6">
                <h3 className="font-mono text-[#00FF41] font-bold mb-4 text-lg border-b border-neutral-800 pb-2">
                  <span className="text-[#FF4757] mr-2">&gt;</span> Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Cloud Architecture', 'CI/CD Pipelines', 'Infrastructure as Code', 'Database Migration', 'Observability'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-neutral-900 text-[#00FF41] text-xs font-mono rounded border border-neutral-800 hover:border-[#00FF41] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-b from-[#000000] via-[#0A0E11] to-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-[#00FF41] mb-4">
              &gt; CAREER_TIMELINE
            </h2>
            <p className="text-neutral-500 font-mono">
              Education and specialized training
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00FF41] via-[#00FF41]/30 to-transparent" />

            <div className="space-y-12">
              {timeline.map((item, index) => {
                const IconComponent = item.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-[#0A0E11] rounded-full flex items-center justify-center border-2 border-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.5)] z-10">
                      <IconComponent size={14} className="text-[#00FF41]" />
                    </div>

                    {/* Content */}
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="bg-[#0A0E11] border border-neutral-800 rounded-lg p-6 hover:border-[#00FF41]/50 transition-colors">
                        <div className="font-mono text-[#E1B12C] text-xs mb-2">{item.year}</div>
                        <h3 className="font-bold text-lg text-[#C5CDD3] mb-1">{item.title}</h3>
                        <div className="text-[#00FF41] font-mono text-sm mb-3">{item.company}</div>
                        <p className="text-neutral-500 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-[#00FF41] mb-4">
              &gt; TECH_PHILOSOPHY
            </h2>
            <p className="text-neutral-500 font-mono">
              Core principles guiding my DevOps approach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {philosophyPoints.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-[#0A0E11] border border-neutral-800 rounded-xl p-8 text-center hover:border-[#00FF41]/50 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-[#00FF41]/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00FF41]/10 border border-[#00FF41]/20 transition-colors">
                    <IconComponent size={28} className="text-[#00FF41]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#C5CDD3] mb-4 font-mono">{point.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{point.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};