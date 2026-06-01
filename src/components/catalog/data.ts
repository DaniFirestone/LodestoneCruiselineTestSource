// data.ts — Hand-mocked source dataset for a hypothetical cruise line.
// Ported from the standalone catalog's mock_catalog.jsx. This is the catalog's
// data layer; Catalog.tsx reads from it.
//
// CROSS-SYSTEM NARRATIVE — the same booking number flows through every system:
//
//   Brand:    Lodestone Cruise Line
//   Voyage:   Glacier Coast Northbound  (Native v-lds-2026-gc01 · CM2000 LDS26A01 · SABRE LDSA01)
//   Ship:     MS Granite — Frontier class  (Native granite · CM2000/SABRE GRNT)
//   Bookings: 5 reservations on this voyage, threaded through every legacy system

// ── Types ──────────────────────────────────────────────────────────────────
export type Cell = string | number | null;

export interface Column {
  n: string;
  t: string;
  k?: 'pk' | 'fk' | 'ix';
}

export interface Table {
  name: string;
  pk: string;
  desc?: string;
  columns: Column[];
  rows: Cell[][];
}

export interface Block {
  system: string;
  role: string;
  tables: Table[];
}

export interface Process {
  id: string;
  name: string;
  summary?: string;
  blocks: Block[];
}

export interface System {
  id: string;
  name: string;
  vendor: string;
  since: number;
  style: 'mainframe' | 'oracle' | 'tpf' | 'as400' | 'modern';
  interface: string;
  auth: string;
}

export interface TraceRef {
  system: string;
  label: string;
  value: string;
}

// ── Cruise-line brand ────────────────────────────────────────────────────────
export const TENANT = {
  line_name: 'Lodestone Cruise Line',
  tagline: 'Find your north.',
  hq: 'Vancouver, BC · Canada',
  founded: 2003,
  base_currency: 'USD',
  region: 'Alaska · Norwegian Fjords',
  season_label: 'FY26',
};

// ── Trace — one booking threaded through every source ────────────────────────
// The catalog's core narrative: this is how the legacy stack actually presents the same
// commercial event from 8 different angles.
export const TRACE: { headline: string; caption: string; refs: TraceRef[] } = {
  headline: 'Booking #8847291',
  caption: 'Pereira J. & A. (US) · 2 pax · MS Granite · Glacier Coast Northbound · 2026-06-13',
  refs: [
    { system: 'cm2000', label: 'BKG_HDR', value: '8847291' },
    { system: 'fidelio', label: 'RES_GUEST', value: '102447 / 102448' },
    { system: 'sabre', label: 'MAN/PAX', value: 'LDSA01:1–2' },
    { system: 'siebel', label: 'S_CONTACT', value: '1-3K2N / 1-3K2P' },
    { system: 'mapics', label: 'FOLIOHDR', value: '88472910 / 88472911' },
    { system: 'timatic', label: 'PASSPORT_REQ', value: 'US→US, CA→US' },
    { system: 'oxr', label: 'rates_latest', value: 'USD base' },
    { system: 'native', label: 'tour_booking', value: 'tb-001, tb-002' },
  ],
};

// ── Fleet (10 ships, 3 classes) ───────────────────────────────────────────────
export const FLEET = [
  // Frontier class — workhorses (rocks/aggregates)
  { ship_id: 'granite', ship_name: 'MS Granite', ship_class: 'Frontier', berths: 2400, year_built: 2018, home_port: 'YVR', is_flagship: false, cm2000_cd: 'GRNT', sabre_cd: 'GRNT' },
  { ship_id: 'basalt', ship_name: 'MS Basalt', ship_class: 'Frontier', berths: 2400, year_built: 2019, home_port: 'YVR', is_flagship: false, cm2000_cd: 'BSLT', sabre_cd: 'BSLT' },
  { ship_id: 'marble', ship_name: 'MS Marble', ship_class: 'Frontier', berths: 2100, year_built: 2015, home_port: 'SEA', is_flagship: false, cm2000_cd: 'MRBL', sabre_cd: 'MRBL' },
  { ship_id: 'diorite', ship_name: 'MS Diorite', ship_class: 'Frontier', berths: 2100, year_built: 2016, home_port: 'SEA', is_flagship: false, cm2000_cd: 'DRIT', sabre_cd: 'DRIT' },
  { ship_id: 'quartzite', ship_name: 'MS Quartzite', ship_class: 'Frontier', berths: 1800, year_built: 2010, home_port: 'HAM', is_flagship: false, cm2000_cd: 'QRTZ', sabre_cd: 'QRTZ' },
  { ship_id: 'travertine', ship_name: 'MS Travertine', ship_class: 'Frontier', berths: 1800, year_built: 2008, home_port: 'HAM', is_flagship: false, cm2000_cd: 'TRVT', sabre_cd: 'TRVT' },
  // Tidewater class — premium mid-tier
  { ship_id: 'gneiss', ship_name: 'MS Gneiss', ship_class: 'Tidewater', berths: 1400, year_built: 2012, home_port: 'BGO', is_flagship: false, cm2000_cd: 'GNSS', sabre_cd: 'GNSS' },
  { ship_id: 'onyx', ship_name: 'MS Onyx', ship_class: 'Tidewater', berths: 1200, year_built: 2014, home_port: 'BGO', is_flagship: false, cm2000_cd: 'ONYX', sabre_cd: 'ONYX' },
  { ship_id: 'slate', ship_name: 'MS Slate', ship_class: 'Tidewater', berths: 980, year_built: '1999 / r.2024', home_port: 'TOS', is_flagship: false, cm2000_cd: 'SLAT', sabre_cd: 'SLAT' },
  // Aurora class — singular flagship
  { ship_id: 'jade', ship_name: 'MS Jade', ship_class: 'Aurora', berths: 650, year_built: 2023, home_port: 'YVR', is_flagship: true, cm2000_cd: 'JADE', sabre_cd: 'JADE' },
];

// ── Ports (Alaska itinerary, 6) ────────────────────────────────────────────────
export const PORTS = [
  { port_id: 'vancouver-bc', port_name: 'Vancouver, BC', country: 'CA', berth_type: 'dock', sabre_cd: 'YVR' },
  { port_id: 'ketchikan', port_name: 'Ketchikan', country: 'US', berth_type: 'dock', sabre_cd: 'KTN' },
  { port_id: 'icy-strait-point', port_name: 'Icy Strait Point', country: 'US', berth_type: 'tender', sabre_cd: 'ISP' },
  { port_id: 'juneau', port_name: 'Juneau', country: 'US', berth_type: 'dock', sabre_cd: 'JNU' },
  { port_id: 'skagway', port_name: 'Skagway', country: 'US', berth_type: 'dock', sabre_cd: 'SGY' },
  { port_id: 'seward', port_name: 'Seward', country: 'US', berth_type: 'dock', sabre_cd: 'SWD' },
];

