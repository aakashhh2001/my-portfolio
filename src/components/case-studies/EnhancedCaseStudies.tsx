import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Target, 
  Users, 
  Code, 
  Database, 
  Cloud,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Settings,
  GitBranch,
  Container,
  Globe,
  Server,
  Lock,
  Cpu,
  Network,
  Monitor
} from 'lucide-react';
import { 
  AnimatedBackground, 
  TechBadge, 
  StatsCard, 
  ProgressBar, 
  TimelineItem, 
  InteractiveButton,
  categoryColors,
  statusColors,
  difficultyColors
} from '../visual/VisualComponents';

interface CaseStudy {
  id: number;
  title: string;
  subtitle: string;
  category: keyof typeof categoryColors;
  featured: boolean;
  timeline: {
    start: string;
    end: string;
    duration: string;
  };
  challenge: string;
  solution: string[];
  impact: string[];
  technologies: string[];
  impactMetrics: {
    deploymentTime?: { before: string; after: string; improvement: string };
    cost?: { before: string; after: string; reduction: string };
    performance?: { improvement: string };
    availability?: { uptime: string; improvement: string };
    scalability?: { capacity: string; improvement: string };
  };
  architecture?: {
    components: string[];
    pattern: string;
  };
}

// Personalized with your actual AWS & DevOps Projects
const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Zero-Downtime Database Migration",
    subtitle: "On-Premise MySQL to Amazon RDS via AWS DMS",
    category: "Cloud Infrastructure",
    featured: true,
    timeline: {
      start: "Feb 2026",
      end: "Mar 2026",
      duration: "4 weeks"
    },
    challenge: "Migrate a critical on-premise MySQL database to AWS without causing operational downtime or data loss for active applications during the cutover phase.",
    solution: [
      "Provisioned a highly available Multi-AZ Amazon RDS instance as the target database.",
      "Configured AWS Database Migration Service (DMS) with a dedicated replication instance.",
      "Enabled Change Data Capture (CDC) to continuously sync binary logs from on-premise to AWS.",
      "Performed data validation and schema conversion checks before the final DNS cutover.",
      "Updated application connection strings securely via AWS Secrets Manager."
    ],
    impact: [
      "Achieved 0 minutes of application downtime during the database migration.",
      "Eliminated manual database maintenance and backup overhead.",
      "Improved query response times by 25% leveraging optimized RDS storage.",
      "Established automated, point-in-time recovery capabilities."
    ],
    technologies: ["AWS DMS", "Amazon RDS", "MySQL", "AWS VPC", "Secrets Manager"],
    impactMetrics: {
      availability: { uptime: "99.99%", improvement: "1.5%" },
      performance: { improvement: "25%" }
    },
    architecture: {
      components: ["On-Prem MySQL", "AWS VPN/Direct Connect", "DMS Replication Instance", "Amazon RDS (Multi-AZ)"],
      pattern: "Continuous Replication Migration"
    }
  },
  {
    id: 2,
    title: "Highly Available Three-Tier Web Architecture",
    subtitle: "Scalable AWS Deployment",
    category: "Cloud Infrastructure",
    featured: false,
    timeline: {
      start: "Jan 2026",
      end: "Feb 2026",
      duration: "3 weeks"
    },
    challenge: "Design an infrastructure blueprint capable of surviving Availability Zone failures while dynamically scaling to handle unpredictable traffic spikes.",
    solution: [
      "Architected a custom VPC with isolated public and private subnets across two Availability Zones.",
      "Deployed an Application Load Balancer (ALB) in public subnets to distribute incoming traffic.",
      "Configured an Auto Scaling Group (ASG) for EC2 instances residing in private subnets.",
      "Provisioned a Multi-AZ RDS instance in isolated database subnets to protect data.",
      "Implemented strict Security Groups and Network ACLs to enforce least privilege access."
    ],
    impact: [
      "Eliminated single points of failure across the entire application stack.",
      "Reduced infrastructure costs by allowing EC2 instances to scale down during off-peak hours.",
      "Secured the application and database tiers from direct public internet exposure."
    ],
    technologies: ["AWS EC2", "AWS VPC", "Application Load Balancer", "Auto Scaling", "Amazon RDS"],
    impactMetrics: {
      availability: { uptime: "99.99%", improvement: "2.1%" },
      scalability: { capacity: "Auto-Scales 2x-6x", improvement: "100%" }
    },
    architecture: {
      components: ["VPC", "ALB", "ASG", "EC2", "Multi-AZ RDS", "NAT Gateway"],
      pattern: "Classic Three-Tier High Availability"
    }
  },
  {
    id: 3,
    title: "Full Observability Stack Implementation",
    subtitle: "Prometheus, Grafana & ELK Integration",
    category: "DevOps",
    featured: true,
    timeline: {
      start: "Dec 2025",
      end: "Jan 2026",
      duration: "5 weeks"
    },
    challenge: "Lack of centralized visibility into distributed server health and application logs, resulting in high Mean Time To Resolution (MTTR) during system outages.",
    solution: [
      "Deployed Prometheus Node Exporters to collect real-time system metrics (CPU, RAM, Disk).",
      "Built custom Grafana dashboards using PromQL to visualize infrastructure health.",
      "Configured the ELK Stack (Elasticsearch, Logstash, Kibana) for centralized log aggregation.",
      "Set up automated Alertmanager rules to notify the team via Slack/Email on critical thresholds.",
      "Correlated application logs with infrastructure metrics for unified troubleshooting."
    ],
    impact: [
      "Reduced Mean Time To Resolution (MTTR) by 80% through centralized dashboards.",
      "Enabled proactive issue detection before systems experienced actual downtime.",
      "Eliminated the need to manually SSH into multiple servers to parse log files."
    ],
    technologies: ["Prometheus", "Grafana", "ELK Stack", "Docker", "Linux"],
    impactMetrics: {
      performance: { improvement: "80% MTTR Reduction" },
      deploymentTime: { before: "Hours to diagnose", after: "Minutes to diagnose", improvement: "90%" }
    },
    architecture: {
      components: ["Node Exporters", "Prometheus Server", "Grafana UI", "Logstash", "Elasticsearch", "Kibana"],
      pattern: "Centralized Observability"
    }
  },
  {
    id: 4,
    title: "End-to-End DevSecOps CI/CD Pipeline",
    subtitle: "Automated Deployments with SonarQube & Docker",
    category: "DevOps",
    featured: false,
    timeline: {
      start: "Nov 2025",
      end: "Dec 2025",
      duration: "4 weeks"
    },
    challenge: "Manual deployment processes were causing slow release cycles, and inconsistent environments led to bugs making it into production.",
    solution: [
      "Engineered automated CI/CD pipelines triggered by GitHub pushes.",
      "Integrated SonarQube as a Quality Gate to enforce static code analysis and block vulnerabilities.",
      "Wrote robust Dockerfiles to containerize the application, ensuring environment parity.",
      "Automated the build and push of immutable Docker images to a container registry.",
      "Deployed containers securely to target environments."
    ],
    impact: [
      "Decreased deployment time from manual hours to automated minutes.",
      "Prevented code with critical vulnerabilities from being merged into the main branch.",
      "Achieved 100% environment consistency between dev, staging, and production."
    ],
    technologies: ["GitHub Actions", "SonarQube", "Docker", "Linux", "Git"],
    impactMetrics: {
      deploymentTime: { before: "120 min", after: "5 min", improvement: "95%" },
      performance: { improvement: "Zero Prod Vulnerabilities" }
    },
    architecture: {
      components: ["Git Repository", "CI Runner", "SonarQube Server", "Docker Engine", "Container Registry"],
      pattern: "DevSecOps Pipeline"
    }
  }
];

