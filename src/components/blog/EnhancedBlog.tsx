import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Search, 
  Tag,
  ArrowRight,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Star,
  Filter,
  Grid3X3,
  List,
  Zap,
  Target,
  Award,
  Code,
  Database,
  Cloud,
  Shield,
  X
} from 'lucide-react';
import { 
  AnimatedBackground, 
  TechBadge, 
  LoadingSkeleton, 
  StatsCard, 
  InteractiveButton, 
  CategoryFilter, 
  ViewToggle, 
  EngagementMetrics,
  categoryColors
} from '../visual/VisualComponents';

interface BlogPost {
  id: number;
  title: string;
  category: keyof typeof categoryColors;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  date: string;
  featured: boolean;
  views: string;
  likes: string;
  comments: string;
  excerpt: string;
  tags: string[];
  heroImage?: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Architecting a Secure Three-Tier Application on AWS",
    category: "Cloud Infrastructure",
    difficulty: "Intermediate",
    readTime: "10 min read",
    date: "2026-04-05",
    featured: true,
    views: "3.2k",
    likes: "215",
    comments: "34",
    excerpt: "Break down the network setup, compute layers, and database integration required to build a highly available and scalable web application from scratch.",
    tags: ["AWS", "VPC", "Architecture", "Security"],
    content: `
# Architecting a Secure Three-Tier Application on AWS

A three-tier architecture is the cornerstone of robust cloud application design. By separating the presentation, application, and data layers, we achieve high availability, scalability, and enhanced security.

## 1. The Network Foundation (VPC)
Security starts at the network level. We begin by provisioning a custom Virtual Private Cloud (VPC) spanning at least two Availability Zones (AZs) for fault tolerance.
- **Public Subnets:** House the NAT Gateways and Application Load Balancers (ALB).
- **Private Subnets (App):** House the EC2 Auto Scaling Groups. No direct internet access.
- **Private Subnets (DB):** House the RDS instances. Strictly isolated.

## 2. The Compute Layer
Traffic enters through the Internet Gateway and hits the ALB, which securely routes requests to our EC2 instances in the private subnets. By attaching an Auto Scaling Group (ASG) to this layer, the compute capacity dynamically scales based on CPU utilization or incoming request counts.

## 3. The Database Layer
For the data tier, we deploy Amazon RDS (Relational Database Service) in a Multi-AZ configuration. This ensures that if one AZ fails, AWS automatically fails over to a synchronous standby replica in the second AZ without manual intervention.

## Conclusion
By strictly enforcing Security Groups and Network ACLs between these tiers, we ensure that only the load balancer can talk to the application servers, and only the application servers can talk to the database.
    `
  },
  {
    id: 2,
    title: "Zero-Downtime Database Migrations",
    category: "Database",
    difficulty: "Advanced",
    readTime: "12 min read",
    date: "2026-03-28",
    featured: true,
    views: "4.1k",
    likes: "312",
    comments: "45",
    excerpt: "A technical deep-dive on the challenges of moving an on-premise MySQL database to the cloud using AWS Database Migration Service (DMS).",
    tags: ["AWS DMS", "MySQL", "Migration", "RDS"],
    content: `
# Zero-Downtime Database Migrations

Migrating a production database to the cloud is often considered the most high-risk operation in IT. Traditional "dump and restore" methods require hours of application downtime. The modern solution? Continuous replication.

## The Challenge
When moving an active, on-premise MySQL database to Amazon RDS, the application must remain online. Data is constantly changing during the migration process.

## The AWS DMS Solution
AWS Database Migration Service (DMS) solves this by utilizing Change Data Capture (CDC).
1. **The Replication Instance:** We provision a DMS instance that sits between the source (on-prem) and target (RDS) databases.
2. **Full Load:** DMS reads the source data and bulk-loads it into the target database.
3. **Ongoing Replication (CDC):** Once the full load is complete, DMS reads the MySQL binary logs (binlogs) from the source and continually applies new transactions to the target database in near real-time.

## The Cutover
Because the target database is continuously kept in sync, the actual "migration" requires virtually zero downtime. During a scheduled maintenance window, you simply update the application's DNS or connection strings to point to the new Amazon RDS endpoint.
    `
  },
  {
    id: 3,
    title: "Cost Optimization on AWS: Stop Wasting Cloud Spend",
    category: "Cloud Infrastructure",
    difficulty: "Beginner",
    readTime: "8 min read",
    date: "2026-03-15",
    featured: false,
    views: "2.8k",
    likes: "189",
    comments: "22",
    excerpt: "Practical tips for tracking and reducing cloud spend, such as using Spot Instances, right-sizing resources, and setting up billing alarms.",
    tags: ["FinOps", "AWS", "Cost Optimization", "EC2"],
    content: `
# Cost Optimization on AWS

The cloud offers infinite scalability, but it also offers infinite ways to accidentally drain your budget. Mastering FinOps (Financial Operations) is a critical skill for any DevOps engineer.

## 1. Right-Sizing Resources
The most common mistake is over-provisioning. Use AWS Compute Optimizer to analyze historical CloudWatch metrics. If your \`t3.large\` instance rarely spikes above 10% CPU utilization, downgrade it to a \`t3.medium\` and save 50% immediately.

## 2. Leverage Spot Instances
For stateless, fault-tolerant workloads (like batch processing, big data analytics, or containerized microservices), use EC2 Spot Instances. They allow you to bid on spare AWS compute capacity at up to a 90% discount compared to On-Demand prices.

## 3. Storage Lifecycle Policies
Don't keep 5-year-old log files in standard S3 storage. Implement S3 Lifecycle Rules to automatically transition older, infrequently accessed data to S3 Glacier, which costs a fraction of a penny per gigabyte.

## 4. Set Billing Alarms
Never get caught by surprise. Set up an AWS Budgets alarm that triggers an SNS notification to your Slack channel if your forecasted monthly spend exceeds your predefined threshold.
    `
  },
  {
    id: 4,
    title: "Dockerizing Applications for Beginners",
    category: "DevOps Tools",
    difficulty: "Beginner",
    readTime: "7 min read",
    date: "2026-03-01",
    featured: false,
    views: "5.5k",
    likes: "420",
    comments: "56",
    excerpt: "A step-by-step guide on creating efficient Dockerfiles, managing images, and the benefits of container portability.",
    tags: ["Docker", "Containers", "Microservices"],
    content: `
# Dockerizing Applications for Beginners

"It works on my machine!" is the oldest excuse in software engineering. Docker solves this by packaging the application, its dependencies, and its runtime environment into a single, portable container.

## Anatomy of a Dockerfile
A \`Dockerfile\` is the blueprint for your container. Let's look at a simple Node.js example:

\`\`\`dockerfile
# Use a lightweight base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY . .

# Expose the application port
EXPOSE 3000

# Define the startup command
CMD ["npm", "start"]
\`\`\`

## The Magic of Image Caching
Notice how we copy \`package.json\` and run \`npm install\` *before* copying the rest of the application code? Docker caches each step as a layer. If you only change your application's source code, Docker reuses the \`npm install\` cache layer, reducing your build time from minutes to seconds.

## Portability
Once built, this image will run exactly the same way on a developer's Macbook, an AWS EC2 instance, or a Kubernetes cluster. True write-once, run-anywhere deployment.
    `
  },
  {
    id: 5,
    title: "The Power of Infrastructure as Code (IaC)",
    category: "Cloud Infrastructure",
    difficulty: "Intermediate",
    readTime: "9 min read",
    date: "2026-02-20",
    featured: true,
    views: "3.8k",
    likes: "275",
    comments: "41",
    excerpt: "Why manually clicking through a cloud console is a thing of the past. Provisioning infrastructure using Terraform or AWS CloudFormation.",
    tags: ["Terraform", "IaC", "AWS", "Automation"],
    content: `
# The Power of Infrastructure as Code (IaC)

Clicking through the AWS Management Console to create servers, networks, and databases is fine for learning, but it is a disaster for production. It is slow, prone to human error, and impossible to replicate. 

Enter Infrastructure as Code (IaC).

## What is IaC?
IaC tools like HashiCorp Terraform and AWS CloudFormation allow you to define your entire infrastructure infrastructure using declarative code. 

Instead of clicking "Create VPC", you write:
\`\`\`hcl
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "Production-VPC"
  }
}
\`\`\`

## The Benefits
1. **Version Control:** Your infrastructure is stored in Git. You can track who changed a security group, when they changed it, and why.
2. **Reproducibility:** Need to spin up a Staging environment that mirrors Production exactly? Run \`terraform apply\` and it is built in minutes, bug-free.
3. **Disaster Recovery:** If a region goes down or an account is compromised, you don't have to rebuild manually. Your code is your ultimate backup.
    `
  },
  {
    id: 6,
    title: "Integrating Code Quality into Your CI/CD Pipeline",
    category: "Security",
    difficulty: "Intermediate",
    readTime: "8 min read",
    date: "2026-02-10",
    featured: false,
    views: "2.1k",
    likes: "156",
    comments: "19",
    excerpt: "Set up an end-to-end pipeline that builds Docker containers and uses SonarQube to catch bugs and vulnerabilities before production.",
    tags: ["CI/CD", "DevSecOps", "SonarQube", "GitHub Actions"],
    content: `
# Integrating Code Quality into CI/CD

Security and code quality shouldn't be an afterthought applied right before a release. DevSecOps dictates that we "shift left" by integrating automated checks directly into our Continuous Integration (CI) pipelines.

## The Quality Gate
Using a tool like SonarQube, we can establish a strict "Quality Gate." When a developer opens a Pull Request, the pipeline automatically compiles the code and runs a static application security testing (SAST) scan.

It analyzes the code for:
- Hardcoded credentials or API keys
- SQL injection vulnerabilities
- Code smells and technical debt
- Inadequate unit test coverage

## Automated Enforcement
If SonarQube detects that test coverage has dropped below 80%, or a critical vulnerability is found, the Quality Gate fails. The CI/CD pipeline stops immediately, and the Pull Request cannot be merged into the main branch.

By catching these issues in the pipeline, we prevent bad code from ever being containerized or deployed to production servers, saving countless hours of debugging down the line.
    `
  },
  {
    id: 7,
    title: "Building a Complete Observability Stack",
    category: "DevOps",
    difficulty: "Advanced",
    readTime: "11 min read",
    date: "2026-01-25",
    featured: false,
    views: "3.5k",
    likes: "289",
    comments: "38",
    excerpt: "Go beyond basic monitoring by integrating Prometheus for metrics, Grafana for visualization, and ELK or Loki for centralized logging.",
    tags: ["Observability", "Prometheus", "Grafana", "ELK"],
    content: `
# Building a Complete Observability Stack

Monitoring tells you *if* a system is broken. Observability tells you *why* it's broken. To achieve true observability, you need three pillars: Metrics, Logs, and Traces.

## The Metrics Engine: Prometheus & Grafana
Prometheus uses a pull-based model. You install exporters (like Node Exporter for Linux metrics or cAdvisor for containers) on your servers. Prometheus scrapes these endpoints every 15 seconds, storing massive amounts of time-series data efficiently.

We then connect Grafana to Prometheus to build beautiful, dynamic dashboards that visualize CPU spikes, memory leaks, and network latency in real-time.

## The Logging Engine: ELK Stack / Loki
When a 500 Error spikes on your Grafana dashboard, you need to see the application logs from that exact millisecond. 
Using the ELK stack (Elasticsearch, Logstash, Kibana) or Grafana Loki, we deploy lightweight agents (like Promtail or Filebeat) to automatically ship all server and container logs to a centralized database.

## The Result
Instead of SSH-ing into 10 different servers and running \`grep\` commands during a 3:00 AM outage, engineers can view correlated metrics and logs in a single pane of glass, reducing Mean Time to Resolution (MTTR) dramatically.
    `
  },
  {
    id: 8,
    title: "Logs vs. Metrics: Building a Reliable Monitoring Strategy",
    category: "DevOps",
    difficulty: "Beginner",
    readTime: "6 min read",
    date: "2026-01-12",
    featured: false,
    views: "1.9k",
    likes: "134",
    comments: "15",
    excerpt: "Understand the difference between logs and metrics, when to rely on which, and how to configure actionable alerts without causing alert fatigue.",
    tags: ["Monitoring", "Alerting", "DevOps"],
    content: `
# Logs vs. Metrics: A Monitoring Strategy

If you want to maintain reliable systems, you need to understand the fundamental difference between metrics and logs, and how to use them together.

## What are Metrics?
Metrics are numbers measured over time. Examples include "CPU usage is at 85%" or "Database query latency is 200ms." Metrics are incredibly lightweight to store and query. 
**Best Use Case:** Triggering alerts. You should configure your Alertmanager to page the on-call engineer when a critical metric crosses a threshold.

## What are Logs?
Logs are immutable records of discrete events. Examples include "User John failed authentication at 10:45 AM due to incorrect password." Logs contain rich, unstructured data and consume significant storage space.
**Best Use Case:** Debugging and forensic analysis. You dive into logs *after* an alert has been triggered by a metric.

## Avoiding Alert Fatigue
The golden rule of monitoring: **Only alert on symptoms, not causes.**
Don't set up a PagerDuty alert that wakes someone up because "CPU is high." Set up an alert because "The website is taking 5 seconds to load." High CPU is a cause; slow response time is the symptom that actually impacts the user.
    `
  },
  {
    id: 9,
    title: "Jenkins vs. GitHub Actions: Choosing the Right CI/CD Tool",
    category: "DevOps Tools",
    difficulty: "Intermediate",
    readTime: "8 min read",
    date: "2025-12-28",
    featured: false,
    views: "4.8k",
    likes: "390",
    comments: "62",
    excerpt: "A practical comparison based on real-world use cases. The shift from self-hosted, plugin-heavy Jenkins setups to managed, YAML-based GitHub Actions.",
    tags: ["CI/CD", "Jenkins", "GitHub Actions"],
    content: `
# Jenkins vs. GitHub Actions

For a decade, Jenkins was the undisputed king of Continuous Integration. Today, modern, managed tools like GitHub Actions are rapidly taking over. Which should you choose?

## Jenkins: The Veteran
Jenkins is open-source, highly customizable, and can run anywhere. 
**The Pros:** It has a plugin for literally everything. If you have complex, legacy enterprise requirements or need to run builds on highly restricted, air-gapped on-premise hardware, Jenkins is unmatched.
**The Cons:** You have to host it, patch it, and secure it yourself. "Jenkins Administrator" can quickly become a full-time job. Plugin dependency hell is a real threat.

## GitHub Actions: The Modern Standard
GitHub Actions integrates CI/CD directly into your code repository.
**The Pros:** It is a fully managed SaaS. There are no servers to maintain. Pipelines are written in clean, declarative YAML files stored directly in your repo. It has a massive marketplace of community-built actions.
**The Cons:** If you have highly specific, bespoke build environments, running custom GitHub Runners can sometimes be tricky compared to a dedicated Jenkins node.

**Verdict:** For new cloud-native projects and microservices, GitHub Actions is the clear winner for its speed and zero-maintenance overhead.
    `
  },
  {
    id: 10,
    title: "GitOps in Practice: Continuous Deployment with ArgoCD",
    category: "DevOps",
    difficulty: "Advanced",
    readTime: "10 min read",
    date: "2025-12-10",
    featured: true,
    views: "3.9k",
    likes: "345",
    comments: "51",
    excerpt: "Explain the concept of GitOps and why the pull-based deployment model is taking over Kubernetes management to prevent configuration drift.",
    tags: ["GitOps", "ArgoCD", "Kubernetes", "EKS"],
    content: `
# GitOps in Practice with ArgoCD

GitOps is a paradigm shift in how we handle continuous deployment. It dictates that your Git repository should be the single source of truth for both your application code *and* your infrastructure declarations.

## The Problem with "Push" CI/CD
In traditional CI/CD (like Jenkins or GitLab CI), the pipeline authenticates into your Kubernetes cluster and runs \`kubectl apply\` to push changes. This requires giving your CI server admin credentials to your production cluster—a massive security risk. Furthermore, if someone manually edits a deployment inside the cluster, the CI tool has no idea, leading to "configuration drift."

## The ArgoCD "Pull" Model
ArgoCD sits *inside* your Kubernetes cluster. Instead of pushing to the cluster, ArgoCD continuously monitors your Git repository. 

If a developer merges a change to a deployment YAML in Git, ArgoCD detects the change, pulls the new configuration, and applies it to the cluster automatically. 

## Self-Healing Clusters
Because ArgoCD is constantly comparing the live cluster state against the Git repository, it detects configuration drift immediately. If an engineer manually alters a replica count via the CLI, ArgoCD recognizes it violates the Git truth and instantly overwrites the manual change, restoring the cluster to its desired state.
    `
  },
  {
    id: 11,
    title: "Demystifying Istio: Why Your Kubernetes Cluster Needs a Service Mesh",
    category: "Cloud Infrastructure",
    difficulty: "Advanced",
    readTime: "9 min read",
    date: "2025-11-22",
    featured: false,
    views: "2.6k",
    likes: "198",
    comments: "27",
    excerpt: "Focus on the core problems Istio solves for microservices—secure communication (mTLS), intelligent traffic routing, and deep network observability.",
    tags: ["Istio", "Service Mesh", "Kubernetes", "Security"],
    content: `
# Demystifying Istio Service Mesh

As organizations break monoliths down into dozens of microservices, managing how these services communicate with each other inside a Kubernetes cluster becomes a nightmare. This is where a Service Mesh like Istio comes in.

## How it Works
Istio injects a lightweight "sidecar proxy" (Envoy) into every single pod in your cluster. From that point on, microservice A never talks directly to microservice B. Instead, the proxy for service A talks to the proxy for service B. 

By intercepting all traffic at the network level, Istio solves three massive problems without requiring any changes to the application code:

## 1. Zero-Trust Security (mTLS)
Istio automatically encrypts all traffic between pods using Mutual TLS. Even if an attacker breaches your internal cluster network, they cannot intercept or decipher the traffic flowing between your microservices.

## 2. Advanced Traffic Management
Need to test a new version of your API? Istio allows you to perform Canary Deployments. You can route exactly 5% of user traffic to v2 of your application, and 95% to v1, monitoring error rates before rolling it out entirely.

## 3. Deep Observability
Because every request passes through an Envoy proxy, Istio generates detailed metrics on latency, error rates, and traffic volume between services, generating visual topology maps out of the box.
    `
  }
];

