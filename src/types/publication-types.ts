export interface Publication {
  id: string;
  year: number;
  title: string;
  publishedIn: string;
  authors: string[];
  abstract?: string;
  pdfUrl?: string;
  doi?: string;
  category: "journal" | "conference" | "book-chapter" | "report";
  tags?: string[];
}
