import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useResumeStore } from "@/lib/resume/store";
import {
  PersonalStep,
  ExperienceStep,
  EducationStep,
  SkillsStep,
  ProjectsStep,
} from "@/components/resume/Steps";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { AiAnalyzeButton } from "@/components/resume/AiAnalyze";
import { Button } from "@/components/ui/button";
import { exportDocx, exportPdf } from "@/lib/resume/export";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  FileText,
  FileType2,
  Eye,
  User,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Resume Builder — ResumeAI Pro" },
      {
        name: "description",
        content:
          "Build a job-winning resume step by step with live preview, AI optimization, and PDF/DOCX export.",
      },
      { property: "og:title", content: "Resume Builder — ResumeAI Pro" },
      { property: "og:description", content: "AI-powered resume builder with live preview." },
    ],
    links: [{ rel: "canonical", href: "/builder" }],
  }),
  component: BuilderPage,
});

const STEPS = [
  { id: "personal", label: "Personal", icon: User, Component: PersonalStep },
  { id: "experience", label: "Experience", icon: Briefcase, Component: ExperienceStep },
  { id: "education", label: "Education", icon: GraduationCap, Component: EducationStep },
  { id: "skills", label: "Skills", icon: Code2, Component: SkillsStep },
  { id: "projects", label: "Projects", icon: FolderGit2, Component: ProjectsStep },
  { id: "preview", label: "Preview", icon: Eye, Component: null },
] as const;

function BuilderPage() {
  const [step, setStep] = useState(0);
  const { resume } = useResumeStore();
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

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 glass">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-display font-bold">
            <div className="h-8 w-8 rounded-lg bg-gradient-brand grid place-items-center text-brand-foreground">
              <FileText className="h-4 w-4" />
            </div>
            ResumeAI <span className="text-gradient-brand">Pro</span>
          </Link>
          <div className="flex items-center gap-2">
            <AiAnalyzeButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stepper */}
        <div className="mb-6 overflow-x-auto">
          <ol className="flex items-center gap-2 min-w-max">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const active = i === step;
              const done = i < step;
              return (
                <li key={s.id} className="flex items-center gap-2">
                  <button
                    onClick={() => setStep(i)}
                    className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition-all ${
                      active
                        ? "bg-gradient-brand text-brand-foreground shadow-glow"
                        : done
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="font-medium">{s.label}</span>
                  </button>
                  {i < STEPS.length - 1 && <div className="h-px w-6 bg-border" />}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form / Actions */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-soft">
              <AnimatePresence mode="wait">
                <motion.div
                  key={STEPS[step].id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-xl font-semibold mb-1">{STEPS[step].label}</h2>
                  <p className="text-sm text-muted-foreground mb-5">
                    {isPreview
                      ? "Final review. Run AI analyze, then download as PDF or DOCX."
                      : "Fill in the details below — changes preview live on the right."}
                  </p>
                  {Current ? (
                    <Current />
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Your resume is ready. Optimize it with AI before exporting for best results.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Button variant="default" onClick={downloadPdf}>
                          <Download className="h-4 w-4" /> Download PDF
                        </Button>
                        <Button variant="outline" onClick={downloadDocx}>
                          <FileType2 className="h-4 w-4" /> Download DOCX
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>
              <Button
                disabled={step === STEPS.length - 1}
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              >
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-border bg-muted/40 p-4 overflow-auto max-h-[calc(100vh-7rem)]">
              <div className="origin-top scale-[0.62] sm:scale-75 lg:scale-[0.68] xl:scale-[0.82] transition-transform">
                <ResumePreview data={resume} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
