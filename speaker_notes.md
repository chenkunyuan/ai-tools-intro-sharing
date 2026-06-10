# AI Coding Tools 101 — Speaker Notes

Total duration: 30-45 min | 15 slides

---

## Slide 1 — Cover (0:00-0:30)

Hi everyone. Today's talk is *AI Coding Tools 101: From Prompt to Harness Engineering*. Two parts: first, universal concepts that apply whether you're using Claude Code, Cursor, or Windsurf; second, a live demo with Windsurf showing Rules, Skills, and Workflows in action.

Quick show of hands — how many of you use AI to write code regularly? (pause for response) Alright, let's dive in.

---

## Slide 2 — Prompt Engineering (0:30-3:00)

Let's start with the basics — Prompt Engineering. You're all familiar with this: describe what you want in natural language, AI generates code. The ChatGPT-era workflow.

Core principle: **instruction quality equals output quality**. The clearer you are, the better the result.

Two typical patterns: single-shot prompts — one request, one response, good for small tasks; multi-turn conversations — iteratively refining with the AI.

But there's a fundamental problem: **the AI has no project context**. It doesn't know your coding standards, your project structure, your compiler flags. Output quality is inconsistent, and you have to re-describe context every time. Not reusable.

That brings us to the next stage.

---

## Slide 3 — Context Engineering (3:00-5:30)

Context Engineering solves the "no context" problem.

Beyond the prompt, you give the AI three things:
1. **Rules / Memory**: project-level instructions and persistent memory — the AI walks in already knowing your preferences
2. **Project structure**: file tree, codebase context — the AI sees the full picture, not fragments
3. **Tool integration**: Shell, LSP, Git — the AI can execute and verify, not just generate

At this stage, collaboration improves significantly. The AI stops guessing and starts making decisions based on your actual project environment.

But here's the next question: can you standardize this "context + tools" setup and make it reusable? That's Harness Engineering.

---

## Slide 4 — Harness Engineering (5:30-8:00)

The core insight of Harness Engineering: **the engineer's role shifts from writing code to designing AI behavior specs and toolchains**.

A metaphor to tie the three stages together:
- PE is like riding a horse — you give direct commands, the AI executes
- CE is like driving a carriage — you provide direction and environment, the AI has more autonomy
- HE is like building a car — you design a system where Rules, Skills, Workflows, and MCP each play their part, and the whole thing is reusable

In HE, you're not "using AI to write code." You're **equipping AI to work better**.

Alright, theory done. Let's walk through the four HE tools one by one.

---

## Slide 5 — Rules (8:00-10:30)

Rules are the foundation — **project-level instructions auto-injected into every conversation**. Think of it as the onboarding handbook for new hires. The AI loads it the moment it enters your project.

Three activation modes:
- **Always**: active for every single message
- **Manual**: triggered by an explicit command
- **Requested**: the AI decides when it's relevant and pulls it in on demand

On the right is a real example — `.devin/rules/logdash.md` with `trigger: always_on` in the frontmatter. It specifies C99 standard, snake_case naming, gcc flags, test requirements. No matter when or what you ask the AI to write, it follows these rules.

Practical tip: write specific rules. Not "write clean code." Write "functions must not exceed 60 lines — split if longer."

---

## Slide 6 — Rules Demo (10:30-13:00)

Let me show you this in action. (switch to Windsurf)

**Step 1**: I created `.devin/rules/logdash.md` with coding standards and compiler flags.

**Step 2**: I tell the AI: "Write a log parsing function."

**Step 3**: The AI generates code that automatically follows snake_case naming, has comments above every function, and includes proper header guards.

**Step 4**: Here's the key comparison. Without Rules, the AI might use random naming, skip comments, or produce code that doesn't even compile. With Rules, the code quality is consistent from the first try — zero compile errors.

That's the value of Rules: **define once, enforced forever**.

---

## Slide 7 — Skills Concept (13:00-16:00)

Rules are passive constraints — "thou shalt do it this way." Skills are active execution — "work like an expert."

**Skill = Domain knowledge + automated workflow**. Think of it as a specialized agent with clear triggers, steps, and output format.

The difference between Rules and Skills:
- Rules are passive, always-present guardrails
- Skills are active, callable, composable experts

A real project will typically have multiple skills, each laser-focused on one responsibility.

---

## Slide 8 — Skills Demo (16:00-21:00)

Let's look at actual examples. (switch to Windsurf demo)

I created three skills — `dev`, `build`, `test` — each is a `SKILL.md` file:

- **dev**: understand requirements → generate rule-compliant code → create .c + .h files
- **build**: run gcc with project flags → report success or detailed errors → suggest fixes
- **test**: run make test → report pass/fail counts → identify failing assertions with root cause analysis

(open Windsurf, show the skill directory structure, demo invoking a skill)

