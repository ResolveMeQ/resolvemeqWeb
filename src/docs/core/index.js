export const coreDocs = [
  {
    slug: "tickets-and-ai",
    category: "core",
    title: "Tickets and AI chat",
    description:
      "Create tickets, read AI analysis, use confidence scores, escalate, assign, and roll back autonomous actions.",
    readMinutes: 10,
    body: `Tickets are the center of ResolveMeQ. Every employee request becomes a ticket with a conversation thread, status, and optional AI analysis.

## Creating a ticket

**Web app**: **Tickets → New ticket**. Enter issue type, description, category, and urgency.

**Slack / Teams**: Use your configured bot or slash command (see Integrations guide).

**Partner API**: External systems can POST to the Partner API (see Partner API guide).

## AI analysis flow

When a ticket is submitted, the platform sends it to the AI agent service. Within about 30 seconds you should see:

- **Category and severity** assessment
- **Step-by-step guidance** in plain language
- **Confidence score** (0–1), how strongly the model backs the suggestion
- **Recommended action**, auto-resolve path, request clarification, or escalate
- **KB citations**, which internal articles informed the answer

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

Employees can reply in the ticket chat (“that didn’t work”, “explain step 2”). The AI continues the thread with prior context. **Quick replies** and **suggested actions** (mark resolved, get human help) appear when the agent returns them.

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
- One article per intent (VPN connect, not “network stuff”)
- Include prerequisites (“must be on corporate Wi‑Fi first”)
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

- **Template**, admin-authored definition (steps, due days, assignee roles, skip rules)
- **Workflow**, a running instance, optionally linked to a ticket
- **Step**, pending, active, done, or skipped; only one active step at a time in the default sequential flow

## Starting a workflow

**Automatic**: When a ticket's category matches a template's trigger category (e.g. onboarding), the platform instantiates the workflow.

**Manual**: Start from a template in **Workflows** or via automation rules.

**API**: Partner API can POST to start a workflow on a ticket.

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

Steps can require an **auto_check** against Okta, Google Workspace, or Microsoft 365 (e.g. “account exists”). Verified steps may **auto_complete** when the connector confirms success, reducing manual checkbox work.

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

- **Deflection rate**, agent-processed tickets resolved without escalation
- **Escalated count**
- **Workflows completed / in progress**
- **Onboarding playbook** stats when that template is in use

## Advanced analytics

The **Analytics** page adds:

- **Deflection by category**, which request types automate well
- **Confidence calibration**, buckets (0.8–1.0, 0.6–0.8, etc.) vs resolved, escalated, and reopened rates
- **Workflow bottlenecks**, steps with overdue counts and median time from workflow start

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
];

