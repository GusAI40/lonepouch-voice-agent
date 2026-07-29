// Vapi Code Tool: getProductInfo
// Answers 16 FAQ categories from lonepouches.com — updated July 2026

const q = (args.query || "").toLowerCase();

// INGREDIENTS — updated June 2026 formulation (moist pouch, MCT oil)
if (q.includes("ingredient") || q.includes("what is in") || q.includes("made of")) {
  return "LonePouch uses 6 clean ingredients. Synthetic Nicotine — the purest form available, no heavy metals, no pesticides. Xylitol — a natural sweetener that actively supports oral health. Microcrystalline Cellulose — pharmaceutical-grade plant fiber, zero plastics. MCT Oil — fast-digesting coconut-derived fat for smooth mouthfeel and consistent moisture. Baking Soda — gentle pH balance, no chemical burn. Essential Oils — single-source plant-extracted, no artificial flavors. We recently updated to a moist pouch formulation for better flavor delivery and more even nicotine release. No Ace-K. No sucralose. No microplastics. No mystery fillers.";
}

// STRENGTHS
if (q.includes("strength") || q.includes("mg") || q.includes("milligram") || q.includes("dose") || q.includes("level")) {
  return "Three strengths available. 3MG — light and smooth, great for beginners. 6MG — balanced and steady, the everyday level. 9MG — bold and focused, maximum strength with the same clean formula. All strengths use the same ingredients, just different nicotine levels.";
}

// FLAVORS
if (q.includes("flavor") || q.includes("crisp") || q.includes("cinnamon") || q.includes("wintergreen") || q.includes("menthol")) {
  return "Three flavors. Crisp — cool menthol, clean and refreshing. Cinnamon — warm and bold. Wintergreen — classic, smooth. Also available as a Variety Pack. Flavored with essential oils, not artificial chemicals.";
}

// LAB TESTING
if (q.includes("lab") || q.includes("test") || q.includes("quality") || q.includes("safety")) {
  return "Every batch is third-party lab tested for purity and consistency. No heavy metals, no pesticides, no tobacco-specific nitrosamines. Full transparency. 100 percent made in the USA.";
}

// pH / GUMS
if (q.includes("ph") || q.includes("gum") || q.includes("burn") || q.includes("irritat")) {
  return "LonePouch uses baking soda for gentle pH balance — not the harsher sodium carbonate other brands use. This means no chemical burn and no gum irritation. Same compound used in dentistry.";
}

// MICROPLASTICS
if (q.includes("microplastic") || q.includes("plastic") || q.includes("polymer")) {
  return "Zero microplastics. We use microcrystalline cellulose — a pharmaceutical-grade plant fiber — instead of the plastic-based binders found in most other pouches.";
}

// NICOTINE
if (q.includes("nicotine") && (q.includes("synthet") || q.includes("tobacco") || q.includes("source"))) {
  return "We use synthetic nicotine, the purest form available. Unlike tobacco-derived nicotine, it contains no heavy metals, no pesticides, and no carcinogenic tobacco-specific nitrosamines. Clean, pure, and consistent.";
}

// FORMULATION UPDATE
if (q.includes("formulation") || q.includes("update") || q.includes("change") || q.includes("different")) {
  return "We updated to a moist pouch formulation in June 2026. We replaced sodium alginate with MCT oil for more consistent moisture, smoother mouthfeel, and better flavor delivery. Same clean ingredients, same strengths, better experience. During the transition, both old and new pouches may be in circulation.";
}

// SHIPPING
if (q.includes("ship") || q.includes("deliver") || q.includes("where")) {
  return "Orders process within 1 to 3 business days. Standard delivery is 3 to 7 business days. We ship from Euless, Texas. Important — we cannot ship to Arkansas, Massachusetts, Vermont, Rhode Island, Washington DC, or California for certain flavors due to state regulations. Orders to these locations will be canceled and refunded.";
}

// RETURNS
if (q.includes("return") || q.includes("refund") || q.includes("money back") || q.includes("guarantee")) {
  return "We offer a 30-day money back guarantee. If you are not satisfied, email support at lonepouches.com with your order number. For lost or stolen packages, check with your carrier first, then reach out to our support team.";
}

// SUBSCRIPTION
if (q.includes("subscrib")) {
  return "Subscribe and save 10 percent off every delivery. Monthly auto-delivery of your chosen flavor and strength. Pause, skip, or cancel anytime with zero fees. Manage everything from your account at lonepouches.com.";
}

// WHOLESALE
if (q.includes("wholesale") || q.includes("distribut") || q.includes("retail")) {
  return "Wholesale is handled through partners.lonepouches.com. We work with retailers and distributors nationwide with competitive tiered pricing based on volume.";
}

// AGE
if (q.includes("age") || q.includes("21") || q.includes("old") || q.includes("verif")) {
  return "LonePouch is for adults 21 and older only. We use third-party age verification before shipping. Any failed verification will result in a canceled order.";
}

// HOW LONG
if (q.includes("how long") || q.includes("last") || q.includes("duration") || q.includes("use") || q.includes("how to")) {
  return "Each pouch lasts up to 45 minutes. Place it between your gum and upper lip. The precisely calibrated moisture and pH provide a smooth, steady experience.";
}

// PRICE
if (q.includes("price") || q.includes("cost") || q.includes("how much")) {
  return "$27.50 for a 5-pack. Subscribe and save 10 percent. Available in 3MG, 6MG, and 9MG strengths. Free shipping on qualifying orders. All prices in USD.";
}

// XYLITOL
if (q.includes("xylitol") || q.includes("sweetener") || q.includes("ace") || q.includes("sucralose")) {
  return "We use xylitol — a natural sugar alcohol found in fruits and vegetables. It is the only sweetener shown to actively support oral health by reducing bacterial growth. Unlike acesulfame K or sucralose, it will not disturb your gut microbiome or spike insulin.";
}

// DEFAULT
return "LonePouch is The Clean Nicotine Pouch. Six purposeful ingredients, moist pouch formulation, three flavors, three strengths — 3MG, 6MG, and 9MG. $27.50 for a 5-pack. Thirty-day money back guarantee. Lab tested, made in the USA. What specifically can I help you with?";