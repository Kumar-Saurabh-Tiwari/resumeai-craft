import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  FileText,
  Download,
  ShieldCheck,
  Zap,
  Eye,
  Check,
  Star,
  ArrowRight,
  Layout,
  Brain,
  FileType2,
} from "lucide-react";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { emptyResume } from "@/lib/resume/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResumeAI Pro — Build a Job-Winning Resume with AI" },
      {
        name: "description",
        content:
          "Create, optimize, and download professional resumes in minutes. AI-powered market analysis, ATS scoring, PDF and DOCX export.",
      },
      { property: "og:title", content: "ResumeAI Pro" },
      {
        property: "og:description",
        content: "AI-powered resume builder with ATS scoring and live preview.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

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
    summary:
      "Product designer with 8+ years shipping consumer and enterprise SaaS. Led design for a Series B fintech from 0 → 200k MAU, cutting onboarding drop-off by 38%.",
  },
  experience: [
    {
      id: "1",
      company: "Northwind Fintech",
      position: "Lead Product Designer",
      startDate: "2022",
      endDate: "Present",
      description:
        "Led end-to-end redesign of onboarding, cutting drop-off by 38%.\nShipped a design system adopted by 24 engineers across 4 squads.\nPartnered with PM on pricing experiments that lifted ARPU 22%.",
    },
  ],
  education: [
    {
      id: "1",
      degree: "B.A. Design",
      institution: "Parsons School of Design",
      location: "New York, NY",
      startDate: "2013",
      endDate: "2017",
      gpa: "",
    },
  ],
  skills: {
    technical: ["Figma", "Design Systems", "Prototyping", "User Research"],
    soft: ["Leadership", "Communication"],
    languages: ["English", "Spanish"],
    tools: ["Linear", "Notion", "Maze"],
  },
  projects: [],
};

const FEATURES = [
  { icon: Layout, title: "Multi-Step Builder", desc: "Guided wizard that gets out of your way." },
  { icon: Eye, title: "Live Preview", desc: "See your resume update as you type." },
  { icon: Brain, title: "AI Analysis", desc: "Rewrites weak bullets and adds market keywords." },
  { icon: ShieldCheck, title: "ATS Score", desc: "Optimized for applicant tracking systems." },
  { icon: Download, title: "PDF Export", desc: "Pixel-perfect PDF, ready to send." },
  { icon: FileType2, title: "DOCX Export", desc: "Editable Word document on demand." },
  { icon: Sparkles, title: "Modern Templates", desc: "Recruiter-tested layouts that look sharp." },
  { icon: Zap, title: "One-Click Optimize", desc: "Polish your whole resume in seconds." },
];

const STEPS = [
  "Fill personal information",
  "Add experience & education",
  "List skills & projects",
  "Preview your resume",
  "AI Analyze & Improve",
  "Download PDF or DOCX",
];

const TESTIMONIALS = [
  {
    name: "Priya Shah",
    role: "Software Engineer at Stripe",
    quote:
      "I rewrote my resume in 20 minutes and landed three interviews the next week. The AI suggestions were spot-on.",
  },
  {
    name: "Marcus Lee",
    role: "Product Manager",
    quote:
      "The ATS score is genuinely useful. It told me exactly which keywords were missing for senior PM roles.",
  },
  {
    name: "Sara Okafor",
    role: "Recent Grad",
    quote:
      "Beautiful templates and zero learning curve. I had a polished resume before my coffee was done.",
  },
];

