// ============================================
// SOLACE LAB - Projects Data
// Portfolio/Case Studies Collection
// ============================================

import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '01',
    slug: 'praktika-ecosystem',
    title: 'Praktika Ecosystem',
    category: 'engineering',
    domain: 'Healthcare Education Platform',
    year: 2024,
    abstract:
      'A comprehensive digital ecosystem revolutionizing clinical education through AI-powered assessment, real-time collaboration, and seamless interoperability with healthcare systems.',
    thumbnail: '/images/work/praktika-thumb.webp',
    heroImage: '/images/work/praktika-hero.webp',
    client: 'Multiple Universities',
    duration: '18 months',
    status: 'ongoing',
    techStack: [
      { name: 'Next.js', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'Redis', category: 'database' },
      { name: 'Docker', category: 'infrastructure' },
      { name: 'Cloudflare', category: 'infrastructure' },
    ],
    architecture: {
      diagram: 'praktika-arch',
      description:
        'Microservices architecture with event-driven communication, supporting real-time collaboration and offline-first capabilities.',
    },
    features: [
      'AI-powered clinical assessment engine',
      'Real-time collaborative case studies',
      'FHIR-compliant data exchange',
      'Offline-first mobile experience',
      'Advanced analytics dashboard',
    ],
    deployment: {
      platform: 'Cloudflare Workers + R2',
      infrastructure: 'Edge-first, globally distributed',
    },
    codeUrl: 'https://github.com/solace-lab/praktika',
  },
  {
    id: '02',
    slug: 'national-data-exchange',
    title: 'National Health Data Exchange',
    category: 'research',
    domain: 'Health Policy & Interoperability',
    year: 2023,
    abstract:
      'A comprehensive policy framework and technical specification for establishing a national health information exchange system, enabling secure, standardized data sharing across public and private healthcare institutions.',
    thumbnail: '/images/work/nhde-thumb.webp',
    heroImage: '/images/work/nhde-hero.webp',
    client: 'Ministry of Health',
    duration: '24 months',
    status: 'completed',
    keyFindings: [
      { label: 'Healthcare Facilities', value: '2,847', unit: 'institutions', description: 'Connected to the network' },
      { label: 'Data Standards', value: '98.7', unit: '%', description: 'FHIR R4 compliance rate' },
      { label: 'Patient Records', value: '45M+', description: 'Unified patient identifiers' },
      { label: 'Response Time', value: '<200', unit: 'ms', description: 'Average query latency' },
    ],
    methodology:
      'Mixed-methods approach combining quantitative analysis of existing health data systems, qualitative stakeholder interviews, and iterative policy prototyping with technical validation.',
    impactAreas: [
      'Reduced duplicate testing by 34%',
      'Improved emergency care continuity',
      'Enhanced public health surveillance',
      'Standardized national health coding',
    ],
    mapData: {
      regions: ['Java', 'Sumatra', 'Kalimantan', 'Sulawesi', 'Papua'],
      coverage: '85% of population',
    },
    collaborators: ['WHO Indonesia', 'BPJS Kesehatan', 'Kemenkes RI'],
    citations: 47,
  },
  {
    id: '03',
    slug: 'epidemic-intelligence',
    title: 'Epidemic Intelligence Platform',
    category: 'engineering',
    domain: 'Disease Surveillance System',
    year: 2024,
    abstract:
      'Real-time epidemiological surveillance platform leveraging machine learning for early outbreak detection, predictive modeling, and automated public health response coordination.',
    thumbnail: '/images/work/epi-thumb.webp',
    heroImage: '/images/work/epi-hero.webp',
    client: 'Provincial Health Office',
    duration: '12 months',
    status: 'completed',
    techStack: [
      { name: 'Python', category: 'backend' },
      { name: 'FastAPI', category: 'backend' },
      { name: 'React', category: 'frontend' },
      { name: 'D3.js', category: 'frontend' },
      { name: 'TensorFlow', category: 'tools' },
      { name: 'TimescaleDB', category: 'database' },
      { name: 'Apache Kafka', category: 'infrastructure' },
    ],
    architecture: {
      diagram: 'epi-arch',
      description:
        'Stream processing architecture with ML inference pipeline for real-time anomaly detection and predictive analytics.',
    },
    features: [
      'Real-time syndromic surveillance',
      'ML-powered outbreak prediction',
      'Automated alert system',
      'GIS-integrated visualization',
      'Mobile field reporting app',
    ],
    deployment: {
      platform: 'Kubernetes on GCP',
      infrastructure: 'High-availability cluster with auto-scaling',
    },
  },
  {
    id: '04',
    slug: 'community-health-mapping',
    title: 'Community Health Mapping Initiative',
    category: 'research',
    domain: 'Public Health Analytics',
    year: 2023,
    abstract:
      'Geospatial analysis and community-based participatory research to identify health disparities, map social determinants of health, and inform targeted intervention strategies across underserved regions.',
    thumbnail: '/images/work/chm-thumb.webp',
    heroImage: '/images/work/chm-hero.webp',
    client: 'UNICEF Indonesia',
    duration: '18 months',
    status: 'completed',
    keyFindings: [
      { label: 'Villages Surveyed', value: '1,234', description: 'Across 5 provinces' },
      { label: 'Health Indicators', value: '87', description: 'Tracked systematically' },
      { label: 'Community Workers', value: '450+', description: 'Trained in data collection' },
      { label: 'Intervention Reach', value: '2.3M', unit: 'people', description: 'Benefiting from findings' },
    ],
    methodology:
      'Community-based participatory research (CBPR) combined with GIS analysis, utilizing mobile data collection and satellite imagery for comprehensive health mapping.',
    impactAreas: [
      'Identified 15 priority intervention zones',
      'Informed resource allocation decisions',
      'Created replicable methodology framework',
      'Established community health baselines',
    ],
    collaborators: ['UNICEF', 'Puskesmas Network', 'Local Universities'],
    citations: 23,
  },
  {
    id: '05',
    slug: 'clinical-decision-support',
    title: 'Clinical Decision Support System',
    category: 'engineering',
    domain: 'Healthcare AI Application',
    year: 2024,
    abstract:
      'Evidence-based clinical decision support system integrating with EHR workflows to provide real-time diagnostic suggestions, drug interaction alerts, and personalized treatment recommendations.',
    thumbnail: '/images/work/cdss-thumb.webp',
    heroImage: '/images/work/cdss-hero.webp',
    client: 'Hospital Network Consortium',
    duration: '20 months',
    status: 'ongoing',
    techStack: [
      { name: 'Java', category: 'backend' },
      { name: 'Spring Boot', category: 'backend' },
      { name: 'React', category: 'frontend' },
      { name: 'Neo4j', category: 'database' },
      { name: 'OpenAI', category: 'tools' },
      { name: 'HL7 FHIR', category: 'tools' },
    ],
    architecture: {
      diagram: 'cdss-arch',
      description:
        'Knowledge graph-based architecture with LLM integration for natural language clinical queries and evidence synthesis.',
    },
    features: [
      'Context-aware diagnostic suggestions',
      'Drug-drug interaction checking',
      'Evidence-based treatment pathways',
      'Natural language query interface',
      'Audit trail and explainability',
    ],
    deployment: {
      platform: 'On-premise + Hybrid Cloud',
      infrastructure: 'HIPAA-compliant infrastructure with air-gapped options',
    },
  },
  {
    id: '06',
    slug: 'maternal-health-policy',
    title: 'Maternal Health Policy Framework',
    category: 'policy',
    domain: 'Health Policy Research',
    year: 2022,
    abstract:
      'Comprehensive policy analysis and framework development for improving maternal and neonatal health outcomes through evidence-based interventions, health system strengthening, and community engagement strategies.',
    thumbnail: '/images/work/mhpf-thumb.webp',
    heroImage: '/images/work/mhpf-hero.webp',
    client: 'World Bank Indonesia',
    duration: '15 months',
    status: 'completed',
    keyFindings: [
      { label: 'Maternal Mortality', value: '-28', unit: '%', description: 'Reduction in pilot areas' },
      { label: 'Facility Births', value: '+42', unit: '%', description: 'Increase in skilled attendance' },
      { label: 'Antenatal Visits', value: '4.2', unit: 'avg', description: 'Up from 2.8 baseline' },
      { label: 'Policy Adoption', value: '12', unit: 'districts', description: 'Implemented framework' },
    ],
    methodology:
      'Policy analysis using Kingdon\'s Multiple Streams Framework, combined with health systems research and implementation science methodologies.',
    impactAreas: [
      'Revised national maternal health guidelines',
      'Strengthened referral systems',
      'Improved health worker training',
      'Enhanced community health literacy',
    ],
    collaborators: ['World Bank', 'Kemenkes RI', 'Provincial Health Offices'],
    citations: 89,
  },
];

// Helper functions for filtering/sorting
export const getProjectsByCategory = (category: Project['category']) =>
  projects.filter((p) => p.category === category);

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getEngineeringProjects = () =>
  projects.filter((p) => p.category === 'engineering');

export const getResearchProjects = () =>
  projects.filter((p) => p.category === 'research' || p.category === 'policy');
