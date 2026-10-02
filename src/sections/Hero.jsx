import { useState } from 'react'

const codeExample = `curl -X POST https://api.prestoghana.com/v1/mcp/connect \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_id": "wa_agent_gh_01",
    "capabilities": ["commerce", "inventory"],
    "stream": true
  }'`

export default function Hero() {
  // This state changes the copy button label after the code is copied.
  const [copied, setCopied] = useState(false)

  // Copy the sample command so a developer can try it in a terminal.
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(codeExample)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    // The hero introduces Q and shows a sample API request.
    <section className="hero-section">
      <div className="hero-section__inner page-wrap">
        <div className="hero-copy">
          <div className="preview-badge"><span /> v1.0 Public Developer Preview</div>
          <h1>Build on <span>Q</span></h1>
          <p className="hero-copy__intro">
            Build powerful applications with access to Q's APIs, tools, and business
            infrastructure designed for high-performance engineering teams.
          </p>
          <div className="hero-copy__links">
            <a className="button" href="#early-access">Request early access <span aria-hidden="true">→</span></a>
            <a className="button button--secondary" href="#docs">Explore Docs</a>
          </div>
          <div className="hero-benefits">
            <span><b aria-hidden="true">✓</b> Zero latency edge routing</span>
            <span><b aria-hidden="true">✓</b> Sandbox instant provisioning</span>
          </div>
        </div>

        <div className="code-card" id="docs">
          <div className="code-card__top">
            <div className="code-card__dots" aria-hidden="true"><i /><i /><i /></div>
            <span>POST /v1/mcp/connect</span>
            <button className="copy-button" type="button" onClick={copyCode}>
              {copied ? 'Copied' : 'Copy code'}
            </button>
          </div>
          <pre><code>{codeExample}</code></pre>
          <div className="code-card__bottom"><span>● &nbsp;200 OK (14ms)</span><span>JSON</span></div>
        </div>
      </div>
    </section>
  )
}
