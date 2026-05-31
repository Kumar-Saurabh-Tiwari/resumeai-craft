import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import FileSaver from "file-saver";
const { saveAs } = FileSaver;
import type { ResumeData } from "../resume/types";

export async function exportDocx(r: ResumeData) {
  const p = (text: string) => new Paragraph({ children: [new TextRun({ text })] });

  const sectionTitle = (text: string) =>
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      children: [new TextRun({ text, bold: true, size: 26, color: "4F46E5" })],
    });

  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: r.personal.fullName || "Your Name", bold: true, size: 40 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: r.personal.jobTitle, size: 24, color: "6B7280" })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: [r.personal.email, r.personal.phone, r.personal.address]
            .filter(Boolean)
            .join("  •  "),
          size: 20,
          color: "6B7280",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: [r.personal.linkedin, r.personal.github, r.personal.website]
            .filter(Boolean)
            .join("  •  "),
          size: 20,
          color: "6B7280",
        }),
      ],
    }),
  );

  if (r.personal.summary) {
    children.push(sectionTitle("Summary"), p(r.personal.summary));
  }

  if (r.experience.length) {
    children.push(sectionTitle("Experience"));
    r.experience.forEach((e) => {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `${e.position} — ${e.company}`, bold: true, size: 24 })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${e.startDate} – ${e.endDate || "Present"}`,
              italics: true,
              color: "6B7280",
              size: 20,
            }),
          ],
        }),
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
            new TextRun({ text: `${ed.degree} — ${ed.institution}`, bold: true, size: 24 }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${ed.startDate} – ${ed.endDate}${ed.gpa ? `  •  GPA ${ed.gpa}` : ""}`,
              italics: true,
              color: "6B7280",
              size: 20,
            }),
          ],
        }),
      );
    });
  }

  const skillList = [
    ["Technical", r.skills.technical],
    ["Tools", r.skills.tools],
    ["Languages", r.skills.languages],
    ["Soft Skills", r.skills.soft],
  ] as const;
  if (skillList.some(([, v]) => v.length)) {
    children.push(sectionTitle("Skills"));
    skillList.forEach(([label, vals]) => {
      if (vals.length)
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${label}: `, bold: true }),
              new TextRun({ text: vals.join(", ") }),
            ],
          }),
        );
    });
  }

  if (r.projects.length) {
    children.push(sectionTitle("Projects"));
    r.projects.forEach((pr) => {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: pr.name, bold: true, size: 24 })],
        }),
        p(pr.description),
        new Paragraph({
          children: [
            new TextRun({
              text: `Tech: ${pr.technologies}`,
              italics: true,
              color: "6B7280",
              size: 20,
            }),
          ],
        }),
      );
    });
  }

  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Calibri", size: 22 } } },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${(r.personal.fullName || "resume").replace(/\s+/g, "_")}.docx`);
}

export async function exportPdf(elementId: string, filename: string) {
  const html2pdfModule = await import("html2pdf.js");
  const html2pdf = html2pdfModule.default || html2pdfModule;
  const el = document.getElementById(elementId);
  if (!el) return;
  el.classList.add("pdf-export");

  // Monkey-patch getComputedStyle to hide oklch colors from html2canvas
  const originalGetComputedStyle = window.getComputedStyle;
  window.getComputedStyle = function (element, pseudoElt) {
    const style = originalGetComputedStyle(element, pseudoElt);
    return new Proxy(style, {
      get(target, prop) {
        const val = target[prop as keyof CSSStyleDeclaration];
        if (typeof val === "function" && prop === "getPropertyValue") {
          return function (this: any, ...args: any[]) {
            const res = (val as any).apply(target, args);
            if (typeof res === "string" && res.includes("oklch")) {
              if (args[0] === "background-color") return "rgba(255, 255, 255, 0)";
              if (args[0].includes("border")) return "rgba(0, 0, 0, 0)";
              return "rgb(0, 0, 0)";
            }
            return res;
          };
        }
        if (typeof val === "string" && val.includes("oklch")) {
          if (prop === "backgroundColor" || prop === "background-color")
            return "rgba(255, 255, 255, 0)";
          if (typeof prop === "string" && prop.toLowerCase().includes("border"))
            return "rgba(0, 0, 0, 0)";
          return "rgb(0, 0, 0)";
        }
        return typeof val === "function" ? val.bind(target) : val;
      },
    });
  };

  try {
    await html2pdf()
      .set({
        margin: 0,
        filename: `${filename.replace(/\s+/g, "_")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(el)
      .save();
  } finally {
    window.getComputedStyle = originalGetComputedStyle;
    el.classList.remove("pdf-export");
  }
}