// ── Source system meta ─────────────────────────────────────────────────────────
export const SOURCE_SYSTEMS: Record<string, System> = {
  timatic: { id: 'timatic', name: 'TIMATIC', vendor: 'IATA', since: 1963, style: 'mainframe', interface: 'Flat-file · daily SFTP drop', auth: 'IATA member credentials' },
  cm2000: { id: 'cm2000', name: 'CruiseMatch 2000', vendor: 'Princess / EDS', since: 1988, style: 'mainframe', interface: 'DB2 read replica · ODBC', auth: 'Service account + IP allowlist' },
  fidelio: { id: 'fidelio', name: 'Fidelio', vendor: 'MICROS → Oracle OPERA', since: 1987, style: 'oracle', interface: 'Oracle DB link · CDC stream', auth: 'OPERA web service key' },
  sabre: { id: 'sabre', name: 'SABRE', vendor: 'American Airlines / IBM', since: 1960, style: 'tpf', interface: 'EDIFACT message feed (NDC)', auth: 'PCC + EPR credential' },
  siebel: { id: 'siebel', name: 'Siebel', vendor: 'Siebel Systems → Oracle', since: 1993, style: 'oracle', interface: 'Siebel EAI REST · 5-min poll', auth: 'OAuth2 client_credentials' },
  mapics: { id: 'mapics', name: 'MAPICS', vendor: 'IBM AS/400', since: 1978, style: 'as400', interface: 'DB2/400 via JDBC bridge', auth: 'AS/400 user profile' },
  native: { id: 'native', name: 'Native', vendor: 'Shorex', since: 2024, style: 'modern', interface: 'Postgres · canonical model', auth: 'Shorex IAM' },
  oxr: { id: 'oxr', name: 'OXR', vendor: 'Open Exchange Rates', since: 2010, style: 'modern', interface: 'HTTPS JSON · hourly poll', auth: 'API key' },
};

