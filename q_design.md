# Q for Developers: Design System

This file is the single source of truth for how the site looks and behaves.
Before building anything, check here. If something is not covered, add it here first.

**Principles:** clarity over decoration, usability over trends, simplicity over complexity, consistency over novelty.

**The test for every element:** does it help the user understand, navigate, or finish a task? If not, remove it.

---

## 1. Tokens

Never type a raw color, size or spacing value in a component. Always use a token.

```css
:root {
  /* Color (light) */
  --bg: #ffffff;            /* page background */
  --surface: #f5f5f7;       /* code blocks only */
  --text: #1d1d1f;          /* main text */
  --muted: #6e6e73;         /* secondary text */
  --line: #d2d2d7;          /* hairline dividers */
  --field-border: #86868b;  /* input borders (3:1 contrast) */
  --accent: #4f46e5;        /* the ONE brand color */
  --accent-hover: #4338ca;
  --on-accent: #ffffff;     /* text on accent */
  --success: #177245;       /* form success only */
  --error: #c62828;         /* form errors only */

  /* Type */
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;

  /* Shape and space */
  --radius: 8px;            /* every control uses this one radius */
  --section-space: 112px;   /* 72px under 560px wide */
}

/* Dark: same names, different values */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #141416;  --surface: #1d1d20;  --text: #f5f5f7;  --muted: #a1a1a6;
    --line: #3a3a3f;  --field-border: #6e6e73;  --accent: #8e90ff;
    --accent-hover: #a3a5ff;  --on-accent: #0f0f14;
    --success: #5bd68a;  --error: #ff8a80;
  }
}
```

### Color rules

| Token | Use it for | Never use it for |
|---|---|---|
| `--accent` | Primary buttons, links, focus ring | Decoration, icons, backgrounds, gradients |
| `--success` | The form success message | Checkmarks, badges, decoration |
| `--error` | Form errors | Anything that is not an error |
| `--muted` | Descriptions, notes, captions | Important actions or required info |
| `--surface` | Code blocks | Cards (we do not use cards) |

- One accent color only. No cyan, no second brand color.
- No gradients, no glow, no glassmorphism, no heavy shadows.
- Text on background must stay readable (at least 4.5:1). Check any new color before adding it.

---

## 2. Typography

**Inter** for all text. **JetBrains Mono** only inside code blocks and inline code.

| Role | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|
| h1 (hero) | `clamp(2.75rem, 7vw, 4.5rem)` (44 to 72px) | 700 | 1.05 | -0.03em |
| h2 (section) | `clamp(1.75rem, 3.5vw, 2.25rem)` (28 to 36px) | 700 | 1.15 | -0.02em |
| h3 (item title) | 1.0625rem (17px) | 600 | 1.3 | normal |
| Body | 1.0625rem (17px) | 400 | 1.5 | normal |
| Lead (under h1) | 1.1875rem (19px) | 400 | 1.5 | normal |
| Small (notes, footer) | 0.875rem (14px) | 400 | 1.5 | normal |
| Code | 0.8125rem (13px) | 400 | 1.7 | normal |

Rules:
- Load only the weights you use: Inter 400, 500, 600, 700 and JetBrains Mono 400.
- Maximum line length is about 60 characters. Use `max-width` in `ch` on paragraphs (for example `52ch`).
- Sentence case everywhere. No ALL CAPS labels, no eyebrow text above headings.
- Never highlight one word in a heading with a different color or style.
- Minimum text size is 14px, except code at 13px.

---

## 3. Spacing and layout

- Base unit is 8px. Use multiples: 8, 12, 16, 20, 24, 32, 40, 48, 64, 72, 96, 112.
- **Container:** `max-width: 1040px`, centered, side padding 24px (20px under 560px).
- **Sections:** 112px top and bottom (72px on mobile), separated by a 1px `--line` border on top. Do not alternate background colors.
- **Section layout:** a split grid.
  - Desktop (880px and up): heading column 280px, content column 1fr, gap 64px.
  - Below 880px: stacked, gap 40px. Heading first, then content.
- **Alignment:** everything is left-aligned. Do not center text blocks.
- **Hero** is the one exception to the split: stacked, with 96px top and 88px bottom padding (56px on mobile).

### Breakpoints

| Name | Width | What changes |
|---|---|---|
| Mobile | under 560px | Buttons full width, padding 20px, section space 72px, form fields stack |
| Small tablet | under 720px | Header nav links hidden |
| Tablet | 640px and up | Capability list becomes 2 columns |
| Desktop | 880px and up | Split layout: heading left, content right |

Test at 360px, 390px, tablet, laptop and a large desktop.

---

## 4. Components

### Button

One shape, one primary style. Two sizes.

| Property | Value |
|---|---|
| Height | 44px minimum (40px for the small header button) |
| Padding | 0 20px (0 16px small) |
| Radius | `--radius` |
| Font | Inter 600, 16px (15px small) |
| Primary | Background `--accent`, text `--on-accent` |

| State | Behavior |
|---|---|
| Default | Accent background |
| Hover | Background `--accent-hover`, no underline |
| Focus | 2px solid `--accent` outline, 2px offset |
| Active | Moves down 1px |
| Disabled | 60% opacity, `cursor: not-allowed` |
| Loading | Disabled, label changes to "Sending request…" (no spinner) |

Rules:
- One primary button per view area. A second action is a plain text link, not a second button.
- Button text says what happens: "Request early access", not "Submit".
- No arrows or icons in button text.
- On mobile, buttons in the hero and in forms are full width.

### Link

- Color `--accent`, no underline by default, underline on hover (3px offset).
- Link text describes the destination: "MCP specification", not "Click here".
- Nav and footer links use `--muted` and change to `--text` on hover.