const FAQ = [
  { q: "Is it really free?", a: "Yes — the free plan covers 3 resumes per month with PDF export." },
  {
    q: "Will my resume pass ATS scanners?",
    a: "All templates are ATS-friendly and our AI flags missing keywords for your target role.",
  },
  {
    q: "Can I edit my resume in Word?",
    a: "Yes. Export as DOCX and open in Word, Google Docs, or Pages.",
  },
  {
    q: "Do you store my data?",
    a: "Your resume stays in your browser. Nothing is uploaded unless you run AI analyze.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-30 glass">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <div className="h-8 w-8 rounded-lg bg-gradient-brand grid place-items-center text-brand-foreground">
              <FileText className="h-4 w-4" />
            </div>
            ResumeAI <span className="text-gradient-brand">Pro</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how" className="hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#pricing" className="hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>
          <Link to="/builder">
            <Button variant="hero" size="sm">
              <Sparkles className="h-4 w-4" />
              Build Resume
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-glow">
        <div className="container mx-auto px-4 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground mb-5">
              <Sparkles className="h-3 w-3 text-primary" /> AI-powered • ATS-optimized • 2026 ready
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              Build a <span className="text-gradient-brand">job-winning resume</span> in minutes
              with AI
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Create, optimize, and download professional resumes with AI-powered market analysis.
              Live preview, ATS scoring, and PDF / DOCX export — all in one place.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/builder">
                <Button variant="hero" size="lg">
                  Create Resume Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#how">
                <Button variant="outline" size="lg">
                  <Eye className="h-4 w-4" /> Watch Demo
                </Button>
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <Stat n="50k+" l="Resumes built" />
              <Stat n="92%" l="Interview rate" />
              <Stat n="ATS" l="Optimized" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mx-auto w-full max-w-[500px] lg:mx-0 lg:ml-auto"
          >
            <div className="absolute -inset-6 bg-gradient-brand opacity-20 blur-3xl rounded-full" />
            <div className="relative rounded-2xl glass p-4 sm:p-6 shadow-glow overflow-hidden flex justify-center h-[480px]">
              <div className="origin-top scale-[0.45] sm:scale-[0.55] transition-transform">
                <ResumePreview data={SAMPLE} id="hero-preview" />
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-2 sm:right-4 top-10 glass rounded-xl px-3 py-2 text-xs shadow-soft"
            >
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-md bg-gradient-brand grid place-items-center text-brand-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="font-semibold">ATS Score: 94/100</div>
                  <div className="text-muted-foreground">+12 keywords added</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-20">
        <SectionHeader
          eyebrow="Features"
          title="Everything you need to land the offer"
          sub="Built for jobseekers who want to look senior, ship fast, and pass every ATS."
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              whileHover={{ y: -3 }}
              className="rounded-xl border border-border bg-card p-5 shadow-soft transition-all hover:shadow-glow"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-brand grid place-items-center text-brand-foreground mb-3">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-muted/30 py-20 border-y border-border">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="How it works"
            title="From blank page to ATS-ready in 6 steps"
            sub=""
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STEPS.map((s, i) => (
              <div key={s} className="rounded-xl glass p-5 flex gap-4">
                <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-brand text-brand-foreground grid place-items-center font-bold">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <div className="font-medium">{s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <SectionHeader eyebrow="Loved by jobseekers" title="Hired in days, not months" sub="" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex gap-0.5 text-primary mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-sm">"{t.quote}"</p>
              <div className="mt-4 text-sm">
                <div className="font-semibold">{t.name}</div>
                <div className="text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-muted/30 py-20 border-y border-border">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Pricing" title="Simple, transparent pricing" sub="" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <PricingCard
              name="Free"
              price="$0"
              features={["3 resumes / month", "PDF export", "All ATS templates", "Live preview"]}
            />
            <PricingCard
              name="Pro"
              price="$9"
              highlight
              features={[
                "Unlimited resumes",
                "AI Analyze & Improve",
                "DOCX export",
                "Premium templates",
                "Priority AI processing",
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto px-4 py-20">
        <SectionHeader eyebrow="FAQ" title="Questions, answered" sub="" />
        <div className="mt-10 max-w-2xl mx-auto space-y-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex justify-between items-center cursor-pointer font-medium">
                {f.q}
                <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24">
        <div className="rounded-3xl bg-gradient-brand p-10 sm:p-16 text-center text-brand-foreground shadow-glow relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Ready to land your dream job?
          </h2>
          <p className="mt-3 max-w-xl mx-auto opacity-90">
            Build a resume recruiters actually want to read. Free to start, no credit card required.
          </p>
          <div className="mt-7">
            <Link to="/builder">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Build Resume Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 ResumeAI Pro. Built with care.
      </footer>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-gradient-brand">{n}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{l}</div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold mt-2 tracking-tight">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function PricingCard({
  name,
  price,
  features,
  highlight,
}: {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-7 shadow-soft border ${
        highlight
          ? "bg-gradient-brand text-brand-foreground border-transparent shadow-glow"
          : "bg-card border-border"
      }`}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl font-bold">{name}</h3>
        <div>
          <span className="text-3xl font-bold">{price}</span>
          <span className={highlight ? "opacity-80" : "text-muted-foreground"}>/mo</span>
        </div>
      </div>
      <ul className="mt-5 space-y-2 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <Check className="h-4 w-4" /> {f}
          </li>
        ))}
      </ul>
      <Link to="/builder" className="block mt-6">
        <Button
          className="w-full"
          variant={highlight ? "default" : "hero"}
          style={highlight ? { background: "white", color: "var(--primary)" } : undefined}
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
}
