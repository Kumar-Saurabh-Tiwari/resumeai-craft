import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { B as Button, R as ResumePreview, e as emptyResume } from "./ResumePreview-Co9V-eM2.js";
import { FileText, Sparkles, ArrowRight, Eye, Layout, Brain, ShieldCheck, Download, FileType2, Zap, Star, Check } from "lucide-react";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
const SAMPLE = {
  ...emptyResume,
  personal: {
    fullName: "Alex Rivera",
    jobTitle: "Senior Product Designer",
    email: "alex@rivera.design",
    phone: "+1 555 248 1190",
    address: "Brooklyn, NY",
    linkedin: "linkedin.com/in/alexrivera",
    github: "",
    website: "rivera.design",
    summary: "Product designer with 8+ years shipping consumer and enterprise SaaS. Led design for a Series B fintech from 0 → 200k MAU, cutting onboarding drop-off by 38%."
  },
  experience: [{
    id: "1",
    company: "Northwind Fintech",
    position: "Lead Product Designer",
    startDate: "2022",
    endDate: "Present",
    description: "Led end-to-end redesign of onboarding, cutting drop-off by 38%.\nShipped a design system adopted by 24 engineers across 4 squads.\nPartnered with PM on pricing experiments that lifted ARPU 22%."
  }],
  education: [{
    id: "1",
    degree: "B.A. Design",
    institution: "Parsons School of Design",
    location: "New York, NY",
    startDate: "2013",
    endDate: "2017",
    gpa: ""
  }],
  skills: {
    technical: ["Figma", "Design Systems", "Prototyping", "User Research"],
    soft: ["Leadership", "Communication"],
    languages: ["English", "Spanish"],
    tools: ["Linear", "Notion", "Maze"]
  },
  projects: []
};
const FEATURES = [{
  icon: Layout,
  title: "Multi-Step Builder",
  desc: "Guided wizard that gets out of your way."
}, {
  icon: Eye,
  title: "Live Preview",
  desc: "See your resume update as you type."
}, {
  icon: Brain,
  title: "AI Analysis",
  desc: "Rewrites weak bullets and adds market keywords."
}, {
  icon: ShieldCheck,
  title: "ATS Score",
  desc: "Optimized for applicant tracking systems."
}, {
  icon: Download,
  title: "PDF Export",
  desc: "Pixel-perfect PDF, ready to send."
}, {
  icon: FileType2,
  title: "DOCX Export",
  desc: "Editable Word document on demand."
}, {
  icon: Sparkles,
  title: "Modern Templates",
  desc: "Recruiter-tested layouts that look sharp."
}, {
  icon: Zap,
  title: "One-Click Optimize",
  desc: "Polish your whole resume in seconds."
}];
const STEPS = ["Fill personal information", "Add experience & education", "List skills & projects", "Preview your resume", "AI Analyze & Improve", "Download PDF or DOCX"];
const TESTIMONIALS = [{
  name: "Priya Shah",
  role: "Software Engineer at Stripe",
  quote: "I rewrote my resume in 20 minutes and landed three interviews the next week. The AI suggestions were spot-on."
}, {
  name: "Marcus Lee",
  role: "Product Manager",
  quote: "The ATS score is genuinely useful. It told me exactly which keywords were missing for senior PM roles."
}, {
  name: "Sara Okafor",
  role: "Recent Grad",
  quote: "Beautiful templates and zero learning curve. I had a polished resume before my coffee was done."
}];
const FAQ = [{
  q: "Is it really free?",
  a: "Yes — the free plan covers 3 resumes per month with PDF export."
}, {
  q: "Will my resume pass ATS scanners?",
  a: "All templates are ATS-friendly and our AI flags missing keywords for your target role."
}, {
  q: "Can I edit my resume in Word?",
  a: "Yes. Export as DOCX and open in Word, Google Docs, or Pages."
}, {
  q: "Do you store my data?",
  a: "Your resume stays in your browser. Nothing is uploaded unless you run AI analyze."
}];
function Landing() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-30 glass", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex items-center justify-between px-4 py-3", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 font-display font-bold text-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-lg bg-gradient-brand grid place-items-center text-brand-foreground", children: /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }) }),
        "ResumeAI ",
        /* @__PURE__ */ jsx("span", { className: "text-gradient-brand", children: "Pro" })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden sm:flex items-center gap-6 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx("a", { href: "#features", className: "hover:text-foreground transition-colors", children: "Features" }),
        /* @__PURE__ */ jsx("a", { href: "#how", className: "hover:text-foreground transition-colors", children: "How it works" }),
        /* @__PURE__ */ jsx("a", { href: "#pricing", className: "hover:text-foreground transition-colors", children: "Pricing" }),
        /* @__PURE__ */ jsx("a", { href: "#faq", className: "hover:text-foreground transition-colors", children: "FAQ" })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/builder", children: /* @__PURE__ */ jsxs(Button, { variant: "hero", size: "sm", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }),
        "Build Resume"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden bg-hero-glow", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 16
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.5
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground mb-5", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3 text-primary" }),
          " AI-powered • ATS-optimized • 2026 ready"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight", children: [
          "Build a ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient-brand", children: "job-winning resume" }),
          " in minutes with AI"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-lg text-muted-foreground max-w-xl", children: "Create, optimize, and download professional resumes with AI-powered market analysis. Live preview, ATS scoring, and PDF / DOCX export — all in one place." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx(Link, { to: "/builder", children: /* @__PURE__ */ jsxs(Button, { variant: "hero", size: "lg", children: [
            "Create Resume Free ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsx("a", { href: "#how", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "lg", children: [
            /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }),
            " Watch Demo"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 grid grid-cols-3 gap-4 max-w-md", children: [
          /* @__PURE__ */ jsx(Stat, { n: "50k+", l: "Resumes built" }),
          /* @__PURE__ */ jsx(Stat, { n: "92%", l: "Interview rate" }),
          /* @__PURE__ */ jsx(Stat, { n: "ATS", l: "Optimized" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 24
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6,
        delay: 0.1
      }, className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-6 bg-gradient-brand opacity-20 blur-3xl rounded-full" }),
        /* @__PURE__ */ jsx("div", { className: "relative rounded-2xl glass p-3 shadow-glow overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "origin-top scale-[0.62] -mb-32", children: /* @__PURE__ */ jsx(ResumePreview, { data: SAMPLE, id: "hero-preview" }) }) }),
        /* @__PURE__ */ jsx(motion.div, { animate: {
          y: [0, -8, 0]
        }, transition: {
          duration: 4,
          repeat: Infinity
        }, className: "absolute -right-2 sm:right-4 top-10 glass rounded-xl px-3 py-2 text-xs shadow-soft", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-7 w-7 rounded-md bg-gradient-brand grid place-items-center text-brand-foreground", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "ATS Score: 94/100" }),
            /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "+12 keywords added" })
          ] })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { id: "features", className: "container mx-auto px-4 py-20", children: [
      /* @__PURE__ */ jsx(SectionHeader, { eyebrow: "Features", title: "Everything you need to land the offer", sub: "Built for jobseekers who want to look senior, ship fast, and pass every ATS." }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: FEATURES.map((f) => /* @__PURE__ */ jsxs(motion.div, { whileHover: {
        y: -3
      }, className: "rounded-xl border border-border bg-card p-5 shadow-soft transition-all hover:shadow-glow", children: [
        /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-lg bg-gradient-brand grid place-items-center text-brand-foreground mb-3", children: /* @__PURE__ */ jsx(f.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: f.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: f.desc })
      ] }, f.title)) })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "how", className: "bg-muted/30 py-20 border-y border-border", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx(SectionHeader, { eyebrow: "How it works", title: "From blank page to ATS-ready in 6 steps", sub: "" }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: STEPS.map((s, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl glass p-5 flex gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "h-9 w-9 shrink-0 rounded-full bg-gradient-brand text-brand-foreground grid place-items-center font-bold", children: i + 1 }),
        /* @__PURE__ */ jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsx("div", { className: "font-medium", children: s }) })
      ] }, s)) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "container mx-auto px-4 py-20", children: [
      /* @__PURE__ */ jsx(SectionHeader, { eyebrow: "Loved by jobseekers", title: "Hired in days, not months", sub: "" }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-1 md:grid-cols-3 gap-4", children: TESTIMONIALS.map((t) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
        /* @__PURE__ */ jsx("div", { className: "flex gap-0.5 text-primary mb-3", children: Array.from({
          length: 5
        }).map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }, i)) }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
          '"',
          t.quote,
          '"'
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 text-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold", children: t.name }),
          /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: t.role })
        ] })
      ] }, t.name)) })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "pricing", className: "bg-muted/30 py-20 border-y border-border", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx(SectionHeader, { eyebrow: "Pricing", title: "Simple, transparent pricing", sub: "" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsx(PricingCard, { name: "Free", price: "$0", features: ["3 resumes / month", "PDF export", "All ATS templates", "Live preview"] }),
        /* @__PURE__ */ jsx(PricingCard, { name: "Pro", price: "$9", highlight: true, features: ["Unlimited resumes", "AI Analyze & Improve", "DOCX export", "Premium templates", "Priority AI processing"] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { id: "faq", className: "container mx-auto px-4 py-20", children: [
      /* @__PURE__ */ jsx(SectionHeader, { eyebrow: "FAQ", title: "Questions, answered", sub: "" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 max-w-2xl mx-auto space-y-3", children: FAQ.map((f) => /* @__PURE__ */ jsxs("details", { className: "group rounded-xl border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden", children: [
        /* @__PURE__ */ jsxs("summary", { className: "flex justify-between items-center cursor-pointer font-medium", children: [
          f.q,
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-open:rotate-90" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: f.a })
      ] }, f.q)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "container mx-auto px-4 pb-24", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-gradient-brand p-10 sm:p-16 text-center text-brand-foreground shadow-glow relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-5xl font-bold tracking-tight", children: "Ready to land your dream job?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-xl mx-auto opacity-90", children: "Build a resume recruiters actually want to read. Free to start, no credit card required." }),
      /* @__PURE__ */ jsx("div", { className: "mt-7", children: /* @__PURE__ */ jsx(Link, { to: "/builder", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "bg-white text-primary hover:bg-white/90", children: [
        "Build Resume Now ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-border py-8 text-center text-sm text-muted-foreground", children: "© 2026 ResumeAI Pro. Built with care." })
  ] });
}
function Stat({
  n,
  l
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gradient-brand", children: n }),
    /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: l })
  ] });
}
function SectionHeader({
  eyebrow,
  title,
  sub
}) {
  return /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary", children: eyebrow }),
    /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold mt-2 tracking-tight", children: title }),
    sub && /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground", children: sub })
  ] });
}
function PricingCard({
  name,
  price,
  features,
  highlight
}) {
  return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl p-7 shadow-soft border ${highlight ? "bg-gradient-brand text-brand-foreground border-transparent shadow-glow" : "bg-card border-border"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: name }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold", children: price }),
        /* @__PURE__ */ jsx("span", { className: highlight ? "opacity-80" : "text-muted-foreground", children: "/mo" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-2 text-sm", children: features.map((f) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }),
      " ",
      f
    ] }, f)) }),
    /* @__PURE__ */ jsx(Link, { to: "/builder", className: "block mt-6", children: /* @__PURE__ */ jsx(Button, { className: "w-full", variant: highlight ? "default" : "hero", style: highlight ? {
      background: "white",
      color: "var(--primary)"
    } : void 0, children: "Get Started" }) })
  ] });
}
export {
  Landing as component
};
