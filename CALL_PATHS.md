# LonePouch Voice Agent — Call Path Roadmap
**274 unique paths identified via Monte Carlo simulation (10,000 calls)**

---

## Call Outcome Distribution

| Outcome | Count | % |
|---------|-------|---|
| Normal end (collected + routed) | 6,941 | 69.4% |
| Transferred to Carter | 1,546 | 15.5% |
| Silence timeout | 809 | 8.1% |
| Immediate hangup | 517 | 5.2% |
| Wrong number | 187 | 1.9% |

## Intent Distribution

| Intent | Count | % |
|--------|-------|---|
| Customer Support | 4,565 | 45.6% |
| General Questions | 2,120 | 21.2% |
| Wholesale | 1,540 | 15.4% |
| Partnerships | 1,071 | 10.7% |

---

## Main Call Flows

### 1. Customer Support (45% of calls)
```
Call → getCallerMemory → Greet → Identify support intent
  → Ask for order number (60% have it, 40% don't)
  → Collect: name, email, phone, order#, description
  → submitInquiry → support@lonepouches.com
  → saveCallerMemory → End
```
**Gate:** Carter transfer DENIED for all support inquiries
**Edge:** ~15% angry callers → calm, collect, route

### 2. Wholesale (15% of calls)
```
Call → getCallerMemory → Greet → Identify wholesale intent
  → Answer pricing questions if asked (30% do)
  → Collect: name, email, phone, description
  → If Carter requested: ask context, warm transfer
  → If no Carter: submitInquiry → sales@lonepouches.com
  → saveCallerMemory → End
```
**Edge:** ~40% Carter unavailable → fallback to message

### 3. Partnerships (11% of calls)
```
Identical flow to Wholesale
  → Collect: name, email, phone, description
  → submitInquiry → sales@lonepouches.com OR transfer to Carter
```

### 4. General Questions (21% of calls)
```
Call → getCallerMemory → Greet → Identify general intent
  → getProductInfo (14 FAQ categories)
  → Answer question directly
  → Follow-up? (30% ask another) → Loop
  → saveCallerMemory → End
```

---

## Edge Cases

| Edge Case | Freq | Handled |
|-----------|------|---------|
| Hangup immediately | 5.2% | ✅ No action |
| Confused → rerouted | 2.8% | ✅ Clarify intent |
| Angry customer | ~7% | ✅ Calm, collect, route |
| Carter unavailable | ~6% | ✅ Take message |
| Silence timeout | 8.1% | ✅ 15s disconnect |
| No order number | ~18% | ✅ Ask, proceed either way |
| Follow-up question | 6.7% | ✅ Loop to FAQ |
| Returning caller | 13.9% | ✅ Greet by name |
| Wrong number | 1.9% | ✅ Exit |
| No email provided | <1% | ⚠️ Required field — must collect |

---

## Tool Call Map

| Trigger | Tool | Data Flow |
|---------|------|-----------|
| Call start | getCallerMemory | Phone → Supabase |
| General question | getProductInfo | Query → 14 categories |
| Support/Wholesale/Partnership | submitInquiry | Data → Vercel → Resend → Email |
| Carter request (non-support) | transferToCarter | Warm transfer → (626) 741-7360 |
| Call end | saveCallerMemory | Phone + meta → Supabase |

---

*Generated via Monte Carlo simulation — 10,000 calls, 274 unique paths*