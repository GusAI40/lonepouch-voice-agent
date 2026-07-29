# LonePouch Voice Agent

Vapi-powered voice AI customer service agent for LonePouch — The Clean Nicotine Pouch.

**Phone:** (817) 617-8911  
**Agent:** Jess (male voice, Cartesia sonic-3.5)  
**Status:** Phase 1 — Live  
**Vercel:** `lonepouch-voice-tag-ai-projects.vercel.app`

---

## Architecture

```
Caller → Twilio (817) 617-8911) → Vapi → OpenAI (LLM)
                                          ├── getCallerMemory  → Supabase
                                          ├── getProductInfo   → (internal)
                                          ├── submitInquiry    → Vercel (lonepouch-voice) → Resend → support@/sales@
                                          ├── transferToCarter → Warm Transfer
                                          └── saveCallerMemory → Supabase
```

## 5 Tools

| Tool | Type | Purpose |
|------|------|---------|
| `getCallerMemory` | Code | Supabase lookup — greets returning callers by name |
| `getProductInfo` | Code | Answers 14 FAQ categories from lonepouches.com |
| `submitInquiry` | Function → Vercel | Server-backed. Collects info + emails via Resend. **Keys in env, never in Vapi.** |
| `transferToCarter` | TransferCall | Warm transfer to Carter (gated, no support xfers) |
| `saveCallerMemory` | Code | Logs every call to Supabase |

## Security

- `submitInquiry` runs on dedicated Vercel project `lonepouch-voice` — Resend API key in Vercel env, never in Vapi
- SSO disabled on Vercel project for Vapi API access
- GitHub repo contains zero real API keys

## Deploy

```bash
# Vercel
vercel deploy
vercel env add RESEND_API_KEY

# Supabase
# Run supabase/migration.sql

# Vapi
# Create tools from tools/ directory
# Point submitInquiry Function tool to: https://lonepouch-voice-tag-ai-projects.vercel.app/api/submit
```

## Files

```
├── README.md
├── AGENT.md
├── DELIVERABLE.md
├── vercel.json
├── api/
│   └── submit.js          # Server-backed submitInquiry
├── .env.example
├── tools/
│   ├── getCallerMemory.js
│   ├── getProductInfo.js
│   └── saveCallerMemory.js
├── supabase/
│   └── migration.sql
└── .gitignore
```

Built by [TAG AI Solutions](https://tagaisolutions.com)