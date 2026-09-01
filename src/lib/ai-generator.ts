import {
  WizardFormState,
  StrategyPlanOutput,
  GeneratedPostItem,
  ChannelType,
  ContentFormatType,
  ContentPillar,
} from "./types";

export interface AIStrategyGenerationResult {
  strategy: StrategyPlanOutput;
  contents: GeneratedPostItem[];
}

export async function generateMarketingStrategy(
  formState: WizardFormState,
  apiKey?: string,
  provider: "builtin" | "openai" | "gemini" = "builtin"
): Promise<AIStrategyGenerationResult> {
  // If OpenAI API key is supplied, we can attempt live generation
  if (apiKey && provider === "openai") {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "You are an elite CMO and Brand Strategist. Return a comprehensive marketing strategy and 30-day content calendar in valid JSON matching the requested schema.",
            },
            {
              role: "user",
              content: `Generate a brand manifesto, positioning doc, 4 content pillars, weekly distribution matrix, and 30 unique multi-channel content posts for:
Business: ${JSON.stringify(formState.business)}
Ikigai: ${JSON.stringify(formState.ikigai)}
Competitive: ${JSON.stringify(formState.competitive)}
Audience: ${JSON.stringify(formState.audience)}
Scope: ${JSON.stringify(formState.scope)}`,
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        if (parsed.strategy && parsed.contents) {
          return parsed as AIStrategyGenerationResult;
        }
      }
    } catch (err) {
      console.warn("OpenAI generation fallback to built-in synthesizer:", err);
    }
  }

  // Built-in High-Intelligence Generative Synthesizer Engine
  return synthesizeStrategyAndContent(formState);
}

