import {
  WizardFormState,
  BVIScoreBreakdown,
  RiskTierType,
  BusinessModelType,
  ChannelType,
} from "./types";

export function calculateBVI(state: WizardFormState): BVIScoreBreakdown {
  const { ikigai, business, competitive, audience, scope } = state;

  // 1. Ikigai Congruence Score (0 - 100)
  let ikigaiScore = 50;
  if (ikigai.passion && ikigai.passion.trim().length > 15) ikigaiScore += 12;
  if (ikigai.vocation && ikigai.vocation.trim().length > 15) ikigaiScore += 12;
  if (ikigai.mission && ikigai.mission.trim().length > 15) ikigaiScore += 12;
  if (ikigai.profession && ikigai.profession.trim().length > 15) ikigaiScore += 12;
  if (ikigai.coreValues && ikigai.coreValues.length >= 3) ikigaiScore += 10;
  if (ikigai.archetype) ikigaiScore += 5;
  ikigaiScore = Math.min(100, Math.max(20, ikigaiScore));

  // 2. Market Viability Score (0 - 100)
  let marketScore = 60;
  switch (competitive.marketSaturation) {
    case "LOW":
      marketScore = 90;
      break;
    case "MEDIUM":
      marketScore = 80;
      break;
    case "HIGH":
      marketScore = 60;
      break;
    case "RED_OCEAN":
      marketScore = 42;
      break;
    default:
      marketScore = 65;
  }

  // Differentiator evaluation
  const diffLen = competitive.differentiator?.trim().length || 0;
  if (diffLen > 100) marketScore += 10;
  else if (diffLen > 40) marketScore += 5;
  else marketScore -= 10;

  // Competitor awareness (knowing 1-5 competitors shows awareness)
  const compCount = competitive.competitors?.length || 0;
  if (compCount >= 2 && compCount <= 8) marketScore += 8;
  else if (compCount === 0) marketScore -= 12;

  marketScore = Math.min(100, Math.max(15, marketScore));

  // 3. Execution Capacity Score (0 - 100)
  let capacityScore = 40;
  const hours = business.weeklyHours || 5;
  const budget = business.monthlyBudget || 0;
  const channelCount = scope.activeChannels?.length || 1;

  // Hours points
  if (hours >= 25) capacityScore += 30;
  else if (hours >= 15) capacityScore += 25;
  else if (hours >= 8) capacityScore += 18;
  else capacityScore += 8;

  // Budget points
  if (budget >= 3000) capacityScore += 30;
  else if (budget >= 1000) capacityScore += 22;
  else if (budget >= 300) capacityScore += 14;
  else capacityScore += 6;

  // Channel load penalty (overextending with few hours)
  const loadRatio = channelCount / Math.max(1, hours / 4);
  if (loadRatio > 2.5) capacityScore -= 18;
  else if (loadRatio > 1.8) capacityScore -= 8;
  else capacityScore += 8;

  capacityScore = Math.min(100, Math.max(10, capacityScore));

  // 4. Product-Market Alignment (0 - 100)
  let pmScore = 55;
  const icpLen = audience.icpDemographics?.trim().length || 0;
  if (icpLen > 80) pmScore += 15;
  else if (icpLen > 30) pmScore += 8;

  const painCount = audience.painTriggers?.length || 0;
  if (painCount >= 3) pmScore += 15;
  else if (painCount >= 1) pmScore += 8;

  const objectionCount = audience.buyingObjections?.length || 0;
  if (objectionCount >= 2) pmScore += 10;

  if (business.currentStage === "SCALING" || business.currentStage === "MATURE") {
    pmScore += 10;
  } else if (business.currentStage === "TRACTION") {
    pmScore += 6;
  }

  pmScore = Math.min(100, Math.max(20, pmScore));

  // 5. Channel Readiness & Fit (0 - 100)
  let channelScore = 60;
  const model = business.businessModel;
  const channels = scope.activeChannels || [];

  // Model-Channel Synergy Check
  const hasSynergy = checkChannelSynergy(model, channels);
  if (hasSynergy) channelScore += 20;
  else channelScore -= 5;

  if (scope.primaryGoals && scope.primaryGoals.length >= 2) channelScore += 10;
  if (channels.length >= 2 && channels.length <= 4) channelScore += 10;
  else if (channels.length > 4 && hours < 15) channelScore -= 15;

  channelScore = Math.min(100, Math.max(20, channelScore));

  // Total Weighted BVI Formula:
  // 25% Market Viability + 25% PM Alignment + 20% Execution Capacity + 15% Ikigai + 15% Channel
  const rawTotal =
    marketScore * 0.25 +
    pmScore * 0.25 +
    capacityScore * 0.20 +
    ikigaiScore * 0.15 +
    channelScore * 0.15;

  const totalScore = Math.round(rawTotal);

  // Risk Tier Categorization
  let riskTier: RiskTierType = "MODERATE_RISK";
  let tierLabel = "Moderate Risk / Resource Constrained";
  let tierColor = "#f59e0b"; // Amber

  if (totalScore >= 85) {
    riskTier = "DOMINANT";
    tierLabel = "Market Dominant / High Velocity";
    tierColor = "#10b981"; // Emerald
  } else if (totalScore >= 70) {
    riskTier = "HIGH_POTENTIAL";
    tierLabel = "High Potential / Scale Ready";
    tierColor = "#06b6d4"; // Cyan/Teal
  } else if (totalScore >= 50) {
    riskTier = "MODERATE_RISK";
    tierLabel = "Moderate Risk / Focus Required";
    tierColor = "#f59e0b"; // Amber
  } else {
    riskTier = "CRITICAL_PIVOT";
    tierLabel = "Critical Pivot / Repositioning Required";
    tierColor = "#ef4444"; // Red
  }

  // Dynamic Strengths, Risks, and Action Directives
  const strengths: string[] = [];
  const risks: string[] = [];
  const actionDirectives: string[] = [];

  if (ikigaiScore >= 75) {
    strengths.push(
      `Strong founder-mission alignment based on ${ikigai.archetype?.replace(/_/g, " ").toLowerCase() || "authentic"} archetype.`
    );
  } else {
    risks.push("Core mission and value narrative need deeper crystallization to avoid generic positioning.");
    actionDirectives.push("Refine your founder story and weave your Ikigai mission directly into top-of-funnel hooks.");
  }

  if (marketScore >= 75) {
    strengths.push("High differentiation clarity amidst market landscape, providing defensible brand moat.");
  } else if (competitive.marketSaturation === "RED_OCEAN" || competitive.marketSaturation === "HIGH") {
    risks.push("Operating in a saturated market segment requires sharper wedge messaging to break through noise.");
    actionDirectives.push("Focus on hyper-niche micro-segments before attempting broad horizontal outreach.");
  }

  if (capacityScore >= 75) {
    strengths.push("Well-calibrated resource budget and founder commitment to sustain high-frequency publishing.");
  } else {
    risks.push(
      `Risk of creator burnout or shallow consistency: ${channelCount} active channels with ${hours} weekly hours.`
    );
    actionDirectives.push(
      "Automate content repurposing by using a 1-to-many pillar model (1 anchor asset -> 5 platform derivatives)."
    );
  }

  if (pmScore >= 75) {
    strengths.push("Pinpoint ICP understanding with clearly identified high-urgency pain triggers.");
  } else {
    risks.push("Broad or fuzzy audience demographics may dilute copy conversion rates.");
    actionDirectives.push("Anchor all daily post hooks to the top 2 urgent financial/emotional pain triggers.");
  }

  if (channelScore >= 75) {
    strengths.push(`Optimal channel selection tailored for your ${model.replace(/_/g, " ")} business model.`);
  } else {
    actionDirectives.push(
      "Prioritize your primary high-conversion channel first before splitting attention into secondary networks."
    );
  }

  if (actionDirectives.length === 0) {
    actionDirectives.push(
      "Deploy the 30-day starter calendar and track first 14 days of engagement metrics to calibrate cadence."
    );
  }

  return {
    marketViability: Math.round(marketScore),
    executionCapacity: Math.round(capacityScore),
    productMarketAlignment: Math.round(pmScore),
    channelReadiness: Math.round(channelScore),
    ikigaiCongruence: Math.round(ikigaiScore),
    totalScore,
    riskTier,
    tierLabel,
    tierColor,
    strengths,
    risks,
    actionDirectives,
  };
}

function checkChannelSynergy(model: BusinessModelType, channels: ChannelType[]): boolean {
  if (!channels || channels.length === 0) return false;
  switch (model) {
    case "B2B_SERVICE":
    case "B2B_SAAS":
      return channels.includes("LINKEDIN") || channels.includes("EMAIL");
    case "B2C_ECOM":
      return (
        channels.includes("INSTAGRAM") ||
        channels.includes("TIKTOK") ||
        channels.includes("FACEBOOK")
      );
    case "B2C_LOCAL":
      return (
        channels.includes("FACEBOOK") ||
        channels.includes("INSTAGRAM") ||
        channels.includes("EMAIL")
      );
    case "CREATOR":
      return (
        channels.includes("TIKTOK") ||
        channels.includes("INSTAGRAM") ||
        channels.includes("EMAIL") ||
        channels.includes("LINKEDIN")
      );
    default:
      return true;
  }
}
