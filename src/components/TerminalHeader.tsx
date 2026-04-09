import { motion } from 'framer-motion';
import { Typewriter } from './Typewriter';

interface TerminalHeaderProps {
  command: string;
  description?: string;
}

export const TerminalHeader = ({ command, description }: TerminalHeaderProps) => {
  return (
    <div className="bg-[#0A0E11] border-b border-neutral-800 relative overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full bg-gradient-to-b from-transparent via-[#00FF41]/20 to-transparent scanline" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {/* Command */}
          <div className="font-mono text-2xl lg:text-3xl text-[#C5CDD3]">
            <span className="text-[#FF4757] mr-3">$</span>
            <Typewriter text={command} delay={30} />
            <span className="terminal-cursor ml-1" />
          </div>
          
          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-neutral-400 text-sm max-w-2xl font-mono"
            >
              {description}
            </motion.p>
          )}
          
          {/* Terminal prompt symbols */}
          <div className="flex items-center space-x-2 mt-6">
            <div className="w-3 h-3 rounded-full bg-[#FF4757]" />
            <div className="w-3 h-3 rounded-full bg-[#E1B12C]" />
            <div className="w-3 h-3 rounded-full bg-[#00FF41]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};