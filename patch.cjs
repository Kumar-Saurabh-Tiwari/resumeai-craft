const fs = require("fs");
const content = fs.readFileSync("src/routes/builder.tsx", "utf8");

const regex = /\/\*\s*LivePreview\s*\*\/[\s\S]*/m;

// wait, the comment is: {/* Live Preview */}
const regex2 = /\{[\s\S]*Live Preview\s*\*\/\}[\s\S]*/m;

const replacement = `{/* Live Preview */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-border bg-card shadow-soft flex flex-col h-[calc(100vh-8rem)] max-h-[850px]">
              <div className="flex items-center justify-between border-b border-border p-4 bg-muted/20 shrink-0">
                <div>
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <Eye className="h-4 w-4 text-brand" /> Live Preview
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                    Updates instantly as you edit.
                  </p>
                </div>
                <span className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded-md border border-border/50">8.5" × 11"</span>
              </div>
              <div className="flex-1 overflow-auto bg-[#F8F9FA] dark:bg-black/20 p-4 sm:p-6 flex justify-center relative scrollbar-hide">
                <div className="origin-top scale-[0.45] sm:scale-[0.7] lg:scale-[0.6] xl:scale-[0.75] transition-transform flex-shrink-0">
                  <div className="ring-1 ring-border/40 shadow-xl shadow-black/5">
                    <ResumePreview data={resume} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync("src/routes/builder.tsx", content.replace(regex2, replacement));
