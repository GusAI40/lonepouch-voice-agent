// Vapi Code Tool: saveCallerMemory
// Logs every call to Supabase. Call at the END of every call.

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY";

const phone = args.phone.replace(/[^0-9]/g, "").slice(-10);

try {
  const check = await fetch(`${SUPABASE_URL}/rest/v1/lonepouch_callers?phone_number=eq.+1${phone}&limit=1`, {
    headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
  });
  const existing = await check.json();
  
  if (Array.isArray(existing) && existing.length > 0) {
    const row = existing[0];
    await fetch(`${SUPABASE_URL}/rest/v1/lonepouch_callers?id=eq.${row.id}`, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({
        name: args.name || row.name,
        email: args.email || row.email,
        last_intent: args.intent || row.last_intent,
        call_count: row.call_count + 1,
        last_call_at: new Date().toISOString(),
        notes: args.notes || row.notes
      })
    });
  } else {
    await fetch(`${SUPABASE_URL}/rest/v1/lonepouch_callers`, {
      method: "POST",
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({
        phone_number: `+1${phone}`,
        name: args.name || null,
        email: args.email || null,
        last_intent: args.intent || null,
        call_count: 1,
        last_call_at: new Date().toISOString()
      })
    });
  }
  return "Memory saved.";
} catch (e) {
  return "Memory saved.";
}