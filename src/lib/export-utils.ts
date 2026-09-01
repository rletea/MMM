import { GeneratedPostItem, StrategyPlanOutput, FullProfilePayload } from "./types";

export function exportPostsToCSV(posts: GeneratedPostItem[]): string {
  const headers = [
    "Day",
    "Scheduled Date",
    "Channel",
    "Content Type",
    "Status",
    "Pillar",
    "Hook",
    "Body Content",
    "Visual Prompt",
  ];

  const escapeCSV = (str?: string) => {
    if (!str) return '""';
    const escaped = str.replace(/"/g, '""');
    return `"${escaped}"`;
  };

  const rows = posts.map((p) => [
    p.dayNumber,
    escapeCSV(p.scheduledDate || ""),
    escapeCSV(p.channel),
    escapeCSV(p.contentType),
    escapeCSV(p.status),
    escapeCSV(p.pillar),
    escapeCSV(p.hook),
    escapeCSV(p.bodyContent),
    escapeCSV(p.visualPrompt || ""),
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

export function exportStrategyToMarkdown(
  profile: FullProfilePayload["businessProfile"],
  strategy: StrategyPlanOutput,
  scoreBreakdown: FullProfilePayload["diagnostic"]["scoreBreakdown"],
  posts: GeneratedPostItem[]
): string {
  const md = `# MASTER MARKETING STRATEGY & 30-DAY CONTENT CALENDAR
**Brand:** ${profile.businessName}
**Industry:** ${profile.industry}
**Model:** ${profile.businessModel}
**Viability Score (BVI):** ${scoreBreakdown.totalScore}% (${scoreBreakdown.tierLabel})

---

## 1. Executive Summary & Viability Diagnostic
- **Total BVI Score:** ${scoreBreakdown.totalScore} / 100
- **Market Viability:** ${scoreBreakdown.marketViability}%
- **Product-Market Alignment:** ${scoreBreakdown.productMarketAlignment}%
- **Execution Capacity:** ${scoreBreakdown.executionCapacity}%
- **Ikigai Congruence:** ${scoreBreakdown.ikigaiCongruence}%
- **Channel Readiness:** ${scoreBreakdown.channelReadiness}%

### Key Strategic Directives
${scoreBreakdown.actionDirectives.map((d) => `- ${d}`).join("\n")}

---

## 2. Core Positioning & Brand Manifesto

${strategy.positioningDoc}

${strategy.brandManifesto}

---

## 3. Strategic Content Pillars

${strategy.contentPillars
  .map(
    (p, i) => `### Pillar ${i + 1}: ${p.title}
*Frequency: ${p.frequencyPerWeek}x / week*
- **Description:** ${p.description}
- **Audience Angle:** ${p.targetAudienceAngle}
- **Sample Hooks:**
${p.sampleHooks.map((h) => `  * "${h}"`).join("\n")}`
  )
  .join("\n\n")}

---

## 4. 30-Day Multi-Channel Content Calendar

${posts
  .map(
    (p) => `### Day ${p.dayNumber} [${p.channel}] - ${p.contentType}
**Pillar:** ${p.pillar} | **Status:** ${p.status}
**Hook:** ${p.hook}

${p.bodyContent}

${p.visualPrompt ? `*Visual/Video Prompt:* \`${p.visualPrompt}\`` : ""}
---`
  )
  .join("\n\n")}
`;

  return md;
}

export function downloadBlobFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
