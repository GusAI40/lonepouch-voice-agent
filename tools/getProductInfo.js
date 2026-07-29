// Vapi Code Tool: getProductInfo
// Answers 14 FAQ categories from lonepouches.com data

const q = (args.query || "").toLowerCase();

// INGREDIENTS — from lonepouches.com/pages/why-lone
if (q.includes("ingredient") || q.includes("what is in") || q.includes("made of")) {
  return "LonePouch uses 7 clean ingredients, each with a purpose. Xylitol — a natural sugar alcohol that supports oral health without disrupting your gut. Microcrystalline Cellulose — pharmaceutical-grade plant fiber, zero synthetic polymers. Sodium Alginate — extracted from seaweed, biocompatible, even used in medical wound care. Sodium Bicarbonate — the same gentle compound used in dentistry, for mild pH balance. Purified Water — precisely calibrated for comfort and shelf stability. Essential Oils — single-source plant-extracted, no artificial chemical cocktails. Synthetic Nicotine — the purest form available, free from heavy metals, pesticides, and tobacco-specific carcinogens. No Ace-K. No sucralose. No plastic binders. No mystery fillers.";
}

// FLAVORS
if (q.includes("flavor") || q.includes("product") || q.includes("crisp") || q.includes("cinnamon") || q.includes("wintergreen")) {
  return "Three flavors: Crisp — clean, refreshing. Cinnamon — warm, bold. Wintergreen — cool, classic. Also available as a Variety Pack. $3.99 per can. Flavored with essential oils, not artificial chemicals.";
}

// LAB TESTING / QUALITY
if (q.includes("lab") || q.includes("test") || q.includes("quality") || q.includes("safety")) {
  return "Every batch is third-party lab tested for purity and consistency. No heavy metals. No pesticides. No tobacco-specific nitrosamines. We test for exactly what we test against — full transparency. 100% made in the USA.";
}

// pH / GUM HEALTH
if (q.includes("ph") || q.includes("gum") || q.includes("burn") || q.includes("irritat")) {
  return "LonePouch uses sodium bicarbonate — not the harsher sodium carbonate that other brands use. This gives a balanced, gentle pH that optimizes nicotine absorption without damaging oral tissue. It is the same compound used in dentistry. No chemical burn.";
}

// MICROPLASTICS
if (q.includes("microplastic") || q.includes("plastic") || q.includes("polymer")) {
  return "Zero microplastics. Most other pouches use plastic-based binders or synthetic polymers that sit against your gums all day. We use microcrystalline cellulose — a pharmaceutical-grade plant fiber — instead. No plastics touching your tissue.";
}

// NICOTINE
if (q.includes("nicotine") && (q.includes("synthet") || q.includes("tobacco") || q.includes("source"))) {
  return "We use synthetic nicotine — the purest form available. Unlike tobacco-derived nicotine, it contains no heavy metals, no pesticides, and no carcinogenic compounds like tobacco-specific nitrosamines. It is clean, pure, and consistent.";
}

// SHIPPING
if (q.includes("ship") || q.includes("deliver")) {
  return "Free shipping on all orders over $50. Standard delivery takes 3 to 5 business days within the US. We ship from our facility in Euless, Texas.";
}

// RETURNS
if (q.includes("return") || q.includes("refund")) {
  return "Unopened products can be returned within 30 days of purchase. For any issues with opened products — manufacturing defects, shipping damage — please contact our support team.";
}

// SUBSCRIPTION
if (q.includes("subscrib")) {
  return "Subscribe and save 15 percent off every month. Your chosen flavor delivered automatically. Pause, skip, or cancel anytime with zero fees. Manage everything from your account at lonepouches.com.";
}

// WHOLESALE
if (q.includes("wholesale") || q.includes("distribut") || q.includes("retail")) {
  return "Wholesale inquiries are handled through our partners portal at partners.lonepouches.com. We work with retailers and distributors nationwide. Competitive tiered pricing based on volume.";
}

// AGE
if (q.includes("age") || q.includes("21") || q.includes("old")) {
  return "LonePouch is for adults 21 and older only. We verify age at purchase. This product contains tobacco-free nicotine, which is an addictive chemical.";
}

// HOW LONG
if (q.includes("how long") || q.includes("last") || q.includes("duration")) {
  return "Each pouch lasts up to 45 minutes. Place it between your gum and upper lip. The precisely calibrated moisture and pH provide a smooth, steady experience.";
}

// PRICE
if (q.includes("price") || q.includes("cost") || q.includes("how much")) {
  return "$3.99 per can. Variety packs available. Subscribe and save 15 percent. Free shipping on orders over $50. All prices in USD.";
}

// XYLITOL / SWEETENER SPECIFIC
if (q.includes("xylitol") || q.includes("sweetener") || q.includes("ace") || q.includes("sucralose")) {
  return "We use xylitol — a natural sugar alcohol found in fruits and vegetables. It is the only sweetener shown to actively support oral health by reducing bacterial growth. Unlike acesulfame K or sucralose, it will not disturb your gut microbiome or spike insulin.";
}

// DEFAULT
return "LonePouch is The Clean Nicotine Pouch. Seven purposeful ingredients — Xylitol, Microcrystalline Cellulose, Sodium Alginate, Sodium Bicarbonate, Purified Water, Essential Oils, and Synthetic Nicotine. No artificial sweeteners. No plastic binders. No mystery fillers. $3.99 per can, free shipping over $50. Made in the USA. What specifically would you like to know?";