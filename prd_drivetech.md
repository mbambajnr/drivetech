
# DriveTech Digital Platform — Product Requirements Document

**Prepared for:** DriveTech  
**Prepared by:** Bali-Can Limited  
**Source proposal date:** 3 November 2026  
**PRD version:** 1.0  
**Status:** Draft for requirements confirmation

## 1. Product overview

DriveTech Digital Platform is a mobile-friendly website and secure staff workspace that helps prospective customers understand DriveTech’s training and licensing-assistance services, submit an online request, and receive follow-up from DriveTech staff.

The first release is an enquiry and application-management product. It does not issue licences, approve licensing requests, process payments, schedule classes, provide learner accounts, or deliver learning materials.

## 2. Problem statement

DriveTech needs a clearer digital presence and a structured way to receive and manage customer requests across branches. Customers should be able to explore available services, understand requirements and costs, submit a request outside office hours, and know what happens next. Staff should be able to review incoming requests in one secure place and track progress using a small set of statuses.

## 3. Goals and non-goals

### Goals

- Present accurate, easy-to-understand information about DriveTech services.
- Allow customers to submit training applications online.
- Allow customers to request licensing assistance online.
- Capture only the information needed for initial follow-up.
- Provide immediate confirmation after a successful submission.
- Give authorised staff a secure dashboard to review and track submissions.
- Support customers on mobile and desktop devices.
- Create a maintainable foundation for later digital services.

### Non-goals for Release 1

- Online payment or payment reconciliation.
- Customer or learner account creation.
- Booking, class scheduling, seat management, or calendar integration.
- Online licence issuance, licensing approval, or authority-system integration.
- Learning management, lessons, tests, certificates, or course materials.
- Collection of identity documents, medical records, or other sensitive uploads.
- Full CRM, marketing automation, or advanced sales pipeline.
- Native Android or iOS applications.

## 4. Target users and personas

### Prospective trainee

A person interested in driving, motorcycle, or heavy equipment training. They may use a phone, need straightforward requirements and pricing, and want DriveTech to contact them about the next available start period.

### Licensing assistance requester

A person seeking help understanding or starting a licensing-related service. They needs clear expectations that DriveTech can assist with the process, but final approval and licence issuance remain subject to the relevant authority’s requirements.

### Branch or customer-service staff member

An authorised staff member who reviews new submissions, contacts applicants, records follow-up notes, and marks requests as completed.

### Platform administrator

An authorised person responsible for staff access, content configuration if enabled, and operational oversight.

## 5. Primary customer journey

> Explore services → Select a service → Review requirements → Submit a form → Receive confirmation → DriveTech follows up

### Training journey

1. Customer lands on the website.
2. Customer selects a training category or course.
3. Customer reviews description, requirements, duration, fee, inclusions, and branch options.
4. Customer selects **Apply for training**.
5. Customer completes the training application form.
6. System validates the form and displays errors where needed.
7. Customer submits the form.
8. System stores the application and displays confirmation.
9. Staff sees the new application in the dashboard.
10. DriveTech contacts the customer and updates the status.

### Licensing assistance journey

1. Customer views licensing assistance information.
2. Customer reads the authority-approval disclaimer.
3. Customer selects **Request licensing assistance**.
4. Customer completes the request form.
5. System stores the request and displays confirmation.
6. Staff reviews the request and contacts the customer.

## 6. Information architecture

Recommended public navigation:

- Home
- Training
  - Driving training
  - Motorcycle training
  - Heavy equipment training
    - Excavator training
    - Forklift training
  - All courses
- Licensing assistance
- Branches and contact
- Apply / Request assistance

Recommended staff navigation:

- Dashboard summary
- All submissions
- Training applications
- Licensing requests
- Submission details
- Staff profile/sign out
- Administration, if included in the selected implementation

The exact course taxonomy should be confirmed against DriveTech’s approved service list. The website should not publish an unconfirmed course, price, or requirement.

## 7. Functional requirements

### 7.1 Public website

