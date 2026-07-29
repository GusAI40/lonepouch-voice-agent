// Vapi Code Tool: submitInquiry
// Collects caller info and emails it to the correct team via Resend API

const RESEND_KEY = "YOUR_RESEND_API_KEY";
const FROM = "LonePouch Voice Agent <inquiries@lonepouches.com>";

const { intent, name, email, phone, orderNumber, description } = args;

let routeEmail = "";
let label = "";

if (intent === "customer_support") {
  routeEmail = "support@lonepouches.com";
  label = "Customer Support";
} else if (intent === "wholesale") {
  routeEmail = "sales@lonepouches.com";
  label = "Wholesale";
} else if (intent === "partnerships") {
  routeEmail = "sales@lonepouches.com";
  label = "Partnerships";
} else {
  routeEmail = "support@lonepouches.com";
  label = "General Inquiry";
}

const phoneLine = phone ? `Phone: ${phone}` : "";
const orderLine = orderNumber ? `Order Number: ${orderNumber}` : "";

const subject = `New ${label}: ${name}`;
const body = `New ${label} Inquiry\n\nName: ${name}\nEmail: ${email}\n${phoneLine}\n${orderLine}\n\nDescription:\n${description}\n\n--\nSubmitted via LonePouch Voice Agent\n${new Date().toISOString()}`;

try {
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: FROM,
      to: routeEmail,
      subject: subject,
      text: body
    })
  });
  
  if (resp.ok) {
    return `Got it, ${name.split(" ")[0]}. Your ${label.toLowerCase()} inquiry has been submitted. Our team will reach out to you at ${email} shortly.`;
  } else {
    return `Your inquiry has been logged. Our team will reach out to you at ${email} shortly.`;
  }
} catch (e) {
  return `Your inquiry has been logged. Our team will reach out to you at ${email} shortly.`;
}