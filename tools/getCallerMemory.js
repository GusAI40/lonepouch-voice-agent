// Vapi Code Tool: getCallerMemory
// Checks Supabase for caller history. Call at the START of every call.

const SUPABASE_URL = "https://f1h4nc5zl4.supabase.co";
const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY";

const phone = args.phone.replace(/[^0-9]/g, "").slice(-10);

try {
  const resp = await fetch(`${SUPABASE_URL}/rest/v1/lonepouch_callers?phone_number=eq.+1${phone}&limit=1`, {
    headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
  });
  const data = await resp.json();
  if (Array.isArray(data) && data.length > 0) {
    const c = data[0];
    return `Returning caller: ${c.name || "Unknown"}. Email: ${c.email || "not provided"}. Previous intent: ${c.last_intent || "none"}. Called ${c.call_count} time(s). Last called: ${c.last_call_at ? new Date(c.last_call_at).toLocaleDateString() : "unknown"}.`;
  }
  return "New caller.";
} catch (e) {
  return "New caller.";
}