// ════════════════════════════════════════════════════════════════════════════
// PROCESSES — cruise-line process is primary; source system is the sub-grouping.
// ════════════════════════════════════════════════════════════════════════════
export const PROCESSES: Process[] = [
  // 1. RESERVATIONS & BOOKING — CruiseMatch 2000
  {
    id: 'reservations',
    name: 'Reservations & Booking',
    summary: 'Commercial system of record for voyages, fares, deposits, cabin inventory and the booking lifecycle.',
    blocks: [{
      system: 'cm2000',
      role: 'System of record · all reservations originate here',
      tables: [
        {
          name: 'VOY_MAST',
          pk: 'VOY_CD',
          desc: 'Voyage master — one row per scheduled sailing on the commercial calendar.',
          columns: [
            { n: 'VOY_CD', t: 'CHAR(8)', k: 'pk' },
            { n: 'SHP_CD', t: 'CHAR(4)', k: 'fk' },
            { n: 'RTE_CD', t: 'CHAR(6)' },
            { n: 'DEP_DT', t: 'DATE' },
            { n: 'RTN_DT', t: 'DATE' },
            { n: 'NTS', t: 'SMALLINT' },
            { n: 'CAP', t: 'INT' },
            { n: 'STS', t: 'CHAR(2)' },
          ],
          rows: [
            ['LDS26A01', 'GRNT', 'GLCRN7', '2026-06-13', '2026-06-20', 7, 2400, 'OP'],
            ['LDS26A02', 'GRNT', 'GLCRS7', '2026-06-20', '2026-06-27', 7, 2400, 'OP'],
            ['LDS26A03', 'BSLT', 'GLCRN7', '2026-06-13', '2026-06-20', 7, 2400, 'OP'],
            ['LDS26A04', 'JADE', 'GLCRP9', '2026-06-21', '2026-06-30', 9, 650, 'OP'],
            ['LDS26A05', 'MRBL', 'INSPS7', '2026-06-20', '2026-06-27', 7, 2100, 'OP'],
            ['LDS26N12', 'GNSS', 'FJD10', '2026-07-04', '2026-07-14', 10, 1400, 'OP'],
            ['LDS26A99', 'GRNT', 'GLCRN7', '2026-06-06', '2026-06-13', 7, 2400, 'CL'],
          ],
        },
        {
          name: 'BKG_HDR',
          pk: 'BKG_NUM',
          desc: 'Booking header — one row per reservation. Status codes: OP open, CF confirmed, CN cancelled, WL waitlist.',
          columns: [
            { n: 'BKG_NUM', t: 'CHAR(7)', k: 'pk' },
            { n: 'VOY_CD', t: 'CHAR(8)', k: 'fk' },
            { n: 'PAX_CNT', t: 'SMALLINT' },
            { n: 'STS', t: 'CHAR(2)' },
            { n: 'BKG_DT', t: 'DATE' },
            { n: 'AGT_CD', t: 'CHAR(6)' },
            { n: 'TOT_AMT', t: 'DEC(9,2)' },
            { n: 'CCY', t: 'CHAR(3)' },
          ],
          rows: [
            ['8847291', 'LDS26A01', 2, 'CF', '2025-11-14', 'DIR001', '5200.00', 'USD'],
            ['8847583', 'LDS26A01', 4, 'CF', '2025-12-02', 'EXPCAN', '7420.00', 'CAD'],
            ['8847901', 'LDS26A01', 1, 'CF', '2026-01-18', 'BCNTVL', '1890.00', 'EUR'],
            ['8848009', 'LDS26A01', 2, 'CF', '2026-02-04', 'JTBJPN', '9840.00', 'USD'],
            ['8848217', 'LDS26A01', 1, 'CF', '2026-03-22', 'OSLNOR', '3180.00', 'USD'],
            ['8848339', 'LDS26A01', 3, 'WL', '2026-05-08', 'DIR001', '0.00', 'USD'],
            ['8848412', 'LDS26A02', 2, 'CF', '2026-04-19', 'DIR001', '5400.00', 'USD'],
          ],
        },
        {
          name: 'BKG_PAX',
          pk: 'BKG_NUM, PAX_SEQ',
          desc: 'Passenger lines per booking. NAT_CC is ISO-3166-1 alpha-2.',
          columns: [
            { n: 'BKG_NUM', t: 'CHAR(7)', k: 'pk' },
            { n: 'PAX_SEQ', t: 'SMALLINT', k: 'pk' },
            { n: 'LST_NM', t: 'CHAR(20)' },
            { n: 'FRS_NM', t: 'CHAR(15)' },
            { n: 'DOB', t: 'DATE' },
            { n: 'NAT_CC', t: 'CHAR(2)' },
            { n: 'GDR', t: 'CHAR(1)' },
          ],
          rows: [
            ['8847291', 1, 'PEREIRA', 'JOHN', '1978-03-12', 'US', 'M'],
            ['8847291', 2, 'PEREIRA', 'ANIKA', '1981-07-29', 'US', 'F'],
            ['8847583', 1, 'CHEN', 'LIAM', '1972-11-04', 'CA', 'M'],
            ['8847583', 2, 'CHEN', 'MEI', '1974-02-18', 'CA', 'F'],
            ['8847583', 3, 'CHEN', 'NOAH', '2011-08-30', 'CA', 'M'],
            ['8847583', 4, 'CHEN', 'AVA', '2014-04-15', 'CA', 'F'],
            ['8847901', 1, 'MARCHETTI', 'SOFIA', '1989-09-22', 'IT', 'F'],
            ['8848009', 1, 'TANAKA', 'HIROSHI', '1965-11-08', 'JP', 'M'],
            ['8848009', 2, 'TANAKA', 'YUKI', '1968-04-21', 'JP', 'F'],
            ['8848217', 1, 'ERIKSEN', 'BJORN', '1981-09-30', 'NO', 'M'],
          ],
        },
        {
          name: 'BKG_FARE',
          pk: 'BKG_NUM, FARE_SEQ',
          desc: 'Fare lines — base fare, promos, port fees, gratuities, taxes.',
          columns: [
            { n: 'BKG_NUM', t: 'CHAR(7)', k: 'pk' },
            { n: 'FARE_SEQ', t: 'SMALLINT', k: 'pk' },
            { n: 'FARE_CD', t: 'CHAR(6)' },
            { n: 'FARE_AMT', t: 'DEC(9,2)' },
            { n: 'CCY', t: 'CHAR(3)' },
          ],
          rows: [
            ['8847291', 1, 'BAL11A', '4040.00', 'USD'],
            ['8847291', 2, 'PORTFE', '420.00', 'USD'],
            ['8847291', 3, 'GRAT16', '224.00', 'USD'],
            ['8847291', 4, 'TAX01', '516.00', 'USD'],
            ['8848009', 1, 'STE14A', '8480.00', 'USD'],
            ['8848009', 2, 'PORTFE', '420.00', 'USD'],
            ['8848009', 3, 'GRAT22', '396.00', 'USD'],
            ['8848009', 4, 'TAX01', '544.00', 'USD'],
          ],
        },
        {
          name: 'CAB_ASN',
          pk: 'BKG_NUM',
          desc: 'Cabin assignment. Cat codes: IN inside, OV oceanview, BA balcony, ST suite.',
          columns: [
            { n: 'BKG_NUM', t: 'CHAR(7)', k: 'pk' },
            { n: 'CAB_NUM', t: 'CHAR(5)' },
            { n: 'CAB_CAT', t: 'CHAR(2)' },
            { n: 'DECK', t: 'SMALLINT' },
            { n: 'OCC', t: 'SMALLINT' },
          ],
          rows: [
            ['8847291', '11042', 'BA', 11, 2],
            ['8847583', '07204', 'IN', 7, 4],
            ['8847901', '09018', 'OV', 9, 1],
            ['8848009', '14001', 'ST', 14, 2],
            ['8848217', '10018', 'BA', 10, 1],
          ],
        },
      ],
    }],
  },

  // 2. GUEST PROFILE & ONBOARD — Fidelio
  {
    id: 'guest-pms',
    name: 'Guest Profile & Onboard Services',
    summary: 'Property-management for the ship. Guest profiles, preferences, cabin inventory, boarding state.',
    blocks: [{
      system: 'fidelio',
      role: 'System of record · onboard hospitality',
      tables: [
        {
          name: 'RES_GUEST',
          pk: 'GUEST_ID',
          desc: 'Guest master profile. One per natural person, persisted across sailings.',
          columns: [
            { n: 'GUEST_ID', t: 'NUMBER(8)', k: 'pk' },
            { n: 'LAST_NAME', t: 'VARCHAR2(40)' },
            { n: 'FIRST_NAME', t: 'VARCHAR2(40)' },
            { n: 'EMAIL', t: 'VARCHAR2(80)' },
            { n: 'COUNTRY', t: 'CHAR(2)' },
            { n: 'VIP_LEVEL', t: 'VARCHAR2(4)' },
            { n: 'CREATED', t: 'DATE' },
          ],
          rows: [
            ['102447', 'Pereira', 'John', 'john.pereira@example.com', 'US', 'GOLD', '2017-04-09'],
            ['102448', 'Pereira', 'Anika', 'anika.pereira@example.com', 'US', 'GOLD', '2017-04-09'],
            ['114203', 'Chen', 'Liam', 'liam.chen@example.com', 'CA', 'SLVR', '2019-08-14'],
            ['114204', 'Chen', 'Mei', 'mei.chen@example.com', 'CA', 'SLVR', '2019-08-14'],
            ['127815', 'Marchetti', 'Sofia', 's.marchetti@example.com', 'IT', '—', '2026-01-18'],
            ['134522', 'Tanaka', 'Hiroshi', 'h.tanaka@example.com', 'JP', 'PLAT', '2014-02-11'],
            ['134523', 'Tanaka', 'Yuki', 'y.tanaka@example.com', 'JP', 'PLAT', '2014-02-11'],
            ['142008', 'Eriksen', 'Bjørn', 'bjorn.eriksen@example.no', 'NO', 'SLVR', '2020-06-04'],
          ],
        },
        {
          name: 'RES_PREF',
          pk: 'GUEST_ID, PREF_CODE',
          desc: 'Stated preferences — dietary, accessibility, dining-time, gifting.',
          columns: [
            { n: 'GUEST_ID', t: 'NUMBER(8)', k: 'pk' },
            { n: 'PREF_CODE', t: 'VARCHAR2(8)', k: 'pk' },
            { n: 'PREF_VALUE', t: 'VARCHAR2(60)' },
            { n: 'UPDATED', t: 'DATE' },
          ],
          rows: [
            ['102447', 'DIET', 'Pescatarian', '2023-06-11'],
            ['102447', 'DINTIME', '19:30 main seating', '2025-11-14'],
            ['102447', 'EXCURS', 'Wildlife, no aviation', '2024-02-08'],
            ['102448', 'DIET', 'No shellfish', '2023-06-11'],
            ['114203', 'ACCESS', 'Mobility-assisted boarding', '2024-01-30'],
            ['134522', 'DINTIME', '21:00 second seating', '2024-09-04'],
            ['134522', 'LANG', 'Japanese onboard concierge', '2020-05-12'],
            ['142008', 'DIET', 'Lactose-free', '2022-08-19'],
          ],
        },
        {
          name: 'RES_CABIN_INV',
          pk: 'SHIP_CD, CABIN_NO',
          desc: 'Cabin inventory per ship — physical attributes, not assignment.',
          columns: [
            { n: 'SHIP_CD', t: 'CHAR(4)', k: 'pk' },
            { n: 'CABIN_NO', t: 'CHAR(5)', k: 'pk' },
            { n: 'CABIN_CAT', t: 'VARCHAR2(8)' },
            { n: 'DECK', t: 'NUMBER(2)' },
            { n: 'MAX_OCC', t: 'NUMBER(1)' },
            { n: 'CONNECTING', t: 'CHAR(1)' },
          ],
          rows: [
            ['GRNT', '07204', 'Inside', 7, 4, 'N'],
            ['GRNT', '09018', 'Oceanview', 9, 2, 'N'],
            ['GRNT', '10018', 'Balcony', 10, 3, 'N'],
            ['GRNT', '11042', 'Balcony', 11, 3, 'N'],
            ['GRNT', '11044', 'Balcony', 11, 3, 'Y'],
            ['GRNT', '14001', 'Suite', 14, 4, 'N'],
            ['JADE', '08012', 'Suite', 8, 2, 'N'],
          ],
        },
        {
          name: 'RES_BOARDING',
          pk: 'GUEST_ID, VOYAGE_REF',
          desc: 'Boarding state for an upcoming sailing — set at gangway scan.',
          columns: [
            { n: 'GUEST_ID', t: 'NUMBER(8)', k: 'pk' },
            { n: 'VOYAGE_REF', t: 'VARCHAR2(12)', k: 'pk' },
            { n: 'CABIN_NO', t: 'CHAR(5)' },
            { n: 'BOARDED_AT', t: 'TIMESTAMP' },
            { n: 'FOLIO_NO', t: 'VARCHAR2(10)' },
            { n: 'STATUS', t: 'VARCHAR2(8)' },
          ],
          rows: [
            ['102447', 'LDS26A01', '11042', '2026-06-13 13:42:08', '88472910', 'EXPECT'],
            ['102448', 'LDS26A01', '11042', '2026-06-13 13:42:21', '88472911', 'EXPECT'],
            ['114203', 'LDS26A01', '07204', null, '88475830', 'EXPECT'],
            ['127815', 'LDS26A01', '09018', null, '88479010', 'EXPECT'],
            ['134522', 'LDS26A01', '14001', null, '88480090', 'EXPECT'],
            ['142008', 'LDS26A01', '10018', null, '88482170', 'EXPECT'],
          ],
        },
      ],
    }],
  },

  // 3. MANIFEST & SHIP OPERATIONS — SABRE
  {
    id: 'manifest-ops',
    name: 'Manifest & Ship Operations',
    summary: 'TPF-era record store for legal manifest, crew assignments, port-call ops and berth planning.',
    blocks: [{
      system: 'sabre',
      role: 'System of record · legal manifest & ship ops',
      tables: [
        {
          name: 'VOY/HDR',
          pk: 'VOY_REF',
          desc: 'Voyage record on the ops side — master, flag, departure window. Mirrors VOY_MAST after T-72h.',
          columns: [
            { n: 'VOY_REF', t: 'CHR06', k: 'pk' },
            { n: 'SHIP', t: 'CHR04' },
            { n: 'MASTER', t: 'CHR20' },
            { n: 'FLAG', t: 'CHR02' },
            { n: 'DEP_PRT', t: 'CHR03' },
            { n: 'DEP_DTM', t: 'DTM14' },
            { n: 'RTN_DTM', t: 'DTM14' },
          ],
          rows: [
            ['LDSA01', 'GRNT', 'CPT R.ANDERSEN', 'BS', 'YVR', '2026-06-13 17:00', '2026-06-20 05:00'],
            ['LDSA02', 'GRNT', 'CPT R.ANDERSEN', 'BS', 'SWD', '2026-06-20 17:00', '2026-06-27 05:00'],
            ['LDSA03', 'BSLT', 'CPT K.OLOFSSON', 'BS', 'YVR', '2026-06-13 17:00', '2026-06-20 05:00'],
            ['LDSA04', 'JADE', 'CPT N.DIMITRIOU', 'BS', 'YVR', '2026-06-21 17:00', '2026-06-30 06:00'],
            ['LDSN12', 'GNSS', 'CPT I.HAUGE', 'NO', 'BGO', '2026-07-04 16:00', '2026-07-14 09:00'],
          ],
        },
        {
          name: 'MAN/PAX',
          pk: 'VOY_REF, MAN_SEQ',
          desc: 'Manifest line per passenger — filed with US CBP, CBSA and port authorities.',
          columns: [
            { n: 'VOY_REF', t: 'CHR06', k: 'pk' },
            { n: 'MAN_SEQ', t: 'NUM06', k: 'pk' },
            { n: 'SURNAME', t: 'CHR20' },
            { n: 'GIVEN', t: 'CHR15' },
            { n: 'DOB', t: 'DTE08' },
            { n: 'NAT', t: 'CHR02' },
            { n: 'DOC_TYP', t: 'CHR01' },
            { n: 'DOC_NUM', t: 'CHR12' },
            { n: 'CABIN', t: 'CHR05' },
          ],
          rows: [
            ['LDSA01', 1, 'PEREIRA', 'JOHN', '1978-03-12', 'US', 'P', 'A1234567B', '11042'],
            ['LDSA01', 2, 'PEREIRA', 'ANIKA', '1981-07-29', 'US', 'P', 'A1234712C', '11042'],
            ['LDSA01', 3, 'CHEN', 'LIAM', '1972-11-04', 'CA', 'P', 'CA4128890', '07204'],
            ['LDSA01', 4, 'CHEN', 'MEI', '1974-02-18', 'CA', 'P', 'CA4128891', '07204'],
            ['LDSA01', 5, 'CHEN', 'NOAH', '2011-08-30', 'CA', 'P', 'CA4128902', '07204'],
            ['LDSA01', 6, 'CHEN', 'AVA', '2014-04-15', 'CA', 'P', 'CA4128903', '07204'],
            ['LDSA01', 7, 'MARCHETTI', 'SOFIA', '1989-09-22', 'IT', 'P', 'YA8819203', '09018'],
            ['LDSA01', 8, 'TANAKA', 'HIROSHI', '1965-11-08', 'JP', 'P', 'TR1108445', '14001'],
            ['LDSA01', 9, 'TANAKA', 'YUKI', '1968-04-21', 'JP', 'P', 'TR1108446', '14001'],
            ['LDSA01', 10, 'ERIKSEN', 'BJORN', '1981-09-30', 'NO', 'P', 'NO9301122', '10018'],
          ],
        },
        {
          name: 'PRT/CAL',
          pk: 'VOY_REF, DAY',
          desc: 'Port call log — arrival/departure, agent, berth, customs clearance. SCN day = scenic cruising (no port).',
          columns: [
            { n: 'VOY_REF', t: 'CHR06', k: 'pk' },
            { n: 'DAY', t: 'NUM02', k: 'pk' },
            { n: 'PRT', t: 'CHR03' },
            { n: 'ARR_DTM', t: 'DTM14' },
            { n: 'DEP_DTM', t: 'DTM14' },
            { n: 'BRTH_TY', t: 'CHR01' },
            { n: 'AGENT', t: 'CHR06' },
          ],
          rows: [
            ['LDSA01', 1, 'YVR', null, '2026-06-13 17:00', 'D', 'YVRCAN'],
            ['LDSA01', 2, 'SEA', null, null, 'X', '------'],
            ['LDSA01', 3, 'KTN', '2026-06-15 07:00', '2026-06-15 14:00', 'D', 'KTNAGY'],
            ['LDSA01', 4, 'ISP', '2026-06-16 07:00', '2026-06-16 17:00', 'T', 'HNHAGY'],
            ['LDSA01', 5, 'JNU', '2026-06-17 07:00', '2026-06-17 22:00', 'D', 'JNUAGY'],
            ['LDSA01', 6, 'SGY', '2026-06-18 07:00', '2026-06-18 20:00', 'D', 'SGYAGY'],
            ['LDSA01', 7, 'GBY', null, null, 'S', '------'],
            ['LDSA01', 8, 'SWD', '2026-06-20 05:00', null, 'D', 'SWDAGY'],
          ],
        },
        {
          name: 'BRT/PLN',
          pk: 'PRT, ARR_DTM',
          desc: 'Berth allocation — which berth a ship gets, negotiated with port authority.',
          columns: [
            { n: 'PRT', t: 'CHR03', k: 'pk' },
            { n: 'ARR_DTM', t: 'DTM14', k: 'pk' },
            { n: 'SHIP', t: 'CHR04' },
            { n: 'BERTH', t: 'CHR04' },
            { n: 'CONFIRM', t: 'CHR01' },
          ],
          rows: [
            ['KTN', '2026-06-15 07:00', 'GRNT', 'B-02', 'Y'],
            ['ISP', '2026-06-16 07:00', 'GRNT', 'ANCH', 'Y'],
            ['JNU', '2026-06-17 07:00', 'GRNT', 'AJ-1', 'Y'],
            ['SGY', '2026-06-18 07:00', 'GRNT', 'B-RY', 'Y'],
            ['SWD', '2026-06-20 05:00', 'GRNT', 'CRSE', 'Y'],
          ],
        },
        {
          name: 'MAN/CRW',
          pk: 'VOY_REF, CRW_SEQ',
          desc: 'Crew manifest — same legal filing, different roster.',
          columns: [
            { n: 'VOY_REF', t: 'CHR06', k: 'pk' },
            { n: 'CRW_SEQ', t: 'NUM06', k: 'pk' },
            { n: 'SURNAME', t: 'CHR20' },
            { n: 'GIVEN', t: 'CHR15' },
            { n: 'NAT', t: 'CHR02' },
            { n: 'POS_CD', t: 'CHR06' },
            { n: 'EMB_PRT', t: 'CHR03' },
          ],
          rows: [
            ['LDSA01', 1, 'ANDERSEN', 'ROALD', 'NO', 'MASTER', 'YVR'],
            ['LDSA01', 2, 'BHATTACH.', 'PRIYA', 'IN', 'CHFENG', 'YVR'],
            ['LDSA01', 3, 'OKONKWO', 'EMEKA', 'NG', 'PURSER', 'YVR'],
            ['LDSA01', 4, 'SVENSSON', 'KARIN', 'SE', 'HOTMGR', 'YVR'],
            ['LDSA01', 5, 'ATKINSON', 'CHARLES', 'GB', 'EXCMGR', 'YVR'],
          ],
        },
      ],
    }],
  },

  // 4. LOYALTY & GUEST COMMUNICATIONS — Siebel
  {
    id: 'loyalty-crm',
    name: 'Loyalty & Guest Communications',
    summary: 'CRM and loyalty engine — points, tier, campaigns, every email/SMS sent. Lodestar is the top invite-only tier.',
    blocks: [{
      system: 'siebel',
      role: 'System of record · marketing & loyalty',
      tables: [
        {
          name: 'S_CONTACT',
          pk: 'ROW_ID',
          desc: 'Marketing-side contact. Joined to Fidelio guest by EMAIL_ADDR (probabilistic).',
          columns: [
            { n: 'ROW_ID', t: 'VARCHAR(15)', k: 'pk' },
            { n: 'LAST_NAME', t: 'VARCHAR(50)' },
            { n: 'FST_NAME', t: 'VARCHAR(50)' },
            { n: 'EMAIL_ADDR', t: 'VARCHAR(100)' },
            { n: 'PR_LANG', t: 'CHAR(3)' },
            { n: 'OPT_IN', t: 'CHAR(1)' },
          ],
          rows: [
            ['1-3K2N', 'Pereira', 'John', 'john.pereira@example.com', 'ENU', 'Y'],
            ['1-3K2P', 'Pereira', 'Anika', 'anika.pereira@example.com', 'ENU', 'Y'],
            ['1-7H8L', 'Chen', 'Liam', 'liam.chen@example.com', 'ENU', 'Y'],
            ['1-7H8M', 'Chen', 'Mei', 'mei.chen@example.com', 'ENU', 'N'],
            ['1-9PR2', 'Marchetti', 'Sofia', 's.marchetti@example.com', 'ITA', 'Y'],
            ['1-BC4Q', 'Tanaka', 'Hiroshi', 'h.tanaka@example.com', 'JPN', 'Y'],
            ['1-BC4R', 'Tanaka', 'Yuki', 'y.tanaka@example.com', 'JPN', 'Y'],
            ['1-DD8S', 'Eriksen', 'Bjørn', 'bjorn.eriksen@example.no', 'NOR', 'Y'],
          ],
        },
        {
          name: 'S_LOY_MEMBER',
          pk: 'ROW_ID',
          desc: 'Loyalty membership — one per contact who enrolled. Points balance refreshed nightly.',
          columns: [
            { n: 'ROW_ID', t: 'VARCHAR(15)', k: 'pk' },
            { n: 'CONTACT_ID', t: 'VARCHAR(15)', k: 'fk' },
            { n: 'MEMBER_NUM', t: 'VARCHAR(12)' },
            { n: 'TIER_CD', t: 'CHAR(4)' },
            { n: 'PTS_BAL', t: 'NUMBER(8)' },
            { n: 'ENROLL_DT', t: 'DATE' },
          ],
          rows: [
            ['2-AA01', '1-3K2N', 'LDS000102447', 'GOLD', 48200, '2017-04-09'],
            ['2-AA02', '1-3K2P', 'LDS000102448', 'GOLD', 48200, '2017-04-09'],
            ['2-AB14', '1-7H8L', 'LDS000114203', 'SLVR', 12450, '2019-08-14'],
            ['2-AB15', '1-7H8M', 'LDS000114204', 'SLVR', 12450, '2019-08-14'],
            ['2-CC22', '1-BC4Q', 'LDS000134522', 'PLAT', 98740, '2014-02-11'],
            ['2-CC23', '1-BC4R', 'LDS000134523', 'PLAT', 98740, '2014-02-11'],
            ['2-DE91', '1-DD8S', 'LDS000142008', 'SLVR', 18900, '2020-06-04'],
          ],
        },
        {
          name: 'S_LOY_TIER',
          pk: 'TIER_CD',
          desc: "Tier definitions. LSTR (Lodestar) is the invite-only top tier — Lodestone's ambassador track.",
          columns: [
            { n: 'TIER_CD', t: 'CHAR(4)', k: 'pk' },
            { n: 'TIER_NM', t: 'VARCHAR(20)' },
            { n: 'MIN_PTS', t: 'NUMBER(8)' },
            { n: 'CRUISE_DISC_PCT', t: 'NUMBER(3,1)' },
            { n: 'PRIO_BOARD', t: 'CHAR(1)' },
          ],
          rows: [
            ['BRNZ', 'Bronze', 0, 0.0, 'N'],
            ['SLVR', 'Silver', 5000, 2.5, 'N'],
            ['GOLD', 'Gold', 25000, 7.5, 'Y'],
            ['PLAT', 'Platinum', 75000, 12.5, 'Y'],
            ['LSTR', 'Lodestar', 0, 20.0, 'Y'],
          ],
        },
        {
          name: 'S_COMM_HIST',
          pk: 'ROW_ID',
          desc: 'Every email/SMS/push touch. Marketers query for last-touch attribution.',
          columns: [
            { n: 'ROW_ID', t: 'VARCHAR(15)', k: 'pk' },
            { n: 'CONTACT_ID', t: 'VARCHAR(15)', k: 'fk' },
            { n: 'CHANNEL', t: 'CHAR(5)' },
            { n: 'SENT_DT', t: 'TIMESTAMP' },
            { n: 'SUBJECT', t: 'VARCHAR(120)' },
            { n: 'RESPONSE', t: 'CHAR(4)' },
          ],
          rows: [
            ['7-MM103', '1-3K2N', 'EMAIL', '2026-05-30 14:00:00', 'Your Glacier Coast departure is 14 days away', 'OPEN'],
            ['7-MM104', '1-3K2N', 'EMAIL', '2026-06-06 14:00:00', 'Check in opens for MS Granite', 'CLK'],
            ['7-MM205', '1-7H8L', 'EMAIL', '2026-05-30 14:00:00', 'Your Glacier Coast departure is 14 days away', 'OPEN'],
            ['7-MM310', '1-9PR2', 'EMAIL', '2026-05-30 14:00:00', 'La tua crociera in Alaska parte tra 14 giorni', 'CLK'],
            ['7-MM411', '1-BC4Q', 'EMAIL', '2026-05-30 14:00:00', 'グレイシャーコースト出発まであと14日', 'OPEN'],
            ['7-MM502', '1-3K2N', 'PUSH', '2026-06-12 18:30:00', 'Boarding day tomorrow — packing checklist', 'OPEN'],
          ],
        },
      ],
    }],
  },

  // 5. FOLIO & BILLING — MAPICS
  {
    id: 'folio-billing',
    name: 'Folio & Billing',
    summary: 'AS/400 ledger — every onboard charge, every settlement, every GL posting.',
    blocks: [{
      system: 'mapics',
      role: 'System of record · finance & general ledger',
      tables: [
        {
          name: 'FOLIOHDR',
          pk: 'FOLIONO',
          desc: 'Folio header — one per guest per voyage. Opened at boarding, closed at debark.',
          columns: [
            { n: 'FOLIONO', t: 'CHAR(10)', k: 'pk' },
            { n: 'GUESTID', t: 'CHAR(8)', k: 'fk' },
            { n: 'VOYAGE', t: 'CHAR(8)', k: 'fk' },
            { n: 'OPENDT', t: 'DATE' },
            { n: 'CLOSEDT', t: 'DATE' },
            { n: 'BALANCE', t: 'PACKED(9,2)' },
            { n: 'CCY', t: 'CHAR(3)' },
            { n: 'STS', t: 'CHAR(1)' },
          ],
          rows: [
            ['88472910', '00102447', 'LDS26A01', null, null, '0.00', 'USD', 'P'],
            ['88472911', '00102448', 'LDS26A01', null, null, '0.00', 'USD', 'P'],
            ['88475830', '00114203', 'LDS26A01', null, null, '0.00', 'USD', 'P'],
            ['88479010', '00127815', 'LDS26A01', null, null, '0.00', 'USD', 'P'],
            ['88480090', '00134522', 'LDS26A01', null, null, '0.00', 'USD', 'P'],
            ['88482170', '00142008', 'LDS26A01', null, null, '0.00', 'USD', 'P'],
          ],
        },
        {
          name: 'FOLIOLNE',
          pk: 'FOLIONO, LNESEQ',
          desc: 'Folio line items — bar tab, excursion, spa, casino, internet. POSTBY is the POS terminal or web channel.',
          columns: [
            { n: 'FOLIONO', t: 'CHAR(10)', k: 'pk' },
            { n: 'LNESEQ', t: 'NUMERIC(4)', k: 'pk' },
            { n: 'CHGCODE', t: 'CHAR(6)' },
            { n: 'DESCR', t: 'CHAR(40)' },
            { n: 'AMT', t: 'PACKED(7,2)' },
            { n: 'CCY', t: 'CHAR(3)' },
            { n: 'POSTDT', t: 'TIMESTAMP' },
            { n: 'POSTBY', t: 'CHAR(8)' },
          ],
          rows: [
            ['88472910', 1, 'EXC014', 'Misty Fjords Floatplane — 2 pax', '718.00', 'USD', '2026-06-08 14:22:11', 'WEB-EXC '],
            ['88472910', 2, 'EXC018', 'Mendenhall Glacier & Salmon Bake', '338.00', 'USD', '2026-06-08 14:25:00', 'WEB-EXC '],
            ['88472910', 3, 'WIFI01', 'Premium wi-fi — voyage', '99.00', 'USD', '2026-06-13 16:01:02', 'WEB-CHK '],
            ['88480090', 1, 'EXC031', 'White Pass & Yukon Heritage Railway', '358.00', 'USD', '2026-06-08 17:33:29', 'WEB-EXC '],
            ['88480090', 2, 'EXC042', 'Heli & Glacier Dogsled — 2 pax', '1498.00', 'USD', '2026-06-08 17:35:11', 'WEB-EXC '],
            ['88480090', 3, 'SPA011', 'Massage — 50 min', '180.00', 'USD', '2026-06-13 21:14:00', 'POS-SP01'],
          ],
        },
        {
          name: 'CHGCODE',
          pk: 'CHGCODE',
          desc: 'Charge code catalog. GLACCT routes the credit; TAXFLAG triggers VAT/state lookup.',
          columns: [
            { n: 'CHGCODE', t: 'CHAR(6)', k: 'pk' },
            { n: 'DESCR', t: 'CHAR(40)' },
            { n: 'GLACCT', t: 'CHAR(8)' },
            { n: 'TAXFLAG', t: 'CHAR(1)' },
            { n: 'CATEGORY', t: 'CHAR(8)' },
          ],
          rows: [
            ['BAR001', 'Bar tab — onboard outlets', '40010001', 'Y', 'BEVERAGE'],
            ['EXC014', 'Shore excursion — aviation', '40020014', 'N', 'EXCURSN '],
            ['EXC018', 'Shore excursion — cultural', '40020018', 'N', 'EXCURSN '],
            ['EXC031', 'Shore excursion — rail/coach', '40020031', 'N', 'EXCURSN '],
            ['EXC042', 'Shore excursion — premium adv', '40020042', 'N', 'EXCURSN '],
            ['WIFI01', 'Internet — premium pkg', '40030001', 'Y', 'DIGITAL '],
            ['SPA011', 'Spa services', '40040011', 'Y', 'SPA     '],
          ],
        },
        {
          name: 'SETTLE',
          pk: 'SETTLENO',
          desc: 'Settlement events — folio closures, card auths, refunds.',
          columns: [
            { n: 'SETTLENO', t: 'CHAR(10)', k: 'pk' },
            { n: 'FOLIONO', t: 'CHAR(10)', k: 'fk' },
            { n: 'TENDER', t: 'CHAR(6)' },
            { n: 'AMT', t: 'PACKED(9,2)' },
            { n: 'CCY', t: 'CHAR(3)' },
            { n: 'SETTLEDT', t: 'TIMESTAMP' },
            { n: 'AUTHCODE', t: 'CHAR(8)' },
          ],
          rows: [
            ['90014701', '88472910', 'AUTH  ', '500.00', 'USD', '2026-06-08 14:22:30', 'AX014701'],
            ['90014702', '88472911', 'AUTH  ', '500.00', 'USD', '2026-06-08 14:22:45', 'AX014702'],
            ['90014810', '88479010', 'AUTH  ', '500.00', 'USD', '2026-06-08 17:09:12', 'VS014810'],
            ['90014920', '88480090', 'AUTH  ', '1500.00', 'USD', '2026-06-08 17:33:50', 'AX014920'],
          ],
        },
      ],
    }],
  },

  // 6. TRAVEL DOCUMENTS & COMPLIANCE — TIMATIC
  {
    id: 'travel-docs',
    name: 'Travel Documents & Compliance',
    summary: 'IATA reference catalog — passport, visa and health requirements per nationality × destination. Glacier Coast embarks in Canada and debarks in the US, so passports are required for every guest, regardless of nationality.',
    blocks: [{
      system: 'timatic',
      role: 'External reference · read-only catalog',
      tables: [
        {
          name: 'COUNTRY',
          pk: 'CC',
          desc: 'ISO countries with TIMATIC-curated naming and region grouping.',
          columns: [
            { n: 'CC', t: 'CHAR(2)', k: 'pk' },
            { n: 'NM_LONG', t: 'CHAR(50)' },
            { n: 'NM_SHORT', t: 'CHAR(20)' },
            { n: 'RGN', t: 'CHAR(3)' },
          ],
          rows: [
            ['US', 'UNITED STATES OF AMERICA', 'USA', 'NAM'],
            ['CA', 'CANADA', 'CANADA', 'NAM'],
            ['IT', 'ITALY', 'ITALY', 'EUR'],
            ['JP', 'JAPAN', 'JAPAN', 'ASE'],
            ['NO', 'NORWAY', 'NORWAY', 'EUR'],
            ['GB', 'UNITED KINGDOM', 'UK', 'EUR'],
            ['DE', 'GERMANY', 'GERMANY', 'EUR'],
          ],
        },
        {
          name: 'PASSPORT_REQ',
          pk: 'CC_DEST, CC_NAT',
          desc: 'Passport requirements for nationals (CC_NAT) entering destination (CC_DEST).',
          columns: [
            { n: 'CC_DEST', t: 'CHAR(2)', k: 'pk' },
            { n: 'CC_NAT', t: 'CHAR(2)', k: 'pk' },
            { n: 'MIN_VAL_MO', t: 'NUMBER(2)' },
            { n: 'BLNK_PGS', t: 'NUMBER(1)' },
            { n: 'NOTES', t: 'CHAR(80)' },
          ],
          rows: [
            ['US', 'CA', 3, 1, 'OPEN-JAW CRUISE FROM YVR REQUIRES PASSPORT BOOK FOR US ENTRY.'],
            ['US', 'IT', 6, 1, 'PASSPORT VALID 6 MO BEYOND STAY. ESTA REQUIRED.'],
            ['US', 'JP', 6, 1, 'PASSPORT VALID 6 MO BEYOND STAY. ESTA REQUIRED.'],
            ['US', 'NO', 6, 1, 'PASSPORT VALID 6 MO BEYOND STAY. ESTA REQUIRED.'],
            ['US', 'GB', 6, 1, 'PASSPORT VALID 6 MO BEYOND STAY. ESTA REQUIRED.'],
            ['CA', 'US', 1, 1, 'PASSPORT REQUIRED FOR SEA ENTRY (NEXEXIT).'],
            ['CA', 'IT', 3, 1, 'PASSPORT + eTA REQUIRED.'],
            ['CA', 'JP', 3, 1, 'PASSPORT + eTA REQUIRED.'],
            ['NO', 'US', 3, 2, 'SCHENGEN — 3 MO BEYOND DEPARTURE FROM ZONE.'],
          ],
        },
        {
          name: 'VISA_REQ',
          pk: 'CC_DEST, CC_NAT',
          desc: 'Visa requirements. REQ_TYPE: NR not required, ESTA US e-auth, ETA Canada e-auth, VR required.',
          columns: [
            { n: 'CC_DEST', t: 'CHAR(2)', k: 'pk' },
            { n: 'CC_NAT', t: 'CHAR(2)', k: 'pk' },
            { n: 'REQ_TYPE', t: 'CHAR(4)' },
            { n: 'MAX_STAY', t: 'NUMBER(3)' },
            { n: 'FEE_USD', t: 'NUMBER(5,2)' },
          ],
          rows: [
            ['US', 'CA', 'NR', 180, 0.0],
            ['US', 'IT', 'ESTA', 90, 21.0],
            ['US', 'JP', 'ESTA', 90, 21.0],
            ['US', 'NO', 'ESTA', 90, 21.0],
            ['US', 'GB', 'ESTA', 90, 21.0],
            ['CA', 'US', 'NR', 180, 0.0],
            ['CA', 'IT', 'ETA', 180, 5.5],
            ['CA', 'JP', 'ETA', 180, 5.5],
            ['NO', 'US', 'NR', 90, 0.0],
          ],
        },
        {
          name: 'HEALTH_REQ',
          pk: 'CC_DEST, REQ_CODE',
          desc: 'Health/vaccination requirements. MAND=Y is a refusal-of-boarding trigger.',
          columns: [
            { n: 'CC_DEST', t: 'CHAR(2)', k: 'pk' },
            { n: 'REQ_CODE', t: 'CHAR(6)', k: 'pk' },
            { n: 'MAND', t: 'CHAR(1)' },
            { n: 'NOTES', t: 'CHAR(80)' },
          ],
          rows: [
            ['US', 'COV19', 'N', 'NO ENTRY RESTRICTIONS AS OF 2023-05.'],
            ['CA', 'COV19', 'N', 'NO ENTRY RESTRICTIONS AS OF 2023-04.'],
            ['NO', 'COV19', 'N', 'NO ENTRY RESTRICTIONS AS OF 2023-02.'],
          ],
        },
      ],
    }],
  },

  // 7. FX & REFERENCE DATA — OXR
  {
    id: 'fx',
    name: 'FX & Reference Data',
    summary: 'Live exchange rates. Pulled hourly and snapshotted at folio close. NOK is tracked for the Norwegian Fjords extension.',
    blocks: [{
      system: 'oxr',
      role: 'External · live FX feed (USD base)',
      tables: [
        {
          name: 'rates_latest',
          pk: 'quote',
          desc: 'Most recent rate per quote currency. Base is always USD.',
          columns: [
            { n: 'base', t: 'char(3)' },
            { n: 'quote', t: 'char(3)', k: 'pk' },
            { n: 'rate', t: 'numeric(12,6)' },
            { n: 'fetched_at', t: 'timestamptz' },
          ],
          rows: [
            ['USD', 'CAD', 1.3549, '2026-05-23 14:00:00Z'],
            ['USD', 'EUR', 0.92148, '2026-05-23 14:00:00Z'],
            ['USD', 'GBP', 0.78721, '2026-05-23 14:00:00Z'],
            ['USD', 'JPY', 154.82, '2026-05-23 14:00:00Z'],
            ['USD', 'NOK', 10.7418, '2026-05-23 14:00:00Z'],
            ['USD', 'AUD', 1.5028, '2026-05-23 14:00:00Z'],
          ],
        },
        {
          name: 'rates_history',
          pk: 'quote, fetched_at',
          desc: 'Hourly time-series for audit and dispute resolution.',
          columns: [
            { n: 'base', t: 'char(3)' },
            { n: 'quote', t: 'char(3)', k: 'pk' },
            { n: 'rate', t: 'numeric(12,6)' },
            { n: 'fetched_at', t: 'timestamptz', k: 'pk' },
          ],
          rows: [
            ['USD', 'CAD', 1.3549, '2026-05-23 14:00:00Z'],
            ['USD', 'CAD', 1.3554, '2026-05-23 13:00:00Z'],
            ['USD', 'CAD', 1.3551, '2026-05-23 12:00:00Z'],
            ['USD', 'NOK', 10.7418, '2026-05-23 14:00:00Z'],
            ['USD', 'NOK', 10.7491, '2026-05-23 13:00:00Z'],
          ],
        },
      ],
    }],
  },

  // 8. SHORE EXCURSIONS & VENDOR CATALOG — Native (Shorex-owned IP)
  {
    id: 'shorex',
    name: 'Shore Excursions & Vendor Catalog',
    summary: "Shorex's own IP. Not sourced from any legacy system — this is what Lodestone bought Shorex to manage. Vendor relationships, product catalog, port-call instances, guest tour bookings.",
    blocks: [{
      system: 'native',
      role: 'Native-owned · not in any legacy source',
      tables: [
        {
          name: 'vendor',
          pk: 'vendor_id',
          desc: 'Tour vendors per port. Reliability is 1–5; updated quarterly from cancellation rate + guest feedback.',
          columns: [
            { n: 'vendor_id', t: 'text', k: 'pk' },
            { n: 'vendor_name', t: 'text' },
            { n: 'port_id', t: 'text', k: 'fk' },
            { n: 'reliability', t: 'int' },
            { n: 'phone', t: 'text' },
          ],
          rows: [
            ['ket-misty-fjords-air', 'Misty Fjords Air & Outfitting', 'ketchikan', 3, '+1 907 225 4350'],
            ['ket-saxman-tours', 'Saxman Native Heritage Tours', 'ketchikan', 5, '+1 907 225 4846'],
            ['ket-coastal-excursions', 'Ketchikan Coastal Excursions', 'ketchikan', 4, '+1 907 247 8881'],
            ['isp-huna-heritage', 'Huna Heritage Tours', 'icy-strait-point', 5, '+1 907 945 3221'],
            ['isp-strait-wildlife', 'Icy Strait Wildlife Co.', 'icy-strait-point', 3, '+1 907 945 3490'],
            ['jnu-mendenhall-coach', 'Mendenhall Coach & Tours', 'juneau', 5, '+1 907 463 5510'],
            ['jnu-glacier-helicopters', 'Alaska Glacier Helicopters', 'juneau', 3, '+1 907 789 5600'],
            ['jnu-whale-watch', 'Juneau Whale Watch Co.', 'juneau', 4, '+1 907 586 2628'],
            ['jnu-goldbelt-shore', 'Goldbelt Shore Adventures', 'juneau', 4, '+1 907 463 3900'],
            ['sgy-klondike-rail', 'Klondike Heritage Rail', 'skagway', 5, '+1 907 983 2217'],
            ['sgy-yukon-coach', 'Yukon Discovery Coaches', 'skagway', 4, '+1 907 983 2828'],
            ['sgy-summit-tours', 'Skagway Summit Tours', 'skagway', 3, '+1 907 983 4555'],
            ['yvr-pacific-day-tours', 'Pacific Day Tours Vancouver', 'vancouver-bc', 5, '+1 604 280 4400'],
            ['swd-kenai-fjords-tours', 'Kenai Fjords Tours', 'seward', 4, '+1 907 224 8068'],
          ],
        },
        {
          name: 'tour_product',
          pk: 'product_id',
          desc: 'Excursion catalog — what Lodestone sells. list_price is per guest in USD.',
          columns: [
            { n: 'product_id', t: 'text', k: 'pk' },
            { n: 'name', t: 'text' },
            { n: 'port_id', t: 'text', k: 'fk' },
            { n: 'category', t: 'text' },
            { n: 'duration_hours', t: 'numeric(3,1)' },
            { n: 'capacity', t: 'int' },
            { n: 'list_price', t: 'numeric(7,2)' },
            { n: 'cost_per_guest', t: 'numeric(7,2)' },
            { n: 'vendor_id', t: 'text', k: 'fk' },
          ],
          rows: [
            ['sgy-white-pass-rail', 'White Pass & Yukon Heritage Railway', 'skagway', 'historical-scenic', 3.5, 200, '179.00', '108.00', 'sgy-klondike-rail'],
            ['jnu-mendenhall-salmon', 'Mendenhall Glacier & Salmon Bake', 'juneau', 'cultural-scenic', 4.0, 60, '169.00', '98.00', 'jnu-mendenhall-coach'],
            ['ket-misty-fjords-air', 'Misty Fjords Floatplane Adventure', 'ketchikan', 'scenic-aviation', 2.5, 24, '359.00', '215.00', 'ket-misty-fjords-air'],
            ['jnu-heli-dogsled', 'Mendenhall Helicopter & Glacier Dogsled', 'juneau', 'premium-adventure', 4.5, 16, '749.00', '445.00', 'jnu-glacier-helicopters'],
            ['isp-bear-storytelling', 'Hoonah Bear Search & Tlingit Storytelling', 'icy-strait-point', 'wildlife-cultural', 4.0, 28, '289.00', '172.00', 'isp-huna-heritage'],
          ],
        },
        {
          name: 'tour_instance',
          pk: 'instance_id',
          desc: 'Instance of a product on a specific port_call. capacity_held_for_onboard is reserved for ship-side sales.',
          columns: [
            { n: 'instance_id', t: 'text', k: 'pk' },
            { n: 'product_id', t: 'text', k: 'fk' },
            { n: 'port_call_id', t: 'text', k: 'fk' },
            { n: 'departure_at', t: 'timestamptz' },
            { n: 'capacity_total', t: 'int' },
            { n: 'capacity_held_for_onboard', t: 'int' },
            { n: 'sold', t: 'int' },
            { n: 'status', t: 'text' },
          ],
          rows: [
            ['ti-ktn-mistyfjords-1', 'ket-misty-fjords-air', 'pc-lds-gc01-3', '2026-06-15 08:30Z', 24, 4, 18, 'open'],
            ['ti-isp-bear-1', 'isp-bear-storytelling', 'pc-lds-gc01-4', '2026-06-16 08:00Z', 28, 6, 24, 'open'],
            ['ti-jnu-mendenhall-1', 'jnu-mendenhall-salmon', 'pc-lds-gc01-5', '2026-06-17 09:00Z', 60, 10, 54, 'open'],
            ['ti-jnu-mendenhall-2', 'jnu-mendenhall-salmon', 'pc-lds-gc01-5', '2026-06-17 13:00Z', 60, 10, 41, 'open'],
            ['ti-jnu-heli-1', 'jnu-heli-dogsled', 'pc-lds-gc01-5', '2026-06-17 08:00Z', 16, 2, 16, 'sold_out'],
            ['ti-sgy-whitepass-1', 'sgy-white-pass-rail', 'pc-lds-gc01-6', '2026-06-18 08:30Z', 200, 30, 178, 'open'],
            ['ti-sgy-whitepass-2', 'sgy-white-pass-rail', 'pc-lds-gc01-6', '2026-06-18 12:30Z', 200, 30, 142, 'open'],
          ],
        },
        {
          name: 'tour_booking',
          pk: 'tour_booking_id',
          desc: 'Guest-level excursion bookings. mapics_folio_ref links to MAPICS folio for the charge.',
          columns: [
            { n: 'tour_booking_id', t: 'text', k: 'pk' },
            { n: 'instance_id', t: 'text', k: 'fk' },
            { n: 'booking_id', t: 'text', k: 'fk' },
            { n: 'pax_count', t: 'int' },
            { n: 'sold_amount', t: 'numeric(9,2)' },
            { n: 'currency', t: 'char(3)' },
            { n: 'channel', t: 'text' },
            { n: 'mapics_folio_ref', t: 'text' },
            { n: 'sold_at', t: 'timestamptz' },
          ],
          rows: [
            ['tb-001', 'ti-ktn-mistyfjords-1', 'bk-lds-8847291', 2, '718.00', 'USD', 'pre_cruise', '88472910:1', '2026-06-08 14:22:11Z'],
            ['tb-002', 'ti-jnu-mendenhall-1', 'bk-lds-8847291', 2, '338.00', 'USD', 'pre_cruise', '88472910:2', '2026-06-08 14:25:00Z'],
            ['tb-003', 'ti-sgy-whitepass-1', 'bk-lds-8848009', 2, '358.00', 'USD', 'pre_cruise', '88480090:1', '2026-06-08 17:33:29Z'],
            ['tb-004', 'ti-jnu-heli-1', 'bk-lds-8848009', 2, '1498.00', 'USD', 'pre_cruise', '88480090:2', '2026-06-08 17:35:11Z'],
            ['tb-005', 'ti-isp-bear-1', 'bk-lds-8847583', 4, '1156.00', 'CAD', 'pre_cruise', null, '2026-06-10 09:14:00Z'],
            ['tb-006', 'ti-jnu-mendenhall-1', 'bk-lds-8847901', 1, '169.00', 'EUR', 'pre_cruise', null, '2026-06-11 18:08:00Z'],
          ],
        },
      ],
    }],
  },
];
