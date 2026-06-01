/** @jsxImportSource react */
// Shared.tsx — source chips + mono values + key/kind badges used by the catalog view.
import type { Cell } from './data';
import { SRC_META, KIND_META } from './meta';

export function Chip({ source, size }: { source: string; size?: 'lg' }) {
  const m = SRC_META[source] || { label: source, c: '#374151', bg: '#f3f4f6' };
  return (
    <span
      // bg/color are per-source data → inline; layout is Tailwind.
      style={{ backgroundColor: m.bg, color: m.c }}
      className={[
        'inline-block rounded-[2px] font-mono font-bold uppercase tracking-[0.05em] leading-[1.7] shrink-0',
        size === 'lg' ? 'px-2 py-0.5 text-[11px]' : 'px-[5px] py-px text-[10px]',
      ].join(' ')}
    >
      {m.label}
    </span>
  );
}

export function Mono({
  children,
  dim,
  bold,
  size,
}: {
  children: React.ReactNode;
  dim?: boolean;
  bold?: boolean;
  size?: 'lg' | 'xl';
}) {
  return (
    <span
      className={[
        'font-mono',
        size === 'lg' ? 'text-[15px]' : size === 'xl' ? 'text-[22px]' : 'text-[12px]',
        dim ? 'text-text-muted' : '',
        bold ? 'font-semibold' : 'font-normal',
      ].join(' ')}
    >
      {children}
    </span>
  );
}

export function KeyBadge({ kind }: { kind?: string }) {
  // PK is already shown in the table card header — only emit FK/IX here to reduce noise.
  if (!kind || kind === 'pk') return null;
  const m =
    kind === 'fk'
      ? { l: 'FK', c: '#1e40af', bg: '#dbeafe' }
      : { l: 'IX', c: '#374151', bg: '#e5e7eb' };
  return (
    <span
      style={{ backgroundColor: m.bg, color: m.c }}
      className="ml-[5px] inline-block rounded-[2px] px-[3px] font-mono text-[8.5px] font-bold tracking-[0.05em] align-middle"
    >
      {m.l}
    </span>
  );
}

export function KindTag({ kind }: { kind?: string }) {
  const m = KIND_META[kind ?? ''] || KIND_META.legacy;
  return (
    <span
      style={{ color: m.c }}
      className="font-mono text-[9.5px] font-bold tracking-[0.08em] uppercase"
    >
      {m.label}
    </span>
  );
}

export function renderCell(value: Cell) {
  if (value === null || value === undefined) {
    return <span className="italic text-text-muted">NULL</span>;
  }
  return String(value);
}