#### FR-PUB-001 — Responsive layout

The public website shall render correctly on current mobile, tablet, and desktop viewport sizes. Primary actions shall be easy to find and operate with touch input.

**Acceptance criteria**

- No horizontal scrolling on supported viewport sizes.
- Text and controls remain readable and usable on a small phone.
- Primary call-to-action is visible without requiring extensive scrolling on key pages.
- Navigation works with keyboard and touch input.

#### FR-PUB-002 — Home page

The home page shall communicate what DriveTech offers and direct users to training, licensing assistance, and contact options.

It should include:

- DriveTech value proposition.
- Main training categories.
- Licensing assistance callout.
- Key reasons to choose DriveTech, subject to approved content.
- Branch/contact call-to-action.
- WhatsApp contact option where a confirmed number exists.

#### FR-PUB-003 — Service/course pages

Each published service or course shall support the following content fields:

- Service/course name.
- Category.
- Short summary.
- Detailed description.
- Entry or application requirements.
- Duration.
- Fee or fee guidance.
- Package inclusions.
- Available branch or branches.
- Expected next step.
- Apply/request call-to-action.
- Last-reviewed date or internal content review metadata where practical.

The page shall not imply guaranteed admission, licence approval, or licence issuance unless DriveTech explicitly approves that wording and it is legally appropriate.

#### FR-PUB-004 — Licensing assistance page

The licensing assistance page shall explain the available assistance services and present the following disclaimer or approved equivalent:

> Submitting this request starts DriveTech’s follow-up process. Licence approval and issuance remain subject to the requirements and decisions of the relevant authority.

#### FR-PUB-005 — Branch and contact information

The platform shall display confirmed branch information, including where available:

- Branch name.
- Address.
- Telephone number.
- WhatsApp number or click-to-chat link.
- Opening hours.
- Services available at the branch.

Telephone and WhatsApp links shall be tested before launch. The platform shall not display placeholder contact details in production.

#### FR-PUB-006 — Contact actions

On supported devices, a customer shall be able to tap a telephone number to call and tap a WhatsApp action to start a chat. WhatsApp links shall open the appropriate WhatsApp experience or web fallback.

### 7.2 Training application form

#### FR-FORM-001 — Required fields

The training application form shall capture, at minimum:

- Applicant full name.
- Phone number.
- Email address, if DriveTech confirms it is required or useful for follow-up.
- Selected course/service.
- Preferred branch.
- Desired start period.
- Optional customer message, if approved.
- Consent/acknowledgement that DriveTech may use the submitted details to respond to the request.

The final required-field list must be confirmed with DriveTech before build completion.

#### FR-FORM-002 — Form validation

The form shall validate required fields in the browser and again on the server. It shall provide understandable error messages without erasing valid fields.

Validation shall include:

- Required-field validation.
- Basic phone format validation.
- Email format validation when email is collected.
- Maximum lengths for text inputs.
- Valid selected course and branch values from the configured catalogue.
- Protection against malformed or executable input.

#### FR-FORM-003 — Course and branch selection

Course and branch choices shall use controlled values rather than unrestricted free text wherever possible. The selected values stored with the submission shall remain understandable if the catalogue is later changed.

#### FR-FORM-004 — Successful submission

After a successful submission, the customer shall see a confirmation state containing:

- Confirmation that the request was received.
- A concise explanation of what happens next.
- A reminder that DriveTech will follow up.
- Appropriate contact options for urgent questions.
- A unique reference number if the implementation includes references.

The system shall not claim that a place, course, licence, or approval has been guaranteed.

#### FR-FORM-005 — Failed submission

If the system cannot save the form, it shall display a non-technical error message, preserve entered values where safe, and provide an alternative contact method.

#### FR-FORM-006 — Duplicate submission handling

The system should reduce accidental duplicates by disabling the submit action while processing and showing a progress state. If duplicate detection is implemented, it shall not block legitimate repeat enquiries without a clear explanation.

### 7.3 Licensing assistance form

