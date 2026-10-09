import Link from "next/link";
import type { Project } from "@/lib/data";

export default function WorkCard({ project, index, large = false }: { project: Project; index: number; large?: boolean }) {
  return (
    <Link href={`/work/${project.slug}`} className={`work-card ${large ? "work-card--large" : ""}`}>
      <div className="work-card__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.image} alt={project.name} loading="lazy" />
        <span className="work-card__view" aria-hidden="true">View project</span>
      </div>
      <div className="work-card__meta">
        <span className="work-card__num">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="work-card__title">{project.name}</h3>
        <span className="work-card__sector">{project.sector}</span>
      </div>
      <ul className="tags">
        {project.tags.map((t) => <li key={t} className="tag">{t}</li>)}
      </ul>
    </Link>
  );
}
