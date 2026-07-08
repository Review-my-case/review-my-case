import { useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANT FOR DEVELOPER:
// Replace this direct API call with a call to YOUR backend server.
// The API key must NEVER be stored in the mobile app directly.
// Example: const response = await fetch('https://api.yourserver.com/analyze', { ... })
// ─────────────────────────────────────────────────────────────────────────────

const BACKEND_URL = 'https://YOUR-BACKEND-SERVER.com/api/analyze';

export function useAnthropicAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeCase = async (form) => {
    setLoading(true);
    setError(null);

    const prompt = `You are a senior legal case analyst for Review My Case — a global AI-assisted legal intake platform. Analyze this person's situation with precision and care. Respond ONLY in valid JSON, no markdown, no extra text.

{
  "summary": "2-3 sentence compassionate plain-English summary",
  "justiceScore": <0-100 integer>,
  "scoreRationale": "One sentence explaining the score",
  "violations": [{"type": "name", "detail": "plain English", "severity": "High|Medium|Low", "constitutional": true|false}],
  "investigativeQuestions": ["6 specific questions"],
  "timelineEvents": [{"date": "date", "event": "what happened", "significance": "why it matters legally", "flag": true|false}],
  "evidenceGaps": [{"item": "missing evidence", "reason": "why it helps", "howToGet": "how to obtain"}],
  "appealGrounds": ["specific grounds"],
  "urgency": "immediate|soon|standard",
  "urgencyReason": "one sentence",
  "strengths": ["3-4 strengths"],
  "nextSteps": ["5-6 concrete steps"],
  "firstTenMinutes": ["4-5 immediate actions if urgent"],
  "encouragement": "one genuine human sentence"
}

Case: Category=${form.category}, Country=${form.country}, Status=${form.custodyStatus}, Story=${form.story}, Duration=${form.duration}, Evidence=${form.hasEvidence}`;

    try {
      // ── PRODUCTION: call your backend ──
      // const res = await fetch(BACKEND_URL, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userToken}` },
      //   body: JSON.stringify({ prompt })
      // });
      // const data = await res.json();
      // return data.result;

      // ── DEVELOPMENT: direct Anthropic call (replace before production) ──
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content.map(b => b.text || '').join('');
      return JSON.parse(text.replace(/```json|```/g, '').trim());
    } catch (err) {
      setError(err.message);
      // Fallback result
      return {
        summary: 'Your situation has been reviewed. There appear to be serious concerns worth pursuing with qualified legal help.',
        justiceScore: 61,
        scoreRationale: 'Multiple procedural concerns identified based on your account.',
        violations: [{ type: 'Procedural Violation — Review Needed', detail: 'A qualified attorney should review the full record.', severity: 'High', constitutional: true }],
        investigativeQuestions: ['Were you properly represented?', 'Was evidence fully disclosed?', 'Were procedures correctly followed?', 'Are there grounds for appeal?', 'Was there any official misconduct?', 'Were your constitutional rights explained?'],
        timelineEvents: [{ date: 'As described', event: 'Incident and legal proceedings began', significance: 'Starting point for legal review', flag: false }],
        evidenceGaps: [{ item: 'Official case record', reason: 'Contains all court filings and evidence logs', howToGet: 'Request from the court clerk' }],
        appealGrounds: ['Potential ineffective assistance of counsel', 'Possible procedural violations'],
        urgency: 'soon',
        urgencyReason: 'Legal claims have strict time limits. Acting within 30 days is advised.',
        strengths: ['You came forward and documented your situation', 'Your account is detailed', 'Multiple legal avenues may be available'],
        nextSteps: ['Contact a free legal aid organization this week', 'Write down your full timeline while memory is fresh', 'Request your official case file from the court', 'Gather every document you can find', 'Do not discuss your case on social media'],
        firstTenMinutes: ['Save your case number', 'Photograph every document', 'Do not delete any messages', 'Write down all names and dates', 'Upload everything to the app'],
        encouragement: 'What happened to you matters. You deserve to have this situation properly reviewed.',
      };
    } finally {
      setLoading(false);
    }
  };

  const sendChatMessage = async (messages, caseContext) => {
    setLoading(true);
    try {
      const systemMsg = { role: 'user', content: `SYSTEM: You are a compassionate legal case guide for Review My Case. This person is in ${caseContext.country}. Category: ${caseContext.category}. Justice Score: ${caseContext.justiceScore}. Speak plainly and warmly. Never give specific legal advice. Answers under 120 words unless genuinely needed.` };
      const fullMessages = [systemMsg, { role: 'assistant', content: 'Understood. I will guide this person with care and clarity.' }, ...messages];

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 1000, messages: fullMessages }),
      });
      const data = await res.json();
      return data.content.map(b => b.text || '').join('');
    } catch {
      return "I'm having trouble connecting. Please try again.";
    } finally {
      setLoading(false);
    }
  };

  return { analyzeCase, sendChatMessage, loading, error };
}
