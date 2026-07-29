# LonePouch Voice Agent — Delivery Package
**Client:** LonePouch (Carter)  
**Built by:** TAG AI Solutions  
**Date:** July 29, 2026  
**Phase:** 1 — Intake, Routing & Memory

---

## What It Is

A voice AI agent ("Jess") that answers LonePouch customer calls, identifies intent, answers product questions from website data, collects caller information, and routes inquiries to the right team via email. Built with caller memory — Jess recognizes repeat callers by name.

**Phone:** (817) 617-8911  
**Agent:** Jess  
**Voice:** Male, confident, Cartesia sonic-3.5

---

## 5 Tools

| Tool | Function |
|------|----------|
| `getCallerMemory` | Checks Supabase — greets returning callers by name |
| `getProductInfo` | Answers 14 FAQ categories (ingredients, lab testing, flavors, policies) |
| `submitInquiry` | Collects info + emails it to support@ or sales@ via Resend |
| `transferToCarter` | Warm transfer to Carter. Gated — never for customer support. Test number: (626) 741-7360 |
| `saveCallerMemory` | Logs every call to Supabase (name, email, phone, intent, count) |

---

## Call Flow

1. **Check memory** — recognize repeat callers
2. **Greet** — "Welcome back, [name]" or "Thank you for calling Lone Pouch..."
3. **Identify intent** — Customer Support / Wholesale / Partnerships / General
4. **Route** — Answer product questions directly, or collect info and email the right team
5. **Save memory** — log the call

---

## Routing

| Intent | Email Destination |
|--------|------------------|
| Customer Support | support@lonepouches.com |
| Wholesale | sales@lonepouches.com |
| Partnerships | sales@lonepouches.com |
| General Questions | Answered directly by Jess |

---

## Grounded Knowledge (from lonepouches.com)

**7 Ingredients (from /pages/why-lone):**
Xylitol (oral health), Microcrystalline Cellulose (plant fiber, no plastics), Sodium Alginate (seaweed, biocompatible), Sodium Bicarbonate (gentle pH, dentistry-grade), Purified Water (calibrated moisture), Essential Oils (single-source plant), Synthetic Nicotine (purest form, no heavy metals/TSNAs)

**Flavors:** Crisp, Cinnamon, Wintergreen. $3.99/can.  
**Quality:** Third-party lab tested. No Ace-K. No sucralose. No microplastics. 100% USA.  
**Policies:** Free shipping $50+. 3-5 days. 30-day returns unopened. 15% sub discount. 21+.

---

## Technical Stack

| Layer | Service |
|-------|---------|
| Voice Orchestration | Vapi |
| AI Model | OpenAI chat-latest |
| Text-to-Speech | Cartesia sonic-3.5 (male) |
| Speech-to-Text | Deepgram |
| Phone | Twilio |
| Memory Database | Supabase (`lonepouch_callers`) |
| Email Delivery | Resend |

---

## Guardrails

- **Never** transfers customer support to Carter
- **Never** promises order modifications, refunds, or cancellations
- **Always** collects complete info before routing
- **Always** greets returning callers by name

---

## Phase 2 Roadmap

- Shopify order lookup via order number
- SMS follow-up for wholesale (auto-send deck)
- Voice-to-cart ordering
- Custom Carter transfer number