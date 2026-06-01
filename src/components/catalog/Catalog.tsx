/** @jsxImportSource react */
// Catalog.tsx — Source Catalog view. Reads PROCESSES + SOURCE_SYSTEMS + TENANT from data.ts.
// Renders the mocked cruise-line DBs organised by process, sub-organised by source system.
// Has a Streamline | Detail toggle (default Streamline) — Streamline shows only core schema info.
import { Fragment, useEffect, useRef, useState } from 'react';
import {
  TENANT,
  TRACE,
  FLEET,
  PORTS,
  SOURCE_SYSTEMS,
  PROCESSES,
  type Block,
  type Cell,
  type Process,
  type Table,
} from './data';
import { SRC_META, SYS_STYLE, SYS_KIND } from './meta';
import { Chip, Mono, KeyBadge, KindTag, renderCell } from './Shared';

type SysStyle = (typeof SYS_STYLE)[string];

// ── JSON Modal ────────────────────────────────────────────────────────────────
function JsonModal({ onClose }: { onClose: () => void }) {
  const data = { TENANT, FLEET };
  return (
    <div className="fixed inset-0 bg-black/50 z-10 flex items-center justify-center" onClick={onClose}>
      <div className="bg-surface rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="font-semibold text-lg">Company & Fleet Data</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <pre className="p-6 text-sm text-text-sub bg-bg">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}


// ── Table card ────────────────────────────────────────────────────────────────
function TableCard({
  table,
  sysStyle,
  isTraced,
}: {
  table: Table;
  sysStyle: SysStyle;
  isTraced: boolean;
}) {
  const [open, setOpen] = useState(!!isTraced);

  return (
    <div className="bg-surface border border-border rounded-[4px] overflow-hidden flex flex-col">
      {/* Accordion header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        // sysStyle.surface is data-driven; the open border is static but lives here to
        // override the button's reset border cleanly.
        style={{
          backgroundColor: sysStyle.surface,
          borderBottom: open ? '1px solid var(--color-border)' : 'none',
        }}
        className="cursor-pointer text-left w-full px-[14px] py-[10px] flex flex-col gap-1 border-0"
      >
        <div className="flex items-center gap-[10px] flex-wrap">
          <span
            className={`inline-block w-[10px] font-mono text-[10px] text-text-muted transition-transform duration-[120ms] ${
              open ? 'rotate-90' : 'rotate-0'
            }`}
          >
            ▸
          </span>
          <span className="font-mono text-[12.5px] font-bold text-text">{table.name}</span>
          <span className="font-mono text-[9px] font-semibold tracking-[0.06em] text-[#92400e] bg-[#fef3c7] px-[5px] py-px rounded-[2px]">
            PK · {table.pk}
          </span>
          <span className="font-mono text-[10px] text-text-muted">
            {table.columns.length} cols · {table.rows.length} rows
          </span>
          {isTraced && (
            <span className="ml-auto font-mono text-[9px] font-bold tracking-[0.08em] text-[#92400e] bg-[#fef3c7] px-[6px] py-0.5 rounded-[2px]">
              TRACE
            </span>
          )}
        </div>
        {table.desc && (
          <div className="text-[11.5px] text-text-sub leading-[1.5] pl-5">{table.desc}</div>
        )}
      </button>

      {/* Schema + sample rows */}
      {open && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-mono text-[11px] text-text">
            <thead>
              <tr className="bg-surface2 border-b border-border">
                {table.columns.map((col) => (
                  <th
                    key={col.n}
                    className="px-[12px] py-[6px] text-left font-semibold whitespace-nowrap text-text border-r border-border"
                  >
                    <div className="flex items-center gap-0.5">
                      <span>{col.n}</span>
                      <KeyBadge kind={col.k} />
                    </div>
                    <div className="font-normal text-[9px] text-text-muted mt-px tracking-[0.03em]">
                      {col.t}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => (
                <tr
                  key={i}
                  className={`${
                    i < table.rows.length - 1 ? 'border-b border-border' : ''
                  } ${i % 2 === 1 ? 'bg-black/[0.012]' : ''}`}
                >
                  {row.map((cell: Cell, j) => (
                    <td
                      key={j}
                      className="px-[12px] py-[6px] whitespace-nowrap border-r border-border text-text"
                    >
                      {renderCell(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── System block — wraps tables for one source system within a process ─────────
function SystemBlock({ block, detail }: { block: Block; detail: boolean }) {
  const sys = SOURCE_SYSTEMS[block.system];
  const sysStyle = SYS_STYLE[sys.style] || SYS_STYLE.modern;

  // Streamline: one compact card per system. Just identity + table-name list.
  if (!detail) {
    return (
      <div
        style={{ borderLeft: `3px solid ${sysStyle.borderTop}` }}
        className="bg-surface border border-border rounded-[3px] px-[14px] py-[10px] flex flex-col gap-1.5"
      >
        <div className="flex items-center gap-[10px] flex-wrap">
          <Chip source={sys.id} size="lg" />
          <span className="text-[13px] font-semibold text-text">{sys.name}</span>
          <KindTag kind={SYS_KIND[sys.id]} />
          <span className="ml-auto text-[11px] font-mono text-text-muted">
            {block.tables.length} table{block.tables.length === 1 ? '' : 's'}
          </span>
        </div>
        <div className="font-mono text-[11px] text-text-sub flex flex-wrap gap-x-[10px] gap-y-0.5">
          {block.tables.map((t, i) => (
            <Fragment key={t.name}>
              {i > 0 && <span className="text-text-muted">·</span>}
              <span>{t.name}</span>
            </Fragment>
          ))}
        </div>
      </div>
    );
  }

  // Detail: full banner + cards.
  return (
    <div className="flex flex-col gap-[14px]">
      {/* System banner */}
      <div
        style={{ borderLeft: `3px solid ${sysStyle.borderTop}` }}
        className="bg-surface border border-border rounded-[3px] px-[16px] py-[12px] flex items-center gap-[14px] flex-wrap"
      >
        <Chip source={sys.id} size="lg" />
        <div className="flex flex-col gap-px">
          <div className="flex items-baseline gap-2">
            <span className="text-[13px] font-semibold text-text">{sys.name}</span>
            <KindTag kind={SYS_KIND[sys.id]} />
          </div>
          <div className="text-[10.5px] text-text-muted">
            {sys.vendor} · since {sys.since}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4 text-[11px] text-text-sub">
          <div className="flex flex-col">
            <span className="text-[9px] text-text-muted tracking-[0.06em] uppercase">Interface</span>
            <span className="font-mono text-[11px]">{sys.interface}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-text-muted tracking-[0.06em] uppercase">Auth</span>
            <span className="font-mono text-[11px]">{sys.auth}</span>
          </div>
        </div>
      </div>

      {/* Role note */}
      <div className="text-[11.5px] text-text-sub px-1 italic">{block.role}</div>

      {/* Table cards */}
      <div className="flex flex-col gap-2.5">
        {block.tables.map((t) => {
          const isTraced = TRACE.refs.some((r) => r.system === sys.id && r.label === t.name);
          return <TableCard key={t.name} table={t} sysStyle={sysStyle} isTraced={isTraced} />;
        })}
      </div>
    </div>
  );
}

// ── Process section ─────────────────────────────────────────────────────────────
function ProcessSection({ proc, idx, detail }: { proc: Process; idx: number; detail: boolean }) {
  return (
    <section
      id={`proc-${proc.id}`}
      className={`scroll-mt-3 flex flex-col ${
        detail ? 'gap-[18px] pb-8 border-b border-border' : 'gap-[10px] pb-[14px]'
      }`}
    >
      {/* Process header */}
      <div className="flex items-start gap-[14px]">
        <div
          className={`shrink-0 rounded-[4px] bg-text text-white flex items-center justify-center font-mono font-bold ${
            detail ? 'w-[38px] h-[38px] text-[14px]' : 'w-[30px] h-[30px] text-[12px]'
          }`}
        >
          {String(idx + 1).padStart(2, '0')}
        </div>
        <div className={`flex-1 ${detail ? 'pt-0.5' : 'pt-1'}`}>
          <h2
            className={`${
              detail ? 'text-[20px]' : 'text-[16px]'
            } font-semibold leading-[1.2] tracking-[-0.01em]`}
          >
            {proc.name}
          </h2>
          {detail && proc.summary && (
            <p className="text-[12.5px] text-text-sub mt-1 max-w-[720px] leading-[1.55]">
              {proc.summary}
            </p>
          )}
        </div>
      </div>

      {/* Blocks */}
      <div className={`flex flex-col ${detail ? 'gap-[22px] pl-[52px]' : 'gap-2 pl-[44px]'}`}>
        {proc.blocks.map((b) => (
          <SystemBlock key={b.system} block={b} detail={detail} />
        ))}
      </div>
    </section>
  );
}

// ── Trace callout — same booking, eight systems ────────────────────────────────
function TraceCallout({ detail }: { detail: boolean }) {
  return (
    <div
      style={{ borderLeft: '3px solid #92400e' }}
      className={`bg-surface border border-border rounded-[3px] flex flex-col ${
        detail ? 'px-[18px] py-[14px] gap-3' : 'px-4 py-3 gap-2.5'
      }`}
    >
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="font-mono text-[10px] font-bold tracking-[0.08em] uppercase text-[#92400e]">
          Trace
        </span>
        <span className="text-[13.5px] font-semibold text-text">{TRACE.headline}</span>
        <span className="text-[12px] text-text-sub">{TRACE.caption}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {TRACE.refs.map((r) => (
          <div
            key={r.system}
            className="inline-flex items-center gap-1.5 border border-border rounded-[2px] pl-[5px] pr-[7px] py-[3px] bg-bg"
          >
            <Chip source={r.system} />
            <span className="font-mono text-[10.5px] text-text-sub">{r.label}</span>
            <span className="font-mono text-[10.5px] font-semibold text-text">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────────
function CatalogHero({ detail, onToggle, onShowJson }: { detail: boolean; onToggle: (d: boolean) => void, onShowJson: () => void }) {
  return (
    <div className={`flex flex-col ${detail ? 'gap-[18px]' : 'gap-3'}`}>
      {/* Kicker + brand + mode toggle */}
      <div className="flex items-start gap-4 flex-wrap">
        <div className="flex-auto min-w-0">
          <div className="font-mono text-[10.5px] font-semibold tracking-[0.08em] uppercase text-text-muted mb-1.5">
            Shorex · Source Catalog
          </div>
          <h1
            className={`flex items-center gap-3 ${
              detail ? 'text-[26px]' : 'text-[22px]'
            } font-bold tracking-[-0.02em] leading-[1.15]`}
          >
            <img src="/ship.svg" alt="Ship icon" className="w-8 h-8" />
            Lodestone Cruiseline Test Source
          </h1>
          <div className="text-[13px] text-text-sub mt-1.5 max-w-[640px] leading-[1.5]">
            Hand-mocked source dataset for a hypothetical cruise line — eight systems threaded by
            one shared booking. The Data Adaptor reads from here.
          </div>
          {detail && (
            <div className="text-[11.5px] text-text-muted mt-2.5 flex gap-[14px] flex-wrap">
              <span>{TENANT.hq}</span>
              <span>·</span>
              <span>Founded {TENANT.founded}</span>
              <span>·</span>
              <span>
                Base currency{' '}
                <span className="font-mono text-text-sub">{TENANT.base_currency}</span>
              </span>
              <span>·</span>
              <span>{TENANT.region}</span>
              <span>·</span>
              <span>
                <Mono bold>{TENANT.season_label}</Mono>
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 items-end pt-2">
          <ModeToggle detail={detail} onChange={onToggle} />
          <button 
            onClick={onShowJson}
            title="Show JSON Data"
            className="w-10 h-10 bg-surface border border-border hover:bg-surface-2 text-text rounded-full shadow-md flex items-center justify-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 9.5 8 12l2 2.5"/><path d="m14 9.5 2 2.5-2 2.5"/></svg>
          </button>
        </div>
      </div>

      {/* Compact stat strip (both modes) */}
      <div className="flex items-center gap-[14px] text-[12px] text-text-sub flex-wrap">
        <span>
          <Mono bold>{FLEET.length}</Mono> ships
        </span>
        <span className="text-text-muted">·</span>
        <span>
          <Mono bold>{PORTS.length}</Mono> ports
        </span>
        <span className="text-text-muted">·</span>
        <span>
          <Mono bold>{Object.keys(SOURCE_SYSTEMS).length}</Mono> sources
        </span>
        {!detail && (
          <Fragment>
            <span className="text-text-muted">·</span>
            <span>
              <Mono bold>{TENANT.season_label}</Mono>
            </span>
          </Fragment>
        )}
      </div>

      {/* Fleet strip (Detail only) */}
      {detail && (
        <div>
          <div className="text-[10px] text-text-muted tracking-[0.06em] uppercase mb-1.5">Fleet</div>
          <div className="flex flex-wrap gap-2">
            {FLEET.map((s) => (
              <div
                key={s.ship_id}
                className={`border border-border rounded-lg px-4 py-3 text-[11.5px] flex items-center gap-4 ${
                  s.is_flagship ? 'bg-yellow-50' : 'bg-surface2'
                }`}
              >
                <div className='flex flex-col'>
                  <span className="font-semibold text-lg">{s.ship_name}</span>
                  <span className="font-mono text-[10px] text-text-muted">
                    {s.berths.toLocaleString()} berths
                  </span>
                </div>
                <div className='flex flex-col'>
                  <span className="font-mono text-[10px] text-text-muted">Home Port</span>
                  <span className="font-mono text-sm text-text-muted">{s.home_port}</span>
                </div>
                {s.is_flagship && (
                  <span className="text-[9px] font-bold tracking-[0.06em] text-[#92400e] bg-[#fef3c7] px-[5px] py-px rounded-[2px] uppercase">
                    flagship
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Streamline | Detail segmented control ──────────────────────────────────────
function ModeToggle({ detail, onChange }: { detail: boolean; onChange: (d: boolean) => void }) {
  const opts = [
    { id: 'streamline', label: 'Streamline' },
    { id: 'detail', label: 'Detail' },
  ];
  const active = detail ? 'detail' : 'streamline';
  return (
    <div className="inline-flex items-center border border-border rounded-[3px] bg-surface p-0.5 gap-px">
      {opts.map((o) => {
        const isActive = o.id === active;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id === 'detail')}
            className={`px-3 py-1 rounded-[2px] border-0 cursor-pointer text-[11.5px] font-sans transition-colors duration-100 ${
              isActive ? 'bg-text text-white font-semibold' : 'bg-transparent text-text-sub font-medium'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Process TOC (sticky chip row) ───────────────────────────────────────────────
function ProcessTOC({ activeIdx, onJump }: { activeIdx: number; onJump: (i: number) => void }) {
  return (
    <div className="sticky top-0 z-[5] bg-bg border-b border-border py-2.5 flex flex-wrap gap-1.5 mb-1 shadow-sm">
      {PROCESSES.map((p, i) => {
        const sys = SOURCE_SYSTEMS[p.blocks[0].system];
        const isActive = activeIdx === i;
        return (
          <button
            key={p.id}
            onClick={() => onJump(i)}
            className={`inline-flex items-center gap-1.5 px-[9px] py-[5px] rounded-full cursor-pointer select-none text-[11px] font-medium border transition-colors duration-100 ${
              isActive ? 'bg-text text-white border-text' : 'bg-surface text-text-sub border-border'
            }`}
          >
            <span className="font-mono text-[9.5px] font-bold opacity-70">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>{p.name}</span>
            <span
              // active pill colors mix UI state + per-source data → inline.
              style={{
                backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : SRC_META[sys.id].bg,
                color: isActive ? '#fff' : SRC_META[sys.id].c,
              }}
              className="font-mono text-[9px] font-bold tracking-[0.05em] px-1 rounded-full"
            >
              {SRC_META[sys.id].label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Top-level view ──────────────────────────────────────────────────────────────
export default function CatalogView() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [detail, setDetail] = useState(false); // Streamline by default — expert users
  const [showJson, setShowJson] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleJump = (i: number) => {
    const el = document.getElementById(`proc-${PROCESSES[i].id}`);
    if (el && scrollRef.current) {
      const container = scrollRef.current;
      const elTop =
        el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
      container.scrollTo({ top: elTop - 60, behavior: 'smooth' });
    }
    setActiveIdx(i);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => {
      const cTop = container.getBoundingClientRect().top;
      let best = 0;
      let bestDist = Infinity;
      PROCESSES.forEach((p, i) => {
        const el = document.getElementById(`proc-${p.id}`);
        if (!el) return;
        const d = Math.abs(el.getBoundingClientRect().top - cTop - 80);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActiveIdx(best);
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden bg-bg">
      {showJson && <JsonModal onClose={() => setShowJson(false)} />}
      <div
        className={`max-w-[1180px] mx-auto flex flex-col ${
          detail ? 'px-6 pt-5 pb-[60px] gap-[22px]' : 'px-6 pt-[14px] pb-12 gap-[14px]'
        }`}
      >
        <CatalogHero detail={detail} onToggle={setDetail} onShowJson={() => setShowJson(true)} />
        <TraceCallout detail={detail} />
        <ProcessTOC activeIdx={activeIdx} onJump={handleJump} />
        <div className={`flex flex-col ${detail ? 'gap-9' : 'gap-7'}`}>
          {PROCESSES.map((p, i) => (
            <ProcessSection key={p.id} proc={p} idx={i} detail={detail} />
          ))}
        </div>
      </div>
    </div>
  );
}
