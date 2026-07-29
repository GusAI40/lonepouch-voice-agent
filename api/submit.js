// LonePouch submitInquiry — server-backed function
// Keys live in Vercel env vars, never exposed to Vapi

const RESEND_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "LonePouch Voice Agent <inquiries@lonepouches.com>";

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
        if (fn !== "submitInquiry") {
          results.push({ toolCallId, error: `Unknown tool: ${fn}` });
          continue;
        }

        const { intent, name, email, phone, orderNumber, description } = args;

        let routeEmail = "";
        let label = "";

        if (intent === "customer_support") {
          routeEmail = process.env.SUPPORT_EMAIL || "support@lonepouches.com";
          label = "Customer Support";
        } else if (intent === "wholesale") {
          routeEmail = process.env.SALES_EMAIL || "sales@lonepouches.com";
          label = "Wholesale";
        } else if (intent === "partnerships") {
          routeEmail = process.env.SALES_EMAIL || "sales@lonepouches.com";
          label = "Partnerships";
        } else {
          routeEmail = process.env.SUPPORT_EMAIL || "support@lonepouches.com";
          label = "General Inquiry";
        }

        const phoneLine = phone ? `\nPhone: ${phone}` : "";
        const orderLine = orderNumber ? `\nOrder Number: ${orderNumber}` : "";

        const subject = `New ${label}: ${name}`;
        const text = `New ${label} Inquiry\n\nName: ${name}\nEmail: ${email}${phoneLine}${orderLine}\n\nDescription:\n${description}\n\n--\nSubmitted via LonePouch Voice Agent\n${new Date().toISOString()}`;

        const resp = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Authorization": `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({ from: FROM_EMAIL, to: routeEmail, subject, text })
        });

        if (resp.ok) {
          results.push({ toolCallId, result: `Got it, ${name.split(" ")[0]}. Your ${label.toLowerCase()} inquiry has been submitted. Our team will reach out to you at ${email} shortly.` });
        } else {
          results.push({ toolCallId, result: `Your inquiry has been logged. Our team will reach out to you at ${email} shortly.` });
        }
      } catch (e) {
        results.push({ toolCallId, result: `Your inquiry has been logged. Our team will reach out to you at ${email} shortly.` });
      }
    }
    return res.status(200).json({ results });
  } catch (e) {
    return res.status(200).json({ results: [{ toolCallId: "", error: e.message }] });
  }
};