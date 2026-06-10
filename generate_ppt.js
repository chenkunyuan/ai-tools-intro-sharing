const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// Color palette
const C = {
  darkBg: "0F172A",
  darkBg2: "1E293B",
  lightBg: "F8FAFC",
  teal: "14B8A6",
  tealDark: "0D9488",
  blue: "3B82F6",
  blueDark: "2563EB",
  amber: "F59E0B",
  red: "EF4444",
  textDark: "1E293B",
  textLight: "F8FAFC",
  textMuted: "94A3B8",
  textMuted2: "64748B",
  codeBg: "0F172A",
  cardBg: "FFFFFF",
  cardBorder: "E2E8F0",
};

// Icon render function
const { FaRobot, FaCode, FaCogs, FaTools, FaLayerGroup, FaProjectDiagram, FaPlug, FaChartBar, FaLightbulb, FaQuestionCircle, FaCheckCircle, FaArrowRight, FaTerminal } = require("react-icons/fa");

function renderIconSvg(IconComponent, color, size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// Helper: fresh shadow factory
const makeShadow = () => ({ type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.10 });

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "AI Tools Intro";
  pres.title = "AI Tools 101: From Prompt to Harness Engineering";

  // Pre-render icons
  const icons = {
    robot: await iconToBase64Png(FaRobot, "#FFFFFF", 256),
    code: await iconToBase64Png(FaCode, "#14B8A6", 256),
    cogs: await iconToBase64Png(FaCogs, "#3B82F6", 256),
    tools: await iconToBase64Png(FaTools, "#14B8A6", 256),
    layers: await iconToBase64Png(FaLayerGroup, "#3B82F6", 256),
    project: await iconToBase64Png(FaProjectDiagram, "#F59E0B", 256),
    plug: await iconToBase64Png(FaPlug, "#14B8A6", 256),
    chart: await iconToBase64Png(FaChartBar, "#3B82F6", 256),
    lightbulb: await iconToBase64Png(FaLightbulb, "#F59E0B", 256),
    question: await iconToBase64Png(FaQuestionCircle, "#14B8A6", 256),
    check: await iconToBase64Png(FaCheckCircle, "#14B8A6", 256),
    arrow: await iconToBase64Png(FaArrowRight, "#FFFFFF", 256),
    terminal: await iconToBase64Png(FaTerminal, "#14B8A6", 256),
  };

  // ========== SLIDE 1: Cover ==========
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };

    s.addShape(pres.shapes.OVAL, {
      x: 7.5, y: -1.5, w: 4.5, h: 4.5,
      fill: { color: C.teal, transparency: 85 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: -1, y: 3, w: 3, h: 3,
      fill: { color: C.blue, transparency: 88 },
    });

    s.addText("AI Coding Tools 101", {
      x: 0.8, y: 1.0, w: 8.5, h: 1.2,
      fontSize: 48, fontFace: "Arial Black", color: C.textLight, bold: true, margin: 0,
    });
    s.addText("From Prompt to Harness Engineering", {
      x: 0.8, y: 2.2, w: 8.5, h: 0.7,
      fontSize: 26, fontFace: "Calibri", color: C.teal, margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: 0.8, y: 3.1, w: 2.5, h: 0,
      line: { color: C.teal, width: 3 },
    });
    s.addText("General Knowledge + Live Demo with Windsurf", {
      x: 0.8, y: 3.4, w: 8.5, h: 0.6,
      fontSize: 16, fontFace: "Calibri", color: C.textMuted, margin: 0,
    });
    s.addText("June 2026", {
      x: 0.8, y: 4.5, w: 3, h: 0.4,
      fontSize: 12, fontFace: "Calibri", color: C.textMuted2, margin: 0,
    });
  }

  // ========== SLIDE 2: Prompt Engineering ==========
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal },
    });

    s.addText("Prompt Engineering", {
      x: 0.7, y: 0.4, w: 8, h: 0.7,
      fontSize: 36, fontFace: "Arial Black", color: C.textDark, margin: 0,
    });
    s.addText("Describe requirements in natural language, let AI generate code", {
      x: 0.7, y: 1.0, w: 8, h: 0.4,
      fontSize: 14, fontFace: "Calibri", color: C.textMuted2, margin: 0,
    });

    s.addText([
      { text: "Core Concept", options: { fontSize: 20, bold: true, color: C.textDark, breakLine: true, fontFace: "Calibri" } },
      { text: " ", options: { fontSize: 6, breakLine: true } },
      { text: "Instruction Quality = Output Quality", options: { bold: true, color: C.tealDark, breakLine: true, fontSize: 15, fontFace: "Calibri" } },
      { text: "Clear requirements lead to accurate code generation", options: { breakLine: true, fontSize: 14, fontFace: "Calibri", color: C.textMuted2 } },
      { text: " ", options: { fontSize: 6, breakLine: true } },
      { text: "Typical Patterns", options: { fontSize: 16, bold: true, color: C.textDark, breakLine: true, fontFace: "Calibri" } },
      { text: " ", options: { fontSize: 6, breakLine: true } },
      { text: "Single-shot: One prompt, one response", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: "Calibri", color: C.textMuted2 } },
      { text: "Multi-turn: Iterative refinement through conversation", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: "Calibri", color: C.textMuted2 } },
      { text: "Limitation: No project context, not reusable", options: { bullet: true, fontSize: 14, fontFace: "Calibri", color: C.red } },
    ], { x: 0.7, y: 1.7, w: 5.2, h: 3.5, valign: "top" });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.5, y: 1.7, w: 3.0, h: 3.3,
      fill: { color: C.cardBg }, shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.5, y: 1.7, w: 3.0, h: 0.06, fill: { color: C.blue },
    });
    s.addText("Single-shot Example", {
      x: 6.8, y: 2.0, w: 2.4, h: 0.35,
      fontSize: 13, fontFace: "Calibri", color: C.textMuted2, bold: true, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.8, y: 2.45, w: 2.4, h: 2.2,
      fill: { color: C.codeBg },
    });
    s.addText([
      { text: "\"Write a function", options: { fontSize: 10, fontFace: "Consolas", color: C.textMuted, breakLine: true } },
      { text: "to parse logs\"", options: { fontSize: 10, fontFace: "Consolas", color: C.textMuted, breakLine: true } },
      { text: " ", options: { fontSize: 6, breakLine: true } },
      { text: "No context", options: { fontSize: 10, fontFace: "Consolas", color: C.red, breakLine: true } },
      { text: "No quality guarantee", options: { fontSize: 10, fontFace: "Consolas", color: C.red } },
    ], { x: 6.9, y: 2.5, w: 2.2, h: 2.1, valign: "top" });
  }

  // ========== SLIDE 3: Context Engineering ==========
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue },
    });

    s.addText("Context Engineering", {
      x: 0.7, y: 0.4, w: 8, h: 0.7,
      fontSize: 36, fontFace: "Arial Black", color: C.textDark, margin: 0,
    });
    s.addText("Beyond prompts — give AI the full project context", {
      x: 0.7, y: 1.0, w: 8, h: 0.4,
      fontSize: 14, fontFace: "Calibri", color: C.textMuted2, margin: 0,
    });

    const cardData = [
      { title: "Rules / Memory", desc: "Project-level instructions and\npersistent memory. AI always\nknows your preferences.", color: C.teal },
      { title: "Project Structure", desc: "File tree, codebase context.\nAI understands the full picture,\nnot just fragments.", color: C.blue },
      { title: "Tool Integration", desc: "Shell, LSP, Git.\nAI can execute and verify\ncode directly.", color: C.amber },
    ];
    cardData.forEach((card, i) => {
      const cx = 0.5 + i * 3.1;
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: 1.7, w: 2.9, h: 2.4,
        fill: { color: C.cardBg }, shadow: makeShadow(),
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: 1.7, w: 2.9, h: 0.06, fill: { color: card.color },
      });
      s.addText(card.title, {
        x: cx + 0.25, y: 1.95, w: 2.4, h: 0.4,
        fontSize: 17, fontFace: "Calibri", color: C.textDark, bold: true, margin: 0,
      });
      s.addText(card.desc, {
        x: cx + 0.25, y: 2.45, w: 2.4, h: 1.4,
        fontSize: 13, fontFace: "Calibri", color: C.textMuted2, margin: 0, valign: "top",
      });
    });

    s.addText("PE: Tell AI what to do   →   CE: Let AI understand the environment   →   HE: Equip AI with executable capabilities", {
      x: 0.5, y: 4.5, w: 9, h: 0.5,
      fontSize: 13, fontFace: "Calibri", color: C.textMuted2, align: "center", margin: 0, italic: true,
    });
  }

  // ========== SLIDE 4: Harness Engineering ==========
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };

    s.addShape(pres.shapes.OVAL, {
      x: 8, y: -1, w: 3.5, h: 3.5,
      fill: { color: C.teal, transparency: 85 },
    });

    s.addText("Harness Engineering", {
      x: 0.7, y: 0.4, w: 8, h: 0.7,
      fontSize: 36, fontFace: "Arial Black", color: C.textLight, margin: 0,
    });
    s.addText("From \"Driving AI\" to \"Equipping AI\"", {
      x: 0.7, y: 1.1, w: 8, h: 0.4,
      fontSize: 16, fontFace: "Calibri", color: C.teal, margin: 0,
    });

    const stages = [
      { title: "Prompt Engineering", desc: "Riding a horse\nSingle instructions", accent: C.textMuted2 },
      { title: "Context Engineering", desc: "Driving a carriage\nProviding context", accent: C.blue },
      { title: "Harness Engineering", desc: "Building a car\nReusable AI dev system", accent: C.teal },
    ];
    stages.forEach((st, i) => {
      const cx = 0.7 + i * 3.15;
      const isHE = i === 2;
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: 2.0, w: 2.8, h: 2.8,
        fill: { color: isHE ? C.teal : C.darkBg2, transparency: isHE ? 80 : 0 },
      });

      s.addShape(pres.shapes.OVAL, {
        x: cx + 1.0, y: 2.2, w: 0.8, h: 0.8,
        fill: { color: isHE ? C.teal : C.darkBg2 },
      });
      s.addText(String(i + 1), {
        x: cx + 1.0, y: 2.2, w: 0.8, h: 0.8,
        fontSize: 22, fontFace: "Arial Black", color: C.textLight, align: "center", valign: "middle", margin: 0,
      });

      s.addText(st.title, {
        x: cx + 0.2, y: 3.15, w: 2.4, h: 0.4,
        fontSize: 14, fontFace: "Calibri", color: C.textLight, bold: true, align: "center", margin: 0,
      });
      s.addText(st.desc, {
        x: cx + 0.2, y: 3.55, w: 2.4, h: 0.9,
        fontSize: 12, fontFace: "Calibri", color: C.textMuted, align: "center", margin: 0,
      });

      if (i < 2) {
        s.addText("→", {
          x: cx + 2.85, y: 2.3, w: 0.3, h: 0.6,
          fontSize: 24, color: C.textMuted, align: "center", valign: "middle", margin: 0,
        });
      }
    });

    s.addText("The engineer's role shifts from \"writing code\" to \"designing AI behavior specs and toolchains\"", {
      x: 0.5, y: 5.0, w: 9, h: 0.4,
      fontSize: 14, fontFace: "Calibri", color: C.textMuted, align: "center", margin: 0, italic: true,
    });
  }

  // ========== SLIDE 5: Rules Concept ==========
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal },
    });

    s.addText("Rules — Project-Level Instructions", {
      x: 0.7, y: 0.35, w: 8, h: 0.65,
      fontSize: 36, fontFace: "Arial Black", color: C.textDark, margin: 0,
    });
    s.addText("Auto-injected context files that keep AI aligned with your standards", {
      x: 0.7, y: 0.95, w: 8, h: 0.35,
      fontSize: 14, fontFace: "Calibri", color: C.textMuted2, margin: 0,
    });

    const ruleTypes = [
      { type: "Always", desc: "Always active\nAuto-injected into every conversation", color: C.teal },
      { type: "Manual", desc: "User-triggered\nActivated via explicit command", color: C.blue },
      { type: "Requested", desc: "On-demand\nAI pulls it in when it detects relevance", color: C.amber },
    ];
    ruleTypes.forEach((rt, i) => {
      const cy = 1.6 + i * 1.1;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.7, y: cy, w: 5.2, h: 0.9,
        fill: { color: C.cardBg }, shadow: { type: "outer", color: "000000", blur: 3, offset: 1, angle: 135, opacity: 0.06 },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.7, y: cy, w: 0.07, h: 0.9, fill: { color: rt.color },
      });
      s.addText(rt.type, {
        x: 1.0, y: cy + 0.05, w: 1.8, h: 0.35,
        fontSize: 16, fontFace: "Calibri", color: rt.color, bold: true, margin: 0,
      });
      s.addText(rt.desc, {
        x: 2.8, y: cy + 0.05, w: 2.9, h: 0.8,
        fontSize: 13, fontFace: "Calibri", color: C.textMuted2, margin: 0,
      });
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.3, y: 1.6, w: 3.3, h: 3.5,
      fill: { color: C.codeBg },
    });
    s.addText([
      { text: ".windsurf/rules/logdash.md", options: { bold: true, color: C.teal, fontSize: 11, fontFace: "Consolas", breakLine: true } },
      { text: " ", options: { fontSize: 5, breakLine: true } },
      { text: "---", options: { color: C.textMuted, fontSize: 9, fontFace: "Consolas", breakLine: true } },
      { text: "trigger: always_on", options: { color: C.amber, fontSize: 9, fontFace: "Consolas", breakLine: true } },
      { text: "---", options: { color: C.textMuted, fontSize: 9, fontFace: "Consolas", breakLine: true } },
      { text: " ", options: { fontSize: 3, breakLine: true } },
      { text: "# Coding Standard", options: { color: C.textMuted, fontSize: 10, fontFace: "Consolas", breakLine: true } },
      { text: "Use C99 standard", options: { color: C.textMuted2, fontSize: 10, fontFace: "Consolas", breakLine: true } },
      { text: "Naming: snake_case", options: { color: C.textMuted2, fontSize: 10, fontFace: "Consolas", breakLine: true } },
      { text: " ", options: { fontSize: 5, breakLine: true } },
      { text: "# Compiler Flags", options: { color: C.textMuted, fontSize: 10, fontFace: "Consolas", breakLine: true } },
      { text: "gcc -Wall -Wextra", options: { color: C.textMuted2, fontSize: 10, fontFace: "Consolas", breakLine: true } },
      { text: " ", options: { fontSize: 5, breakLine: true } },
      { text: "# Test Requirements", options: { color: C.textMuted, fontSize: 10, fontFace: "Consolas", breakLine: true } },
      { text: "Every module needs", options: { color: C.textMuted2, fontSize: 10, fontFace: "Consolas", breakLine: true } },
      { text: "corresponding unit tests", options: { color: C.textMuted2, fontSize: 10, fontFace: "Consolas" } },
    ], { x: 6.5, y: 1.75, w: 2.9, h: 3.2, valign: "top" });
  }

  // ========== SLIDE 6: Rules Demo ==========
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal },
    });

    s.addText("Rules Demo", {
      x: 0.7, y: 0.35, w: 8, h: 0.55,
      fontSize: 32, fontFace: "Arial Black", color: C.textDark, margin: 0,
    });

    const demoSteps = [
      { num: "1", text: "Create .windsurf/rules/logdash.md\nDefine coding standards + compiler flags + trigger mode" },
      { num: "2", text: "Tell AI what you need\n\"Write a log parsing function\"" },
      { num: "3", text: "AI generates rule-compliant code\nNaming, comments, compile flags all followed" },
      { num: "4", text: "Compare: With vs Without Rules\nQuality and consistency difference" },
    ];
    demoSteps.forEach((step, i) => {
      const sy = 1.3 + i * 0.85;
      s.addShape(pres.shapes.OVAL, {
        x: 0.7, y: sy + 0.05, w: 0.45, h: 0.45,
        fill: { color: C.teal },
      });
      s.addText(step.num, {
        x: 0.7, y: sy + 0.05, w: 0.45, h: 0.45,
        fontSize: 16, fontFace: "Arial Black", color: C.textLight, align: "center", valign: "middle", margin: 0,
      });
      s.addText(step.text, {
        x: 1.35, y: sy + 0.02, w: 4.5, h: 0.55,
        fontSize: 14, fontFace: "Calibri", color: C.textDark, margin: 0,
      });
      if (i < 3) {
        s.addShape(pres.shapes.LINE, {
          x: 0.925, y: sy + 0.5, w: 0, h: 0.35,
          line: { color: C.cardBorder, width: 1.5 },
        });
      }
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.3, y: 1.3, w: 3.3, h: 1.65,
      fill: { color: "FFF1F2" },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.3, y: 1.3, w: 3.3, h: 0.05, fill: { color: C.red },
    });
    s.addText("Without Rules", {
      x: 6.5, y: 1.45, w: 2.9, h: 0.3,
      fontSize: 12, fontFace: "Calibri", color: C.red, bold: true, margin: 0,
    });
    s.addText("Inconsistent naming, no comments\nCompile errors, no tests", {
      x: 6.5, y: 1.8, w: 2.9, h: 0.9,
      fontSize: 11, fontFace: "Calibri", color: C.textMuted2, margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.3, y: 3.15, w: 3.3, h: 1.65,
      fill: { color: "F0FDFA" },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.3, y: 3.15, w: 3.3, h: 0.05, fill: { color: C.teal },
    });
    s.addText("With Rules", {
      x: 6.5, y: 3.30, w: 2.9, h: 0.3,
      fontSize: 12, fontFace: "Calibri", color: C.tealDark, bold: true, margin: 0,
    });
    s.addText("Consistent style, full comments\nZero compile errors, test-ready", {
      x: 6.5, y: 3.65, w: 2.9, h: 0.9,
      fontSize: 11, fontFace: "Calibri", color: C.textMuted2, margin: 0,
    });

    s.addText("Demo: Create .windsurf/rules/logdash.md in Windsurf and show how Rules directly impact code generation quality", {
      x: 0.7, y: 4.9, w: 9, h: 0.4,
      fontSize: 12, fontFace: "Calibri", color: C.textMuted2, italic: true, margin: 0,
    });
  }

  // ========== SLIDE 7: Skills Concept ==========
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue },
    });

    s.addText("Skills — Reusable AI Experts", {
      x: 0.7, y: 0.35, w: 8, h: 0.65,
      fontSize: 36, fontFace: "Arial Black", color: C.textDark, margin: 0,
    });
    s.addText("Skill = Domain Knowledge + Automated Workflow = Professional AI Agent", {
      x: 0.7, y: 0.95, w: 8, h: 0.35,
      fontSize: 14, fontFace: "Calibri", color: C.textMuted2, margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 1.6, w: 4.5, h: 3.3,
      fill: { color: C.cardBg }, shadow: makeShadow(),
    });
    s.addText("Skill Components", {
      x: 0.95, y: 1.75, w: 4.0, h: 0.35,
      fontSize: 16, fontFace: "Calibri", color: C.textDark, bold: true, margin: 0,
    });
    const skillItems = [
      { label: "Expertise", desc: "Encapsulates domain best practices" },
      { label: "Workflow", desc: "Clear steps and state management" },
      { label: "Triggers", desc: "When to auto-activate or manually invoke" },
      { label: "Interface", desc: "Standardized input parameters and output" },
    ];
    skillItems.forEach((item, i) => {
      const iy = 2.3 + i * 0.62;
      s.addShape(pres.shapes.OVAL, {
        x: 0.95, y: iy + 0.06, w: 0.22, h: 0.22,
        fill: { color: C.blue },
      });
      s.addText(item.label, {
        x: 1.35, y: iy, w: 1.2, h: 0.35,
        fontSize: 13, fontFace: "Calibri", color: C.textDark, bold: true, margin: 0,
      });
      s.addText(item.desc, {
        x: 2.55, y: iy, w: 2.4, h: 0.35,
        fontSize: 12, fontFace: "Calibri", color: C.textMuted2, margin: 0,
      });
    });

    s.addText("Rules vs Skills", {
      x: 5.8, y: 1.6, w: 3.8, h: 0.35,
      fontSize: 16, fontFace: "Calibri", color: C.textDark, bold: true, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.8, y: 2.1, w: 3.7, h: 1.1,
      fill: { color: "F1F5F9" },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.8, y: 2.1, w: 0.06, h: 1.1, fill: { color: C.textMuted2 },
    });
    s.addText([
      { text: "Rules", options: { bold: true, color: C.textMuted2, fontSize: 13, fontFace: "Calibri", breakLine: true } },
      { text: "Passive constraints", options: { color: C.textMuted2, fontSize: 12, fontFace: "Calibri", breakLine: true } },
      { text: "Set boundaries and norms", options: { color: C.textMuted2, fontSize: 12, fontFace: "Calibri" } },
    ], { x: 6.1, y: 2.2, w: 3.2, h: 0.9 });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.8, y: 3.5, w: 3.7, h: 1.4,
      fill: { color: C.cardBg }, shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.8, y: 3.5, w: 0.06, h: 1.4, fill: { color: C.teal },
    });
    s.addText([
      { text: "Skills", options: { bold: true, color: C.teal, fontSize: 13, fontFace: "Calibri", breakLine: true } },
      { text: "Active execution", options: { color: C.textDark, fontSize: 12, fontFace: "Calibri", breakLine: true } },
      { text: "Works like an expert", options: { color: C.textDark, fontSize: 12, fontFace: "Calibri", breakLine: true } },
      { text: "Reusable and composable", options: { color: C.textDark, fontSize: 12, fontFace: "Calibri" } },
    ], { x: 6.1, y: 3.6, w: 3.2, h: 1.2 });
  }

  // ========== SLIDE 8: Skills Demo ==========
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue },
    });

    s.addText("Skills Demo — Three Modular Skills", {
      x: 0.7, y: 0.35, w: 8, h: 0.55,
      fontSize: 32, fontFace: "Arial Black", color: C.textDark, margin: 0,
    });

    // 3 skill cards
    const skillCards = [
      { name: "dev", icon: "1", desc: "Code generation\nUnderstand requirements\nGenerate rule-compliant C code\nCreate .c + .h files", color: C.teal },
      { name: "build", icon: "2", desc: "Compilation verification\nRun gcc with project flags\nReport success or errors\nSuggest fixes on failure", color: C.blue },
      { name: "test", icon: "3", desc: "Test execution\nmake test to run all tests\nReport pass/fail counts\nIdentify failing assertions", color: C.amber },
    ];
    skillCards.forEach((card, i) => {
      const cx = 0.3 + i * 3.2;
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: 1.2, w: 3.0, h: 3.5,
        fill: { color: C.cardBg }, shadow: makeShadow(),
      });
      // Color top bar
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: 1.2, w: 3.0, h: 0.06, fill: { color: card.color },
      });
      // Skill name
      s.addText(card.name, {
        x: cx + 0.2, y: 1.5, w: 2.6, h: 0.45,
        fontSize: 22, fontFace: "Consolas", color: card.color, bold: true, margin: 0,
      });
      // Divider
      s.addShape(pres.shapes.LINE, {
        x: cx + 0.3, y: 2.05, w: 2.4, h: 0,
        line: { color: C.cardBorder, width: 1 },
      });
      // Description
      s.addText(card.desc, {
        x: cx + 0.2, y: 2.2, w: 2.6, h: 2.3,
        fontSize: 13, fontFace: "Calibri", color: C.textMuted2, margin: 0, valign: "top",
      });
    });

    // Right: project tree showing 3 skill files
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.3, y: 4.9, w: 9.4, h: 0.5,
      fill: { color: C.codeBg },
    });
    s.addText([
      { text: " .windsurf/skills/", options: { color: C.blue, fontSize: 10, fontFace: "Consolas" } },
      { text: "  dev/SKILL.md", options: { color: C.teal, fontSize: 10, fontFace: "Consolas" } },
      { text: "  build/SKILL.md", options: { color: C.blue, fontSize: 10, fontFace: "Consolas" } },
      { text: "  test/SKILL.md", options: { color: C.amber, fontSize: 10, fontFace: "Consolas" } },
    ], { x: 1.0, y: 4.9, w: 8.0, h: 0.5, valign: "middle", margin: 0 });
  }

  // ========== SLIDE 9: Workflows Concept ==========
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.amber },
    });

    s.addText("Workflows — Process Orchestration", {
      x: 0.7, y: 0.35, w: 8, h: 0.65,
      fontSize: 36, fontFace: "Arial Black", color: C.textDark, margin: 0,
    });
    s.addText("Multi-step automation with state passing, conditional branching, and loops", {
      x: 0.7, y: 0.95, w: 8, h: 0.35,
      fontSize: 14, fontFace: "Calibri", color: C.textMuted2, margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 1.6, w: 2.8, h: 1.2,
      fill: { color: "F1F5F9" },
    });
    s.addText([
      { text: "Skill", options: { bold: true, color: C.textMuted2, fontSize: 14, fontFace: "Calibri", breakLine: true } },
      { text: "Single-purpose expert", options: { fontSize: 13, fontFace: "Calibri", color: C.textMuted2, breakLine: true } },
      { text: "One responsibility", options: { fontSize: 13, fontFace: "Calibri", color: C.textMuted2 } },
    ], { x: 0.9, y: 1.75, w: 2.4, h: 0.9 });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 3.8, y: 1.6, w: 2.8, h: 1.2,
      fill: { color: C.cardBg }, shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 3.8, y: 1.6, w: 0.06, h: 1.2, fill: { color: C.amber },
    });
    s.addText([
      { text: "Workflow", options: { bold: true, color: C.amber, fontSize: 14, fontFace: "Calibri", breakLine: true } },
      { text: "Chains multiple steps", options: { fontSize: 13, fontFace: "Calibri", color: C.textDark, breakLine: true } },
      { text: "Stateful, branching pipeline", options: { fontSize: 13, fontFace: "Calibri", color: C.textDark } },
    ], { x: 4.0, y: 1.75, w: 2.4, h: 0.9 });

    s.addText("Typical Workflow Pipeline", {
      x: 0.7, y: 3.1, w: 4, h: 0.35,
      fontSize: 16, fontFace: "Calibri", color: C.textDark, bold: true, margin: 0,
    });

    const wfSteps = ["Code Change", "Build", "Fail→Fix", "Unit Test", "Integ. Test", "Report"];
    wfSteps.forEach((step, i) => {
      const wx = 0.7 + i * 1.58;
      s.addShape(pres.shapes.RECTANGLE, {
        x: wx, y: 3.65, w: 1.35, h: 0.6,
        fill: { color: step.startsWith("Fail") ? "FEF2F2" : C.cardBg },
      });
      s.addText(step, {
        x: wx, y: 3.65, w: 1.35, h: 0.6,
        fontSize: 10, fontFace: "Calibri", color: step.startsWith("Fail") ? C.red : C.textDark,
        align: "center", valign: "middle", margin: 0,
      });
      if (i < wfSteps.length - 1) {
        s.addText("→", {
          x: wx + 1.35, y: 3.65, w: 0.23, h: 0.6,
          fontSize: 14, color: C.textMuted, align: "center", valign: "middle", margin: 0,
        });
      }
    });

    s.addText("Use Cases", {
      x: 0.7, y: 4.5, w: 4, h: 0.35,
      fontSize: 16, fontFace: "Calibri", color: C.textDark, bold: true, margin: 0,
    });
    const useCases = ["CI/CD Pipelines", "Code Review Flow", "Multi-Env Deploy", "Data ETL Pipeline"];
    useCases.forEach((uc, i) => {
      const ux = 0.7 + i * 2.35;
      s.addShape(pres.shapes.RECTANGLE, {
        x: ux, y: 4.95, w: 2.1, h: 0.4,
        fill: { color: C.cardBg },
      });
      s.addText(uc, {
        x: ux, y: 4.95, w: 2.1, h: 0.4,
        fontSize: 12, fontFace: "Calibri", color: C.textMuted2, align: "center", valign: "middle", margin: 0,
      });
    });
  }

  // ========== SLIDE 10: Workflows Demo ==========
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.amber },
    });

    s.addText("Workflows Demo — Orchestrating Skills", {
      x: 0.7, y: 0.35, w: 8, h: 0.55,
      fontSize: 32, fontFace: "Arial Black", color: C.textDark, margin: 0,
    });

    // Top: Workflow = skills orchestration concept
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 1.2, w: 9.0, h: 0.6,
      fill: { color: C.cardBg }, shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 1.2, w: 0.06, h: 0.6, fill: { color: C.amber },
    });
    s.addText("Workflow: ci-pipeline  →  calls  dev  →  build  →  test  with state passing and conditional branching", {
      x: 0.8, y: 1.2, w: 8.5, h: 0.6,
      fontSize: 14, fontFace: "Calibri", color: C.textDark, valign: "middle", margin: 0,
    });

    // Flow chart: 3 skills as main flow
    const flowBoxes = [
      { text: "dev\nSkill", x: 0.5, y: 2.2, color: C.teal },
      { text: "build\nSkill", x: 3.2, y: 2.2, color: C.blue },
      { text: "test\nSkill", x: 5.9, y: 2.2, color: C.amber },
      { text: "Report\n+ Done", x: 7.8, y: 2.2, color: C.darkBg2 },
      { text: "Build\nPass?", x: 3.2, y: 3.3, color: C.textMuted2, isDiamond: true },
      { text: "Tests\nPass?", x: 5.9, y: 3.3, color: C.textMuted2, isDiamond: true },
      { text: "Fail: Report\n+ Fix Hint", x: 4.0, y: 4.3, color: C.red },
    ];

    flowBoxes.forEach((box) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: box.x, y: box.y, w: 1.7, h: box.isDiamond ? 0.65 : 0.65,
        fill: { color: box.isDiamond ? "FEF3C7" : box.color },
      });
      s.addText(box.text, {
        x: box.x, y: box.y, w: 1.7, h: 0.65,
        fontSize: 11, fontFace: "Calibri", color: box.isDiamond ? C.textDark : C.textLight,
        align: "center", valign: "middle", margin: 0,
      });
    });

    // Flow arrows
    s.addText("→", { x: 2.2, y: 2.2, w: 0.7, h: 0.65, fontSize: 22, color: C.textMuted, align: "center", valign: "middle", margin: 0 });
    s.addText("→", { x: 4.9, y: 2.2, w: 0.35, h: 0.65, fontSize: 22, color: C.textMuted, align: "center", valign: "middle", margin: 0 });
    s.addText("→", { x: 7.6, y: 2.2, w: 0.35, h: 0.65, fontSize: 22, color: C.textMuted, align: "center", valign: "middle", margin: 0 });
    // Decision branches
    s.addText("↓", { x: 3.85, y: 2.85, w: 0.35, h: 0.5, fontSize: 20, color: C.textMuted, align: "center", valign: "middle", margin: 0 });
    s.addText("↓", { x: 6.55, y: 2.85, w: 0.35, h: 0.5, fontSize: 20, color: C.textMuted, align: "center", valign: "middle", margin: 0 });
    s.addText("✗", { x: 4.6, y: 3.7, w: 0.35, h: 0.6, fontSize: 14, color: C.red, align: "center", valign: "middle", margin: 0 });

    // Bottom: workflow config
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.25, w: 9.0, h: 0.55,
      fill: { color: C.codeBg },
    });
    s.addText([
      { text: "# .windsurf/workflows/ci-pipeline.md", options: { color: C.teal, fontSize: 10, fontFace: "Consolas", breakLine: true } },
      { text: "Invoke: ", options: { color: C.textMuted, fontSize: 10, fontFace: "Consolas" } },
      { text: "/ci-pipeline", options: { color: C.amber, fontSize: 10, fontFace: "Consolas" } },
      { text: "  → dev → build → test", options: { color: C.textMuted2, fontSize: 10, fontFace: "Consolas" } },
    ], { x: 1.0, y: 4.25, w: 8.0, h: 0.55, valign: "middle", margin: 0 });

    s.addText("Demo: Workflow calls three skills in sequence — dev → build → test — with state passing between each", {
      x: 0.7, y: 5.0, w: 9, h: 0.35,
      fontSize: 12, fontFace: "Calibri", color: C.textMuted2, italic: true, margin: 0,
    });
  }

  // ========== SLIDE 11: MCP Concept ==========
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal },
    });

    s.addText("MCP — Model Context Protocol", {
      x: 0.7, y: 0.35, w: 8, h: 0.65,
      fontSize: 36, fontFace: "Arial Black", color: C.textDark, margin: 0,
    });
    s.addText("The standard protocol connecting AI to the outside world — like a USB-C port", {
      x: 0.7, y: 0.95, w: 8, h: 0.35,
      fontSize: 14, fontFace: "Calibri", color: C.textMuted2, margin: 0,
    });

    // Architecture: AI <-> MCP <-> Tools
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 1.7, w: 2.5, h: 1.8,
      fill: { color: C.codeBg },
    });
    s.addText("AI / LLM", {
      x: 0.5, y: 1.9, w: 2.5, h: 0.4,
      fontSize: 18, fontFace: "Arial Black", color: C.teal, align: "center", margin: 0,
    });
    s.addText("Claude / Windsurf\nCursor / Copilot", {
      x: 0.5, y: 2.4, w: 2.5, h: 0.8,
      fontSize: 13, fontFace: "Calibri", color: C.textMuted, align: "center", margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 3.75, y: 1.7, w: 2.5, h: 1.8,
      fill: { color: C.teal, transparency: 85 },
    });
    s.addText("MCP", {
      x: 3.75, y: 2.1, w: 2.5, h: 0.5,
      fontSize: 28, fontFace: "Arial Black", color: C.tealDark, align: "center", margin: 0,
    });
    s.addText("Standard Protocol\nDiscovery & Invocation", {
      x: 3.75, y: 2.6, w: 2.5, h: 0.7,
      fontSize: 12, fontFace: "Calibri", color: C.textMuted2, align: "center", margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 7.0, y: 1.7, w: 2.8, h: 1.8,
      fill: { color: C.cardBg }, shadow: makeShadow(),
    });
    s.addText("Tools & Services", {
      x: 7.0, y: 1.9, w: 2.8, h: 0.4,
      fontSize: 18, fontFace: "Arial Black", color: C.textDark, align: "center", margin: 0,
    });
    s.addText("Filesystem · Git · DB\nShell · Browser · API", {
      x: 7.0, y: 2.4, w: 2.8, h: 0.8,
      fontSize: 13, fontFace: "Calibri", color: C.textMuted2, align: "center", margin: 0,
    });

    s.addText("⇄", { x: 3.0, y: 2.1, w: 0.75, h: 0.5, fontSize: 28, color: C.teal, align: "center", margin: 0 });
    s.addText("⇄", { x: 6.25, y: 2.1, w: 0.75, h: 0.5, fontSize: 28, color: C.teal, align: "center", margin: 0 });

    s.addText("Common MCP Servers", {
      x: 0.5, y: 3.8, w: 4, h: 0.35,
      fontSize: 16, fontFace: "Calibri", color: C.textDark, bold: true, margin: 0,
    });
    const mcps = [
      { name: "Filesystem", desc: "File read/write ops" },
      { name: "GitHub / Git", desc: "Repo and issue mgmt" },
      { name: "Postgres / SQLite", desc: "Database queries" },
      { name: "Puppeteer", desc: "Browser automation" },
      { name: "Slack / REST API", desc: "Messaging and API calls" },
      { name: "Docker / K8s", desc: "Container management" },
    ];
    mcps.forEach((mcp, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const mx = 0.5 + col * 3.2;
      const my = 4.25 + row * 0.52;
      s.addText(mcp.name, {
        x: mx, y: my, w: 1.4, h: 0.4,
        fontSize: 12, fontFace: "Calibri", color: C.tealDark, bold: true, margin: 0,
      });
      s.addText(mcp.desc, {
        x: mx + 1.4, y: my, w: 1.6, h: 0.4,
        fontSize: 11, fontFace: "Calibri", color: C.textMuted2, margin: 0,
      });
    });
  }

  // ========== SLIDE 12: MCP Demo ==========
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal },
    });

    s.addText("MCP Demo — Expanding AI Capabilities", {
      x: 0.7, y: 0.35, w: 8, h: 0.55,
      fontSize: 32, fontFace: "Arial Black", color: C.textDark, margin: 0,
    });

    // Before
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 1.2, w: 4.3, h: 3.5,
      fill: { color: "FFF1F2" },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 1.2, w: 4.3, h: 0.05, fill: { color: C.red },
    });
    s.addText("Without MCP", {
      x: 0.75, y: 1.4, w: 3.8, h: 0.3,
      fontSize: 15, fontFace: "Calibri", color: C.red, bold: true, margin: 0,
    });
    s.addText([
      { text: "AI only \"sees\" conversation text", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: "Calibri", color: C.textMuted2 } },
      { text: "Cannot directly access filesystem", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: "Calibri", color: C.textMuted2 } },
      { text: "Cannot execute shell commands", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: "Calibri", color: C.textMuted2 } },
      { text: "Cannot operate Git repos", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: "Calibri", color: C.textMuted2 } },
      { text: "Manual copy-paste required", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: "Calibri", color: C.textMuted2 } },
      { text: "Cannot verify output correctness", options: { bullet: true, fontSize: 13, fontFace: "Calibri", color: C.textMuted2 } },
    ], { x: 0.75, y: 1.8, w: 3.8, h: 2.6 });

    s.addText("→", {
      x: 4.5, y: 2.3, w: 0.8, h: 0.8,
      fontSize: 36, fontFace: "Arial Black", color: C.teal, align: "center", valign: "middle", margin: 0,
    });

    // After
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.2, y: 1.2, w: 4.3, h: 3.5,
      fill: { color: "F0FDFA" },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.2, y: 1.2, w: 4.3, h: 0.05, fill: { color: C.teal },
    });
    s.addText("With MCP", {
      x: 5.45, y: 1.4, w: 3.8, h: 0.3,
      fontSize: 15, fontFace: "Calibri", color: C.tealDark, bold: true, margin: 0,
    });
    s.addText([
      { text: "AI reads/writes project files directly", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: "Calibri", color: C.textMuted2 } },
      { text: "Execute shell commands to build & run", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: "Calibri", color: C.textMuted2 } },
      { text: "Git commit, branch, log operations", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: "Calibri", color: C.textMuted2 } },
      { text: "Query databases directly", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: "Calibri", color: C.textMuted2 } },
      { text: "Automated execution + verification", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: "Calibri", color: C.textMuted2 } },
      { text: "Dramatically expanded capabilities", options: { bullet: true, fontSize: 13, fontFace: "Calibri", color: C.textMuted2 } },
    ], { x: 5.45, y: 1.8, w: 3.8, h: 2.6 });

    s.addText("Demo: Connect Filesystem + Git MCP Servers in Windsurf, let AI operate the logdash project directly", {
      x: 0.5, y: 4.9, w: 9.2, h: 0.4,
      fontSize: 12, fontFace: "Calibri", color: C.textMuted2, italic: true, margin: 0,
    });
  }

  // ========== SLIDE 13: Comparison Table ==========
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal },
    });

    s.addText("PE vs CE vs HE — Capability Comparison", {
      x: 0.7, y: 0.35, w: 8, h: 0.65,
      fontSize: 36, fontFace: "Arial Black", color: C.textDark, margin: 0,
    });

    const headerOpts = { fill: { color: C.darkBg2 }, color: C.textLight, bold: true, fontSize: 12, fontFace: "Calibri", align: "center", valign: "middle" };
    const highlightCell = { fill: { color: C.teal, transparency: 88 }, color: C.tealDark, fontSize: 12, fontFace: "Calibri", align: "center", valign: "middle", bold: true };

    const headerRow = [
      { text: "Dimension", options: { ...headerOpts } },
      { text: "Prompt Eng.", options: { ...headerOpts } },
      { text: "Context Eng.", options: { ...headerOpts } },
      { text: "Harness Eng.", options: { ...headerOpts } },
    ];

    const data = [
      ["Completion Rate", "30-50%", "60-80%", "90%+"],
      ["Code Quality", "Unstable", "Fairly stable", "Highly consistent"],
      ["Rework Rate", "High", "Medium", "Low"],
      ["Learning Curve", "Low", "Medium", "Medium-High"],
      ["Reusability", "None", "Partial", "Fully reusable"],
      ["Scaling", "Individual", "Team-shared", "Org-level"],
    ];

    const rows = [headerRow];
    data.forEach((row, ri) => {
      rows.push(row.map((cell, ci) => {
        const isHighlight = ci === row.length - 1;
        if (ci === 0) {
          return { text: cell, options: { fill: { color: C.darkBg2 }, color: C.textLight, bold: true, fontSize: 12, fontFace: "Calibri", align: "center", valign: "middle" } };
        }
        return { text: cell, options: isHighlight ? { ...highlightCell } : { fill: { color: ri % 2 === 0 ? "F1F5F9" : C.cardBg }, color: C.textDark, fontSize: 12, fontFace: "Calibri", align: "center", valign: "middle" } };
      }));
    });

    s.addTable(rows, {
      x: 0.5, y: 1.3, w: 9.0,
      colW: [2.0, 2.33, 2.33, 2.33],
      rowH: [0.5, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42],
      border: { pt: 0.5, color: C.cardBorder },
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.5, w: 9.0, h: 0.7,
      fill: { color: "F0FDFA" },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.5, w: 0.06, h: 0.7, fill: { color: C.teal },
    });
    s.addText("Harness Engineering is not a replacement, but an evolution — building reusable tools and capability systems on top of PE and CE", {
      x: 0.8, y: 4.5, w: 8.5, h: 0.7,
      fontSize: 13, fontFace: "Calibri", color: C.tealDark, valign: "middle", margin: 0, italic: true,
    });
  }

  // ========== SLIDE 14: Best Practices ==========
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.blue },
    });

    s.addText("Best Practices — Investment Pyramid", {
      x: 0.7, y: 0.35, w: 8, h: 0.65,
      fontSize: 36, fontFace: "Arial Black", color: C.textDark, margin: 0,
    });
    s.addText("Build your AI development system bottom-up, step by step", {
      x: 0.7, y: 0.90, w: 8, h: 0.35,
      fontSize: 14, fontFace: "Calibri", color: C.textMuted2, margin: 0,
    });

    const pyramidLayers = [
      { label: "Rules", desc: "Set coding standards and project constraints", color: C.teal, w: 2.5, y: 4.1 },
      { label: "Skills", desc: "Encapsulate reusable expert agents", color: C.blue, w: 3.8, y: 3.2 },
      { label: "Workflows", desc: "Orchestrate multi-step automation", color: C.amber, w: 5.1, y: 2.3 },
      { label: "MCP", desc: "Connect external tools and data sources", color: C.tealDark, w: 6.4, y: 1.4 },
    ];

    pyramidLayers.forEach((layer) => {
      const cx = (10 - layer.w) / 2;
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: layer.y, w: layer.w, h: 0.7,
        fill: { color: layer.color },
      });
      s.addText(layer.label + ": " + layer.desc, {
        x: cx + 0.3, y: layer.y, w: layer.w - 0.6, h: 0.7,
        fontSize: 14, fontFace: "Calibri", color: C.textLight, valign: "middle", align: "center", margin: 0,
      });
    });

    s.addText("Key Principles", {
      x: 0.7, y: 4.9, w: 4, h: 0.35,
      fontSize: 16, fontFace: "Calibri", color: C.textDark, bold: true, margin: 0,
    });

    const principles = [
      "Don't automate everything — keep human judgment at critical decision points",
      "Start from real pain points, not technology for its own sake",
      "Share Rules/Skills across the team to build organizational knowledge",
    ];
    principles.forEach((p, i) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5 + i * 3.15, y: 5.05, w: 3.0, h: 0.42,
        fill: { color: C.cardBg },
      });
      s.addText(p, {
        x: 0.65 + i * 3.15, y: 5.05, w: 2.7, h: 0.42,
        fontSize: 10, fontFace: "Calibri", color: C.textMuted2, valign: "middle", margin: 0,
      });
    });
  }

  // ========== SLIDE 15: Q&A ==========
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };

    s.addShape(pres.shapes.OVAL, {
      x: -1.5, y: -1.5, w: 5, h: 5,
      fill: { color: C.teal, transparency: 85 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: 7.5, y: 3, w: 4.5, h: 4.5,
      fill: { color: C.blue, transparency: 88 },
    });

    s.addText("Q & A", {
      x: 0, y: 1.2, w: 10, h: 1.2,
      fontSize: 60, fontFace: "Arial Black", color: C.textLight, align: "center", margin: 0,
    });

    s.addShape(pres.shapes.LINE, {
      x: 3.5, y: 2.5, w: 3.0, h: 0,
      line: { color: C.teal, width: 3 },
    });

    s.addText("From Prompt to Harness — AI is not just a tool, it's your engineering partner", {
      x: 1, y: 2.9, w: 8, h: 0.6,
      fontSize: 18, fontFace: "Calibri", color: C.textMuted, align: "center", margin: 0,
    });

    s.addText("Start building your Harness today", {
      x: 1, y: 3.7, w: 8, h: 0.5,
      fontSize: 14, fontFace: "Calibri", color: C.teal, align: "center", margin: 0,
    });
  }

  // ========== Write File ==========
  await pres.writeFile({ fileName: "D:/Claude/AI_Sharing/AI_Getting_Started_with_AI_Tools.pptx" });
  console.log("PPT generated successfully: AI_Getting_Started_with_AI_Tools.pptx");
}

main().catch(err => { console.error(err); process.exit(1); });