#### FR-LIC-001 — Required fields

The licensing assistance form shall capture, at minimum:

- Requester full name.
- Phone number.
- Email address, if confirmed as required or useful.
- Requested licensing assistance service.
- Preferred branch or location, if relevant.
- Optional message or context.
- Consent/acknowledgement for follow-up.

#### FR-LIC-002 — Authority disclaimer

The form shall display the authority-approval disclaimer before submission and near the submit action. The customer shall acknowledge it where DriveTech requires explicit acknowledgement.

#### FR-LIC-003 — No authority representation

The interface and confirmation message shall not represent DriveTech as the licensing authority or promise that the licence will be approved or issued.

### 7.4 Staff dashboard

#### FR-STAFF-001 — Authentication

Only authorised staff shall access the dashboard. Unauthenticated users shall be redirected to sign in and shall not receive submission data.

#### FR-STAFF-002 — Submission list

The dashboard shall show a list of submissions with, at minimum:

- Submission type.
- Applicant/requester name.
- Selected course or requested service.
- Preferred branch where captured.
- Current status.
- Submitted date/time.
- Age or time since submission, where practical.

The list shall support sorting by newest/oldest and filtering by submission type, branch, and status if included in the implementation estimate.

#### FR-STAFF-003 — Submission detail

An authorised staff member shall be able to open a submission and view all captured details, including the original request, timestamps, consent acknowledgement, and current status.

#### FR-STAFF-004 — Status workflow

The first release shall support these statuses:

- **New:** received and not yet contacted.
- **Contacted:** DriveTech has attempted or completed initial follow-up.
- **Completed:** DriveTech has completed the relevant follow-up or closed the request.

Status changes shall be saved reliably and reflected in the list view.

#### FR-STAFF-005 — Follow-up notes

The dashboard should support an internal note field for follow-up context, provided the field is protected from customers and is covered by DriveTech’s data-handling rules.

#### FR-STAFF-006 — Audit trail

The system should record who changed a status and when. At minimum, status changes should have timestamps. The dashboard shall not expose unnecessary technical or personal data.

#### FR-STAFF-007 — Sign out and session security

Staff shall be able to sign out. Sessions shall expire or be invalidated according to the selected authentication provider’s secure defaults.

### 7.5 Notifications

#### FR-NOTIFY-001 — Staff notification

On a successful submission, the system shall notify a configured DriveTech recipient or queue that a new request is available.

#### FR-NOTIFY-002 — Customer confirmation

The platform shall display an on-screen confirmation. Email or SMS confirmation is optional for Release 1 and depends on final scope, verified sender configuration, and hosting/third-party arrangements.

#### FR-NOTIFY-003 — Notification failure

A failed notification shall not silently discard a successfully stored submission. Staff shall have a way to identify or recover notification failures through logs, dashboard indicators, or an agreed operational procedure.

## 8. Content requirements

DriveTech must provide approved content for:

- Logo, colours, fonts, and brand usage.
- About/value proposition copy.
- Each service and course.
- Requirements and eligibility.
- Duration.
- Fees and packages.
- Branch names, addresses, telephone numbers, WhatsApp numbers, and hours.
- Licensing assistance descriptions.
- Privacy and consent wording.
- Confirmation and disclaimer wording.
- Staff notification recipient(s).

Content must be reviewed and approved before production launch. Bali-Can may identify gaps and propose copy structure, but DriveTech remains responsible for the accuracy of operational, pricing, and licensing information.

## 9. Data requirements

### Data minimisation

Release 1 should collect only information needed for initial follow-up. Avoid collecting national ID numbers, passport details, payment card data, medical information, or document uploads unless a separate privacy and security assessment approves them.

### Retention

DriveTech must decide:

- How long submissions should be kept.
- Who may export or delete records.
- What happens when a customer asks for correction or deletion.
- Whether completed records are archived.

### Data quality

The platform should store the selected course, branch, and service as structured values. Free-text fields should have sensible limits. Date/time values should be stored consistently and displayed in DriveTech’s operating timezone.

