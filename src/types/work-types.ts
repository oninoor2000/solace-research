// Project Categories
export type ProjectCategory = "engineering" | "research" | "policy";

export interface TechItem {
  name: string;
  icon?: string;
  category: "frontend" | "backend" | "database" | "infrastructure" | "tools";
}

export interface DataMetric {
  label: string;
  value: string;
  unit?: string;
  description?: string;
}

// Project Definition
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  domain: string;
  year: number;
  abstract: string;
  thumbnail: string;
  heroImage: string;
  client?: string;
  duration?: string;
  status?: "completed" | "ongoing" | "archived";
  // Type A: Engineering/System Focus
  techStack?: TechItem[];
  architecture?: {
    diagram: string; // SVG path or component reference
    description: string;
  };
  features?: string[];
  deployment?: {
    platform: string;
    infrastructure: string;
  };
  codeUrl?: string;
  // Type B: Research/Policy Focus
  keyFindings?: DataMetric[];
  methodology?: string;
  impactAreas?: string[];
  mapData?: {
    regions: string[];
    coverage: string;
  };
  citations?: number;
  collaborators?: string[];
}