export function synthesizeStrategyAndContent(
  state: WizardFormState
): AIStrategyGenerationResult {
  const { ikigai, business, competitive, audience, scope } = state;

  const brandName = business.businessName || "Our Brand";
  const industry = business.industry || "General Business";
  const archetype = ikigai.archetype?.replace(/_/g, " ") || "Visionary Disruptor";
  const icp = audience.icpDemographics || "ambitious founders and professionals";
  const differentiator = competitive.differentiator || "uncompromising quality and unique methodology";
  const passion = ikigai.passion || "transforming outcomes";
  const mission = ikigai.mission || "empowering sustainable growth";
  const activeChannels: ChannelType[] =
    scope.activeChannels && scope.activeChannels.length > 0
      ? scope.activeChannels
      : ["LINKEDIN", "EMAIL", "INSTAGRAM"];

  // 1. Positioning Document
  const positioningDoc = `### Core Positioning Statement
For **${icp}** who struggle with **${audience.painTriggers?.[0] || "inefficiency and low-leverage outcomes"}**, **${brandName}** is the premier **${business.businessModel.replace(/_/g, " ")}** partner in the **${industry}** sector that delivers **${differentiator}**.

Unlike standard alternatives, ${brandName} bridges **${passion}** with rigorous **${ikigai.profession || "domain expertise"}**, embodying the **${archetype}** archetype to turn complex hurdles into predictable competitive advantages.

#### Key Value Anchors:
1. **Unrivaled Specialization**: Engineered specifically for ${icp}.
2. **Distinctive Edge**: Rooted in our unique commitment to ${differentiator}.
3. **Founder Mission**: Driven by the core mandate to ${mission}.`;

  // 2. Brand Manifesto
  const brandManifesto = `# THE ${brandName.toUpperCase()} MANIFESTO

We believe that true excellence in ${industry} is not an accident—it is a conscious discipline.

Too many in our space settle for superficial fixes, cookie-cutter playbooks, and short-sighted noise. They forget the human element, the deeper mission, and the undeniable power of authentic mastery.

At ${brandName}, we stand as a **${archetype}**. 
Our passion is ${passion}. 
Our profession is delivering high-impact, measurable results for ${icp}.
Our mission is clear: ${mission}.

We do not conform to industry mediocrity. We define new standards through ${differentiator}.

Every solution we deploy, every piece of knowledge we share, and every conversation we initiate is guided by our core values: ${(ikigai.coreValues || ["Integrity", "Innovation", "Mastery"]).join(" • ")}.

This is our craft. This is our promise.`;

  // 3. 4 Strategic Content Pillars
  const contentPillars: ContentPillar[] = [
    {
      title: "Pillar 1: Counter-Intuitive Truths & Thought Leadership",
      description: `Disrupt common myths in ${industry} by contrasting outdated approaches with our ${archetype} perspective.`,
      targetAudienceAngle: `Addresses skepticism from ${icp} who have been burned by conventional methods.`,
      sampleHooks: [
        `Why 90% of advice in ${industry} is quietly killing your growth.`,
        `The biggest lie founders believe about ${audience.painTriggers?.[0] || "scaling"}.`,
        `Stop doing this in ${industry} if you want real leverage.`,
      ],
      frequencyPerWeek: 2,
    },
    {
      title: "Pillar 2: Deconstructive Case Studies & Tactical Breakdowns",
      description: `Step-by-step transparency showing exactly how our methodology solves ${audience.painTriggers?.[0] || "core operational hurdles"}.`,
      targetAudienceAngle: `Caters to analytical decision-makers looking for concrete proof and clear frameworks.`,
      sampleHooks: [
        `How we dismantled a major bottleneck in under 14 days without increasing burn.`,
        `The 3-stage blueprint we use to solve ${audience.painTriggers?.[1] || "client retention"}.`,
        `A teardown of how ${differentiator.slice(0, 40)}... unlocks exponential gains.`,
      ],
      frequencyPerWeek: 2,
    },
    {
      title: "Pillar 3: Ikigai Behind-The-Scenes & Founder Ethos",
      description: `Humanizing the brand through our core values, origin stories, and the passion that drives our craft.`,
      targetAudienceAngle: `Builds deep emotional affinity and long-term brand equity with ${icp}.`,
      sampleHooks: [
        `What nobody tells you about committing to ${mission.slice(0, 45)}...`,
        `The real reason I built ${brandName} instead of taking the easy road.`,
        `Behind the curtain: What our team argues about when designing for clients.`,
      ],
      frequencyPerWeek: 1,
    },
    {
      title: "Pillar 4: Direct Conversion & Offer Clarification",
      description: `Frictionless calls-to-action that articulate our core service proposition, addressing buying objections head-on.`,
      targetAudienceAngle: `Converts warm and problem-aware prospects into booked calls and inquiries.`,
      sampleHooks: [
        `If your team is struggling with ${audience.painTriggers?.[0] || "this issue"}, here is what your next 30 days should look like.`,
        `Why ${audience.buyingObjections?.[0] || "waiting for the right time"} is actually your most expensive choice.`,
        `We are opening 3 private advisory spots for ${icp} this month.`,
      ],
      frequencyPerWeek: 2,
    },
  ];

  // 4. Weekly Distribution Matrix
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const weeklyCadence = daysOfWeek.map((day, idx) => {
    const channel = activeChannels[idx % activeChannels.length];
    const pillar = contentPillars[idx % contentPillars.length];
    const contentType: ContentFormatType =
      channel === "TIKTOK"
        ? "REEL_SCRIPT"
        : channel === "INSTAGRAM"
        ? idx % 2 === 0
          ? "CAROUSEL"
          : "REEL_SCRIPT"
        : channel === "EMAIL"
        ? "NEWSLETTER"
        : "POST";

    return {
      day,
      channel,
      contentType,
      pillarFocus: pillar.title,
      strategicGoal:
        idx % 3 === 0
          ? "Authority & Viral Reach"
          : idx % 3 === 1
          ? "Audience Trust & Education"
          : "Direct Lead Acquisition",
    };
  });

  // 5. 30-Day Starter Content Calendar
  const contents: GeneratedPostItem[] = [];

  for (let day = 1; day <= 30; day++) {
    const channel = activeChannels[(day - 1) % activeChannels.length];
    const pillarIndex = (day - 1) % contentPillars.length;
    const pillar = contentPillars[pillarIndex];

    const postItem = generateDailyPostItem(
      day,
      channel,
      pillar,
      brandName,
      industry,
      archetype,
      icp,
      differentiator,
      audience.painTriggers || ["inefficiency", "scaling bottlenecks", "low conversions"],
      audience.buyingObjections || ["cost", "time commitment", "prior bad experiences"],
      ikigai.coreValues || ["Excellence", "Integrity"]
    );

    contents.push(postItem);
  }

  const strategy: StrategyPlanOutput = {
    positioningDoc,
    brandManifesto,
    contentPillars,
    weeklyCadence,
    reviewCadence: scope.reviewCadence || "MONTHLY",
    activeChannels,
  };

  return { strategy, contents };
}

