# DriveTech Digital Platform (Release 1)

**Prepared for:** DriveTech  
**Prepared by:** Bali-Can Limited  
**PRD Specification:** [prd_drivetech.md](file:///Users/macbook/Documents/drivetech/prd_drivetech.md)  
**Status:** Complete & UAT Verified

---

## 🚗 Overview

DriveTech Digital Platform is a responsive, mobile-first web platform and staff workspace designed to help prospective trainees explore driving, motorcycle, and heavy machinery courses, request licensing assistance, submit applications online, and enable branch staff to track requests through an internal workflow.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
* **Styling & Design System:** Tailwind CSS v4 + Lucide React Icons
* **Data Persistence:** Lightweight, zero-config JSON/SQLite store with automatic seeding (`data/drivetech_store.json`)
* **Authentication:** Secure session cookie authentication with bcrypt password hashing

---

## 🌐 Public Routes

* **`/`** — Home page with value proposition, training disciplines, licensing spotlight, and branch actions.
* **`/courses`** — Full course catalogue with category filters (Class B Car, Class A Motorcycle, Heavy Equipment) and search.
* **`/courses/[slug]`** — Detailed course curriculum, package inclusions, entry requirements, fee guidance, and direct Apply CTA.
* **`/licensing-assistance`** — Regulatory guidance desk with mandatory authority disclaimer and service breakdown.
* **`/licensing-assistance/request`** — Interactive licensing assistance request form with mandatory disclaimer acknowledgment.
* **`/branches`** — Campus directories with one-tap `tel:` calling and official WhatsApp click-to-chat links (`wa.me/`).
* **`/apply`** — Online training application form with bot honeypot protection and unique reference code generation (`DT-TRN-...`).

---

## 🔒 Staff Workspace (`/staff`)

Protected operations dashboard for admissions and branch coordinators:

* **`/staff/login`** — Staff sign in portal.
* **`/staff`** — Pipeline overview:
  * Summary KPI cards (`Total Submissions`, `New`, `Contacted`, `Completed`).
  * Live search and multi-filtering (Status, Type, Branch, Newest/Oldest).
  * Direct one-click Call and WhatsApp buttons for applicants.
  * Interactive detail drawer for managing request status (`New` → `Contacted` → `Completed`).
  * Internal staff follow-up note thread with timestamps.
  * Status transition audit trail.

### Pre-Seeded Staff Accounts for Testing:
| Account | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| **Operations Lead** | `admin@drivetech.com` | `DriveTech2026!` | Admin |
| **Admissions Coordinator** | `sarah.jenkins@drivetech.com` | `DriveTech2026!` | Staff |

---

## 🧪 Testing & Verification

Run the end-to-end integration test suite verifying PRD requirements UAT-01 through UAT-15:

```bash
node scripts/e2e-uat.mjs
```

---

## 🚀 Running the Project

```bash
# Development server
npm run dev

# Production build
npm run build
npm run start
```
