import type { ResumeData } from "@/lib/resume/types";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

export function ResumePreview({ data, id = "resume-preview" }: { data: ResumeData; id?: string }) {
  const { personal: p, education, experience, skills, projects } = data;

  return (
    <div
      id={id}
      className="bg-white text-slate-900 mx-auto shadow-soft"
      style={{
        width: "8.5in",
        minHeight: "11in",
        padding: "0.6in 0.7in",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "10.5pt",
        lineHeight: 1.45,
      }}
    >
      <header className="border-b border-slate-200 pb-4">
        <h1 className="text-[26pt] font-bold tracking-tight text-slate-900 leading-tight">
          {p.fullName || "Your Name"}
        </h1>
        {p.jobTitle && (
          <p className="text-[12pt] text-indigo-600 font-medium mt-0.5">{p.jobTitle}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[9pt] text-slate-600">
          {p.email && <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{p.email}</span>}
          {p.phone && <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{p.phone}</span>}
          {p.address && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{p.address}</span>}
          {p.linkedin && <span className="inline-flex items-center gap-1"><Linkedin className="h-3 w-3" />{p.linkedin}</span>}
          {p.github && <span className="inline-flex items-center gap-1"><Github className="h-3 w-3" />{p.github}</span>}
          {p.website && <span className="inline-flex items-center gap-1"><Globe className="h-3 w-3" />{p.website}</span>}
        </div>
      </header>

      {p.summary && (
        <Section title="Professional Summary">
          <p className="text-slate-700">{p.summary}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((e) => (
            <div key={e.id} className="mb-3">
              <div className="flex items-baseline justify-between">
                <h3 className="font-semibold text-slate-900 text-[11pt]">
                  {e.position} <span className="text-slate-500 font-normal">— {e.company}</span>
                </h3>
                <span className="text-[9pt] text-slate-500">
                  {e.startDate} – {e.endDate || "Present"}
                </span>
              </div>
              {e.description && (
                <ul className="mt-1 list-disc pl-5 text-slate-700 space-y-0.5">
                  {e.description
                    .split("\n")
                    .filter(Boolean)
                    .map((line, i) => (
                      <li key={i}>{line.replace(/^[-•]\s*/, "")}</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map((ed) => (
            <div key={ed.id} className="mb-2 flex items-baseline justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 text-[11pt]">{ed.degree}</h3>
                <p className="text-slate-600 text-[10pt]">
                  {ed.institution}
                  {ed.location && ` • ${ed.location}`}
                  {ed.gpa && ` • GPA ${ed.gpa}`}
                </p>
              </div>
              <span className="text-[9pt] text-slate-500">
                {ed.startDate} – {ed.endDate}
              </span>
            </div>
          ))}
        </Section>
      )}

      {(skills.technical.length || skills.tools.length || skills.languages.length || skills.soft.length) > 0 && (
        <Section title="Skills">
          <div className="space-y-1 text-[10pt]">
            {skills.technical.length > 0 && (
              <p><span className="font-semibold">Technical:</span> {skills.technical.join(", ")}</p>
            )}
            {skills.tools.length > 0 && (
              <p><span className="font-semibold">Tools:</span> {skills.tools.join(", ")}</p>
            )}
            {skills.languages.length > 0 && (
              <p><span className="font-semibold">Languages:</span> {skills.languages.join(", ")}</p>
            )}
            {skills.soft.length > 0 && (
              <p><span className="font-semibold">Soft Skills:</span> {skills.soft.join(", ")}</p>
            )}
          </div>
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((pr) => (
            <div key={pr.id} className="mb-2">
              <h3 className="font-semibold text-slate-900 text-[11pt]">{pr.name}</h3>
              {pr.description && <p className="text-slate-700">{pr.description}</p>}
              {pr.technologies && (
                <p className="text-[9pt] text-slate-500 italic">Tech: {pr.technologies}</p>
              )}
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="text-[11pt] font-bold uppercase tracking-wider text-indigo-600 border-b border-indigo-100 pb-1 mb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}
