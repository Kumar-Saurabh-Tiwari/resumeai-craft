import { useState } from "react";
import { useResumeStore, newId } from "@/lib/resume/store";
import type { Education, Experience, Project } from "@/lib/resume/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function PersonalStep() {
  const { resume, patch } = useResumeStore();
  const p = resume.personal;
  const set = (k: keyof typeof p, v: string) => patch("personal", { ...p, [k]: v });

  const fields: [keyof typeof p, string, string?][] = [
    ["fullName", "Full Name", "Jane Cooper"],
    ["jobTitle", "Job Title", "Senior Product Designer"],
    ["email", "Email", "jane@example.com"],
    ["phone", "Phone", "+1 555 123 4567"],
    ["address", "Location", "San Francisco, CA"],
    ["linkedin", "LinkedIn", "linkedin.com/in/jane"],
    ["github", "GitHub", "github.com/jane"],
    ["website", "Website", "janecooper.com"],
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map(([k, label, ph]) => (
          <div key={k} className="space-y-1.5">
            <Label>{label}</Label>
            <Input value={p[k]} onChange={(e) => set(k, e.target.value)} placeholder={ph} />
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        <Label>Professional Summary</Label>
        <Textarea
          rows={4}
          value={p.summary}
          onChange={(e) => set("summary", e.target.value)}
          placeholder="Brief, achievement-led summary of who you are and what you've delivered."
        />
      </div>
    </div>
  );
}

export function ExperienceStep() {
  const { resume, patch } = useResumeStore();
  const items = resume.experience;
  const update = (id: string, k: keyof Experience, v: string) =>
    patch(
      "experience",
      items.map((it) => (it.id === id ? { ...it, [k]: v } : it)),
    );
  const add = () =>
    patch("experience", [
      ...items,
      { id: newId(), company: "", position: "", startDate: "", endDate: "", description: "" },
    ]);
  const remove = (id: string) =>
    patch(
      "experience",
      items.filter((it) => it.id !== id),
    );

  return (
    <div className="space-y-4">
      {items.map((it) => (
        <Card key={it.id} onRemove={() => remove(it.id)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field
              label="Position"
              value={it.position}
              onChange={(v) => update(it.id, "position", v)}
            />
            <Field
              label="Company"
              value={it.company}
              onChange={(v) => update(it.id, "company", v)}
            />
            <Field
              label="Start Date"
              value={it.startDate}
              onChange={(v) => update(it.id, "startDate", v)}
              placeholder="Jan 2023"
            />
            <Field
              label="End Date"
              value={it.endDate}
              onChange={(v) => update(it.id, "endDate", v)}
              placeholder="Present"
            />
          </div>
          <div className="space-y-1.5 mt-3">
            <Label>Description (one bullet per line)</Label>
            <Textarea
              rows={4}
              value={it.description}
              onChange={(e) => update(it.id, "description", e.target.value)}
            />
          </div>
        </Card>
      ))}
      <Button variant="soft" onClick={add}>
        <Plus className="h-4 w-4" />
        Add Experience
      </Button>
    </div>
  );
}

export function EducationStep() {
  const { resume, patch } = useResumeStore();
  const items = resume.education;
  const update = (id: string, k: keyof Education, v: string) =>
    patch(
      "education",
      items.map((it) => (it.id === id ? { ...it, [k]: v } : it)),
    );
  const add = () =>
    patch("education", [
      ...items,
      {
        id: newId(),
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        gpa: "",
      },
    ]);
  const remove = (id: string) =>
    patch(
      "education",
      items.filter((it) => it.id !== id),
    );

  return (
    <div className="space-y-4">
      {items.map((it) => (
        <Card key={it.id} onRemove={() => remove(it.id)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Degree" value={it.degree} onChange={(v) => update(it.id, "degree", v)} />
            <Field
              label="Institution"
              value={it.institution}
              onChange={(v) => update(it.id, "institution", v)}
            />
            <Field
              label="Location"
              value={it.location}
              onChange={(v) => update(it.id, "location", v)}
            />
            <Field label="GPA" value={it.gpa} onChange={(v) => update(it.id, "gpa", v)} />
            <Field
              label="Start Date"
              value={it.startDate}
              onChange={(v) => update(it.id, "startDate", v)}
            />
            <Field
              label="End Date"
              value={it.endDate}
              onChange={(v) => update(it.id, "endDate", v)}
            />
          </div>
        </Card>
      ))}
      <Button variant="soft" onClick={add}>
        <Plus className="h-4 w-4" />
        Add Education
      </Button>
    </div>
  );
}

export function SkillsStep() {
  const { resume, patch } = useResumeStore();
  const s = resume.skills;
  const groups: [keyof typeof s, string][] = [
    ["technical", "Technical Skills"],
    ["tools", "Tools"],
    ["languages", "Languages"],
    ["soft", "Soft Skills"],
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {groups.map(([k, label]) => (
        <SkillEditor
          key={k}
          label={label}
          values={s[k]}
          onChange={(vals) => patch("skills", { ...s, [k]: vals })}
        />
      ))}
    </div>
  );
}

function SkillEditor({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const addTag = () => {
    const v = input.trim();
    if (!v) return;
    onChange([...values, v]);
    setInput("");
  };
  return (
    <div className="space-y-2 rounded-xl border border-border bg-card p-4">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder="Type and press Enter"
        />
        <Button type="button" variant="soft" onClick={addTag}>
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {values.map((v, i) => (
          <button
            key={`${v}-${i}`}
            onClick={() => onChange(values.filter((_, idx) => idx !== i))}
            className="group inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-xs text-accent-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            {v}
            <Trash2 className="h-3 w-3 opacity-0 group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProjectsStep() {
  const { resume, patch } = useResumeStore();
  const items = resume.projects;
  const update = (id: string, k: keyof Project, v: string) =>
    patch(
      "projects",
      items.map((it) => (it.id === id ? { ...it, [k]: v } : it)),
    );
  const add = () =>
    patch("projects", [
      ...items,
      { id: newId(), name: "", description: "", technologies: "", github: "", liveUrl: "" },
    ]);
  const remove = (id: string) =>
    patch(
      "projects",
      items.filter((it) => it.id !== id),
    );

  return (
    <div className="space-y-4">
      {items.map((it) => (
        <Card key={it.id} onRemove={() => remove(it.id)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field
              label="Project Name"
              value={it.name}
              onChange={(v) => update(it.id, "name", v)}
            />
            <Field
              label="Technologies"
              value={it.technologies}
              onChange={(v) => update(it.id, "technologies", v)}
              placeholder="React, Node, Postgres"
            />
            <Field
              label="GitHub URL"
              value={it.github}
              onChange={(v) => update(it.id, "github", v)}
            />
            <Field
              label="Live URL"
              value={it.liveUrl}
              onChange={(v) => update(it.id, "liveUrl", v)}
            />
          </div>
          <div className="space-y-1.5 mt-3">
            <Label>Description</Label>
            <Textarea
              rows={3}
              value={it.description}
              onChange={(e) => update(it.id, "description", e.target.value)}
            />
          </div>
        </Card>
      ))}
      <Button variant="soft" onClick={add}>
        <Plus className="h-4 w-4" />
        Add Project
      </Button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function Card({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <div className="relative rounded-xl border border-border bg-card p-4">
      <button
        onClick={onRemove}
        className="absolute right-3 top-3 text-muted-foreground hover:text-destructive transition-colors"
        aria-label="Remove"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      {children}
    </div>
  );
}
