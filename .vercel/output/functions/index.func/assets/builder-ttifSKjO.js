import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouter, isRedirect, Link } from "@tanstack/react-router";
import * as React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { e as emptyResume, c as cn, B as Button, R as ResumePreview } from "./ResumePreview-Co9V-eM2.js";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { Plus, Trash2, X, Loader2, Sparkles, TrendingUp, Check, User, Briefcase, GraduationCap, Code2, FolderGit2, Eye, FileText, Download, FileType2, ArrowLeft, ArrowRight } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, a as createServerFn } from "./server-B0_PXeJK.js";
import { z } from "zod";
import { toast } from "sonner";
import { Paragraph, TextRun, AlignmentType, Document, Packer, HeadingLevel } from "docx";
import FileSaver from "file-saver";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
function useServerFn(serverFn) {
  const router = useRouter();
  return React.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
const useResumeStore = create()(
  persist(
    (set) => ({
      resume: emptyResume,
      setResume: (resume) => set({ resume }),
      patch: (key, value) => set((s) => ({ resume: { ...s.resume, [key]: value } })),
      reset: () => set({ resume: emptyResume })
    }),
    { name: "resumeai-pro" }
  )
);
const newId = () => typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2);
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
function PersonalStep() {
  const { resume, patch } = useResumeStore();
  const p = resume.personal;
  const set = (k, v) => patch("personal", { ...p, [k]: v });
  const fields = [
    ["fullName", "Full Name", "Jane Cooper"],
    ["jobTitle", "Job Title", "Senior Product Designer"],
    ["email", "Email", "jane@example.com"],
    ["phone", "Phone", "+1 555 123 4567"],
    ["address", "Location", "San Francisco, CA"],
    ["linkedin", "LinkedIn", "linkedin.com/in/jane"],
    ["github", "GitHub", "github.com/jane"],
    ["website", "Website", "janecooper.com"]
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: fields.map(([k, label, ph]) => /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { children: label }),
      /* @__PURE__ */ jsx(Input, { value: p[k], onChange: (e) => set(k, e.target.value), placeholder: ph })
    ] }, k)) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { children: "Professional Summary" }),
      /* @__PURE__ */ jsx(
        Textarea,
        {
          rows: 4,
          value: p.summary,
          onChange: (e) => set("summary", e.target.value),
          placeholder: "Brief, achievement-led summary of who you are and what you've delivered."
        }
      )
    ] })
  ] });
}
function ExperienceStep() {
  const { resume, patch } = useResumeStore();
  const items = resume.experience;
  const update = (id, k, v) => patch("experience", items.map((it) => it.id === id ? { ...it, [k]: v } : it));
  const add = () => patch("experience", [
    ...items,
    { id: newId(), company: "", position: "", startDate: "", endDate: "", description: "" }
  ]);
  const remove = (id) => patch("experience", items.filter((it) => it.id !== id));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    items.map((it) => /* @__PURE__ */ jsxs(Card, { onRemove: () => remove(it.id), children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(Field, { label: "Position", value: it.position, onChange: (v) => update(it.id, "position", v) }),
        /* @__PURE__ */ jsx(Field, { label: "Company", value: it.company, onChange: (v) => update(it.id, "company", v) }),
        /* @__PURE__ */ jsx(Field, { label: "Start Date", value: it.startDate, onChange: (v) => update(it.id, "startDate", v), placeholder: "Jan 2023" }),
        /* @__PURE__ */ jsx(Field, { label: "End Date", value: it.endDate, onChange: (v) => update(it.id, "endDate", v), placeholder: "Present" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 mt-3", children: [
        /* @__PURE__ */ jsx(Label, { children: "Description (one bullet per line)" }),
        /* @__PURE__ */ jsx(Textarea, { rows: 4, value: it.description, onChange: (e) => update(it.id, "description", e.target.value) })
      ] })
    ] }, it.id)),
    /* @__PURE__ */ jsxs(Button, { variant: "soft", onClick: add, children: [
      /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
      "Add Experience"
    ] })
  ] });
}
function EducationStep() {
  const { resume, patch } = useResumeStore();
  const items = resume.education;
  const update = (id, k, v) => patch("education", items.map((it) => it.id === id ? { ...it, [k]: v } : it));
  const add = () => patch("education", [
    ...items,
    { id: newId(), degree: "", institution: "", location: "", startDate: "", endDate: "", gpa: "" }
  ]);
  const remove = (id) => patch("education", items.filter((it) => it.id !== id));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    items.map((it) => /* @__PURE__ */ jsx(Card, { onRemove: () => remove(it.id), children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx(Field, { label: "Degree", value: it.degree, onChange: (v) => update(it.id, "degree", v) }),
      /* @__PURE__ */ jsx(Field, { label: "Institution", value: it.institution, onChange: (v) => update(it.id, "institution", v) }),
      /* @__PURE__ */ jsx(Field, { label: "Location", value: it.location, onChange: (v) => update(it.id, "location", v) }),
      /* @__PURE__ */ jsx(Field, { label: "GPA", value: it.gpa, onChange: (v) => update(it.id, "gpa", v) }),
      /* @__PURE__ */ jsx(Field, { label: "Start Date", value: it.startDate, onChange: (v) => update(it.id, "startDate", v) }),
      /* @__PURE__ */ jsx(Field, { label: "End Date", value: it.endDate, onChange: (v) => update(it.id, "endDate", v) })
    ] }) }, it.id)),
    /* @__PURE__ */ jsxs(Button, { variant: "soft", onClick: add, children: [
      /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
      "Add Education"
    ] })
  ] });
}
function SkillsStep() {
  const { resume, patch } = useResumeStore();
  const s = resume.skills;
  const groups = [
    ["technical", "Technical Skills"],
    ["tools", "Tools"],
    ["languages", "Languages"],
    ["soft", "Soft Skills"]
  ];
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: groups.map(([k, label]) => /* @__PURE__ */ jsx(
    SkillEditor,
    {
      label,
      values: s[k],
      onChange: (vals) => patch("skills", { ...s, [k]: vals })
    },
    k
  )) });
}
function SkillEditor({
  label,
  values,
  onChange
}) {
  const [input, setInput] = useState("");
  const addTag = () => {
    const v = input.trim();
    if (!v) return;
    onChange([...values, v]);
    setInput("");
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-xl border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsx(Label, { children: label }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          value: input,
          onChange: (e) => setInput(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          },
          placeholder: "Type and press Enter"
        }
      ),
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "soft", onClick: addTag, children: "Add" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: values.map((v, i) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => onChange(values.filter((_, idx) => idx !== i)),
        className: "group inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-xs text-accent-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors",
        children: [
          v,
          /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3 opacity-0 group-hover:opacity-100" })
        ]
      },
      `${v}-${i}`
    )) })
  ] });
}
function ProjectsStep() {
  const { resume, patch } = useResumeStore();
  const items = resume.projects;
  const update = (id, k, v) => patch("projects", items.map((it) => it.id === id ? { ...it, [k]: v } : it));
  const add = () => patch("projects", [
    ...items,
    { id: newId(), name: "", description: "", technologies: "", github: "", liveUrl: "" }
  ]);
  const remove = (id) => patch("projects", items.filter((it) => it.id !== id));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    items.map((it) => /* @__PURE__ */ jsxs(Card, { onRemove: () => remove(it.id), children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(Field, { label: "Project Name", value: it.name, onChange: (v) => update(it.id, "name", v) }),
        /* @__PURE__ */ jsx(Field, { label: "Technologies", value: it.technologies, onChange: (v) => update(it.id, "technologies", v), placeholder: "React, Node, Postgres" }),
        /* @__PURE__ */ jsx(Field, { label: "GitHub URL", value: it.github, onChange: (v) => update(it.id, "github", v) }),
        /* @__PURE__ */ jsx(Field, { label: "Live URL", value: it.liveUrl, onChange: (v) => update(it.id, "liveUrl", v) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 mt-3", children: [
        /* @__PURE__ */ jsx(Label, { children: "Description" }),
        /* @__PURE__ */ jsx(Textarea, { rows: 3, value: it.description, onChange: (e) => update(it.id, "description", e.target.value) })
      ] })
    ] }, it.id)),
    /* @__PURE__ */ jsxs(Button, { variant: "soft", onClick: add, children: [
      /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
      "Add Project"
    ] })
  ] });
}
function Field({
  label,
  value,
  onChange,
  placeholder
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsx(Label, { children: label }),
    /* @__PURE__ */ jsx(Input, { value, onChange: (e) => onChange(e.target.value), placeholder })
  ] });
}
function Card({ children, onRemove }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative rounded-xl border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onRemove,
        className: "absolute right-3 top-3 text-muted-foreground hover:text-destructive transition-colors",
        "aria-label": "Remove",
        children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
      }
    ),
    children
  ] });
}
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const ResumeSchema = z.object({
  personal: z.object({
    fullName: z.string(),
    jobTitle: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    linkedin: z.string(),
    github: z.string(),
    website: z.string(),
    summary: z.string()
  }),
  education: z.array(z.any()),
  experience: z.array(z.any()),
  skills: z.object({
    technical: z.array(z.string()),
    soft: z.array(z.string()),
    languages: z.array(z.string()),
    tools: z.array(z.string())
  }),
  projects: z.array(z.any())
});
const analyzeResume = createServerFn({
  method: "POST"
}).inputValidator((data) => ({
  resume: ResumeSchema.parse(data.resume)
})).handler(createSsrRpc("f495b47df060a8838d9eaaa48cd232f2439f54f94bae34b286953a90eae849fc"));
function AiAnalyzeButton() {
  const { resume, patch } = useResumeStore();
  const analyze = useServerFn(analyzeResume);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const run = async () => {
    if (!resume.personal.fullName) {
      toast.error("Add at least your name before analyzing.");
      return;
    }
    setLoading(true);
    setOpen(true);
    setResult(null);
    try {
      const res = await analyze({ data: { resume } });
      if (res.error || !res.result) {
        toast.error(res.error || "AI analysis failed.");
        setOpen(false);
        return;
      }
      setResult(res.result);
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong.");
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };
  const accept = () => {
    if (!result) return;
    patch("personal", { ...resume.personal, summary: result.improvedSummary });
    if (result.improvedExperience?.length) {
      const updated = resume.experience.map((exp, i) => {
        const imp = result.improvedExperience[i];
        return imp ? { ...exp, description: imp.description } : exp;
      });
      patch("experience", updated);
    }
    const merged = Array.from(
      /* @__PURE__ */ new Set([...resume.skills.technical, ...result.suggestedSkills || []])
    );
    patch("skills", { ...resume.skills, technical: merged });
    toast.success("Resume optimized!");
    setOpen(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Button, { variant: "hero", size: "lg", onClick: run, disabled: loading, children: [
      loading ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }),
      "AI Analyze & Improve"
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl max-h-[85vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5 text-primary" }),
          "AI Resume Analysis"
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Review the AI's suggested improvements before applying." })
      ] }),
      loading && /* @__PURE__ */ jsxs("div", { className: "py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }),
        /* @__PURE__ */ jsx("p", { children: "Analyzing your resume against the 2026 job market…" })
      ] }),
      result && /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-gradient-brand p-5 text-brand-foreground", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider opacity-80", children: "ATS Score" }),
            /* @__PURE__ */ jsxs("div", { className: "text-4xl font-bold", children: [
              result.atsScore,
              "/100"
            ] })
          ] }),
          /* @__PURE__ */ jsx(TrendingUp, { className: "h-10 w-10 opacity-80" })
        ] }) }),
        /* @__PURE__ */ jsx(Block, { title: "Improved Summary", children: /* @__PURE__ */ jsx("p", { className: "text-sm", children: result.improvedSummary }) }),
        result.improvedExperience?.length > 0 && /* @__PURE__ */ jsx(Block, { title: "Improved Experience Bullets", children: /* @__PURE__ */ jsx("div", { className: "space-y-3", children: result.improvedExperience.map((e, i) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold text-muted-foreground", children: e.position }),
          /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5 text-sm mt-1 space-y-0.5", children: e.description.split("\n").filter(Boolean).map((line, j) => /* @__PURE__ */ jsx("li", { children: line.replace(/^[-•]\s*/, "") }, j)) })
        ] }, i)) }) }),
        result.suggestedSkills?.length > 0 && /* @__PURE__ */ jsx(Block, { title: "Recommended Skills", children: /* @__PURE__ */ jsx(Tags, { items: result.suggestedSkills }) }),
        result.missingKeywords?.length > 0 && /* @__PURE__ */ jsx(Block, { title: "Missing ATS Keywords", children: /* @__PURE__ */ jsx(Tags, { items: result.missingKeywords }) }),
        result.suggestions?.length > 0 && /* @__PURE__ */ jsx(Block, { title: "Optimization Suggestions", children: /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5 text-sm space-y-1", children: result.suggestions.map((s, i) => /* @__PURE__ */ jsx("li", { children: s }, i)) }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
          /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => setOpen(false), children: [
            /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
            "Reject"
          ] }),
          /* @__PURE__ */ jsxs(Button, { variant: "hero", onClick: accept, children: [
            /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }),
            "Accept Changes"
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
function Block({ title, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsx("h4", { className: "text-xs font-semibold uppercase tracking-wider text-primary mb-2", children: title }),
    children
  ] });
}
function Tags({ items }) {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: items.map((t, i) => /* @__PURE__ */ jsx("span", { className: "rounded-full bg-accent px-2.5 py-0.5 text-xs text-accent-foreground", children: t }, i)) });
}
const { saveAs } = FileSaver;
async function exportDocx(r) {
  const p = (text) => new Paragraph({ children: [new TextRun({ text })] });
  const sectionTitle = (text) => new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, size: 26, color: "4F46E5" })]
  });
  const children = [];
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: r.personal.fullName || "Your Name", bold: true, size: 40 })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: r.personal.jobTitle, size: 24, color: "6B7280" })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: [r.personal.email, r.personal.phone, r.personal.address].filter(Boolean).join("  •  "),
          size: 20,
          color: "6B7280"
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: [r.personal.linkedin, r.personal.github, r.personal.website].filter(Boolean).join("  •  "),
          size: 20,
          color: "6B7280"
        })
      ]
    })
  );
  if (r.personal.summary) {
    children.push(sectionTitle("Summary"), p(r.personal.summary));
  }
  if (r.experience.length) {
    children.push(sectionTitle("Experience"));
    r.experience.forEach((e) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${e.position} — ${e.company}`, bold: true, size: 24 })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${e.startDate} – ${e.endDate || "Present"}`,
              italics: true,
              color: "6B7280",
              size: 20
            })
          ]
        })
      );
      e.description.split("\n").forEach((line) => {
        if (line.trim()) children.push(p(`• ${line.replace(/^[-•]\s*/, "")}`));
      });
    });
  }
  if (r.education.length) {
    children.push(sectionTitle("Education"));
    r.education.forEach((ed) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${ed.degree} — ${ed.institution}`, bold: true, size: 24 })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${ed.startDate} – ${ed.endDate}${ed.gpa ? `  •  GPA ${ed.gpa}` : ""}`,
              italics: true,
              color: "6B7280",
              size: 20
            })
          ]
        })
      );
    });
  }
  const skillList = [
    ["Technical", r.skills.technical],
    ["Tools", r.skills.tools],
    ["Languages", r.skills.languages],
    ["Soft Skills", r.skills.soft]
  ];
  if (skillList.some(([, v]) => v.length)) {
    children.push(sectionTitle("Skills"));
    skillList.forEach(([label, vals]) => {
      if (vals.length)
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${label}: `, bold: true }),
              new TextRun({ text: vals.join(", ") })
            ]
          })
        );
    });
  }
  if (r.projects.length) {
    children.push(sectionTitle("Projects"));
    r.projects.forEach((pr) => {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: pr.name, bold: true, size: 24 })]
        }),
        p(pr.description),
        new Paragraph({
          children: [
            new TextRun({ text: `Tech: ${pr.technologies}`, italics: true, color: "6B7280", size: 20 })
          ]
        })
      );
    });
  }
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Calibri", size: 22 } } }
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
          }
        },
        children
      }
    ]
  });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${(r.personal.fullName || "resume").replace(/\s+/g, "_")}.docx`);
}
async function exportPdf(elementId, filename) {
  const html2pdf = (await import("html2pdf.js")).default;
  const el = document.getElementById(elementId);
  if (!el) return;
  await html2pdf().set({
    margin: 0,
    filename: `${filename.replace(/\s+/g, "_")}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
  }).from(el).save();
}
const STEPS = [{
  id: "personal",
  label: "Personal",
  icon: User,
  Component: PersonalStep
}, {
  id: "experience",
  label: "Experience",
  icon: Briefcase,
  Component: ExperienceStep
}, {
  id: "education",
  label: "Education",
  icon: GraduationCap,
  Component: EducationStep
}, {
  id: "skills",
  label: "Skills",
  icon: Code2,
  Component: SkillsStep
}, {
  id: "projects",
  label: "Projects",
  icon: FolderGit2,
  Component: ProjectsStep
}, {
  id: "preview",
  label: "Preview",
  icon: Eye,
  Component: null
}];
function BuilderPage() {
  const [step, setStep] = useState(0);
  const {
    resume
  } = useResumeStore();
  const Current = STEPS[step].Component;
  const isPreview = STEPS[step].id === "preview";
  const downloadPdf = async () => {
    try {
      await exportPdf("resume-preview", resume.personal.fullName || "resume");
      toast.success("PDF downloaded");
    } catch (e) {
      console.error(e);
      toast.error("Failed to export PDF");
    }
  };
  const downloadDocx = async () => {
    try {
      await exportDocx(resume);
      toast.success("DOCX downloaded");
    } catch (e) {
      console.error(e);
      toast.error("Failed to export DOCX");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-30 glass", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex items-center justify-between px-4 py-3", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 font-display font-bold", children: [
        /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-lg bg-gradient-brand grid place-items-center text-brand-foreground", children: /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }) }),
        "ResumeAI ",
        /* @__PURE__ */ jsx("span", { className: "text-gradient-brand", children: "Pro" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(AiAnalyzeButton, {}) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6 overflow-x-auto", children: /* @__PURE__ */ jsx("ol", { className: "flex items-center gap-2 min-w-max", children: STEPS.map((s, i) => {
        const Icon = s.icon;
        const active = i === step;
        const done = i < step;
        return /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => setStep(i), className: `flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition-all ${active ? "bg-gradient-brand text-brand-foreground shadow-glow" : done ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`, children: [
            /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: s.label })
          ] }),
          i < STEPS.length - 1 && /* @__PURE__ */ jsx("div", { className: "h-px w-6 bg-border" })
        ] }, s.id);
      }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-soft", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(motion.div, { initial: {
            opacity: 0,
            y: 8
          }, animate: {
            opacity: 1,
            y: 0
          }, exit: {
            opacity: 0,
            y: -8
          }, transition: {
            duration: 0.2
          }, children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-1", children: STEPS[step].label }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-5", children: isPreview ? "Final review. Run AI analyze, then download as PDF or DOCX." : "Fill in the details below — changes preview live on the right." }),
            Current ? /* @__PURE__ */ jsx(Current, {}) : /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Your resume is ready. Optimize it with AI before exporting for best results." }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [
                /* @__PURE__ */ jsxs(Button, { variant: "default", onClick: downloadPdf, children: [
                  /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
                  " Download PDF"
                ] }),
                /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: downloadDocx, children: [
                  /* @__PURE__ */ jsx(FileType2, { className: "h-4 w-4" }),
                  " Download DOCX"
                ] })
              ] })
            ] })
          ] }, STEPS[step].id) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxs(Button, { variant: "outline", disabled: step === 0, onClick: () => setStep((s) => Math.max(0, s - 1)), children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
              " Previous"
            ] }),
            /* @__PURE__ */ jsxs(Button, { disabled: step === STEPS.length - 1, onClick: () => setStep((s) => Math.min(STEPS.length - 1, s + 1)), children: [
              "Next ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:sticky lg:top-20 lg:self-start", children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-border bg-muted/40 p-4 overflow-auto max-h-[calc(100vh-7rem)]", children: /* @__PURE__ */ jsx("div", { className: "origin-top scale-[0.62] sm:scale-75 lg:scale-[0.68] xl:scale-[0.82] transition-transform", children: /* @__PURE__ */ jsx(ResumePreview, { data: resume }) }) }) })
      ] })
    ] })
  ] });
}
export {
  BuilderPage as component
};
