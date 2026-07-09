export const startDocs = [
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
];

