// ============================================
// SOLACE LAB - Publications Data
// Intelligence Bank / Research Repository
// ============================================

import type { Publication } from '@/types';

export const publications: Publication[] = [
  {
    id: 'pub-001',
    year: 2024,
    title: 'Implementing FHIR R4 for National Health Information Exchange: Lessons from Indonesia',
    publishedIn: 'Journal of the American Medical Informatics Association',
    authors: ['Noor, M.S.', 'Chamid, A.', 'Kurniawan, H.'],
    abstract:
      'This study presents a comprehensive analysis of implementing HL7 FHIR R4 standards for a national-scale health information exchange system in Indonesia, discussing technical challenges, governance frameworks, and adoption strategies.',
    pdfUrl: '/publications/fhir-r4-indonesia-2024.pdf',
    doi: '10.1093/jamia/ocae123',
    category: 'journal',
    tags: ['FHIR', 'Interoperability', 'Indonesia', 'HIE'],
  },
  {
    id: 'pub-002',
    year: 2024,
    title: 'Machine Learning Approaches for Early Outbreak Detection in Low-Resource Settings',
    publishedIn: 'PLOS Digital Health',
    authors: ['Kurniawan, H.', 'Noor, M.S.'],
    abstract:
      'We present a comparative analysis of machine learning models for syndromic surveillance and outbreak detection, optimized for deployment in regions with limited computational infrastructure.',
    pdfUrl: '/publications/ml-outbreak-detection-2024.pdf',
    doi: '10.1371/journal.pdig.0000456',
    category: 'journal',
    tags: ['Machine Learning', 'Outbreak Detection', 'Surveillance'],
  },
  {
    id: 'pub-003',
    year: 2024,
    title: 'Community-Centered Design in Public Health Informatics: A Framework for Equity',
    publishedIn: 'International Journal of Medical Informatics',
    authors: ['Chamid, A.', 'Noor, M.S.', 'Kurniawan, H.'],
    abstract:
      'This paper proposes a comprehensive framework for incorporating community perspectives and equity considerations into the design and implementation of public health information systems.',
    pdfUrl: '/publications/community-design-framework-2024.pdf',
    doi: '10.1016/j.ijmedinf.2024.05123',
    category: 'journal',
    tags: ['Community Health', 'Health Equity', 'Participatory Design'],
  },
  {
    id: 'pub-004',
    year: 2023,
    title: 'Scaling Digital Health Solutions for Primary Care: The Indonesian Experience',
    publishedIn: 'Proceedings of MedInfo 2023',
    authors: ['Chamid, A.', 'Kurniawan, H.'],
    abstract:
      'We describe the implementation journey of digital health solutions across Indonesia\'s primary healthcare network, highlighting success factors, barriers, and lessons learned.',
    pdfUrl: '/publications/scaling-digital-health-2023.pdf',
    doi: '10.3233/SHTI230789',
    category: 'conference',
    tags: ['Primary Care', 'Digital Health', 'Implementation Science'],
  },
  {
    id: 'pub-005',
    year: 2023,
    title: 'Geospatial Analysis of Health Disparities: Mapping Social Determinants in Urban Indonesia',
    publishedIn: 'The Lancet Regional Health - Southeast Asia',
    authors: ['Kurniawan, H.', 'Chamid, A.'],
    abstract:
      'Using advanced geospatial methods, this study maps the distribution of social determinants of health across urban Indonesia and identifies priority areas for targeted interventions.',
    pdfUrl: '/publications/geospatial-health-disparities-2023.pdf',
    doi: '10.1016/j.lansea.2023.100234',
    category: 'journal',
    tags: ['GIS', 'Health Disparities', 'Social Determinants'],
  },
  {
    id: 'pub-006',
    year: 2023,
    title: 'Interoperability Maturity Model for Healthcare Organizations in Southeast Asia',
    publishedIn: 'Applied Clinical Informatics',
    authors: ['Noor, M.S.'],
    abstract:
      'This paper introduces a practical maturity model to assess and guide the interoperability capabilities of healthcare organizations in developing healthcare markets.',
    pdfUrl: '/publications/interoperability-maturity-model-2023.pdf',
    doi: '10.1055/a-2134-5678',
    category: 'journal',
    tags: ['Interoperability', 'Maturity Model', 'Southeast Asia'],
  },
  {
    id: 'pub-007',
    year: 2022,
    title: 'Maternal and Neonatal Health Information Systems: A Policy Analysis',
    publishedIn: 'Health Policy and Planning',
    authors: ['Chamid, A.', 'Noor, M.S.', 'Kurniawan, H.'],
    abstract:
      'A comprehensive policy analysis of maternal and neonatal health information systems, examining governance structures, data quality challenges, and recommendations for improvement.',
    pdfUrl: '/publications/maternal-health-is-policy-2022.pdf',
    doi: '10.1093/heapol/czac089',
    category: 'journal',
    tags: ['Maternal Health', 'Policy Analysis', 'Data Quality'],
  },
  {
    id: 'pub-008',
    year: 2022,
    title: 'Real-Time Disease Surveillance Using Mobile Health Technology: Field Implementation Guide',
    publishedIn: 'WHO Technical Report Series',
    authors: ['Kurniawan, H.', 'Chamid, A.'],
    abstract:
      'A practical field guide for implementing real-time disease surveillance systems using mobile technology, developed in collaboration with WHO Indonesia.',
    pdfUrl: '/publications/mobile-surveillance-guide-2022.pdf',
    category: 'report',
    tags: ['mHealth', 'Surveillance', 'Implementation'],
  },
  {
    id: 'pub-009',
    year: 2022,
    title: 'Clinical Decision Support Systems in Low-Resource Settings: Design Principles',
    publishedIn: 'Book Chapter in "Digital Health in Developing Countries"',
    authors: ['Noor, M.S.', 'Kurniawan, H.'],
    abstract:
      'This chapter outlines design principles and implementation strategies for clinical decision support systems adapted for low-resource healthcare environments.',
    pdfUrl: '/publications/cdss-design-principles-2022.pdf',
    doi: '10.1007/978-3-030-12345-6_8',
    category: 'book-chapter',
    tags: ['CDSS', 'Low-Resource Settings', 'Design Principles'],
  },
  {
    id: 'pub-010',
    year: 2021,
    title: 'COVID-19 Contact Tracing in Indonesia: Lessons from a National Digital Response',
    publishedIn: 'BMJ Global Health',
    authors: ['Kurniawan, H.', 'Noor, M.S.', 'Chamid, A.'],
    abstract:
      'An evaluation of Indonesia\'s national digital contact tracing response during the COVID-19 pandemic, examining effectiveness, privacy considerations, and public acceptance.',
    pdfUrl: '/publications/covid-contact-tracing-2021.pdf',
    doi: '10.1136/bmjgh-2021-006789',
    category: 'journal',
    tags: ['COVID-19', 'Contact Tracing', 'Digital Health'],
  },
];

// Helper functions
export const getPublicationsByYear = (year: number) =>
  publications.filter((p) => p.year === year);

export const getPublicationsByAuthor = (authorName: string) =>
  publications.filter((p) =>
    p.authors.some((a) => a.toLowerCase().includes(authorName.toLowerCase()))
  );

export const getPublicationsByCategory = (category: Publication['category']) =>
  publications.filter((p) => p.category === category);

export const getYears = () =>
  [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);
