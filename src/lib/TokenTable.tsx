import type { CSSProperties } from 'react';

/**
 * A single row in a component's "Tokens used" doc table.
 *
 * `cssVar` is the theme-agnostic alias the utility resolves to (from
 * src/tokens/tokens.theme.css), e.g. `--packt-brand-bg-selected`. The table
 * renders the light and dark values by resolving that alias inside nested
 * `data-theme` wrappers, so the swatches are always accurate — no hardcoded
 * hex values — and stay correct even as the tokens change in Figma.
 */
export interface TokenRow {
  /** What the token styles, e.g. "Surface" or "Active fill". */
  property: string;
  /** The Tailwind utility that applies it, e.g. `bg-brand-bg-selected`. */
  utility: string;
  /** The theme-agnostic alias variable the utility resolves to. */
  cssVar: string;
}

const cell: CSSProperties = { padding: '9px 14px' };

function Swatch({ theme, cssVar }: { theme: 'light' | 'dark'; cssVar: string }) {
  return (
    <span data-theme={theme} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          flexShrink: 0,
          background: `var(${cssVar})`,
          boxShadow: 'inset 0 0 0 1px rgba(128, 128, 128, 0.4)',
        }}
      />
      <code style={{ fontSize: 11, color: 'var(--packt-neutral-500)' }}>
        {cssVar.replace('--packt-', `--packt-${theme}-`)}
      </code>
    </span>
  );
}

/**
 * Renders a component's colour tokens with live light + dark swatches.
 * Used inside component MDX docs — see any `*.mdx` "Tokens used" section.
 */
export function TokenTable({ rows }: { rows: TokenRow[] }) {
  return (
    <div
      style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: 12,
        border: '1px solid rgba(128, 128, 128, 0.25)',
        borderRadius: 8,
        overflow: 'hidden',
        margin: '16px 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          background: 'var(--packt-neutral-700)',
          color: 'var(--packt-neutral-white)',
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        <span style={{ ...cell, flex: '0 0 180px' }}>Property</span>
        <span style={{ ...cell, flex: '0 0 190px' }}>Utility</span>
        <span style={{ ...cell, flex: 1 }}>Light</span>
        <span style={{ ...cell, flex: 1 }}>Dark</span>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.property}
          style={{
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid rgba(128, 128, 128, 0.18)',
            background: i % 2 ? 'rgba(128, 128, 128, 0.05)' : 'transparent',
          }}
        >
          <span style={{ ...cell, flex: '0 0 180px', fontWeight: 500 }}>{row.property}</span>
          <span style={{ ...cell, flex: '0 0 190px' }}>
            <code style={{ fontSize: 11 }}>{row.utility}</code>
          </span>
          <span style={{ ...cell, flex: 1 }}>
            <Swatch theme="light" cssVar={row.cssVar} />
          </span>
          <span style={{ ...cell, flex: 1 }}>
            <Swatch theme="dark" cssVar={row.cssVar} />
          </span>
        </div>
      ))}
    </div>
  );
}