const EnhancedCaseStudies: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<number | null>(caseStudies[0]?.id || null);
  const [activeTab, setActiveTab] = useState<'overview' | 'solution' | 'results'>('overview');

  const selectedStudyData = caseStudies.find(study => study.id === selectedStudy);

  const categories = ['All', 'DevOps', 'Cloud Infrastructure', 'Full-Stack'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredStudies = selectedCategory === 'All' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === selectedCategory);

  const getIconForMetric = (metric: string) => {
    switch (metric) {
      case 'deploymentTime': return <Zap className="w-5 h-5" />;
      case 'cost': return <TrendingUp className="w-5 h-5" />;
      case 'performance': return <BarChart3 className="w-5 h-5" />;
      case 'availability': return <Target className="w-5 h-5" />;
      case 'scalability': return <TrendingUp className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  return (
    <AnimatedBackground>
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 mt-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono text-[#00FF41]">
            <span className="text-[#FF4757]">&gt;</span> CASE_STUDIES.EXE
            <span className="terminal-cursor"></span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-3xl mx-auto font-mono">
            Executing infrastructure as code, migrating databases, and building robust DevSecOps pipelines.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          <StatsCard
            title="Projects Architected"
            value="4"
            icon={<FileText className="w-6 h-6" />}
            color="completed"
          />
          <StatsCard
            title="Deployment Speed"
            value="95%"
            change="Average CI/CD improvement"
            icon={<Zap className="w-6 h-6" />}
            color="completed"
            trend="up"
          />
          <StatsCard
            title="Architecture Uptime"
            value="99.99%"
            change="Multi-AZ Deployments"
            icon={<Target className="w-6 h-6" />}
            color="completed"
            trend="up"
          />
        </motion.div>

        {/* Study Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#00FF41] text-black font-bold'
                    : 'bg-[#0A0E11] text-[#00FF41] border border-neutral-800 hover:border-[#00FF41]'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredStudies.map((study) => (
              <motion.div
                key={study.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedStudy(study.id)}
                className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 ${
                  selectedStudy === study.id
                    ? 'bg-[#00FF41]/10 border-[#00FF41]'
                    : 'bg-[#0A0E11] border-neutral-800 hover:border-[#00FF41]/50'
                } ${study.featured ? 'ring-1 ring-[#E1B12C]/30' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <TechBadge name={study.category} category={study.category} size="sm" />
                  {study.featured && (
                    <span className="text-xs text-[#E1B12C] font-mono">⭐ Featured</span>
                  )}
                </div>
                
                <h3 className="text-[#C5CDD3] font-bold mb-1 text-sm line-clamp-2">
                  {study.title}
                </h3>
                
                <p className="text-neutral-500 text-xs mb-3 line-clamp-2 font-mono">
                  {study.subtitle}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-neutral-600 font-mono">
                  <Calendar className="w-3 h-3" />
                  <span>{study.timeline.duration}</span>
                  <span>•</span>
                  <span>{study.timeline.start} - {study.timeline.end}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Selected Study Details */}
        <AnimatePresence mode="wait">
          {selectedStudyData && (
            <motion.div
              key={selectedStudyData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#0A0E11] border border-neutral-800 rounded-lg overflow-hidden"
            >
              {/* Study Header */}
              <div className="p-6 border-b border-neutral-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <TechBadge name={selectedStudyData.category} category={selectedStudyData.category} />
                      {selectedStudyData.featured && (
                        <span className="text-xs text-[#E1B12C] font-mono">⭐ Featured Project</span>
                      )}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#C5CDD3] mb-2">
                      {selectedStudyData.title}
                    </h2>
                    <p className="text-[#00FF41] text-lg font-mono">
                      {selectedStudyData.subtitle}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-neutral-400 font-mono">
                    <div className="text-center">
                      <Calendar className="w-5 h-5 mx-auto mb-1 text-[#00FF41]" />
                      <p className="font-medium text-[#C5CDD3]">{selectedStudyData.timeline.start}</p>
                      <p className="text-xs">Start Date</p>
                    </div>
                    <div className="text-center">
                      <Clock className="w-5 h-5 mx-auto mb-1 text-[#00FF41]" />
                      <p className="font-medium text-[#C5CDD3]">{selectedStudyData.timeline.duration}</p>
                      <p className="text-xs">Duration</p>
                    </div>
                    <div className="text-center">
                      <CheckCircle className="w-5 h-5 mx-auto mb-1 text-[#00FF41]" />
                      <p className="font-medium text-[#C5CDD3]">{selectedStudyData.timeline.end}</p>
                      <p className="text-xs">Completion</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-neutral-800 font-mono">
                {[
                  { id: 'overview', label: 'Overview', icon: <FileText className="w-4 h-4" /> },
                  { id: 'solution', label: 'Solution', icon: <Code className="w-4 h-4" /> },
                  { id: 'results', label: 'Results', icon: <BarChart3 className="w-4 h-4" /> }
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ y: -2 }}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'text-[#00FF41] border-b-2 border-[#00FF41] bg-neutral-900/50'
                        : 'text-neutral-500 hover:text-[#00FF41]'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </motion.button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-[#00FF41] mb-4 flex items-center gap-2 font-mono">
                            <AlertCircle className="w-5 h-5" />
                            Challenge
                          </h3>
                          <p className="text-[#C5CDD3] leading-relaxed">
                            {selectedStudyData.challenge}
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800">
                          <div>
                            <h3 className="text-xl font-bold text-[#00FF41] mb-4 flex items-center gap-2 font-mono">
                              <Settings className="w-5 h-5" />
                              Technologies Used
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedStudyData.technologies.map((tech) => (
                                <TechBadge key={tech} name={tech} category={selectedStudyData.category} size="sm" />
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold text-[#00FF41] mb-4 flex items-center gap-2 font-mono">
                              <GitBranch className="w-5 h-5" />
                              Architecture Pattern
                            </h3>
                            <p className="text-[#C5CDD3] mb-2 font-medium">
                              {selectedStudyData.architecture?.pattern}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {selectedStudyData.architecture?.components.map((component) => (
                                <span key={component} className="px-2 py-1 bg-neutral-900 text-[#00FF41] text-xs font-mono rounded border border-neutral-800">
                                  {component}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'solution' && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-[#00FF41] mb-4 flex items-center gap-2 font-mono">
                          <Code className="w-5 h-5" />
                          Solution Approach
                        </h3>
                        <div className="space-y-4">
                          {selectedStudyData.solution.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-[#00FF41]/20 text-[#00FF41] border border-[#00FF41]/50 rounded-full flex items-center justify-center font-bold text-sm font-mono">
                                {index + 1}
                              </div>
                              <p className="text-[#C5CDD3] leading-relaxed flex-1 pt-1">
                                {item}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'results' && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-[#00FF41] mb-4 flex items-center gap-2 font-mono">
                          <BarChart3 className="w-5 h-5" />
                          Impact & Results
                        </h3>

                        {/* Impact Metrics */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                          {Object.entries(selectedStudyData.impactMetrics).map(([key, metrics]) => (
                            <div key={key} className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-[#00FF41]">{getIconForMetric(key)}</span>
                                <h4 className="font-bold text-[#C5CDD3] capitalize font-mono text-sm">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </h4>
                              </div>
                              
                              {key === 'deploymentTime' && metrics && (metrics as any).before && (metrics as any).after && (metrics as any).improvement && (
                                <div className="space-y-2 font-mono">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-neutral-500">Before</span>
                                    <span className="text-[#FF4757]">{(metrics as any).before}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-neutral-500">After</span>
                                    <span className="text-[#00FF41]">{(metrics as any).after}</span>
                                  </div>
                                  <div className="flex justify-between text-sm font-bold border-t border-neutral-800 pt-1 mt-1">
                                    <span className="text-neutral-400">Improvement</span>
                                    <span className="text-[#00FF41]">-{(metrics as any).improvement}</span>
                                  </div>
                                </div>
                              )}

                              {key === 'availability' && metrics && 'uptime' in metrics && (
                                <div className="space-y-2 font-mono">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-neutral-500">Uptime</span>
                                    <span className="text-[#00FF41]">{(metrics as any).uptime}</span>
                                  </div>
                                  <div className="flex justify-between text-sm font-bold border-t border-neutral-800 pt-1 mt-1">
                                    <span className="text-neutral-400">Improvement</span>
                                    <span className="text-[#00FF41]">+{(metrics as any).improvement}</span>
                                  </div>
                                </div>
                              )}

                              {key === 'scalability' && metrics && 'capacity' in metrics && (
                                <div className="space-y-2 font-mono">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-neutral-500">Capacity</span>
                                    <span className="text-[#00FF41]">{(metrics as any).capacity}</span>
                                  </div>
                                  <div className="flex justify-between text-sm font-bold border-t border-neutral-800 pt-1 mt-1">
                                    <span className="text-neutral-400">Improvement</span>
                                    <span className="text-[#00FF41]">+{(metrics as any).improvement}</span>
                                  </div>
                                </div>
                              )}

                              {key === 'performance' && metrics && 'improvement' in metrics && (
                                <div className="space-y-2 font-mono">
                                  <div className="flex justify-between text-sm font-bold">
                                    <span className="text-neutral-400">Result</span>
                                    <span className="text-[#00FF41]">{(metrics as any).improvement}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Impact List */}
                        <div className="space-y-3">
                          {selectedStudyData.impact.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 p-3 bg-[#00FF41]/5 border border-[#00FF41]/20 rounded-lg"
                            >
                              <CheckCircle className="w-5 h-5 text-[#00FF41] flex-shrink-0 mt-0.5" />
                              <p className="text-[#C5CDD3] leading-relaxed text-sm">{item}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-[#0A0E11] border border-neutral-800 rounded-lg p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00FF41]/5 to-transparent pointer-events-none" />
          
          <h2 className="text-2xl font-bold text-[#00FF41] mb-4 font-mono relative z-10">
            &gt; INIT_COLLABORATION
          </h2>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto font-mono relative z-10">
            Ready to implement highly available infrastructure or automated DevSecOps pipelines for your organization?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <InteractiveButton variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              Connect via LinkedIn
            </InteractiveButton>
            
            <InteractiveButton variant="outline" icon={<FileText className="w-4 h-4" />}>
              Download Full Resume
            </InteractiveButton>
          </div>
        </motion.section>
      </div>
    </AnimatedBackground>
  );
};

export default EnhancedCaseStudies;