const categories = ['All', 'Cloud Infrastructure', 'DevOps', 'DevOps Tools', 'Database', 'Security'];

const EnhancedBlog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'likes'>('date');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogViews, setBlogViews] = useState<{[key: number]: number}>({});

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return parseFloat(b.views) - parseFloat(a.views);
        case 'likes':
          return parseInt(b.likes) - parseInt(a.likes);
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return filtered;
  }, [selectedCategory, searchTerm, sortBy]);

  const featuredPosts = blogPosts.filter(post => post.featured);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setBlogViews(prev => ({
      ...prev,
      [post.id]: (prev[post.id] || parseFloat(post.views) * 1000) + 1
    }));
  };

  const getPostViews = (post: BlogPost) => {
    const views = blogViews[post.id] || parseFloat(post.views) * 1000;
    return views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views.toString();
  };

  const getTotalViews = () => {
    return blogPosts.reduce((total, post) => {
      return total + (blogViews[post.id] || parseFloat(post.views) * 1000);
    }, 0);
  };

  const totalViews = getTotalViews();
  const totalViewsFormatted = totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews.toString();

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
            <span className="text-[#FF4757]">&gt;</span> TECH_BLOG.EXE
            <span className="terminal-cursor"></span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto font-mono">
            Technical write-ups, architecture breakdowns, and DevSecOps implementations.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <StatsCard
            title="Total Articles"
            value={blogPosts.length}
            icon={<BookOpen className="w-6 h-6" />}
            color="completed"
          />
          <StatsCard
            title="Total Views"
            value={totalViewsFormatted}
            change="Real-time tracking"
            icon={<Eye className="w-6 h-6" />}
            color="completed"
            trend="up"
          />
          <StatsCard
            title="Engagement Rate"
            value="84%"
            change="Active readership"
            icon={<Heart className="w-6 h-6" />}
            color="completed"
            trend="up"
          />
          <StatsCard
            title="Avg. Read Time"
            value="9 min"
            change="In-depth tutorials"
            icon={<Clock className="w-6 h-6" />}
            color="completed"
            trend="up"
          />
        </motion.div>

        {/* Featured Posts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-mono font-bold mb-6 text-[#00FF41] flex items-center gap-2">
            <Star className="w-6 h-6" />
            Featured Architectures
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <motion.article
                key={post.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => handlePostClick(post)}
                className="bg-[#0A0E11] border border-neutral-800 rounded-lg overflow-hidden cursor-pointer group hover:border-[#00FF41] transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TechBadge name={post.category} category={post.category} size="sm" />
                    <span className="text-xs text-[#E1B12C] font-mono">⭐ Featured</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#C5CDD3] mb-3 group-hover:text-[#00FF41] transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-neutral-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <EngagementMetrics
                      views={getPostViews(post)}
                      likes={post.likes}
                      comments={post.comments}
                      featured={post.featured}
                    />
                    
                    <div className="flex items-center gap-4 text-xs text-neutral-500 font-mono">
                      <span>{post.readTime}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-neutral-900 text-[#00FF41] text-xs font-mono rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search architectures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0A0E11] border border-neutral-800 rounded-lg text-[#C5CDD3] placeholder-neutral-500 focus:outline-none focus:border-[#00FF41] font-mono text-sm"
            />
          </div>
          
          <CategoryFilter
            categories={categories.filter(c => c !== 'All')}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <ViewToggle view={view} onViewChange={setView} />
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'views' | 'likes')}
            className="px-4 py-2 bg-[#0A0E11] border border-neutral-800 rounded-lg text-[#C5CDD3] focus:outline-none focus:border-[#00FF41] font-mono text-sm"
          >
            <option value="date">Latest</option>
            <option value="views">Most Viewed</option>
            <option value="likes">Most Liked</option>
          </select>
        </motion.div>

        {/* Blog Posts Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchTerm}-${view}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={view === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
            }
          >
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handlePostClick(post)}
                className="bg-[#0A0E11] border border-neutral-800 rounded-lg overflow-hidden cursor-pointer group hover:border-[#00FF41] transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <TechBadge name={post.category} category={post.category} size="sm" />
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-mono rounded ${
                        post.difficulty === 'Beginner' ? 'bg-[#00FF41]/10 text-[#00FF41]' :
                        post.difficulty === 'Intermediate' ? 'bg-[#E1B12C]/10 text-[#E1B12C]' :
                        'bg-[#FF4757]/10 text-[#FF4757]'
                      }`}>
                        {post.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#C5CDD3] mb-3 group-hover:text-[#00FF41] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-neutral-400 mb-4 line-clamp-3 text-sm">
                    {post.excerpt}
                  </p>
                  
                  <EngagementMetrics
                    views={getPostViews(post)}
                    likes={post.likes}
                    comments={post.comments}
                    featured={post.featured}
                  />
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-800">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-neutral-900 text-[#00FF41] text-xs font-mono rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono">
                      <span>{post.readTime}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-[#00FF41] transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-xl font-mono text-neutral-400 mb-2">No data found in directory</h3>
            <p className="text-neutral-500 text-sm">Try executing a different search query</p>
          </motion.div>
        )}

        {/* Blog Post Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0A0E11] border border-[#00FF41]/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.1)] flex flex-col"
              >
                <div className="p-6 border-b border-neutral-800 flex-shrink-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <TechBadge name={selectedPost.category} category={selectedPost.category} size="sm" />
                      <span className={`px-2 py-1 text-xs font-mono rounded ${
                        selectedPost.difficulty === 'Beginner' ? 'bg-[#00FF41]/10 text-[#00FF41]' :
                        selectedPost.difficulty === 'Intermediate' ? 'bg-[#E1B12C]/10 text-[#E1B12C]' :
                        'bg-[#FF4757]/10 text-[#FF4757]'
                      }`}>
                        {selectedPost.difficulty}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="text-neutral-500 hover:text-[#FF4757] transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#C5CDD3] mb-2">
                    {selectedPost.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-neutral-500 font-mono">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedPost.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{getPostViews(selectedPost)} views</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 overflow-y-auto flex-grow custom-scrollbar">
                  <div className="prose prose-invert max-w-none">
                    {selectedPost.content.split('\n').map((paragraph, index) => {
                      if (paragraph.startsWith('# ')) {
                        return <h1 key={index} className="text-2xl font-bold text-[#00FF41] mb-4 font-mono">&gt; {paragraph.substring(2)}</h1>;
                      } else if (paragraph.startsWith('## ')) {
                        return <h2 key={index} className="text-xl font-bold text-[#C5CDD3] mb-3 mt-6 border-b border-neutral-800 pb-2">{paragraph.substring(3)}</h2>;
                      } else if (paragraph.startsWith('- ')) {
                        return <li key={index} className="text-neutral-300 ml-4 mb-1 list-disc">{paragraph.substring(2)}</li>;
                      } else if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ')) {
                        return <li key={index} className="text-neutral-300 ml-4 mb-2 font-bold">{paragraph.substring(3)}</li>;
                      } else if (paragraph.startsWith('```')) {
                        const isClosing = paragraph === '```' || paragraph === '```hcl' || paragraph === '```dockerfile';
                        if (isClosing) {
                          return <div key={index}></div>;
                        }
                        return <div key={index} className="mt-4 mb-1 text-xs text-[#E1B12C] font-mono">--- Code Block ---</div>;
                      } else if (paragraph.startsWith('resource ') || paragraph.startsWith('FROM ') || paragraph.startsWith('WORKDIR ') || paragraph.startsWith('COPY ') || paragraph.startsWith('RUN ') || paragraph.startsWith('EXPOSE ') || paragraph.startsWith('CMD ') || paragraph.startsWith('  cidr_block') || paragraph.startsWith('  tags =') || paragraph.startsWith('}')) {
                         return <pre key={index} className="bg-black border border-neutral-800 p-2 rounded-lg my-1 overflow-x-auto"><code className="text-[#E1B12C] font-mono text-sm">{paragraph}</code></pre>;
                      } else if (paragraph.trim()) {
                        // highlight bold text
                        let formattedText = paragraph;
                        if(paragraph.includes('**')) {
                             const parts = paragraph.split('**');
                             return <p key={index} className="text-neutral-300 leading-relaxed mb-4">
                                {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part)}
                             </p>
                        }
                        return <p key={index} className="text-neutral-300 leading-relaxed mb-4">{paragraph}</p>;
                      }
                      return <br key={index} />;
                    })}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-neutral-800">
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-neutral-900 text-[#00FF41] text-sm font-mono rounded-full border border-neutral-800">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedBackground>
  );
};

export default EnhancedBlog;