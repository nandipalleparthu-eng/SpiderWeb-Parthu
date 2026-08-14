export type NodeType = 
  | 'central' 
  | 'category' 
  | 'project' 
  | 'skill' 
  | 'mission' 
  | 'profile' 
  | 'social' 
  | 'experiment';

export type CategoryDomain = 'ai' | 'web' | 'cyber' | 'iot' | 'core' | 'hackathon';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  category: CategoryDomain;
  subtitle?: string;
  description?: string;
  level?: number; // 0 for root, 1 for main branches, 2 for leaves, 3 for sub-items
  radius: number;
  color: string;
  highlightColor?: string;
  iconName?: string;
  targetId?: string; // ID for linking to detailed modal/casefile
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  mass?: number;
  pinned?: boolean;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  color?: string;
  dashed?: boolean;
  distance?: number;
  strength?: number;
  width?: number;
  pulseSpeed?: number;
}

export interface ProjectDetail {
  id: string;
  title: string;
  codeName: string;
  tagline: string;
  status: 'ACTIVE BUILD' | 'STABLE RELEASE' | 'RESEARCH LAB' | 'DEPLOYED';
  category: string;
  domain: CategoryDomain;
  isFlagship?: boolean;
  clearanceLevel: string;
  
  // Case File Core
  problem: string;
  solution: string;
  aiArchitecture?: string;
  localAiDetails?: string;
  
  // ARTHA Flagship Specific Sub-views
  sectorViews?: {
    id: string;
    name: string;
    role: string;
    description: string;
    features: string[];
    metrics: string;
    badge: string;
  }[];
  
  // Technical Breakdown
  techStack: {
    name: string;
    category: 'Frontend' | 'Backend' | 'AI / ML' | 'Security' | 'Hardware / IoT' | 'Database' | 'DevOps';
    highlight?: boolean;
  }[];
  
  // Links
  primaryLiveUrl?: string;
  otherBuilds?: {
    label: string;
    url: string;
    note: string;
  }[];
  githubUrl?: string;
  documentationUrl?: string;
  
  // Contribution
  teamRole: string;
  keyContributions: string[];
  skillsUsed: string[];
}

export interface HackathonMission {
  id: string;
  name: string;
  codeName: string;
  event: string;
  date: string;
  role: string;
  problem: string;
  project: string;
  projectId?: string;
  technologies: string[];
  outcome: string;
  status: 'COMPLETED' | 'CHAMPION / FINALIST' | 'DEPLOYED SPRINT';
  demoUrl?: string;
  githubUrl?: string;
  learnings: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'AI / ML' | 'WEB DEVELOPMENT' | 'CYBERSECURITY' | 'IoT' | 'LANGUAGES';
  domain: CategoryDomain;
  proficiency: 'ADVANCED' | 'PROFICIENT' | 'EXPERIMENTING';
  summary: string;
  connectedProjectIds: string[];
  coreConcepts: string[];
}

export interface ProfileDossier {
  name: string;
  handle: string;
  title: string;
  subtitle: string;
  education: {
    degree: string;
    institution: string;
    specialization: string;
    period: string;
  };
  identityStatement: string;
  evolutionSteps: {
    phase: 'LEARN' | 'BUILD' | 'EXPERIMENT' | 'COMPETE' | 'SHIP';
    tagline: string;
    description: string;
  }[];
  coreDomains: {
    title: string;
    description: string;
    icon: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
    handle: string;
    action: string;
  }[];
  email: string;
  accolades?: {
    title: string;
    event: string;
    achievement: string;
    badge: string;
    description: string;
  }[];
  linkedInMetrics?: {
    followers: string;
    connections: string;
    status: string;
  };
}
