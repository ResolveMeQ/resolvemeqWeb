/**
 * ResolveMeQ product manual, hosted on resolvemeq.net/docs (not GitHub).
 * Body uses ## / ### headings (parsed by buildBlogArticleParts).
 */

export const MANUAL_CATEGORIES = [
  { id: "start", label: "Getting started" },
  { id: "core", label: "Core product" },
  { id: "automate", label: "Automation" },
  { id: "enterprise", label: "Enterprise" },
];

export const PRODUCT_MANUAL = [
  {
    slug: "overview",
    category: "start",
    title: "Platform overview",
    description:
      "What ResolveMeQ is, how tickets, AI, workflows, and integrations fit together, and who each surface is for.",
    readMinutes: 6,
    body: `ResolveMeQ (Resolve Me Quickly) is an AI-powered IT helpdesk platform. Employees describe problems in plain language; the system analyzes each request against your knowledge base and ticket history, suggests step-by-step fixes with a confidence score, and escalates to a human when needed, with full context attached.

## The three layers

**Tickets** are the unit of work. Each ticket has a category, priority, conversation thread, and optional AI analysis. Tickets can be created from the web app, Slack, Microsoft Teams, or the Partner API.

**Workflows** are curated multi-step playbooks (onboarding, offboarding, provisioning). Steps have owners, due dates, and SLAs. Workflows can start automatically when a ticket category matches a template.

**Automation rules** react to ticket events, start a workflow, escalate, notify a channel, or call an outbound webhook, without custom code.

## AI's role (narrow by design)

The AI matches tickets to the right template, suggests resolutions grounded in your KB, and assists on active workflow steps. It does not invent open-ended multi-step processes. Human-authored templates and playbooks stay in control; AI reduces triage time and surfaces the next best action.

## Workspaces and access

Each **workspace** is an isolated team. Members see only tickets and workflows in workspaces they belong to. Workspace owners manage billing, integrations, partner API keys, and security settings.

## Where to work in the app

- **Dashboard**: volume, deflection, and workflow completion at a glance
- **Tickets**: create, chat with AI, escalate, assign
- **Workflows**: active playbooks, overdue steps, claims
- **Escalation queue**: human pickup with routing suggestions
- **Knowledge base**: articles the AI cites during analysis
- **Automation**: rules, triggers, and execution history
- **Analytics**: deflection by category, confidence calibration, bottlenecks
- **Settings**: integrations, MSP mode, audit log, partner API keys`,
  },
  {
    slug: "getting-started",
    category: "start",
    title: "Getting started",
    description:
      "Create an account, set up your workspace, invite teammates, and connect your first integration.",
    readMinutes: 8,
    body: `This guide walks a new workspace owner from signup to first useful ticket.

## Create your account

1. Go to **app.resolvemeq.net** and choose **Sign up**.
2. Confirm your email if prompted.
3. Complete your profile, your name appears on tickets and workflow steps you claim.

## Your first workspace

On first login you get a workspace (team). The owner can rename it under **Settings → Workspace**. All tickets, KB articles, workflows, and rules are scoped to the active workspace.

## Invite teammates

1. Open **Teams** (or **Settings → Members**).
2. Invite by email or add existing users.
3. Assign **ops roles** (IT, HR, Facilities, Security) when workflow steps are role-gated, only matching roles can claim those steps.

## Set your active workspace

If you belong to multiple workspaces, use the workspace switcher in the header. Metrics, tickets, and integrations always reflect the **active** workspace.

## Connect Slack or Microsoft Teams

1. **Settings → Integrations**
2. Choose **Slack** or **Microsoft Teams**
3. Follow the OAuth link flow to authorize the bot
4. Send a test notification from settings to confirm delivery

When a workflow step becomes active, assignees receive a DM with a link to the workflow.

## Seed your knowledge base

The AI cites approved articles during analysis. Before heavy use:

1. Open **Knowledge base**
2. Add articles for your top five request types (VPN, password reset, MFA, Wi‑Fi, software install)
3. Mark stale articles as retired so they stop surfacing

Resolved tickets with good agent responses can enrich the KB over time.

## Install the employee onboarding playbook (optional)

For HR/IT onboarding pilots:

1. Ask your admin to run the onboarding bundle install (employee onboarding template + resolution patterns)
2. Create a ticket with category **onboarding**, a workflow should start automatically
3. Open the ticket's **Workflow** checklist and claim the first active step

## First-week checklist

- Connect Slack or Teams
- Publish five KB articles
- Process ten test tickets and review AI confidence on the Analytics page
- Create one automation rule (e.g. escalate when category is security)
- Export the compliance audit log once to verify visibility (Settings → Security)`,
  },
  {
    slug: "tickets-and-ai",
    category: "core",
    title: "Tickets and AI chat",
    description:
      "Create tickets, read AI analysis, use confidence scores, escalate, assign, and roll back autonomous actions.",
    readMinutes: 10,
    body: `Tickets are the center of ResolveMeQ. Every employee request becomes a ticket with a conversation thread, status, and optional AI analysis.

## Creating a ticket

**Web app:** **Tickets → New ticket**. Enter issue type, description, category, and urgency.

**Slack / Teams:** Use your configured bot or slash command (see Integrations guide).

**Partner API:** External systems can POST to the public API (see Partner API guide).

## AI analysis flow

When a ticket is submitted, the platform sends it to the AI agent service. Within about 30 seconds you should see:

- **Category and severity** assessment
- **Step-by-step guidance** in plain language
- **Confidence score** (0–1), how strongly the model backs the suggestion
- **Recommended action**: auto-resolve path, request clarification, or escalate
- **KB citations**: which internal articles informed the answer

The chat UI shows analysis before an empty thread, no blank screen while waiting.

## Confidence and when to trust AI

| Confidence | Typical meaning |
|------------|-----------------|
| 0.8–1.0 | Strong match to KB/history; often safe for self-service |
| 0.6–0.8 | Reasonable suggestion; user or L1 should verify |
| 0.3–0.6 | Uncertain, clarify or route to a human |
| Below 0.3 | Escalate or gather more information |

Security, outage, and data-loss categories **never** auto-resolve regardless of score.

## Conversation and follow-ups

Employees can reply in the ticket chat ("that didn't work", "explain step 2"). The AI continues the thread with prior context. **Quick replies** and **suggested actions** (mark resolved, get human help) appear when the agent returns them.

## Escalation queue

When AI escalates or confidence is low:

1. Ticket appears in **Escalation queue**
2. Agents see full history and attempted steps
3. **Claim** assigns the ticket atomically (first claim wins)
4. **Predictive routing** may suggest an assignee based on category history and workload

## Assignment and status

Agents can assign tickets to teammates, change status (open, in progress, resolved, escalated), and add internal notes visible only to staff.

## Rollback

Some autonomous actions can be rolled back from ticket history when your policy allows, useful when automation misfires.

## Agent reliability

If the AI service is unavailable, a **circuit breaker** stops tickets from hanging. Users see a fallback message; processing retries in the background. Admins can check agent SLO metrics in monitoring settings.`,
  },
  {
    slug: "knowledge-base",
    category: "core",
    title: "Knowledge base",
    description:
      "Author articles, organize by category, and keep content the AI can cite during ticket analysis.",
    readMinutes: 6,
    body: `The knowledge base (KB) is what makes AI answers specific to your organization, not generic chatbot text.

## Articles

Each article has a title, body, tags, and optional team scope. **Global** articles (no team) are visible everywhere; **team-scoped** articles apply to one workspace.

## How AI uses the KB

During ticket analysis the agent retrieves relevant articles (RAG), reranks matches, and returns **citation IDs** in the response. Users and auditors can see which articles informed a suggestion.

## Authoring tips

- Write for the employee reading on a phone, short steps, numbered lists
- One article per intent (VPN connect, not "network stuff")
- Include prerequisites ("must be on corporate Wi‑Fi first")
- Date or version sensitive steps (OS-specific paths)
- Retire articles instead of deleting when policies change

## Voting and quality

Employees can mark articles helpful or not. Low-performing articles are candidates for rewrite during your KB review cadence.

## Enrichment from resolved tickets

When tickets resolve with strong agent responses, the platform can sync content into the KB (when enabled). Review promoted content before treating it as official policy.`,
  },
  {
    slug: "workflows",
    category: "core",
    title: "Workflows and playbooks",
    description:
      "Templates, sequential steps, SLAs, step assistant, connector checks, and the employee onboarding playbook.",
    readMinutes: 12,
    body: `Workflows turn multi-person processes into a shared checklist with clear ownership.

## Concepts

- **Template**: admin-authored definition (steps, due days, assignee roles, skip rules)
- **Workflow**: a running instance, optionally linked to a ticket
- **Step**: pending, active, done, or skipped; only one active step at a time in the default sequential flow

## Starting a workflow

**Automatic:** When a ticket's category matches a template's trigger category (e.g. onboarding), the platform instantiates the workflow.

**Manual:** Start from a template in **Workflows** or via automation rules.

**API:** Partner API can POST to start a workflow on a ticket.

## Working steps

1. Open the workflow from **Workflows** or the ticket detail page
2. The **active** step is highlighted; overdue steps show a badge
3. Click **Claim** to take ownership (race-safe, only one agent claims)
4. Complete the step or skip when policy allows
5. The next step becomes active; Slack/Teams notifies the next assignee

## SLAs and overdue

Templates define **due_days** per step. When a step activates, its due date is set. The workflows list supports filtering overdue items so managers see what's stuck.

## Step assistant

On active steps, **Step assistant** offers LLM + KB hints specific to that step, without inventing new steps. Use it for provisioning scripts, policy reminders, or links to internal runbooks.

## Connector auto-check and auto-complete

Steps can require an **auto_check** against Okta, Google Workspace, or Microsoft 365 (e.g. "account exists"). Verified steps may **auto_complete** when the connector confirms success, reducing manual checkbox work.

## Branching (skip rules)

Steps support **skip_when** conditions on ticket fields (e.g. skip office desk setup for remote onboarding). This is simple branching, not a visual DAG builder.

## Employee onboarding playbook

The curated **employee onboarding** bundle includes a template, resolution patterns, and install command for admins. Metrics appear under **Analytics** and outcome metrics (completion rate, overdue count).

## Cross-ticket workflows

Some playbooks spawn **child tickets** for parallel work (e.g. separate hardware and access requests) while the parent workflow tracks overall progress.

## Template admin

Workspace admins create and edit templates in **Workflow templates**, step titles, assignee roles, due days, auto_complete flags, and connector configuration.`,
  },
  {
    slug: "automation-rules",
    category: "automate",
    title: "Automation rules",
    description:
      "Triggers, conditions, actions, execution logs, and outbound webhooks when tickets change.",
    readMinutes: 9,
    body: `Automation rules let you respond to ticket events without writing code.

## Rule structure

Each rule has:

- **Trigger**: e.g. ticket created, status changed, confidence below threshold, category matched
- **Conditions**: optional filters on category, urgency, team
- **Actions**: one or more effects when the rule fires

## Common actions

| Action | Use case |
|--------|----------|
| Start workflow | Kick off onboarding when category = onboarding |
| Escalate | Force human review for security-tagged tickets |
| Notify | Slack/Teams/email to a channel or user |
| Outbound webhook | POST signed JSON to your SIEM, ITSM, or custom app |
| Assign | Route to a specific agent or team |

## Execution and audit

Every execution is logged. Failures surface in the automation UI. Rule create/update/delete events appear in the **compliance audit log**.

## Outbound webhooks

1. **Settings → Integrations → Webhooks**
2. Add endpoint URL and secret
3. Select events (ticket created, escalated, resolved, workflow step completed, etc.)
4. Verify HMAC signature on receipt

Partners often combine webhooks with the Partner API for bidirectional sync.

## Best practices

- Start with one trigger and one action; expand after reviewing logs
- Never auto-resolve security category tickets via rules
- Use descriptive rule names, your future self will thank you
- Test in a sandbox workspace before enabling in production`,
  },
  {
    slug: "integrations",
    category: "automate",
    title: "Integrations",
    description:
      "Slack, Microsoft Teams, Okta, Google Workspace, Microsoft 365, Jira Cloud, and webhooks.",
    readMinutes: 8,
    body: `ResolveMeQ connects to the tools your employees and IT team already use.

## Notification bus

All channels (Slack, Teams, email, in-app) route through a single notification layer, consistent payloads and retry behavior.

## Slack

- OAuth connect in **Settings → Integrations**
- Ticket notifications and workflow step alerts
- Optional ticket creation from Slack (per your deployment config)

## Microsoft Teams

- Same pattern as Slack, connect bot, test notify path
- Escalation and workflow DMs to assignees

## Okta (read)

Used for workflow **auto_check** steps, verify account existence, group membership, or app assignment before marking a step complete.

## Google Workspace (read)

Verify user accounts, group membership, and related directory state for onboarding/offboarding checkpoints.

## Microsoft 365 (read)

Same read-only directory checks for Entra ID / M365 environments.

## Jira Cloud (escalate sync)

When tickets escalate, sync issue links or status to Jira so engineering sees structured context without duplicate data entry.

## Outbound webhooks

See the Automation rules guide for event delivery and HMAC verification.

## Connector reliability

All connector calls use timeouts and isolation, vendor SDKs do not run inside request handlers. Failures degrade gracefully (step stays active for human follow-up).`,
  },
  {
    slug: "analytics",
    category: "core",
    title: "Analytics and metrics",
    description:
      "Dashboard deflection, outcome metrics, advanced analytics, confidence calibration, and workflow bottlenecks.",
    readMinutes: 7,
    body: `ResolveMeQ ships built-in ROI metrics, no spreadsheet export required for headline numbers.

## Dashboard

The home **Dashboard** shows open vs closed tickets, deflection-style rates, workflow completion, and first AI response timing for your workspace.

## Outcome metrics

Key fields include:

- **Deflection rate**: agent-processed tickets resolved without escalation
- **Escalated count**
- **Workflows completed / in progress**
- **Onboarding playbook** stats when that template is in use

## Advanced analytics

The **Analytics** page adds:

- **Deflection by category**: which request types automate well
- **Confidence calibration**: buckets (0.8–1.0, 0.6–0.8, etc.) vs resolved, escalated, and reopened rates
- **Workflow bottlenecks**: steps with overdue counts and median time from workflow start

Use calibration monthly to tune thresholds and KB gaps.

## Predictive routing metrics

Track how often routing suggestions are applied vs reassigned, helps validate assignee heuristics.

## Export

Analytics supports CSV export for leadership reviews. Pair with the compliance audit export for quarterly business reviews.

## Interpreting calibration

| Samples per bucket | Guidance |
|--------------------|----------|
| Under 10 | Directional only, don't change production thresholds |
| 10–50 | Pilot decisions OK |
| 50+ | Suitable for customer-facing ROI conversations |`,
  },
  {
    slug: "msp-mode",
    category: "enterprise",
    title: "MSP mode",
    description:
      "Manage multiple client workspaces from a parent MSP account with isolated data per client.",
    readMinutes: 5,
    body: `Managed service providers (MSPs) can operate multiple customer workspaces from one parent account.

## Enabling MSP mode

A workspace owner enables **MSP mode** in **Settings**. This marks the workspace as an MSP parent. The action is recorded in the compliance audit log.

## Client workspaces

Create **child client** teams linked to the parent. Each client has isolated tickets, workflows, KB, and integrations. MSP operators see only clients they manage.

## Day-to-day operations

- Switch into a client workspace to work tickets as usual
- Parent-level reporting aggregates usage where configured
- Child ticket workflows can link to parent playbooks for cross-ticket processes

## Billing and limits

Usage quotas may apply per client depending on your plan, check **Settings → Billing** or contact sales for MSP packaging.

## Security

MSP enablement and client creation are audited events. Do not share owner credentials across clients, use per-client workspace membership.`,
  },
  {
    slug: "security-and-audit",
    category: "enterprise",
    title: "Security and audit log",
    description:
      "Compliance audit events, CSV export, roles, data isolation, and agent reliability controls.",
    readMinutes: 7,
    body: `Enterprise buyers need evidence, not marketing claims. ResolveMeQ includes controls you can demonstrate in a security review.

## Data isolation

Each workspace (team) is a tenant boundary. Tickets, workflows, rules, audit events, and API keys are scoped to the workspace. Users cannot read other workspaces unless explicitly granted (e.g. platform support roles).

## Role-based access

Workspace owners manage members and integrations. Workflow steps can require **ops roles** (IT, HR, etc.) for claim permissions. Escalation queue access follows ticket visibility rules.

## Compliance audit log

An **append-only, immutable** event stream records:

- Ticket created, escalated, resolved
- Workflow step completed
- Automation rule created, updated, deleted, executed
- MSP mode enabled, client created
- Audit log exported

Records cannot be edited or deleted after insert.

## Viewing and exporting

1. **Settings → Security**
2. Browse recent events or filter by type
3. **Export CSV** for auditors, export itself is logged as audit.exported

## Per-ticket history

Each ticket also has an interaction audit (chat, feedback, agent responses) for operational troubleshooting.

## Agent circuit breaker

Outbound AI calls use a 30-second timeout and circuit breaker. Repeated agent failures open the circuit temporarily so tickets receive fallback messaging instead of hanging.

## Encryption and compliance posture

Data in transit uses HTTPS. Encryption at rest depends on your hosting environment. Formal SOC 2 Type II certification is a commercial/ops decision, the audit log supports **preparation** for SOC 2 evidence collection. Discuss GDPR, retention, and regions during enterprise onboarding.`,
  },
  {
    slug: "partner-api",
    category: "enterprise",
    title: "Partner API",
    description:
      "Authenticate with API keys, create tickets, read workflows, list rules, and receive webhooks.",
    readMinutes: 11,
    body: `The Partner API lets external systems integrate without a custom fork of ResolveMeQ.

## Base URL

\`https://api.resolvemeq.net/api/public/v1/\`

## Authentication

1. Workspace owner opens **Settings → Integrations → Partner API**
2. Create a key, shown **once**; store it securely
3. Send on every request:

\`Authorization: Bearer rmq_pk_<secret>\`

or

\`X-API-Key: rmq_pk_<secret>\`

Keys are scoped to the issuing workspace. All data is isolated to that team.

## Scopes

| Scope | Access |
|-------|--------|
| tickets:read | List and read tickets |
| tickets:write | Create tickets, update status, start workflows |
| workflows:read | List and read workflows |
| rules:read | List automation rules |

Request only the scopes your integration needs.

## Create a ticket (intake)

\`POST /api/public/v1/tickets/create/\`

Example body:

\`\`\`json
{
  "reporter_email": "user@customer.com",
  "issue_type": "VPN not connecting",
  "description": "Cannot reach corporate VPN from home",
  "category": "vpn",
  "urgency": "high",
  "tags": ["partner-intake"]
}
\`\`\`

## Read and update tickets

- \`GET /api/public/v1/tickets/\` ,  list with status, limit, offset
- \`GET /api/public/v1/tickets/{id}/\` ,  detail
- \`PATCH /api/public/v1/tickets/{id}/update/\` ,  status changes

## Workflows

- \`GET /api/public/v1/workflows/?ticket_id=\` ,  workflows for a ticket
- \`GET /api/public/v1/workflows/{uuid}/\` ,  steps and status
- \`POST /api/public/v1/workflows/start/\` ,  start from template (requires tickets:write)

## Rules

\`GET /api/public/v1/rules/\` ,  team and global automation rules (read-only via API).

## API discovery

\`GET /api/public/v1/\` returns capabilities, scopes, and outbound webhook event names.

## Outbound webhooks (your server receives events)

Configure in **Settings → Integrations → Webhooks**. Events are HMAC-signed POSTs. Typical partner flow:

1. POST create ticket from your ITSM intake
2. Subscribe to ticket.escalated and ticket.resolved
3. GET workflows by ticket_id to track playbook progress

## Key management (JWT session, not partner key)

Owners manage keys at \`/api/public/keys/\` from the authenticated app, list prefixes, create, revoke. Never embed owner JWT in partner services; use partner keys only.

## Rate limits and errors

Use exponential backoff on HTTP 429 and 5xx. Keys share infrastructure with the main API, design idempotent intake on your side.

## Security checklist for partners

- Store keys in a secrets manager, not source control
- Rotate keys periodically
- Verify webhook HMAC before processing
- Request minimum scopes
- Log correlation IDs from ticket IDs in your system`,
  },
];

export function getManualBySlug(slug) {
  return PRODUCT_MANUAL.find((ch) => ch.slug === slug) ?? null;
}

export function getManualSlugs() {
  return PRODUCT_MANUAL.map((ch) => ch.slug);
}
