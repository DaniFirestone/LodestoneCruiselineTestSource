// meta.ts — Data-driven style maps. These hold the per-system colors that vary
// at runtime, so they can't be expressed as static Tailwind classes; components
// apply them via inline `style`.

// Source chip colors (from shared.jsx).
export const SRC_META: Record<string, { label: string; c: string; bg: string }> = {
  timatic: { label: 'TIMATIC', c: '#155e75', bg: '#ecfeff' },
  cm2000: { label: 'CM2000', c: '#1e3a8a', bg: '#eff6ff' },
  fidelio: { label: 'Fidelio', c: '#6d28d9', bg: '#f5f3ff' },
  sabre: { label: 'SABRE', c: '#831843', bg: '#fdf2f8' },
  siebel: { label: 'Siebel', c: '#6d28d9', bg: '#f5f3ff' },
  mapics: { label: 'MAPICS', c: '#3f3f46', bg: '#f4f4f5' },
  oxr: { label: 'OXR', c: '#0f766e', bg: '#f0fdfa' },
  native: { label: 'Native', c: '#78350f', bg: '#fffbeb' },
};

// Per system-style surface + accent border (from catalog.jsx).
export const SYS_STYLE: Record<string, { caps: boolean; surface: string; borderTop: string }> = {
  mainframe: { caps: true, surface: '#FAFAF8', borderTop: '#1e3a8a' },
  tpf: { caps: true, surface: '#FAFAF8', borderTop: '#831843' },
  as400: { caps: true, surface: '#FAFAF8', borderTop: '#3f3f46' },
  oracle: { caps: false, surface: '#FFFFFF', borderTop: '#6d28d9' },
  modern: { caps: false, surface: '#FFFFFF', borderTop: '#78350f' },
};

// Source classification — legacy of record / external reference / native.
export const SYS_KIND: Record<string, string> = {
  cm2000: 'legacy', fidelio: 'legacy', sabre: 'legacy',
  siebel: 'legacy', mapics: 'legacy',
  timatic: 'external', oxr: 'external',
  native: 'native',
};

export const KIND_META: Record<string, { label: string; c: string }> = {
  legacy: { label: 'Legacy', c: '#5f5e5a' },
  external: { label: 'External', c: '#5f5e5a' },
  native: { label: 'Native', c: '#92400e' },
};
