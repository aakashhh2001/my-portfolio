export const HERO_CONTENT = "Building scalable systems from code to cloud. AWS DevOps Engineer specializing in highly available infrastructure, zero-downtime migrations, and secure CI/CD pipelines. Passionate about automating the software delivery lifecycle.";

export const ABOUT_TEXT = "I design, automate, and deploy systems that turn code into production-grade reality. I am an AWS DevOps Engineer based in Bangalore, currently completing my Bachelor of Engineering in Computer Science at SNS College of Engineering. My journey into cloud infrastructure accelerated through an intensive 9-month specialized training program in AWS DevOps, where I mastered turning infrastructure into code and automating deployments.\n\nI hold multiple technical certifications, including Cloud Computing and Distributed Systems, Migrating to the AWS Cloud, and Architecting Solutions on AWS. I specialize in designing highly available three-tier architectures, executing seamless database migrations using AWS DMS, and building robust DevSecOps CI/CD pipelines with tools like Docker, GitHub Actions, and SonarQube. For me, DevOps isn't just about speed—it's about precision, observability, and creating resilient systems that scale confidently.";

export const SKILLS = [
  // Top Featured Core Stack (These first 8 will show on the Home Page)
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'containers', level: 90 },
  { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', category: 'containers', level: 85 },
  { name: 'Terraform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg', category: 'infrastructure', level: 85 },
  { name: 'Ansible', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg', category: 'infrastructure', level: 80 },
  { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', category: 'devops', level: 85 },
  { name: 'GitHub Actions', icon: 'https://cdn.simpleicons.org/githubactions/2088FF', category: 'devops', level: 85 },
  { name: 'Prometheus', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg', category: 'observability', level: 85 },
  { name: 'Grafana', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg', category: 'observability', level: 85 },

  // Cloud Platforms
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'cloud', level: 90 },
  { name: 'Load Balancing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'cloud', level: 85 },
  { name: 'Auto Scaling', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'cloud', level: 85 },
  
  // Advanced Containers & Orchestration
  { name: 'Helm', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/helm/helm-original.svg', category: 'containers', level: 80 },
  { name: 'Istio', icon: 'https://cdn.simpleicons.org/istio/466CCC', category: 'containers', level: 75 },
  { name: 'ArgoCD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/argocd/argocd-original.svg', category: 'containers', level: 80 },

  // CI/CD & Version Control
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'devops', level: 90 },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', category: 'devops', level: 90 },
  { name: 'Maven', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg', category: 'devops', level: 80 },

  // Programming Languages
  { name: 'Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg', category: 'programming', level: 85 },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'programming', level: 80 },

  // Security & Databases
  { name: 'SonarQube', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg', category: 'observability', level: 85 },
  { name: 'AWS RDS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'database', level: 90 },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'database', level: 90 },
];

export const PROJECTS = [
  {
    title: 'Zero-Downtime Database Migration',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Architected and executed a seamless database migration from an on-premise MySQL server to a Multi-AZ Amazon RDS instance using AWS Database Migration Service (DMS) with continuous Change Data Capture (CDC).',
    technologies: ['AWS DMS', 'Amazon RDS', 'MySQL', 'AWS VPC'],
    category: 'Cloud Infrastructure',
    githubLink: 'https://github.com/yourusername/aws-dms-migration',
    websiteLink: '',
  },
  {
    title: 'Highly Available Three-Tier Architecture',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Designed a fault-tolerant AWS infrastructure blueprint featuring isolated public/private subnets, Application Load Balancers, EC2 Auto Scaling Groups, and Multi-AZ RDS for enterprise workloads.',
    technologies: ['AWS VPC', 'EC2', 'Auto Scaling', 'ALB', 'RDS'],
    category: 'Cloud Infrastructure',
    githubLink: 'https://github.com/yourusername/aws-three-tier-vpc',
    websiteLink: '',
  },
  {
    title: 'DevSecOps CI/CD Pipeline',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Engineered an automated end-to-end deployment pipeline utilizing GitHub Actions. Integrated SonarQube as a strict security/quality gate, and implemented Docker for immutable containerized deployments.',
    technologies: ['GitHub Actions', 'SonarQube', 'Docker', 'Linux', 'Git'],
    category: 'DevOps',
    githubLink: 'https://github.com/yourusername/devsecops-pipeline',
    websiteLink: '',
  },
  {
    title: 'Full Observability Stack',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Deployed a comprehensive monitoring solution to drastically reduce MTTR. Configured Prometheus to scrape system metrics, built dynamic Grafana dashboards, and integrated the ELK stack for centralized log aggregation.',
    technologies: ['Prometheus', 'Grafana', 'ELK Stack', 'Docker'],
    category: 'DevOps',
    githubLink: 'https://github.com/yourusername/observability-stack',
    websiteLink: '',
  }
];

export const CONTACT = {
  address: 'Bangalore, Karnataka, India',
  phoneNo: '+91 7907157798', 
  email: 'akashk082001@gmail.com',
  social: {
    github: 'https://github.com/aakashhh2001',
    linkedin: 'https://www.linkedin.com/in/akash2001/',
    twitter: 'https://twitter.com/yourusername', // Update or leave as placeholder
  }
};

export const SKILLS_BY_CATEGORY = {
  cloud: SKILLS.filter(skill => skill.category === 'cloud'),
  containers: SKILLS.filter(skill => skill.category === 'containers'),
  infrastructure: SKILLS.filter(skill => skill.category === 'infrastructure'),
  devops: SKILLS.filter(skill => skill.category === 'devops'),
  observability: SKILLS.filter(skill => skill.category === 'observability'),
  database: SKILLS.filter(skill => skill.category === 'database'),
  programming: SKILLS.filter(skill => skill.category === 'programming'),
};

export const PROJECTS_BY_CATEGORY = {
  all: PROJECTS,
  cloud: PROJECTS.filter(project => project.category === 'Cloud Infrastructure'),
  devops: PROJECTS.filter(project => project.category === 'DevOps'),
};