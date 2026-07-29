# LonePouch Voice Agent

Vapi-powered voice AI customer service agent for LonePouch — The Clean Nicotine Pouch.

**Phone:** (817) 617-8911  
**Agent:** Jess (male voice, Cartesia sonic-3.5)  
**Status:** Phase 1 — Live

---

## Architecture

```
Caller → Twilio (817) 617-8911 → Vapi → OpenAI (LLM)
                                          ├── getCallerMemory  → Supabase
                                          ├── getProductInfo   → (internal)
                                          ├── submitInquiry    → Vercel → Resend → support@/sales@
                                          ├── transferToCarter → Warm Transfer
                                          └── saveCallerMemory → Supabase
```

## 5 Tools

| Tool | Type | Purpose |
|------|------|---------|
| `getCallerMemory` | Code | Supabase lookup — greets returning callers by name |
| `getProductInfo` | Code | Answers 14 FAQ categories from lonepouches.com |
| `submitInquiry` | Function | Server-backed. Collects info + emails via Resend. **Keys in Vercel env, never exposed.** |
| `transferToCarter` | TransferCall | Warm transfer to Carter (gated, no support xfers) |
| `saveCallerMemory` | Code | Logs every call to Supabase |

## Security

- `submitInquiry` runs on Vercel as a serverless function — Resend API key lives in Vercel environment variables, never in Vapi code
- Supabase anon key is public by design (RLS-protected)
- GitHub repo contains no real API keys (uses `.env.example` placeholders)

## Deploy

### 1. Vercel
```bash
vercel deploy
vercel env add RESEND_API_KEY
vercel env add FROM_EMAIL
vercel env add SUPPORT_EMAIL  
vercel env add SALES_EMAIL
```

### 2. Supabase
Run `supabase/migration.sql` in your project.

### 3. Vapi
1. Create the `submitInquiry` Function tool pointing to `https://your-project.vercel.app/api/submit`
2. Create the 4 Code tools from `tools/` directory
3. Configure assistant using `AGENT.md`
4. Assign phone number

## Files

```
├── README.md
├── AGENT.md                    # Full agent configuration
├── DELIVERABLE.md              # Client-facing delivery doc
├── vercel.json                 # Vercel deployment config
├── api/
│   └── submit.js               # Server-backed submitInquiry (Resend)
├── .env.example                # Environment variable template
├── tools/
│   ├── getCallerMemory.js      # Supabase caller lookup
│   ├── getProductInfo.js       # Product FAQ (14 categories)
│   └── saveCallerMemory.js     # Supabase call logging
├── supabase/
│   └── migration.sql           # lonepouch_callers table
└── .gitignore
```

## Phase 2 (Planned)
- Shopify order lookup via order number
- SMS follow-up for wholesale (auto-send deck)
- Voice-to-cart ordering

---
Built by [TAG AI Solutions](https://tagaisolutions.com)