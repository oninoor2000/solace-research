// ============================================
// SOLACE LAB - Researchers Data
// Professional researcher profiles
// ============================================

import type { Researcher } from '@/types';

export const researchers: Researcher[] = [
  {
    id: '01',
    slug: 'syeikhooni',
    name: 'Muhammad Syeikhooni Noor',
    credentials: 'S.Tr.RMIK., MHPM',
    role: 'Principal Researcher',
    title: 'Health Systems & Interoperability',
    theme: 'architect', // Used for profile layout variant
    shortBio:
      'Leading research on health information exchange architecture and interoperability frameworks for Indonesia\'s national healthcare system.',
    fullBio:
      'Muhammad Syeikhooni Noor is a health informatics specialist focusing on system interoperability and health information exchange infrastructure. With expertise in both clinical informatics and software engineering, he bridges the gap between healthcare requirements and technical implementation. His work focuses on building robust, scalable systems that enable seamless data exchange across healthcare ecosystems while maintaining the highest standards of data integrity and security.',
    image: '/images/researchers/syeikhooni.webp',
    expertise: [
      'HL7 FHIR Architecture',
      'System Interoperability',
      'Healthcare Data Standards',
      'Enterprise Integration',
      'Technical Strategy',
    ],
    focus: [
      {
        title: 'System Architecture',
        description:
          'Designing healthcare information systems that scale from local clinics to national networks.',
      },
      {
        title: 'Interoperability Standards',
        description:
          'Implementing and advancing FHIR, HL7v2, and CDA standards for seamless data exchange.',
      },
      {
        title: 'Technical Leadership',
        description:
          'Guiding strategic technology adoption for Indonesian health informatics infrastructure.',
      },
    ],
    achievements: [
      { year: 2024, title: 'National Health IT Architecture Award' },
      { year: 2023, title: 'FHIR Implementation Excellence Recognition' },
      { year: 2022, title: 'Best Paper - APAMI Conference' },
    ],
    contact: {
      email: 'syeikhooni@solace.lab',
      linkedin: 'syeikhooni-noor',
      orcid: '0000-0001-2345-6789',
    },
    quote: 'Good architecture enables good outcomes.',
  },
  {
    id: '02',
    slug: 'ali-chamid',
    name: 'Ali Chamid',
    credentials: 'S.Tr.RMIK., MHPM',
    role: 'Principal Researcher',
    title: 'Public & Community Health',
    theme: 'connector', // Used for profile layout variant
    shortBio:
      'Bridging digital health solutions with community-level implementation, focusing on health equity and primary care informatics.',
    fullBio:
      'Ali Chamid brings a unique perspective to public health informatics, combining epidemiological insight with community-centered design. His research focuses on how health information systems can better serve underrepresented populations and strengthen primary healthcare delivery. He champions participatory approaches that involve communities in the design and governance of health data systems, believing that sustainable health improvement comes from genuine engagement.',
    image: '/images/researchers/ali-chamid.webp',
    expertise: [
      'Public Health Surveillance',
      'Community Health Systems',
      'Participatory Design',
      'Health Equity Research',
      'Primary Care Informatics',
    ],
    focus: [
      {
        title: 'Community Impact',
        description:
          'Measuring and maximizing the positive effects of health informatics on community wellbeing.',
      },
      {
        title: 'Field Implementation',
        description:
          'Extending digital health solutions to remote and underserved areas through appropriate technology.',
      },
      {
        title: 'Stakeholder Collaboration',
        description:
          'Building bridges between academic research, government policy, and grassroots implementation.',
      },
    ],
    achievements: [
      { year: 2024, title: 'Community Health Innovation Award' },
      { year: 2023, title: 'WHO Public Health Informatics Fellowship' },
      { year: 2021, title: 'National Puskesmas Digital Transformation Lead' },
    ],
    contact: {
      email: 'ali.chamid@solace.lab',
      linkedin: 'ali-chamid',
      orcid: '0000-0002-3456-7890',
    },
    quote: 'Technology succeeds when communities lead.',
  },
  {
    id: '03',
    slug: 'hadi',
    name: 'Hadi Kurniawan',
    credentials: 'S.Tr.RMIK., M.KM',
    role: 'Principal Researcher',
    title: 'Epidemiology & Data Analytics',
    theme: 'analyst', // Used for profile layout variant
    shortBio:
      'Applying advanced analytics and epidemiological methods to uncover actionable insights from complex population health data.',
    fullBio:
      'Hadi Kurniawan is an analytical epidemiologist specializing in extracting meaningful patterns from complex health datasets. His expertise spans traditional biostatistics, machine learning applications in public health, and advanced visualization techniques. He believes that data, when properly analyzed and communicated, becomes a powerful tool for evidence-based decision making. His work has contributed to outbreak detection, disease burden estimation, and health resource optimization across Indonesia.',
    image: '/images/researchers/hadi.webp',
    expertise: [
      'Epidemiological Modeling',
      'Health Data Analytics',
      'Machine Learning in Health',
      'Biostatistics',
      'Data Visualization',
    ],
    focus: [
      {
        title: 'Advanced Analytics',
        description:
          'Uncovering hidden patterns in health data through statistical and computational methods.',
      },
      {
        title: 'Predictive Modeling',
        description:
          'Developing models for disease transmission, outbreak detection, and health outcomes.',
      },
      {
        title: 'Evidence Translation',
        description:
          'Translating complex analytical findings into actionable policy recommendations.',
      },
    ],
    achievements: [
      { year: 2024, title: 'National Epidemiology Excellence Award' },
      { year: 2023, title: 'COVID-19 Analytics Task Force Recognition' },
      { year: 2022, title: 'Best Poster - ISPH Annual Conference' },
    ],
    contact: {
      email: 'hadi@solace.lab',
      linkedin: 'hadi-kurniawan',
      orcid: '0000-0003-4567-8901',
      scholar: 'HadiKurniawan',
    },
    quote: 'Data reveals what observation alone cannot.',
  },
];

// Helper functions
export const getResearcherBySlug = (slug: string) =>
  researchers.find((r) => r.slug === slug);

export const getResearcherByTheme = (theme: Researcher['theme']) =>
  researchers.find((r) => r.theme === theme);