## 10. Non-functional requirements

### NFR-001 — Performance

Key public pages should load quickly on a typical mobile connection. Images must be compressed and appropriately sized. The platform should avoid unnecessary third-party scripts.

### NFR-002 — Availability and recoverability

The selected hosting approach shall provide reasonable availability for the agreed budget. Backups shall be configured and a restoration procedure documented before launch.

### NFR-003 — Security

- HTTPS for all production traffic.
- Secure authentication for staff.
- Server-side validation.
- Access control on every protected request.
- Rate limiting and bot protection on public forms.
- Secrets stored outside source code.
- No public exposure of submission records.
- Basic dependency and configuration review before launch.

### NFR-004 — Accessibility

The interface should follow practical WCAG-aligned patterns:

- Sufficient colour contrast.
- Visible focus states.
- Labels associated with form fields.
- Helpful error messages.
- Keyboard-accessible controls.
- Meaningful button text.
- Alternative text for informative images.

### NFR-005 — Browser support

Support current mainstream versions of Chrome, Safari, Edge, and Firefox on mobile and desktop, subject to the agreed test matrix.

### NFR-006 — Maintainability

The implementation shall use clear naming, environment configuration, documented deployment steps, and a handover guide sufficient for future maintenance.

### NFR-007 — Privacy

The site shall present approved privacy/consent language and avoid unnecessary personal-data collection. Staff views shall be restricted according to role.

## 11. Analytics and reporting

Release 1 should capture basic, privacy-conscious events:

- Service page viewed.
- Application form opened.
- Application submitted.
- Licensing form opened.
- Licensing request submitted.
- Confirmation viewed.
- Contact/WhatsApp action clicked, where technically measurable.

The dashboard should provide operational visibility through list filters and status counts. Advanced reporting can be deferred.

## 12. Acceptance criteria for Release 1

Release 1 is acceptable when all of the following are true:

1. A customer can browse approved services on a phone and desktop.
2. Each published service contains approved requirements, duration, fees, and inclusions, or clearly states when a detail must be confirmed.
3. A customer can submit a valid training application.
4. A customer can submit a valid licensing assistance request.
5. Invalid and incomplete forms show clear errors and cannot be saved as complete submissions.
6. Successful submissions are stored and trigger the agreed staff notification path.
7. Customers see an accurate confirmation message after submission.
8. Licensing pages and forms display the approved authority disclaimer.
9. Branch telephone and WhatsApp contact options work with confirmed data.
10. An unauthorised visitor cannot view dashboard records.
11. An authorised staff member can view a submission and change its status among New, Contacted, and Completed.
12. Status changes persist after refresh and display the correct timestamp or history where implemented.
13. The main journeys work on agreed mobile and desktop browsers.
14. Basic spam protection, HTTPS, backups, and production configuration are in place.
15. DriveTech’s nominated representative signs off the content and UAT checklist.

## 13. UAT scenarios

| ID | Scenario | Expected result |
|---|---|---|
| UAT-01 | Browse from home to a driving course | Course details and application CTA are visible and accurate. |
| UAT-02 | Browse from home to motorcycle training | Motorcycle service information is displayed correctly. |
| UAT-03 | Browse heavy equipment training | Excavator/forklift content appears only if approved and published. |
| UAT-04 | Submit training form with missing required fields | User sees field-level errors; no incomplete record is created. |
| UAT-05 | Submit training form successfully | Confirmation displays and staff notification is generated. |
| UAT-06 | Submit licensing request | Request is stored and authority disclaimer is visible. |
| UAT-07 | Tap telephone number on a phone | Device presents the call action with the correct number. |
| UAT-08 | Tap WhatsApp contact | Correct WhatsApp destination opens. |
| UAT-09 | Open dashboard while signed out | User is denied access or redirected to sign in. |
| UAT-10 | Review a new application | Staff can see the submitted details and New status. |
| UAT-11 | Mark application Contacted | Status persists and timestamp/audit information is updated. |
| UAT-12 | Mark application Completed | Status persists and record remains searchable. |
| UAT-13 | Submit malicious or oversized input | Input is rejected or safely handled without script execution. |
| UAT-14 | Use the site on a small mobile viewport | No critical layout or form interaction breaks. |
| UAT-15 | Simulate notification failure | Submission is not lost and the failure is visible to the operator. |

