import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TerminalHeader } from '../components/TerminalHeader';
import { Typewriter } from '../components/Typewriter';
import { Cloud, Container, Code, Database, Terminal as TerminalIcon, Search, FileCode } from 'lucide-react';
import { SKILLS_BY_CATEGORY } from '../data/portfolio';

export const Skills = () => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of terminal output
  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalOutput, isProcessing]);

  const categories = [
    {
      id: 'cloud',
      title: 'Cloud Platforms',
      icon: Cloud,
      skills: SKILLS_BY_CATEGORY.cloud,
      color: 'text-[#00D9FF]',
    },
    {
      id: 'containers',
      title: 'Containerization',
      icon: Container,
      skills: SKILLS_BY_CATEGORY.containers,
      color: 'text-[#00FF41]',
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure as Code',
      icon: TerminalIcon,
      skills: SKILLS_BY_CATEGORY.infrastructure,
      color: 'text-[#E1B12C]',
    },
    {
      id: 'devops',
      title: 'CI/CD & Automation',
      icon: Code,
      skills: SKILLS_BY_CATEGORY.devops,
      color: 'text-[#FF4757]',
    },
    {
      id: 'observability',
      title: 'Observability',
      icon: Search,
      skills: SKILLS_BY_CATEGORY.observability,
      color: 'text-[#00D9FF]',
    },
    {
      id: 'database',
      title: 'Databases',
      icon: Database,
      skills: SKILLS_BY_CATEGORY.database,
      color: 'text-[#E1B12C]',
    },
    {
      id: 'programming',
      title: 'Programming Languages',
      icon: FileCode,
      skills: SKILLS_BY_CATEGORY.programming,
      color: 'text-[#FF4757]',
    },
  ];

  const commands = {
    help: [
      'Available commands:',
      '  ls <category>     - List skills in a category (e.g., ls devops)',
      '  cat <skill>       - Show skill details (e.g., cat Docker)',
      '  levels            - Show proficiency guide',
      '  clear             - Clear terminal screen',
      '  help              - Show this menu',
    ],
    levels: [
      'Proficiency Levels:',
      '  < 60% : Basic understanding / Theoretical Knowledge',
      '  60-80%: Practical experience / Can execute standard tasks',
      '  80-90%: Production usage / Can architect and troubleshoot',
      '  > 90% : Deep expertise / Subject Matter Expert',
    ],
    clear: () => setTerminalOutput([]),
    default: (input: string) => [
      `bash: ${input}: command not found`,
      'Type "help" for a list of available commands.',
    ],
  };

  const executeCommand = (input: string) => {
    setIsProcessing(true);
    
    const cmd = input.trim();
    if (!cmd) {
      setTerminalOutput(prev => [...prev, `$ `, '']);
      setIsProcessing(false);
      return;
    }

    const args = cmd.toLowerCase().split(' ');
    const mainCmd = args[0];

    setTimeout(() => {
      let output: string[] = [];
      
      switch (mainCmd) {
        case 'help':
          output = commands.help;
          break;
        case 'levels':
          output = commands.levels;
          break;
        case 'clear':
          commands.clear();
          setIsProcessing(false);
          return;
        case 'ls':
          const category = args[1];
          if (!category) {
            output = [
              'Available categories:',
              ...categories.map(cat => `  ${cat.id.padEnd(15)} - ${cat.title}`)
            ];
          } else if (categories.find(c => c.id === category)) {
            const cat = categories.find(c => c.id === category)!;
            output = [
              `${cat.title}:`,
              ...cat.skills.map(skill => `  ${skill.name.padEnd(20)} [${'#'.repeat(Math.floor(skill.level/10))}${' '.repeat(10-Math.floor(skill.level/10))}] ${skill.level}%`)
            ];
          } else {
            output = [`ls: cannot access '${category}': No such directory`];
          }
          break;
        case 'cat':
          const skillName = args.slice(1).join(' ');
          if (!skillName) {
            output = ['cat: missing operand'];
            break;
          }
          
          let foundSkill = null;
          let foundCategory = null;
          for (const cat of categories) {
            const skill = cat.skills.find(s => s.name.toLowerCase() === skillName);
            if (skill) {
              foundSkill = skill;
              foundCategory = cat;
              break;
            }
          }

          if (foundSkill) {
            output = [
              `Name:        ${foundSkill.name}`,
              `Category:    ${foundCategory?.title}`,
              `Proficiency: ${foundSkill.level}%`,
              `Status:      Production Ready`,
            ];
          } else {
            output = [`cat: ${skillName}: No such file or directory`];
          }
          break;
        default:
          output = commands.default(mainCmd);
      }

      setTerminalOutput(prev => [...prev, `user@akash-portfolio:~$ ${cmd}`, ...output, '']);
      setCurrentInput('');
      setIsProcessing(false);
    }, 400); 
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isProcessing) {
      executeCommand(currentInput);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Terminal Header */}
      <TerminalHeader
        command="tree ./skills/"
        description="Parsing technical expertise across cloud infrastructure, development, and DevOps domains"
      />

      {/* Interactive Terminal Section */}
      <section className="py-16 bg-[#0A0E11] border-b border-neutral-800 shadow-[inset_0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#000000] border border-neutral-800 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,255,65,0.05)]">
              {/* Terminal Title Bar */}
              <div className="bg-neutral-900 border-b border-neutral-800 p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF4757]" />
                  <div className="w-3 h-3 rounded-full bg-[#E1B12C]" />
                  <div className="w-3 h-3 rounded-full bg-[#00FF41]" />
                </div>
                <span className="font-mono text-xs text-neutral-500 font-bold">akash-k@aws-terminal:~</span>
              </div>

              {/* Terminal Console */}
              <div className="p-4 font-mono text-sm h-80 overflow-y-auto custom-scrollbar" onClick={() => document.getElementById('terminal-input')?.focus()}>
                {terminalOutput.length === 0 && (
                  <div className="text-neutral-400 mb-4">
                    <Typewriter
                      text="Welcome to the DevOps Skills Explorer. OS: Ubuntu 24.04 LTS"
                      delay={15}
                      className="block text-[#00FF41]"
                    />
                    <div className="mt-2 text-neutral-500">Type 'help' to see a list of available commands.</div>
                  </div>
                )}

                {terminalOutput.map((line, index) => (
                  <div
                    key={index}
                    className={`whitespace-pre-wrap ${
                      line.startsWith('user@') ? 'text-[#00D9FF] font-bold' : 
                      line.includes('command not found') || line.includes('No such') ? 'text-[#FF4757]' :
                      'text-[#C5CDD3]'
                    }`}
                  >
                    {line}
                  </div>
                ))}

                {isProcessing && (
                  <div className="text-[#00D9FF] font-bold mt-1">
                    user@akash-portfolio:~$ <span className="animate-pulse text-[#C5CDD3] font-normal">executing...</span>
                  </div>
                )}

                {/* Input Line */}
                <div className="flex items-center mt-1">
                  <span className="text-[#00FF41] font-bold mr-2 select-none">user@akash-portfolio:~$</span>
                  <input
                    id="terminal-input"
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-transparent text-[#C5CDD3] outline-none caret-[#00FF41]"
                    disabled={isProcessing}
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
                <div ref={endOfTerminalRef} />
              </div>
            </div>

            {/* Terminal Command Hints */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {['help', 'ls', 'ls cloud', 'cat Docker', 'levels', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => { setCurrentInput(cmd); document.getElementById('terminal-input')?.focus(); }}
                  className="px-3 py-1.5 bg-[#0A0E11] border border-neutral-800 rounded font-mono text-xs text-[#00FF41] hover:border-[#00FF41] hover:bg-[#00FF41]/5 transition-all"
                >
                  $ {cmd}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Categories Grid */}
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
              &gt; VISUAL_DASHBOARD
            </h2>
            <p className="text-neutral-500 font-mono max-w-2xl mx-auto">
              Graphical representation of core competencies and toolchains
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {categories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-[#0A0E11] border border-neutral-800 rounded-lg overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="bg-neutral-900 border-b border-neutral-800 p-5">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded bg-black border border-neutral-800">
                        <IconComponent size={20} className={category.color} />
                      </div>
                      <h3 className="font-mono text-lg font-bold text-[#C5CDD3]">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div
                          key={skill.name}
                          className="bg-black border border-neutral-800 p-4 rounded hover:border-[#00FF41]/30 transition-all duration-300"
                        >
                          <div className="flex items-center space-x-3 mb-4">
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              className="w-6 h-6 filter brightness-0 invert opacity-80"
                            />
                            <span className="font-mono text-sm font-bold text-[#C5CDD3]">
                              {skill.name}
                            </span>
                          </div>
                          
                          {/* Proficiency Bar */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-neutral-500">Proficiency</span>
                              <span className="text-[#00FF41]">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-neutral-900 rounded-full h-1 border border-neutral-800">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.3, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="h-full bg-[#00FF41] rounded-full shadow-[0_0_8px_rgba(0,255,65,0.5)]"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};