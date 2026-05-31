import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";
const emptyResume = {
  personal: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    website: "",
    summary: ""
  },
  education: [],
  experience: [],
  skills: { technical: [], soft: [], languages: [], tools: [] },
  projects: []
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-brand text-brand-foreground shadow-glow hover:opacity-95 transition-opacity",
        soft: "bg-accent text-accent-foreground hover:bg-accent/80"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
function ResumePreview({ data, id = "resume-preview" }) {
  const { personal: p, education, experience, skills, projects } = data;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      id,
      className: "bg-white text-slate-900 mx-auto shadow-soft",
      style: {
        width: "8.5in",
        minHeight: "11in",
        padding: "0.6in 0.7in",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "10.5pt",
        lineHeight: 1.45
      },
      children: [
        /* @__PURE__ */ jsxs("header", { className: "border-b border-slate-200 pb-4", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-[26pt] font-bold tracking-tight text-slate-900 leading-tight", children: p.fullName || "Your Name" }),
          p.jobTitle && /* @__PURE__ */ jsx("p", { className: "text-[12pt] text-indigo-600 font-medium mt-0.5", children: p.jobTitle }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[9pt] text-slate-600", children: [
            p.email && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Mail, { className: "h-3 w-3" }),
              p.email
            ] }),
            p.phone && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-3 w-3" }),
              p.phone
            ] }),
            p.address && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3" }),
              p.address
            ] }),
            p.linkedin && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Linkedin, { className: "h-3 w-3" }),
              p.linkedin
            ] }),
            p.github && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Github, { className: "h-3 w-3" }),
              p.github
            ] }),
            p.website && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Globe, { className: "h-3 w-3" }),
              p.website
            ] })
          ] })
        ] }),
        p.summary && /* @__PURE__ */ jsx(Section, { title: "Professional Summary", children: /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: p.summary }) }),
        experience.length > 0 && /* @__PURE__ */ jsx(Section, { title: "Experience", children: experience.map((e) => /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between", children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-slate-900 text-[11pt]", children: [
              e.position,
              " ",
              /* @__PURE__ */ jsxs("span", { className: "text-slate-500 font-normal", children: [
                "— ",
                e.company
              ] })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-[9pt] text-slate-500", children: [
              e.startDate,
              " – ",
              e.endDate || "Present"
            ] })
          ] }),
          e.description && /* @__PURE__ */ jsx("ul", { className: "mt-1 list-disc pl-5 text-slate-700 space-y-0.5", children: e.description.split("\n").filter(Boolean).map((line, i) => /* @__PURE__ */ jsx("li", { children: line.replace(/^[-•]\s*/, "") }, i)) })
        ] }, e.id)) }),
        education.length > 0 && /* @__PURE__ */ jsx(Section, { title: "Education", children: education.map((ed) => /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-slate-900 text-[11pt]", children: ed.degree }),
            /* @__PURE__ */ jsxs("p", { className: "text-slate-600 text-[10pt]", children: [
              ed.institution,
              ed.location && ` • ${ed.location}`,
              ed.gpa && ` • GPA ${ed.gpa}`
            ] })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-[9pt] text-slate-500", children: [
            ed.startDate,
            " – ",
            ed.endDate
          ] })
        ] }, ed.id)) }),
        (skills.technical.length || skills.tools.length || skills.languages.length || skills.soft.length) > 0 && /* @__PURE__ */ jsx(Section, { title: "Skills", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-[10pt]", children: [
          skills.technical.length > 0 && /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Technical:" }),
            " ",
            skills.technical.join(", ")
          ] }),
          skills.tools.length > 0 && /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Tools:" }),
            " ",
            skills.tools.join(", ")
          ] }),
          skills.languages.length > 0 && /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Languages:" }),
            " ",
            skills.languages.join(", ")
          ] }),
          skills.soft.length > 0 && /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Soft Skills:" }),
            " ",
            skills.soft.join(", ")
          ] })
        ] }) }),
        projects.length > 0 && /* @__PURE__ */ jsx(Section, { title: "Projects", children: projects.map((pr) => /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-slate-900 text-[11pt]", children: pr.name }),
          pr.description && /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: pr.description }),
          pr.technologies && /* @__PURE__ */ jsxs("p", { className: "text-[9pt] text-slate-500 italic", children: [
            "Tech: ",
            pr.technologies
          ] })
        ] }, pr.id)) })
      ]
    }
  );
}
function Section({ title, children }) {
  return /* @__PURE__ */ jsxs("section", { className: "mt-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-[11pt] font-bold uppercase tracking-wider text-indigo-600 border-b border-indigo-100 pb-1 mb-2", children: title }),
    children
  ] });
}
export {
  Button as B,
  ResumePreview as R,
  cn as c,
  emptyResume as e
};
