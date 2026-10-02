# Q for Developers — Landing Page Spec

A single static landing page for **Q for Developers** with one job: get developers to request early access. The form posts to the PrestoQ API, which saves the developer to the database, emails them a "we've received your request" confirmation and notifies the Presto team.

---

## 1. Deployment: GitHub Pages

The landing page **must be deployed via GitHub Pages**.

- Keep it a static site: plain HTML/CSS/JS, or a static build (Vite, Astro, Next `output: 'export'`, etc.) that outputs to a folder.
- Use a dedicated repo, e.g. `q-for-developers`, with the site at the repo root or in `/docs`.
- In **Settings → Pages**, either:
  - **Deploy from a branch**: `main`, folder `/` (or `/docs`), or
  - **GitHub Actions**: use the official `actions/deploy-pages` workflow if there's a build step.
- Custom domain (optional): add a `CNAME` file with the domain (e.g. `developers.prestoghana.com`), point a DNS `CNAME` record at `<org>.github.io`, then tick **Enforce HTTPS**.
- No server-side code runs on GitHub Pages. The form calls the API below directly from the browser.

---

## 2. Page content

| Section | Content |
|---|---|
| Hero | Headline (e.g. "Build on Q"), one-line value prop, **Request early access** button that scrolls to the form |
| What you can build | 3–4 cards: MCP server access, ordering and commerce APIs, WhatsApp agent tooling, business data |
| How it works | 3 steps: Request access → Get sandbox keys → Ship |
| Early access form | See section 3 |
| Footer | Presto links, contact email, © Presto Ghana |

Must work on mobile (from 360px wide) and meet basic accessibility: labelled inputs, visible focus states, enough colour contrast.

---

## 3. Early access form

### Fields

| Field | `name` | Required | Notes |
|---|---|---|---|
| Name | `name` | No | Max 120 chars |
| Email | `email` | **Yes** | Valid email, max 255 chars |
| Company | `company` | No | Max 120 chars |
| What do you want to build? | `use_case` | No | Textarea, max 2000 chars |
| *(honeypot)* | `website` | — | Hidden from people; must stay empty. See below |

### Honeypot

Include a hidden `website` input. Real users never see it, so they never fill it. Bots usually do, and the API silently drops those submissions. Hide it with CSS, **not** `type="hidden"`:

```html
<div style="position:absolute;left:-9999px" aria-hidden="true">
  <label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label>
</div>
```

### UX states

- **Idle** → **Submitting** (disable the button, show a spinner) → one of:
  - **Success** (`201`): "Thanks! We've received your request. Check your inbox for a confirmation."
  - **Already signed up** (`duplicate: true`): "You've already requested access. We'll be in touch."
  - **Validation error** (`400`): show `message` from the response next to the form.
  - **Network/server error**: "Something went wrong. Please try again."

---

## 4. API

**Base URL:** `https://qsandbox.prestoghana.com`

### `POST /developers/early-access`

Records an early access request from a developer.

**Headers**

```
Content-Type: application/json
```

**Request body**

```json
{
  "name": "Ama Mensah",
  "email": "ama@example.com",
  "company": "Mensah Labs",
  "use_case": "An MCP server that lets my POS sync orders with Q",
  "website": ""
}
```

| Field | Type | Required | Rules |
|---|---|---|---|
| `email` | string | yes | Valid email, ≤ 255 chars. Trimmed and lowercased |
| `name` | string | no | ≤ 120 chars |
| `company` | string | no | ≤ 120 chars |
| `use_case` | string | no | ≤ 2000 chars. What they want to build |
| `website` | string | no | Honeypot. Must be empty |

**Responses**

`201 Created`: new request

```json
{ "success": true, "duplicate": false, "email": "ama@example.com" }
```

`200 OK`: this email has already requested access (nothing is saved or emailed again)

```json
{ "success": true, "duplicate": true, "email": "ama@example.com" }
```

`400 Bad Request`: validation failed

```json
{ "success": false, "message": "Please enter a valid email address." }
```

Possible `message` values:
- `Please enter a valid email address.`
- `Name must be 120 characters or fewer.`
- `Company must be 120 characters or fewer.`
- `Please keep your use case under 2000 characters.`

**What happens on a new request**
1. It's saved to the `early_access_developers` table in the Presto database.
2. The developer gets a **"We've received your request — Q for Developers"** email that repeats their use case and says sandbox keys and API docs will follow.
3. The Presto team gets a **"New developer early access request"** email with all the details, sent to `CONTACT_FORM_RECIPIENT` (default `pay@prestoghana.com`).

If an email fails to send, the request is still saved and the API still returns `201`.

**CORS:** the API sends CORS headers for any origin, so calls from the GitHub Pages domain work with no proxy.

### cURL

```bash
curl -X POST https://qsandbox.prestoghana.com/developers/early-access \
  -H "Content-Type: application/json" \
  -d '{"name":"Ama Mensah","email":"ama@example.com","company":"Mensah Labs","use_case":"POS order sync"}'
```

---

## 5. Reference implementation

```html
<form id="early-access" novalidate>
  <label>Name <input name="name" maxlength="120" autocomplete="name"></label>
  <label>Email <input name="email" type="email" maxlength="255" required autocomplete="email"></label>
  <label>Company <input name="company" maxlength="120" autocomplete="organization"></label>
  <label>What do you want to build?
    <textarea name="use_case" maxlength="2000" rows="4"></textarea>
  </label>

  <div style="position:absolute;left:-9999px" aria-hidden="true">
    <label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label>
  </div>

  <button type="submit">Request early access</button>
  <p id="form-status" role="status" aria-live="polite"></p>
</form>

<script>
  const API_BASE = "https://qsandbox.prestoghana.com";
  const form = document.getElementById("early-access");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = form.querySelector("button");
    const data = Object.fromEntries(new FormData(form));

    if (!data.email || !form.email.checkValidity()) {
      status.textContent = "Please enter a valid email address.";
      return;
    }

    button.disabled = true;
    status.textContent = "Submitting…";

    try {
      const res = await fetch(`${API_BASE}/developers/early-access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();

      if (!res.ok || !body.success) {
        status.textContent = body.message || "Something went wrong. Please try again.";
        return;
      }

      status.textContent = body.duplicate
        ? "You've already requested access. We'll be in touch."
        : "Thanks! We've received your request. Check your inbox for a confirmation.";
      form.reset();
    } catch {
      status.textContent = "Something went wrong. Please try again.";
    } finally {
      button.disabled = false;
    }
  });
</script>
```

---

## 6. Launch checklist

- [ ] Site deployed on GitHub Pages and loads over HTTPS
- [ ] Custom domain (if any) set up, with HTTPS enforced
- [ ] Test request from the live page returns `201` and shows the success state
- [ ] "We've received your request" email arrives in the test inbox
- [ ] Presto team notification email arrives
- [ ] Row appears in `early_access_developers`
- [ ] Submitting the same email again shows the "already requested" state
- [ ] Bad email shows the validation message
- [ ] Hidden honeypot field is not visible or reachable by keyboard
- [ ] Page works at 360px wide and on desktop