## 14. Delivery plan and milestones

### Week 1 — Requirements and design

- Kickoff and nominated decision-maker confirmation.
- Service, branch, contact, branding, and policy content collection.
- Confirm form fields and status workflow.
- Produce sitemap, wireframes, and responsive visual direction.
- Approve scope and design.

### Weeks 2–3 — Development

- Build public pages and content structure.
- Build form flows, validation, storage, confirmation, and notifications.
- Build staff authentication and dashboard.
- Implement status management, responsive styling, spam protection, and monitoring.
- Demonstrate working increments for review.

### Week 4 — Testing, orientation, and launch

- Functional, responsive, accessibility, and security-baseline testing.
- DriveTech UAT and issue resolution.
- Create staff accounts and orient designated users.
- Confirm production content, domain, HTTPS, notifications, and backups.
- Launch and provide initial support.

## 15. Open questions requiring DriveTech confirmation

1. What is the final list of training courses and licensing assistance services?
2. Which fields are mandatory for each form?
3. Is email required, optional, or not collected for applicants?
4. What are the confirmed fees, durations, inclusions, and requirements for each course?
5. Which branches offer which services?
6. What are the official telephone numbers, WhatsApp numbers, and opening hours?
7. Which staff members need dashboard access, and who is the administrator?
8. Should a submission be assigned to a branch or staff member in Release 1?
9. What privacy notice and consent language should be published?
10. Should customer email/SMS confirmations be included in the first release?
11. What is the expected internal response time for a New submission?
12. How long should records be retained?
13. Which domain, hosting account, sender email, and analytics account will be used?
14. What is the approved process for correcting or deleting a submission?
15. Who gives final production sign-off?

## 16. Future roadmap

### Phase 2 — Conversion and operations

- Online payments.
- Branch assignment and staff ownership.
- Automated email/SMS/WhatsApp reminders.
- Customer reference tracking.
- Better reporting by service, branch, source, and outcome.

### Phase 3 — Learner experience

- Customer/learner accounts.
- Appointment and class scheduling.
- Course enrolment and payment status.
- Learning materials and progress.
- Certificates or completion records where operationally appropriate.

### Phase 4 — Ecosystem integration

- Authority or partner integrations where available and authorised.
- CRM integration.
- Accounting/payment reconciliation.
- Advanced customer support and marketing automation.

## 17. Out-of-scope change control

A request is a scope change if it introduces payments, accounts, scheduling, integrations, sensitive documents, new user roles, substantial content production, advanced reporting, or a requirement that materially affects security, hosting, or the one-month delivery window.

Scope changes should be recorded with:

- Description and rationale.
- Customer/business value.
- Impact on timeline.
- Impact on cost and third-party services.
- Security/privacy impact.
- Decision and approver.

## 18. Definition of done

A Release 1 item is done when:

- The agreed requirement is implemented.
- It works on the agreed supported browsers and viewport sizes.
- Validation and error states are handled.
- Data is stored and protected as designed.
- Relevant UAT scenario passes.
- Content has been reviewed where applicable.
- No known critical or high-severity defect remains open.
- Deployment and handover notes are updated.

## 19. Approval

Approval should confirm:

- The Release 1 scope.
- The nominated DriveTech representative.
- The approved content owners.
- The form fields and workflow.
- The privacy/disclaimer approach.
- The proposed one-month delivery plan.
- The commercial assumptions and separately agreed hosting/support terms.

| Party | Name | Role | Approval/date |
|---|---|---|---|
| DriveTech |  |  |  |
| Bali-Can Limited |  |  |  |
e