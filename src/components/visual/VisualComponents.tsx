import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  TrendingUp, 
  Users, 
  Clock, 
  Eye, 
  Heart, 
  MessageCircle, 
  Zap, 
  Target, 
  Award,
  ChevronRight,
  Filter,
  Grid3X3,
  List,
  Star
} from 'lucide-react';

// Strict Cyber Terminal Color Schemes
const categoryColors = {
  'DevOps': 'bg-[#00FF41]/10 text-[#00FF41] border-[#00FF41]/30',
  'Cloud Infrastructure': 'bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/30',
  'Full-Stack': 'bg-[#E1B12C]/10 text-[#E1B12C] border-[#E1B12C]/30',
  'DevOps Tools': 'bg-[#FF4757]/10 text-[#FF4757] border-[#FF4757]/30',
  'Security': 'bg-[#FF4757]/10 text-[#FF4757] border-[#FF4757]/30',
  'Database': 'bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/30',
  'All': 'bg-[#00FF41]/10 text-[#00FF41] border-[#00FF41]/30'
};

const statusColors = {
  completed: 'bg-[#00FF41]/20 text-[#00FF41]',
  inProgress: 'bg-[#E1B12C]/20 text-[#E1B12C]',
  planning: 'bg-neutral-800 text-neutral-400',
};

const difficultyColors = {
  Beginner: 'bg-[#00FF41]/10 text-[#00FF41]',
  Intermediate: 'bg-[#E1B12C]/10 text-[#E1B12C]',
  Advanced: 'bg-[#FF4757]/10 text-[#FF4757]',
};

// Animated Background Component
export const AnimatedBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#000000] text-[#00FF41] overflow-hidden">
      {/* Animated Grid */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0 animate-grid-move"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      {/* Glowing orbs */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-[#00FF41]/10 rounded-full blur-xl animate-pulse pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-40 h-40 bg-[#00FF41]/5 rounded-full blur-2xl animate-float pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Tech Badge Component
interface TechBadgeProps {
  name: string;
  category?: keyof typeof categoryColors | string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ 
  name, 
  category = 'DevOps', 
  size = 'md', 
  animated = true 
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const safeCategory = (Object.keys(categoryColors).includes(category) ? category : 'DevOps') as keyof typeof categoryColors;

  const Component = animated ? motion.span : 'span';
  const props = animated ? {
    whileHover: { scale: 1.05 },
    className: `${sizeClasses[size]} rounded font-mono border ${categoryColors[safeCategory]} inline-flex items-center gap-1.5`
  } : {
    className: `${sizeClasses[size]} rounded font-mono border ${categoryColors[safeCategory]} inline-flex items-center gap-1.5`
  };

  return (
    <Component {...props}>
      {name}
    </Component>
  );
};

// Loading Skeleton Component
interface LoadingSkeletonProps {
  lines?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ lines = 3, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.1 }}
        className="h-4 bg-neutral-800 rounded animate-shimmer"
      />
    ))}
  </div>
);

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
  color?: keyof typeof statusColors;
  trend?: 'up' | 'down' | 'neutral';
  loading?: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'completed',
  trend = 'neutral',
  loading = false
}) => {
  if (loading) {
    return (
      <div className="bg-[#0A0E11] border border-neutral-800 rounded-lg p-6">
        <LoadingSkeleton lines={3} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, borderColor: '#00FF41' }}
      className="bg-[#0A0E11] border border-neutral-800 rounded-lg p-6 transition-all duration-300 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#C5CDD3] font-mono text-sm uppercase tracking-wider">{title}</h3>
          {icon && <div className="text-[#00FF41]">{icon}</div>}
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-white font-mono">{value}</p>
            {change && (
              <p className={`text-xs font-mono flex items-center gap-1 mt-2 ${
                trend === 'up' ? 'text-[#00FF41]' : 
                trend === 'down' ? 'text-[#FF4757]' : 'text-neutral-500'
              }`}>
                <TrendingUp className="w-3 h-3" />
                {change}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Progress Bar Component
interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  color = 'bg-[#00FF41]',
  animated = true
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="space-y-2 font-mono">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-[#C5CDD3]">{label}</span>
          <span className="text-[#00FF41]">{value}/{max}</span>
        </div>
      )}
      
      <div className="w-full bg-neutral-900 rounded-full h-1.5 border border-neutral-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 1 : 0, ease: "easeOut" }}
          className={`h-full rounded-full ${color} shadow-[0_0_10px_rgba(0,255,65,0.5)]`}
        />
      </div>
    </div>
  );
};

// Timeline Component
interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  status: keyof typeof statusColors;
  icon?: React.ReactNode;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  description,
  status,
  icon
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative flex gap-4 pb-8 font-mono"
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full border border-current ${statusColors[status]} relative z-10 shadow-[0_0_8px_currentColor]`} />
        <div className="w-px h-full bg-neutral-800 absolute top-3 left-1/2 transform -translate-x-1/2" />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 -mt-1.5">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-[#C5CDD3] font-bold text-sm">{title}</h4>
          {icon && <div className="text-[#00FF41]">{icon}</div>}
        </div>
        <p className="text-[#00FF41] text-xs mb-2">{date}</p>
        <p className="text-neutral-500 text-xs leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// Interactive Button Component
interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wider rounded transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#00FF41] focus:ring-offset-1 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#00FF41] text-black hover:bg-[#00CC33] hover:shadow-[0_0_15px_rgba(0,255,65,0.4)]',
    secondary: 'bg-[#0A0E11] text-[#00FF41] border border-neutral-800 hover:border-[#00FF41] hover:bg-neutral-900',
    outline: 'border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black hover:shadow-[0_0_15px_rgba(0,255,65,0.4)]'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </motion.button>
  );
};

// Category Filter Component
interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded text-xs font-mono transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-[#00FF41] text-black font-bold shadow-[0_0_10px_rgba(0,255,65,0.3)]'
              : 'bg-[#0A0E11] text-[#00FF41] border border-neutral-800 hover:border-[#00FF41]'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

// View Toggle Component
interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex bg-[#0A0E11] border border-neutral-800 rounded p-1">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewChange('grid')}
        className={`p-1.5 rounded transition-all duration-300 ${
          view === 'grid'
            ? 'bg-[#00FF41] text-black'
            : 'text-neutral-500 hover:text-[#00FF41]'
        }`}
      >
        <Grid3X3 className="w-4 h-4" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewChange('list')}
        className={`p-1.5 rounded transition-all duration-300 ${
          view === 'list'
            ? 'bg-[#00FF41] text-black'
            : 'text-neutral-500 hover:text-[#00FF41]'
        }`}
      >
        <List className="w-4 h-4" />
      </motion.button>
    </div>
  );
};

// Engagement Metrics Component
interface EngagementMetricsProps {
  views?: string;
  likes?: string;
  comments?: string;
  featured?: boolean;
}

export const EngagementMetrics: React.FC<EngagementMetricsProps> = ({
  views,
  likes,
  comments,
  featured = false
}) => {
  return (
    <div className="flex items-center gap-4 text-xs text-neutral-500 font-mono">
      {views && (
        <div className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5" />
          <span>{views}</span>
        </div>
      )}
      {likes && (
        <div className="flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5" />
          <span>{likes}</span>
        </div>
      )}
      {comments && (
        <div className="flex items-center gap-1.5">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{comments}</span>
        </div>
      )}
      {featured && (
        <div className="flex items-center gap-1.5 text-[#E1B12C]">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>Featured</span>
        </div>
      )}
    </div>
  );
};

// Export all components and utilities
export {
  categoryColors,
  statusColors,
  difficultyColors
};