### Header

- Sticky at the top, 64px tall, solid `--bg` background, 1px `--line` bottom border.
- No blur, no transparency, no shadow.
- Left: wordmark "Q for Developers" (600 weight, `--text`).
- Middle/right: 3 text links (15px, `--muted`), 32px apart.
- Far right: one small primary button, "Request early access".
- Under 720px: hide the nav links and keep the wordmark and button.
- Do not add an avatar or login icon until login exists.
- Anchor targets need `scroll-padding-top` so the sticky header does not cover them.

### Hero

- h1, one lead sentence (muted), one primary button, one text link, one small note.
- The only extra element is the real API request in a code block.
- No badges, no pulsing dots, no gradient text, no unverifiable claims ("zero latency").

### Capability list (replaces cards)

- A list in 2 columns from 640px up, 1 column below. Gap 40px (rows) and 48px (columns).
- Each item has a 1px `--line` top border, 20px padding above, an h3, a muted description and one text link.
- No icons, no background, no radius, no hover animation.

### Steps (How it works)

- An ordered list. Numbers are allowed here because the content is a real sequence.
- Each row has a 1px `--line` top border and 24px vertical padding.
- Number in a 40px left column (`--muted`, 600 weight, tabular numbers). Title (h3) and one sentence on the right.

### Code block

- Background `--surface`, 1px `--line` border, `--radius`.
- Top bar with a plain label on the left ("Connect an agent") and a text "Copy" button on the right.
- Copy button changes to "Copied" for 2 seconds. On failure it says "Copy failed". Never use `alert()`.
- Code in JetBrains Mono 13px, no syntax colors, horizontal scroll if too wide.
- Only show code that is real. Use `YOUR_API_KEY`, never a fake-looking token. No fake metrics like "200 OK (14ms)".

### Form

- One column, maximum width 520px, 20px gap between fields.
- Label above every field, 15px, 600 weight. "(optional)" in normal weight and `--muted`.
- Only the email field is required.
- Name and Company sit side by side from 560px up, stacked below.
- Submit button is the last element. A status message sits below it.

**Input / textarea**

| Property | Value |
|---|---|
| Padding | 12px 14px |
| Font | Inter 16px (stops iOS zooming) |
| Border | 1px `--field-border` |
| Radius | `--radius` |
| Background | `--bg` |
| Placeholder | `--muted` |
| Focus | 2px `--accent` outline (never remove it) |
| Error | Border `--error` and `aria-invalid="true"` |

**Field error:** a line below the field, 14px, `--error`, linked with `aria-describedby`. Say what to do: "Enter a valid email address, for example you@company.com."

**Status message** (below the button, `role="status"`):
- A 3px colored left rule, 14px left padding, plain text in `--text`. No filled box, no icon.
- Success (`--success`): "You're on the list. We'll email your sandbox keys to {email}."
- Already registered (`--text`): "This email is already on the list. Check your inbox for your sandbox keys."
- Error (`--error`): "The request failed. Try again, or email support@prestoghana.com."
- Set message text with `textContent`, never `innerHTML`.
- A network failure is always an error. Never show success unless the server said so.
- Include a hidden honeypot field (`display: none`) and ignore submissions that fill it.

### Footer

- 1px `--line` top border, 40px vertical padding, 14px `--muted` text.
- Left: "© {current year} Presto Ghana. Q for Developers." Calculate the year, never hard-code it.
- Right: Privacy, Terms, API status.

---

## 5. Accessibility checklist

- Every interactive element is reachable by keyboard and has a visible focus ring.
- Include a "Skip to content" link as the first focusable element.
- One `h1` per page, headings in order (h1, h2, h3).
- Landmarks: `header`, `nav` (with `aria-label`), `main`, `footer`.
- Every input has a `<label for>`. Placeholders never replace labels.
- Status and error messages are announced (`role="status"` or `aria-live`).
- Icon fonts and decorative icons get `aria-hidden="true"`. We avoid icons where possible.
- Never use color alone to show meaning. The message text always says it too.
- Tap targets are at least 40px tall (44px for main actions).
- Respect `prefers-reduced-motion`: smooth scrolling only when motion is allowed.
- Never use a link with `href="#"` as a real navigation item. Link to a real anchor or URL.

---

## 6. Motion

Only use motion that shows a state change: button hover color (150ms), button press (1px), copy confirmation. No scroll animations, no fade-ins, no hover scaling, no pulsing.

---

## 7. Copy rules

- Plain words, active voice, sentence case.
- Name things by what users do, not how the system works.
- Buttons and links say exactly what happens. Keep the same name through a flow.
- Errors say what went wrong and how to fix it. They never apologize or stay vague.
- Do not claim anything we cannot prove (speed, uptime, scale).

---

## 8. Do and don't

| Do | Don't |
|---|---|
| Use tokens for every value | Type raw hex or pixel values in components |
| One accent color | Add a new color to make it "interesting" |
| Lists with hairlines | Cards, icon tiles, or shadows |
| Left-aligned text | Centered paragraphs |
| Real code and real content | Fake tokens, fake metrics, fake dashboards |
| Real links | `href="#"` placeholders in production |
| `textContent` for user input | `innerHTML` with user input |
| Design all states (default, hover, focus, active, disabled, loading, success, error) | Only design the perfect screenshot |

---

## 9. How to use this file

1. Before building a component, read its section here.
2. Copy the tokens from section 1 into your global CSS (or your `tailwind.config.js` under `theme.extend`).
3. If you need something new (a new component, a new color), decide it here first, then build it.
4. In pull requests, check the work against sections 4 and 5.
5. Keep this file at the repo root, or in `docs/DESIGN.md`, so every developer finds it.