function generateDailyPostItem(
  day: number,
  channel: ChannelType,
  pillar: ContentPillar,
  brandName: string,
  industry: string,
  archetype: string,
  icp: string,
  differentiator: string,
  painTriggers: string[],
  objections: string[],
  coreValues: string[]
): GeneratedPostItem {
  const pain = painTriggers[(day - 1) % painTriggers.length] || "operational drag";
  const objection = objections[(day - 1) % objections.length] || "budget hesitation";
  const value = coreValues[(day - 1) % coreValues.length] || "Mastery";

  const scheduledDate = new Date();
  scheduledDate.setDate(scheduledDate.getDate() + day);

  if (channel === "LINKEDIN") {
    const hook =
      day % 3 === 0
        ? `Most ${icp} approach ${pain} completely backwards. Here is what 7-figure operators do differently:`
        : day % 3 === 1
        ? `We stopped trying to solve ${pain} with more tools. Here is the 3-step framework that actually moved the needle:`
        : `Unpopular opinion in ${industry}: ${differentiator.slice(0, 50)} matters more than sheer volume. Here is why:`;

    const bodyContent = `${hook}

When you look across the ${industry} landscape, 80% of teams get stuck in a reactive loop:
1. They encounter ${pain}.
2. They apply generic band-aids.
3. They wonder why friction compounds over time.

At ${brandName}, we approach this through the lens of a **${archetype}**.

Here is our exact 3-phase playbook:

🔹 **Phase 1: Root Diagnostic**
Strip away vanity metrics. Audit where the real leakage occurs before committing capital.

🔹 **Phase 2: Asymmetrical Leverage**
Deploy ${differentiator.slice(0, 45)} to eliminate 80% of the manual drag in under 14 days.

🔹 **Phase 3: Feedback Calibration**
Anchor the operational rhythm to our core principle of **${value}**.

The result? Sustainable velocity without founder burnout.

---
💬 If you are an ${icp}, how is your team currently tackling ${pain}? Drop your perspective below.`;

    return {
      id: `post-day-${day}`,
      dayNumber: day,
      channel: "LINKEDIN",
      contentType: "POST",
      hook,
      bodyContent,
      visualPrompt: `Clean, minimalist corporate illustration of modern high-tech workspace with subtle glowing indigo and violet accent lights, 4k resolution, editorial style.`,
      status: "DRAFT",
      pillar: pillar.title,
      scheduledDate: scheduledDate.toISOString(),
    };
  }

  if (channel === "TIKTOK") {
    const hook = `If you're a ${icp.split(" ")[0] || "founder"} dealing with ${pain}, stop scrolling right now.`;
    const bodyContent = `[0:00 - 0:03 HOOK]
${hook}

[0:03 - 0:15 THE MISTAKE]
Everyone tells you to just work harder or buy another subscription. But here's why that actually makes ${pain} ten times worse.

[0:15 - 0:35 THE FIX]
Here is the 2-minute framework we use at ${brandName}:
First, identify your primary constraint.
Second, apply ${differentiator.slice(0, 35)} so you stop bleeding hours.
Third, automate the recurring friction.

[0:35 - 0:45 CTA]
Save this video for your next planning session and hit follow for daily frameworks.`;

    return {
      id: `post-day-${day}`,
      dayNumber: day,
      channel: "TIKTOK",
      contentType: "REEL_SCRIPT",
      hook,
      bodyContent,
      videoScript: {
        hookVisual: `Speaker points finger directly at camera with urgent text overlay on screen: "STOP SCROLLING IF YOU DEAL WITH ${pain.toUpperCase()}"`,
        sceneBreakdown: [
          `Scene 1 (0-3s): Close-up engaging hook with fast punch-in zoom.`,
          `Scene 2 (4-15s): B-roll of frustrated creator/founder looking at complex dashboard.`,
          `Scene 3 (16-35s): Green-screen background displaying clean 3-step diagram with pointer.`,
          `Scene 4 (36-45s): Direct eye-contact CTA with on-screen animated bookmark icon.`,
        ],
        audioCues: `Trending upbeat Lo-Fi electronic beat underneath crisp, dynamic voiceover.`,
        cta: `Bookmark this video and check the link in bio for our free diagnostic tool.`,
      },
      visualPrompt: `Vertical 9:16 cinematic lighting, dynamic creator studio background with subtle purple neon backlight.`,
      status: "DRAFT",
      pillar: pillar.title,
      scheduledDate: scheduledDate.toISOString(),
    };
  }

  if (channel === "INSTAGRAM") {
    const isCarousel = day % 2 === 0;
    const hook = isCarousel
      ? `Swipe to see the 5-step framework that fixes ${pain} permanently ➡️`
      : `The secret to beating ${pain} in ${industry} without spending 40 hours a week on it.`;

    const bodyContent = isCarousel
      ? `Slide 1: The real reason ${pain} keeps happening.
Slide 2: Why traditional advice fails ${icp}.
Slide 3: Our ${archetype} framework broken down.
Slide 4: Real-world transformation numbers.
Slide 5: Action checklist you can implement today.

---
Save this post for your weekly strategy review. Link in bio to see how ${brandName} implements this for you.`
      : `${hook}

When most teams hit a wall with ${pain}, they panic and throw random tactics at the wall.

Instead, double down on **${value}** and focus on **${differentiator.slice(0, 40)}**.

Tap save if this resonates and leave a 🔥 in the comments!`;

    return {
      id: `post-day-${day}`,
      dayNumber: day,
      channel: "INSTAGRAM",
      contentType: isCarousel ? "CAROUSEL" : "POST",
      hook,
      bodyContent,
      visualPrompt: `Sleek dark mode graphic with glassmorphism cards, glowing gradient borders in purple and cyan, typography centered: "${hook.slice(0, 60)}..."`,
      status: "DRAFT",
      pillar: pillar.title,
      scheduledDate: scheduledDate.toISOString(),
    };
  }

  if (channel === "EMAIL") {
    const hook = `Issue #${day}: How to solve ${pain} without the guesswork`;
    const bodyContent = `Subject: ${hook}
Preview Text: The exact blueprint we use inside ${brandName}

Hey {{subscriber.first_name | default: 'there'}},

Let's be honest: ${pain} is the single biggest momentum killer in ${industry} right now.

Last week, I had a conversation with a ${icp.split(" ")[0] || "leader"} who was worried about ${objection}. They felt trapped between needing rapid progress and not wanting to waste resources.

Here is the exact advice I shared:

1. **Audit the invisible friction**: Where are your hours actually disappearing?
2. **Implement ${differentiator.slice(0, 35)}**: Simplify before you amplify.
3. **Commit to ${value}**: Consistency beats intensity every single time.

If you'd like us to review your current marketing roadmap and calculate your exact Viability Score, hit reply with "SCORE" and I'll personally take a look.

To your growth,
The ${brandName} Team`;

    return {
      id: `post-day-${day}`,
      dayNumber: day,
      channel: "EMAIL",
      contentType: "NEWSLETTER",
      hook,
      bodyContent,
      visualPrompt: `Email header banner graphic featuring modern abstract 3D shapes floating in violet space with ${brandName} typography.`,
      status: "DRAFT",
      pillar: pillar.title,
      scheduledDate: scheduledDate.toISOString(),
    };
  }

  // FACEBOOK
  const hook = `Question for fellow ${industry} operators: How is your team handling ${pain} right now?`;
  const bodyContent = `${hook}

Over the past few months, we've noticed a major pattern among ${icp}. 

The biggest challenge isn't a lack of effort—it's that standard solutions ignore the core reality of ${differentiator.slice(0, 45)}.

We put together a comprehensive breakdown on how we tackle this with zero fluff. 

Let's discuss in the comments: What is your biggest hurdle with ${pain} this quarter?`;

  return {
    id: `post-day-${day}`,
    dayNumber: day,
    channel: "FACEBOOK",
    contentType: "POST",
    hook,
    bodyContent,
    visualPrompt: `Community discussion banner graphic with soft blue lighting and bold question typography.`,
    status: "DRAFT",
    pillar: pillar.title,
    scheduledDate: scheduledDate.toISOString(),
  };
}
