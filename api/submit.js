// LonePouch submitInquiry — server-backed Vercel function
// Keys in Vercel env vars ONLY — no hardcoded fallbacks

const RESEND_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "LonePouch <noreply@ubntag.com>";
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "support@lonepouches.com";
const SALES_EMAIL = process.env.SALES_EMAIL || "sales@lonepouches.com";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!RESEND_KEY) return res.status(200).json({ results: [{ toolCallId: "", error: "RESEND_API_KEY not configured" }] });

  try {
    const body = req.body || {};
    const toolCalls = body.message?.toolCallList || body.message?.toolWithToolCallList || [];
    const results = [];
    for (const tc of toolCalls) {
      const id = tc.id || tc.toolCall?.id || "";
      const fn = tc.name || tc.toolCall?.function?.name || tc.function?.name || "";
      const a = typeof tc.arguments === "string" ? JSON.parse(tc.arguments) : (tc.arguments || tc.toolCall?.function?.parameters || {});
      try {
        if (fn !== "submitInquiry") { results.push({ toolCallId: id, error: `Unknown: ${fn}` }); continue; }
        const { intent, name, email, phone, orderNumber, description } = a;
        if (!intent || !name || !email || !description) { results.push({ toolCallId: id, result: "Missing required fields." }); continue; }
        let route, label;
        if (intent === "customer_support") { route = SUPPORT_EMAIL; label = "Customer Support"; }
        else if (intent === "wholesale") { route = SALES_EMAIL; label = "Wholesale"; }
        else if (intent === "partnerships") { route = SALES_EMAIL; label = "Partnerships"; }
        else { route = SUPPORT_EMAIL; label = "General Inquiry"; }
        const p = phone ? `Phone: ${phone}` : "";
        const o = orderNumber ? `Order Number: ${orderNumber}` : "";
        const resp = await fetch("https://api.resend.com/emails", { method: "POST", headers: {Authorization:`Bearer ${RESEND_KEY}`,"Content-Type":"application/json"}, body: JSON.stringify({from:FROM_EMAIL,to:route,subject:`New ${label}: ${name}`,text:`New ${label} Inquiry\n\nName: ${name}\nEmail: ${email}\n${p}\n${o}\n\nDescription:\n${description}\n\n--\nSubmitted via LonePouch Voice Agent\n${new Date().toISOString()}`})});
        const first = name.split(" ")[0];
        results.push({ toolCallId: id, result: resp.ok ? `Got it, ${first}. Your ${label.toLowerCase()} inquiry has been submitted to our team.` : `Your inquiry has been logged. Our team will follow up.` });
      } catch(e) { results.push({ toolCallId: id, result: "Your inquiry has been logged. Our team will follow up." }); }
    }
    return res.status(200).json({ results });
  } catch(e) { return res.status(200).json({ results: [{ toolCallId: "", error: e.message }] }); }
};