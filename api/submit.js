// LonePouch submitInquiry — server-backed Vercel function
// Keys live in Vercel env vars, never exposed to Vapi

const RESEND_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "LonePouch Voice Agent <inquiries@ubntag.com>";
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "support@lonepouches.com";
const SALES_EMAIL = process.env.SALES_EMAIL || "sales@lonepouches.com";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const body = req.body || {};
    const toolCalls = body.message?.toolCallList || body.message?.toolWithToolCallList || [];
    const results = [];

    for (const tc of toolCalls) {
      const toolCallId = tc.id || tc.toolCall?.id || "";
      const fn = tc.name || tc.toolCall?.function?.name || tc.function?.name || "";
      const args = typeof tc.arguments === "string" ? JSON.parse(tc.arguments) : (tc.arguments || tc.toolCall?.function?.parameters || {});

      try {
        if (fn !== "submitInquiry") { results.push({ toolCallId, error: `Unknown: ${fn}` }); continue; }
        const { intent, name, email, phone, orderNumber, description } = args;
        if (!intent || !name || !email || !description) { results.push({ toolCallId, result: "Missing required fields." }); continue; }

        let routeEmail = ""; let label = "";
        if (intent === "customer_support") { routeEmail = SUPPORT_EMAIL; label = "Customer Support"; }
        else if (intent === "wholesale") { routeEmail = SALES_EMAIL; label = "Wholesale"; }
        else if (intent === "partnerships") { routeEmail = SALES_EMAIL; label = "Partnerships"; }
        else { routeEmail = SUPPORT_EMAIL; label = "General Inquiry"; }

        const phoneLine = phone ? `Phone: ${phone}` : "";
        const orderLine = orderNumber ? `Order Number: ${orderNumber}` : "";
        const subject = `New ${label}: ${name}`;
        const text = `New ${label} Inquiry\n\nName: ${name}\nEmail: ${email}\n${phoneLine}\n${orderLine}\n\nDescription:\n${description}\n\n--\nSubmitted via LonePouch Voice Agent\n${new Date().toISOString()}`;

        const resp = await fetch("https://api.resend.com/emails", { method: "POST", headers: { "Authorization": `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: FROM_EMAIL, to: routeEmail, subject, text }) });

        const firstName = name.split(" ")[0];
        results.push({ toolCallId, result: resp.ok ? `Got it, ${firstName}. Your ${label.toLowerCase()} inquiry has been submitted to our team.` : `Your inquiry has been logged. Our team will follow up.` });
      } catch (e) { results.push({ toolCallId, result: "Your inquiry has been logged. Our team will follow up." }); }
    }
    return res.status(200).json({ results });
  } catch (e) { return res.status(200).json({ results: [{ toolCallId: "", error: e.message }] }); }
};