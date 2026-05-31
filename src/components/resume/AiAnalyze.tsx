import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useServerFn } from "@tanstack/react-start";
import { analyzeResume, type AnalyzeResult } from "@/lib/ai/analyze.functions";
import { useResumeStore } from "@/lib/resume/store";
import { Sparkles, Loader2, Check, X, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export function AiAnalyzeButton() {
  const { resume, patch } = useResumeStore();
  const analyze = useServerFn(analyzeResume);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResult | null>(null);

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
      setResult(res.result as AnalyzeResult);
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
      new Set([...resume.skills.technical, ...(result.suggestedSkills || [])]),
    );
    patch("skills", { ...resume.skills, technical: merged });
    toast.success("Resume optimized!");
    setOpen(false);
  };

  return (
    <>
      <Button variant="hero" size="lg" onClick={run} disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        AI Analyze &amp; Improve
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Resume Analysis
            </DialogTitle>
            <DialogDescription>
              Review the AI's suggested improvements before applying.
            </DialogDescription>
          </DialogHeader>

          {loading && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Analyzing your resume against the 2026 job market…</p>
            </div>
          )}

          {result && (
            <div className="space-y-5">
              <div className="rounded-xl bg-gradient-brand p-5 text-brand-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider opacity-80">ATS Score</div>
                    <div className="text-4xl font-bold">{result.atsScore}/100</div>
                  </div>
                  <TrendingUp className="h-10 w-10 opacity-80" />
                </div>
              </div>

              <Block title="Improved Summary">
                <p className="text-sm">{result.improvedSummary}</p>
              </Block>

              {result.improvedExperience?.length > 0 && (
                <Block title="Improved Experience Bullets">
                  <div className="space-y-3">
                    {result.improvedExperience.map((e, i) => (
                      <div key={i}>
                        <div className="text-xs font-semibold text-muted-foreground">{e.position}</div>
                        <ul className="list-disc pl-5 text-sm mt-1 space-y-0.5">
                          {e.description.split("\n").filter(Boolean).map((line, j) => (
                            <li key={j}>{line.replace(/^[-•]\s*/, "")}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Block>
              )}

              {result.suggestedSkills?.length > 0 && (
                <Block title="Recommended Skills">
                  <Tags items={result.suggestedSkills} />
                </Block>
              )}

              {result.missingKeywords?.length > 0 && (
                <Block title="Missing ATS Keywords">
                  <Tags items={result.missingKeywords} />
                </Block>
              )}

              {result.suggestions?.length > 0 && (
                <Block title="Optimization Suggestions">
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </Block>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />Reject
                </Button>
                <Button variant="hero" onClick={accept}>
                  <Check className="h-4 w-4" />Accept Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">{title}</h4>
      {children}
    </div>
  );
}
function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t, i) => (
        <span key={i} className="rounded-full bg-accent px-2.5 py-0.5 text-xs text-accent-foreground">
          {t}
        </span>
      ))}
    </div>
  );
}
