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
                                          ├── submitInquiry    → Resend → support@/sales@
                                          ├── transferToCarter → Warm Transfer
                                          └── saveCallerMemory → Supabase
```

## 5 Tools

| Tool | Type | Purpose |
|------|------|---------|
| `getCallerMemory` | Code | Supabase lookup — greets returning callers by name |
| `getProductInfo` | Code | Answers 14 FAQ categories from lonepouches.com |
| `submitInquiry` | Code | Collects info + emails to support@/sales@ via Resend |
| `transferToCarter` | TransferCall | Warm transfer to Carter (gated, no support xfers) |
| `saveCallerMemory` | Code | Logs every call to Supabase |

## Call Flow

1. Check memory → greet ("Welcome back, [name]" or first-time greeting)
2. Identify intent: Customer Support / Wholesale / Partnerships / General
3. Answer product questions directly, or collect info and route via email
4. Save call to memory

## Routing

| Intent | Destination |
|--------|-------------|
| Customer Support | support@lonepouches.com |
| Wholesale | sales@lonepouches.com |
| Partnerships | sales@lonepouches.com |
| General | Answered by Jess |

## Stack

- **Vapi** — Voice orchestration
- **OpenAI** chat-latest — LLM
- **Cartesia** sonic-3.5 — TTS (male)
- **Deepgram** — STT
- **Twilio** — Phone line
- **Supabase** — Caller memory
- **Resend** — Email routing

## Files

```
├── README.md
├── AGENT.md                    # Full agent configuration
├── tools/
│   ├── getCallerMemory.js      # Supabase caller lookup
│   ├── getProductInfo.js       # Product FAQ (14 categories)
│   ├── submitInquiry.js        # Collect + email via Resend
│   ├── transferToCarter.json   # Warm transfer config
│   └── saveCallerMemory.js     # Supabase call logging
├── supabase/
│   └── migration.sql           # lonepouch_callers table
├── DELIVERABLE.md              # Client-facing delivery doc
└── .gitignore
```

## Setup

### Prerequisites
- Vapi account with API key
- Supabase project
- Resend API key
- Twilio phone number

### Deploy
1. Run `supabase/migration.sql` in your Supabase project
2. Create tools in Vapi dashboard from `tools/` files
3. Configure assistant using `AGENT.md`
4. Assign phone number

## Phase 2 (Planned)
- Shopify order lookup via order number
- SMS follow-up for wholesale (auto-send deck)
- Voice-to-cart ordering

---
Built by [TAG AI Solutions](https://tagaisolutions.com)