// ─── REVIEW MY CASE — DESIGN TOKENS ─────────────────────────────────────────
// These are the authoritative color values for the entire app.
// Never change these without product owner approval — they are the brand identity.

export const T = {
  // Backgrounds
  bg:           '#07070f',
  surface:      '#0d0d1c',
  surfaceHigh:  '#13132a',

  // Borders
  border:       '#1a1a35',
  borderHigh:   '#24243f',

  // Gold — PRIMARY BRAND COLOR. Used for CTAs, active states, Justice Score
  gold:         '#c9a84c',
  goldLight:    '#f0d585',
  goldDim:      '#c9a84c18',
  goldGlow:     '#c9a84c33',

  // Status colors
  emerald:      '#10b981',   // High Justice Score / positive
  emeraldDim:   '#10b98115',
  amber:        '#f59e0b',   // Medium / warning
  amberDim:     '#f59e0b15',
  red:          '#ef4444',   // Urgent / low score / danger
  redDim:       '#ef444418',

  // Accent colors (secondary use only — category tags, etc.)
  purple:       '#6d4fc2',
  purpleLight:  '#9d7fe8',
  purpleDim:    '#6d4fc215',
  blue:         '#60a5fa',
  blueDim:      '#60a5fa15',
  pink:         '#f472b6',

  // Text
  textPrimary:   '#eeeeff',
  textSecondary: '#7777aa',
  textMuted:     '#3a3a5a',
};

// Typography scale
export const FONT = {
  hero:    { fontSize: 40, fontWeight: '900', letterSpacing: -2, lineHeight: 44 },
  h1:      { fontSize: 28, fontWeight: '800', letterSpacing: -1 },
  h2:      { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  h3:      { fontSize: 17, fontWeight: '700' },
  body:    { fontSize: 15, fontWeight: '400', lineHeight: 24 },
  bodyMd:  { fontSize: 14, fontWeight: '400', lineHeight: 22 },
  label:   { fontSize: 11, fontWeight: '700', letterSpacing: 1.2 },
  caption: { fontSize: 12, fontWeight: '400' },
};

// Border radius
export const RADIUS = {
  sm:   8,
  md:   12,
  lg:   14,
  xl:   20,
  pill: 100,
};

// Spacing
export const SPACE = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
};