Key characteristics of Skills:
1. YAML frontmatter with name, description, triggers
2. Organized in phases (Phase 1 / 2 / 3)
3. Specific output format defined

Write a skill once, and both you and your team can invoke it whenever needed — no re-explaining required.

---

## Slide 9 — Workflows Concept (21:00-24:00)

Skills are experts, but real dev workflows are chains — you need to write code, then compile, then test. That's where Workflows come in.

**A workflow is essentially chaining multiple skills together, with state passing and conditional branching between each step.**

Skill vs Workflow:
- Skill = does one thing well (compile only)
- Workflow = orchestrates multiple steps (dev → build → test, with success/failure branches)

Common use cases: CI/CD pipelines, code review flows, multi-environment deployments, data ETL.

---

## Slide 10 — Workflows Demo (24:00-28:00)

Here's the ci-pipeline workflow in action. (switch to Windsurf demo)

Invoked via `/ci-pipeline`, it calls three skills in sequence:
1. **dev** → generate or modify code
2. **build** → compile, stop and report if it fails
3. **test** → run tests, identify root causes on failure

The flow chart shows the branching logic: if the build fails, we stop before ever reaching the test step. If tests fail, we get specific assertion details and fix suggestions.

(demo: type `/ci-pipeline` in Windsurf and show the automated flow)

The value of Workflows: **orchestrate once, automate forever**.

---

## Slide 11 — MCP Concept (28:00-31:00)

MCP stands for Model Context Protocol. Think of it as **the USB-C port for AI**. It's a standard protocol that lets AI connect to external tools — plug and play.

The architecture is straightforward: AI / LLM ↔ MCP ↔ Tools & Services.

AI is no longer limited to "seeing" text in the conversation. Through MCP, it can directly access the filesystem, execute shell commands, query databases, operate Git repos, drive browsers...

Common MCP Servers: Filesystem, GitHub/Git, Postgres/SQLite, Puppeteer (browser automation), Slack/API, Docker/K8s.

---

## Slide 12 — MCP Demo (31:00-35:00)

Without MCP, the AI can only "see" what you type. You have to manually copy-paste code and run commands yourself.

With MCP:
- AI reads and writes project files directly
- AI executes shell commands to build and run
- AI operates Git — commit, branch, log
- AI queries databases directly

(demo: open `mcp_config.example.json`, show the three MCP servers — filesystem, git, shell — then connect them in Windsurf and demonstrate the AI operating the logdash project directly)

This is a qualitative change in capability. The AI transforms from a "chatbot" into a real **engineering partner** that can take action.

---

## Slide 13 — Comparison Table (35:00-37:00)

This table summarizes PE vs CE vs HE across six dimensions.

Focus on the HE column:
- Completion rate: 90%+ (vs 30-50% for PE)
- Code quality: highly consistent
- Rework rate: low
- Reusability: fully reusable

Harness Engineering doesn't replace Prompt and Context — it **builds on top of them**. You still write good prompts. You still provide context. But now you add a reusable toolkit and capability system on top.

---

## Slide 14 — Best Practices (37:00-40:00)

The investment pyramid — **build bottom-up, step by step**:

1. **Start with Rules**: spend 30 minutes on a solid rules file. It solves 80% of the problems at the lowest investment.
2. **Then build Skills**: extract complex, repeated tasks into skills. If your rules file is getting bloated, it's time for a skill.
3. **Add Workflows when you need orchestration**: chain skills together for fixed, repeatable processes.
4. **Plug in MCP last**: only when you genuinely need external capabilities. 2-3 MCP servers is plenty.

Three key principles:
- **Don't automate everything** — keep human judgment at critical decision points
- **Start from real pain points** — don't adopt technology for its own sake
- **Share with your team** — commit Rules and Skills to the repo to build organizational knowledge

---

## Slide 15 — Q&A (40:00-45:00)

One sentence to wrap up: **From Prompt to Harness — AI is not just a tool, it's your engineering partner. Start building your Harness today.**

(open for questions)

Prepared answers for common questions:

**Q: Are these concepts portable across different tools?**
A: Names differ but the logic is universal. Rules = CLAUDE.md / .cursorrules. Skills follow the open-source Agent Skills spec. MCP is an industry standard protocol.

**Q: Won't Harness eat up the context window?**
A: That's exactly what the `model_decision` rule trigger solves — the full content only loads when relevant. The description alone sits in context.

**Q: Is Harness worth it for small projects?**
A: Rules — absolutely, always. Skills — depends on complexity. Workflows and MCP — wait until you actually need them.

---

## Appendix: Time Flexibility

| If you're... | Adjust |
|-------------|--------|
| 5 min over | Merge slides 11+12 (MCP concept + demo) into one, cut demo details |
| 10 min over | Merge slides 7+8 (Skills), demo only the dev skill |
| Ahead of schedule | Add before/after comparisons to each demo, invite more audience questions |
