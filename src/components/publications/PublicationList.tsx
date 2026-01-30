import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ExternalLink, Filter } from "lucide-react";
import { publications, getYears } from "@/data/publications";
import type { Publication } from "@/types";

type FilterCategory = Publication["category"] | "all";

export default function PublicationList() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const years = getYears();
  const filteredPublications =
    activeFilter === "all"
      ? publications
      : publications.filter((p) => p.category === activeFilter);

  const getCategoryLabel = (category: Publication["category"]): string => {
    const labels: Record<Publication["category"], string> = {
      journal: "Journal",
      conference: "Conference",
      "book-chapter": "Book Chapter",
      report: "Report",
    };
    return labels[category];
  };

  return (
    <section className="min-h-screen bg-background py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 border-b border-white/10 pb-8"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 block mb-4">
              Research Output
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-white">
              Intelligence Bank
            </h1>
          </div>

          <div className="mt-8 md:mt-0 flex items-center gap-4">
            <span className="font-mono text-xs text-white/40">
              {filteredPublications.length} publications
            </span>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 mb-12"
        >
          <Filter size={14} className="text-white/40 mr-2" />
          {(
            ["all", "journal", "conference", "book-chapter", "report"] as const
          ).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-white text-black border-white"
                  : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {filter === "all"
                ? "All"
                : getCategoryLabel(filter as Publication["category"])}
            </button>
          ))}
        </motion.div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 py-4 border-b border-white/20 font-mono text-xs uppercase tracking-widest text-white/40">
          <div className="col-span-1">Year</div>
          <div className="col-span-6">Title</div>
          <div className="col-span-3">Published In</div>
          <div className="col-span-2 text-right">Access</div>
        </div>

        {/* Publication Rows */}
        <div className="divide-y divide-white/10">
          <AnimatePresence mode="wait">
            {filteredPublications.map((pub, index) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.03 }}
                onMouseEnter={() => setHoveredId(pub.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`grid grid-cols-1 md:grid-cols-12 gap-4 py-6 cursor-default transition-all duration-300 ${
                  hoveredId === pub.id
                    ? "bg-white/10 text-white -mx-6 px-6"
                    : "text-white"
                }`}
              >
                {/* Year */}
                <div className="md:col-span-1">
                  <span
                    className={`font-mono text-sm ${
                      hoveredId === pub.id ? "text-white/70" : "text-white/40"
                    }`}
                  >
                    {pub.year}
                  </span>
                </div>

                {/* Title & Authors */}
                <div className="md:col-span-6">
                  <h3
                    className={`font-sans text-lg leading-snug mb-2 ${
                      hoveredId === pub.id ? "text-white" : "text-white"
                    }`}
                  >
                    {pub.title}
                  </h3>
                  <p
                    className={`font-mono text-xs ${
                      hoveredId === pub.id ? "text-white/70" : "text-white/40"
                    }`}
                  >
                    {pub.authors.join(", ")}
                  </p>
                  {/* Tags */}
                  {pub.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] uppercase tracking-wider px-2 py-1 ${
                            hoveredId === pub.id
                              ? "bg-white/20 text-white/90"
                              : "bg-white/5 text-white/50"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Published In */}
                <div className="md:col-span-3">
                  <span
                    className={`font-sans text-sm italic ${
                      hoveredId === pub.id ? "text-white/90" : "text-white/60"
                    }`}
                  >
                    {pub.publishedIn}
                  </span>
                  <span
                    className={`block font-mono text-[10px] uppercase mt-1 ${
                      hoveredId === pub.id ? "text-white/60" : "text-white/30"
                    }`}
                  >
                    {getCategoryLabel(pub.category)}
                  </span>
                </div>

                {/* Access Links */}
                <div className="md:col-span-2 flex items-start justify-end gap-3">
                  {pub.pdfUrl && (
                    <a
                      href={pub.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                        hoveredId === pub.id
                          ? "text-white hover:text-white/80"
                          : "text-white/60 hover:text-white"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download size={14} />
                      <span className="hidden lg:inline">PDF</span>
                    </a>
                  )}
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                        hoveredId === pub.id
                          ? "text-white hover:text-white/80"
                          : "text-white/60 hover:text-white"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} />
                      <span className="hidden lg:inline">DOI</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredPublications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center"
          >
            <p className="font-mono text-white/40">
              No publications found for this category.
            </p>
          </motion.div>
        )}

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-24 mt-16 border-t border-white/10"
        >
          {[
            { label: "Total Publications", value: publications.length },
            {
              label: "Journal Articles",
              value: publications.filter((p) => p.category === "journal")
                .length,
            },
            {
              label: "Conference Papers",
              value: publications.filter((p) => p.category === "conference")
                .length,
            },
            {
              label: "Years Active",
              value: `${Math.min(...years)}-${Math.max(...years)}`,
            },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center md:text-left">
              <span className="font-display text-4xl text-white block mb-2">
                {stat.value}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
