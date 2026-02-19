import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area } from "recharts";

// ─── SAMPLE DATA ───────────────────────────────────────────────────────────────

const facilitators = [
  { id: "F-001", name: "Izzy Kiver", certDate: "2024-06-15", region: "Florianópolis, Brazil", cohorts: 7, status: "Active", completionRate: 95 },
  { id: "F-002", name: "Maria Santos", certDate: "2026-03-15", region: "São Paulo, Brazil", cohorts: 4, status: "Active", completionRate: 94 },
  { id: "F-003", name: "David Chen", certDate: "2026-06-01", region: "San Francisco, USA", cohorts: 3, status: "Active", completionRate: 91 },
  { id: "F-004", name: "Anya Petrova", certDate: "2026-01-20", region: "Tel Aviv, Israel", cohorts: 5, status: "Active", completionRate: 97 },
  { id: "F-005", name: "James Okafor", certDate: "2026-08-10", region: "Lagos, Nigeria", cohorts: 2, status: "Active", completionRate: 88 },
  { id: "F-006", name: "Elena Varga", certDate: "2026-04-22", region: "Budapest, Hungary", cohorts: 3, status: "Active", completionRate: 92 },
  { id: "F-007", name: "Carlos Mendez", certDate: "2026-11-05", region: "Medellín, Colombia", cohorts: 1, status: "Active", completionRate: 90 },
  { id: "F-008", name: "Rachel Kim", certDate: "2025-09-12", region: "Seoul, South Korea", cohorts: 6, status: "Active", completionRate: 96 },
  { id: "F-009", name: "Thomas Weber", certDate: "2026-07-18", region: "Berlin, Germany", cohorts: 2, status: "Inactive", completionRate: 85 },
];

const cohorts = [
  { id: "C-2024-001", facilitator: "Anya Petrova", start: "2024-02-01", end: "2024-04-15", enrolled: 14, completed: 13, location: "Tel Aviv", mode: "In-Person", pciImprovement: 78, projectsLink: "#" },
  { id: "C-2024-002", facilitator: "Maria Santos", start: "2024-04-01", end: "2024-06-15", enrolled: 18, completed: 17, location: "São Paulo", mode: "Hybrid", pciImprovement: 85, projectsLink: "#" },
  { id: "C-2024-003", facilitator: "David Chen", start: "2024-05-10", end: "2024-07-20", enrolled: 12, completed: 11, location: "San Francisco", mode: "Virtual", pciImprovement: 73, projectsLink: "#" },
  { id: "C-2024-004", facilitator: "Rachel Kim", start: "2024-06-01", end: "2024-08-15", enrolled: 16, completed: 16, location: "Seoul", mode: "In-Person", pciImprovement: 91, projectsLink: "#" },
  { id: "C-2024-005", facilitator: "Elena Varga", start: "2024-07-15", end: "2024-09-30", enrolled: 11, completed: 10, location: "Budapest", mode: "Virtual", pciImprovement: 70, projectsLink: "#" },
  { id: "C-2024-006", facilitator: "James Okafor", start: "2024-08-20", end: "2024-11-01", enrolled: 20, completed: 17, location: "Lagos", mode: "In-Person", pciImprovement: 82, projectsLink: "#" },
  { id: "C-2024-007", facilitator: "Maria Santos", start: "2024-09-01", end: "2024-11-15", enrolled: 15, completed: 14, location: "Florianópolis", mode: "Hybrid", pciImprovement: 89, projectsLink: "#" },
  { id: "C-2024-008", facilitator: "Anya Petrova", start: "2024-10-01", end: "2024-12-15", enrolled: 13, completed: 13, location: "Haifa", mode: "In-Person", pciImprovement: 96, projectsLink: "#" },
];

const students = [
  { id: "S-0001", cohort: "C-2024-001", pciPre: 32, pciPost: 71, project: "Redemption Documentary Film", type: "Media", link: "https://coveofedu.org/member_journeys/redemption-movie/", mo6: "Active - 10k viewers", mo12: "Sustained - growing audience", nps: 10 },
  { id: "S-0002", cohort: "C-2024-001", pciPre: 28, pciPost: 65, project: "Agentic RAG Coach", type: "Tech", link: "https://coveofedu.org/member_journeys/agentic-retrieval-augmented-generationragsystems/", mo6: "Active - 120 users", mo12: "Growing - scaling", nps: 9 },
  { id: "S-0003", cohort: "C-2024-002", pciPre: 41, pciPost: 82, project: "Community Garden Initiative", type: "Community", link: "#", mo6: "Active - 3 gardens launched", mo12: "Expanded to 7 sites", nps: 10 },
  { id: "S-0004", cohort: "C-2024-002", pciPre: 22, pciPost: 68, project: "Teen Mental Health Zine", type: "Media", link: "#", mo6: "Active - 800 copies distributed", mo12: "Pending", nps: 9 },
  { id: "S-0005", cohort: "C-2024-003", pciPre: 35, pciPost: 70, project: "EcoTrack Dashboard", type: "Tech", link: "#", mo6: "Beta - 150 users", mo12: "Pending", nps: 8 },
  { id: "S-0006", cohort: "C-2024-004", pciPre: 19, pciPost: 67, project: "Heritage Stories Documentary", type: "Media", link: "#", mo6: "Screening at 2 festivals", mo12: "Pending", nps: 10 },
  { id: "S-0007", cohort: "C-2024-004", pciPre: 44, pciPost: 88, project: "Peer Tutoring Network", type: "Education", link: "#", mo6: "Active - 60 students served", mo12: "Pending", nps: 10 },
  { id: "S-0008", cohort: "C-2024-005", pciPre: 30, pciPost: 62, project: "Social Impact Newsletter", type: "Media", link: "#", mo6: "In progress", mo12: "Pending", nps: 8 },
  { id: "S-0009", cohort: "C-2024-006", pciPre: 25, pciPost: 69, project: "Clean Water Mapping Tool", type: "Tech", link: "#", mo6: "Pending", mo12: "Pending", nps: 9 },
  { id: "S-0010", cohort: "C-2024-006", pciPre: 38, pciPost: 77, project: "Girls in STEM Workshop Series", type: "Education", link: "#", mo6: "Pending", mo12: "Pending", nps: 10 },
  { id: "S-0011", cohort: "C-2024-007", pciPre: 27, pciPost: 73, project: "Favela Art Collective", type: "Community", link: "#", mo6: "Pending", mo12: "Pending", nps: 9 },
  { id: "S-0012", cohort: "C-2024-008", pciPre: 33, pciPost: 80, project: "Interfaith Dialogue Platform", type: "Social Impact", link: "#", mo6: "Pending", mo12: "Pending", nps: 10 },
];

const projects = [
  { title: "Redemption Documentary Film", students: "S-0001", category: "Media", status: "Launched", validation: "https://coveofedu.org/member_journeys/redemption-movie/", metrics: "10,000+ viewers · Festival screenings · Community impact" },
  { title: "Agentic RAG Coach", students: "S-0002", category: "Tech", status: "Launched", validation: "https://coveofedu.org/member_journeys/agentic-retrieval-augmented-generationragsystems/", metrics: "120 active users · AI-powered coaching platform" },
  { title: "Community Garden Initiative", students: "S-0003", category: "Community", status: "Launched", validation: "#", metrics: "7 garden sites · 150+ families served" },
  { title: "Teen Mental Health Zine", students: "S-0004", category: "Media", status: "Launched", validation: "#", metrics: "800 copies distributed · 3 school adoptions" },
  { title: "EcoTrack Dashboard", students: "S-0005", category: "Tech", status: "In Development", validation: "#", metrics: "150 beta users · Carbon tracking for 2 schools" },
  { title: "Heritage Stories Documentary", students: "S-0006", category: "Media", status: "Launched", validation: "#", metrics: "2 film festival screenings · 4,000 online views" },
  { title: "Peer Tutoring Network", students: "S-0007", category: "Education", status: "Launched", validation: "#", metrics: "60 students served · GPA avg +0.4 improvement" },
  { title: "Clean Water Mapping Tool", students: "S-0009", category: "Tech", status: "In Development", validation: "#", metrics: "Mapping 3 districts in Lagos" },
  { title: "Girls in STEM Workshop Series", students: "S-0010", category: "Education", status: "Launched", validation: "#", metrics: "45 girls enrolled · 3 workshops completed" },
  { title: "Favela Art Collective", students: "S-0011", category: "Community", status: "In Development", validation: "#", metrics: "12 artists · First exhibition planned" },
  { title: "Interfaith Dialogue Platform", students: "S-0012", category: "Social Impact", status: "In Development", validation: "#", metrics: "Beta with 3 community orgs" },
];

const audits = [
  { date: "2026-01-15", org: "Impact Metrics Institute", scope: "Student outcome verification — PCI methodology & data integrity", findings: "All reported PCI scores verified. Methodology rated 'robust' with minor recommendations.", recommendations: "Add qualitative interviews to complement quantitative PCI. Expand 12-month tracking.", link: "#" },
  { date: "2025-09-20", org: "Nonprofit Standards Council", scope: "Financial & operational audit — FY2025", findings: "Clean audit. All donor funds accounted for. Overhead ratio at 18%.", recommendations: "Implement automated financial reporting. Consider restricted fund accounting.", link: "#" },
  { date: "2025-06-10", org: "EdTech Evaluation Partners", scope: "Curriculum & pedagogy review — The 7 Teachings framework", findings: "Framework rated 'highly effective' for adolescent purpose development. Strong alignment with positive psychology research.", recommendations: "Develop facilitator calibration protocol. Add cross-cultural adaptation guidelines.", link: "#" },
];

// ─── STYLES ────────────────────────────────────────────────────────────────────

const palette = {
  bg: "#0B1120",
  bgCard: "#111827",
  bgCardHover: "#1a2332",
  border: "#1e2d3d",
  borderLight: "#2a3a4d",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  textDim: "#64748b",
  accent: "#d4a053",
  accentLight: "#e8c47a",
  accentDim: "rgba(212,160,83,0.15)",
  green: "#34d399",
  greenDim: "rgba(52,211,153,0.15)",
  blue: "#60a5fa",
  blueDim: "rgba(96,165,250,0.15)",
  red: "#f87171",
  redDim: "rgba(248,113,113,0.15)",
  purple: "#a78bfa",
  purpleDim: "rgba(167,139,250,0.15)",
  cyan: "#22d3ee",
  white: "#ffffff",
};

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const isActive = status === "Active" || status === "Launched";
  const isDev = status === "In Development";
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.03em",
      background: isActive ? palette.greenDim : isDev ? palette.blueDim : palette.redDim,
      color: isActive ? palette.green : isDev ? palette.blue : palette.red,
      border: `1px solid ${isActive ? "rgba(52,211,153,0.3)" : isDev ? "rgba(96,165,250,0.3)" : "rgba(248,113,113,0.3)"}`,
    }}>
      {status}
    </span>
  );
};

const MetricCard = ({ label, value, sub, icon, color = palette.accent }) => (
  <div style={{
    background: palette.bgCard,
    border: `1px solid ${palette.border}`,
    borderRadius: 12,
    padding: "22px 24px",
    flex: "1 1 180px",
    minWidth: 180,
    position: "relative",
    overflow: "hidden",
  }}>
    <div style={{
      position: "absolute", top: -8, right: -8,
      width: 60, height: 60, borderRadius: "50%",
      background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
    }} />
    <div style={{ fontSize: 11, color: palette.textDim, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 8 }}>
      {icon && <span style={{ marginRight: 6 }}>{icon}</span>}{label}
    </div>
    <div style={{ fontSize: 32, fontWeight: 700, color: palette.white, fontFamily: "'DM Serif Display', Georgia, serif", lineHeight: 1.1 }}>
      {value}
    </div>
    {sub && <div style={{ fontSize: 12, color: palette.textMuted, marginTop: 6 }}>{sub}</div>}
  </div>
);

const Table = ({ columns, data, maxHeight }) => (
  <div style={{ overflowX: "auto", overflowY: maxHeight ? "auto" : "visible", maxHeight: maxHeight || "none", borderRadius: 10, border: `1px solid ${palette.border}` }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i} style={{
              padding: "12px 14px",
              textAlign: "left",
              background: "rgba(212,160,83,0.06)",
              color: palette.accent,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderBottom: `1px solid ${palette.border}`,
              position: "sticky",
              top: 0,
              zIndex: 1,
              whiteSpace: "nowrap",
            }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, ri) => (
          <tr key={ri} style={{
            background: ri % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(212,160,83,0.04)"}
          onMouseLeave={e => e.currentTarget.style.background = ri % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)"}
          >
            {columns.map((col, ci) => (
              <td key={ci} style={{
                padding: "11px 14px",
                borderBottom: `1px solid ${palette.border}`,
                color: palette.text,
                whiteSpace: col.nowrap ? "nowrap" : "normal",
              }}>
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom: 20, marginTop: 8 }}>
    <h3 style={{ fontSize: 18, fontWeight: 700, color: palette.white, fontFamily: "'DM Serif Display', Georgia, serif", margin: 0 }}>{children}</h3>
    {sub && <p style={{ fontSize: 13, color: palette.textDim, margin: "4px 0 0 0" }}>{sub}</p>}
  </div>
);

// ─── TAB CONTENT ───────────────────────────────────────────────────────────────

const AggregateTab = () => {
  const totalFacilitators = facilitators.filter(f => f.status === "Active").length;
  const totalStudents = cohorts.reduce((s, c) => s + c.completed, 0);
  const avgPCI = Math.round(cohorts.reduce((s, c) => s + c.pciImprovement, 0) / cohorts.length);
  const projectLaunchRate = Math.round((projects.filter(p => p.status === "Launched").length / students.length) * 100);
  const avgNPS = (students.reduce((s, st) => s + st.nps, 0) / students.length).toFixed(1);
  const costPerTransformation = "$1,800";

  const pciTrend = cohorts.map(c => ({ name: c.id.replace("C-2024-", "Q"), pci: c.pciImprovement }));
  const geoData = [
    { name: "Brazil", value: 45 }, { name: "USA", value: 11 }, { name: "Israel", value: 26 },
    { name: "Nigeria", value: 17 }, { name: "Hungary", value: 10 }, { name: "S. Korea", value: 16 },
    { name: "Colombia", value: 8 },
  ];
  const geoColors = [palette.accent, palette.blue, palette.green, palette.purple, palette.cyan, palette.red, "#f59e0b"];

  const npsData = [
    { label: "Promoters (9-10)", value: 10, color: palette.green },
    { label: "Passives (7-8)", value: 2, color: palette.accent },
    { label: "Detractors (0-6)", value: 0, color: palette.red },
  ];

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 32 }}>
        <MetricCard icon="👥" label="Active Facilitators" value={totalFacilitators} sub="across 7 countries" color={palette.blue} />
        <MetricCard icon="🎓" label="Students Completed" value={totalStudents} sub="93% avg completion rate" color={palette.green} />
        <MetricCard icon="📈" label="Avg PCI Improvement" value={`+${avgPCI}%`} sub="Purpose Clarity Index (pre→post)" color={palette.accent} />
        <MetricCard icon="🚀" label="Project Launch Rate" value={`${projectLaunchRate}%`} sub="of graduates launching real projects" color={palette.purple} />
        <MetricCard icon="⭐" label="Net Promoter Score" value={avgNPS} sub="across all cohorts" color={palette.cyan} />
        <MetricCard icon="💰" label="Cost per Transformation" value={costPerTransformation} sub="fully loaded per graduate" color={palette.accent} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        <div style={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 22 }}>
          <SectionTitle sub="Average Purpose Clarity Index improvement by cohort">PCI Improvement Trend</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={pciTrend}>
              <defs>
                <linearGradient id="pciGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={palette.accent} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={palette.accent} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={palette.border} />
              <XAxis dataKey="name" tick={{ fill: palette.textDim, fontSize: 11 }} axisLine={{ stroke: palette.border }} />
              <YAxis tick={{ fill: palette.textDim, fontSize: 11 }} axisLine={{ stroke: palette.border }} domain={[0, 100]} unit="%" />
              <Tooltip contentStyle={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: 8, color: palette.text, fontSize: 13 }} />
              <Area type="monotone" dataKey="pci" stroke={palette.accent} fill="url(#pciGrad)" strokeWidth={2.5} dot={{ fill: palette.accent, r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 22 }}>
          <SectionTitle sub="Students served by country">Geographic Spread</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={geoData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {geoData.map((entry, i) => <Cell key={i} fill={geoColors[i % geoColors.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: 8, color: palette.text, fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 4 }}>
            {geoData.map((g, i) => (
              <span key={i} style={{ fontSize: 11, color: palette.textMuted, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: geoColors[i], display: "inline-block" }} />
                {g.name} ({g.value})
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 22 }}>
        <SectionTitle sub="Net Promoter Score breakdown across all cohorts">NPS Distribution</SectionTitle>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {npsData.map((d, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: d.color, fontFamily: "'DM Serif Display', Georgia, serif" }}>{d.value}</div>
              <div style={{ fontSize: 11, color: palette.textDim, marginTop: 4 }}>{d.label}</div>
            </div>
          ))}
          <div style={{ flex: 1, textAlign: "center", borderLeft: `1px solid ${palette.border}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: palette.green, fontFamily: "'DM Serif Display', Georgia, serif" }}>100</div>
            <div style={{ fontSize: 11, color: palette.textDim, marginTop: 4 }}>NPS Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FacilitatorsTab = () => {
  const completionData = facilitators.filter(f => f.status === "Active").map(f => ({ name: f.name.split(" ")[0], rate: f.completionRate, cohorts: f.cohorts }));

  return (
    <div>
      <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
        <MetricCard icon="👥" label="Total Certified" value={facilitators.length} sub={`${facilitators.filter(f => f.status === "Active").length} active`} />
        <MetricCard icon="📊" label="Avg Completion Rate" value={`${Math.round(facilitators.reduce((s, f) => s + f.completionRate, 0) / facilitators.length)}%`} color={palette.green} />
        <MetricCard icon="🌍" label="Countries" value="7" sub="across 4 continents" color={palette.blue} />
      </div>

      <div style={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 22, marginBottom: 24 }}>
        <SectionTitle sub="Cohort completion rate by active facilitator">Facilitator Performance</SectionTitle>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={completionData} layout="vertical" barCategoryGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke={palette.border} />
            <XAxis type="number" domain={[80, 100]} tick={{ fill: palette.textDim, fontSize: 11 }} unit="%" axisLine={{ stroke: palette.border }} />
            <YAxis type="category" dataKey="name" width={65} tick={{ fill: palette.textMuted, fontSize: 11 }} axisLine={{ stroke: palette.border }} />
            <Tooltip contentStyle={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: 8, color: palette.text, fontSize: 13 }} />
            <Bar dataKey="rate" fill={palette.accent} radius={[0, 4, 4, 0]} barSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Table
        columns={[
          { key: "id", label: "ID", nowrap: true },
          { key: "name", label: "Facilitator", render: r => <span style={{ fontWeight: 600, color: palette.white }}>{r.name}</span> },
          { key: "certDate", label: "Certified" },
          { key: "region", label: "Region" },
          { key: "cohorts", label: "Cohorts", render: r => <span style={{ color: palette.accent, fontWeight: 600 }}>{r.cohorts}</span> },
          { key: "status", label: "Status", render: r => <StatusBadge status={r.status} /> },
          { key: "completionRate", label: "Completion %", render: r => (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 60, height: 6, background: palette.border, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${r.completionRate}%`, height: "100%", background: r.completionRate >= 90 ? palette.green : palette.accent, borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 12, color: palette.textMuted }}>{r.completionRate}%</span>
            </div>
          )},
        ]}
        data={facilitators}
      />
    </div>
  );
};

const CohortsTab = () => {
  const pciData = cohorts.map(c => ({ name: c.id.replace("C-2024-00", "#"), improvement: c.pciImprovement, enrolled: c.enrolled }));

  return (
    <div>
      <div style={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 22, marginBottom: 24 }}>
        <SectionTitle sub="Purpose Clarity Index improvement by cohort (%)">PCI Improvement Across Cohorts</SectionTitle>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={pciData}>
            <CartesianGrid strokeDasharray="3 3" stroke={palette.border} />
            <XAxis dataKey="name" tick={{ fill: palette.textDim, fontSize: 11 }} axisLine={{ stroke: palette.border }} />
            <YAxis tick={{ fill: palette.textDim, fontSize: 11 }} unit="%" axisLine={{ stroke: palette.border }} />
            <Tooltip contentStyle={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: 8, color: palette.text, fontSize: 13 }} />
            <Bar dataKey="improvement" fill={palette.accent} radius={[4, 4, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Table
        columns={[
          { key: "id", label: "Cohort ID", nowrap: true, render: r => <span style={{ fontFamily: "monospace", fontSize: 12 }}>{r.id}</span> },
          { key: "facilitator", label: "Facilitator", render: r => <span style={{ fontWeight: 600, color: palette.blue }}>{r.facilitator}</span> },
          { key: "start", label: "Start" },
          { key: "end", label: "End" },
          { key: "enrolled", label: "Enrolled" },
          { key: "completed", label: "Completed", render: r => <span style={{ color: palette.green, fontWeight: 600 }}>{r.completed}</span> },
          { key: "location", label: "Location" },
          { key: "mode", label: "Mode", render: r => (
            <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 11, background: r.mode === "In-Person" ? palette.greenDim : r.mode === "Virtual" ? palette.blueDim : palette.purpleDim, color: r.mode === "In-Person" ? palette.green : r.mode === "Virtual" ? palette.blue : palette.purple }}>
              {r.mode}
            </span>
          )},
          { key: "pciImprovement", label: "PCI Δ", render: r => <span style={{ color: palette.accent, fontWeight: 700 }}>+{r.pciImprovement}%</span> },
        ]}
        data={cohorts}
      />
    </div>
  );
};

const StudentsTab = () => {
  const pciScatter = students.map(s => ({ name: s.id, pre: s.pciPre, post: s.pciPost, gain: s.pciPost - s.pciPre }));

  return (
    <div>
      <div style={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 22, marginBottom: 24 }}>
        <SectionTitle sub="Pre vs Post Purpose Clarity Index scores (anonymized)">Individual PCI Transformation</SectionTitle>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={pciScatter}>
            <CartesianGrid strokeDasharray="3 3" stroke={palette.border} />
            <XAxis dataKey="name" tick={{ fill: palette.textDim, fontSize: 10 }} axisLine={{ stroke: palette.border }} />
            <YAxis tick={{ fill: palette.textDim, fontSize: 11 }} domain={[0, 100]} axisLine={{ stroke: palette.border }} />
            <Tooltip contentStyle={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: 8, color: palette.text, fontSize: 13 }} />
            <Bar dataKey="pre" fill={palette.textDim} radius={[4, 4, 0, 0]} barSize={12} name="Pre-PCI" />
            <Bar dataKey="post" fill={palette.green} radius={[4, 4, 0, 0]} barSize={12} name="Post-PCI" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Table
        maxHeight={380}
        columns={[
          { key: "id", label: "Student", nowrap: true, render: r => <span style={{ fontFamily: "monospace", fontSize: 12 }}>{r.id}</span> },
          { key: "cohort", label: "Cohort", nowrap: true },
          { key: "pciPre", label: "PCI (Pre)", render: r => <span style={{ color: palette.textDim }}>{r.pciPre}</span> },
          { key: "pciPost", label: "PCI (Post)", render: r => <span style={{ color: palette.green, fontWeight: 600 }}>{r.pciPost}</span> },
          { key: "project", label: "Project", render: r => <span style={{ fontWeight: 600, color: palette.white }}>{r.project}</span> },
          { key: "type", label: "Type", render: r => (
            <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 11, background: palette.accentDim, color: palette.accent }}>{r.type}</span>
          )},
          { key: "nps", label: "NPS", render: r => <span style={{ color: r.nps >= 9 ? palette.green : palette.accent, fontWeight: 700 }}>{r.nps}</span> },
          { key: "mo6", label: "6-Month", render: r => <span style={{ fontSize: 12, color: palette.textMuted }}>{r.mo6}</span> },
        ]}
        data={students}
      />
    </div>
  );
};

const ProjectsTab = () => {
  const catData = ["Media", "Tech", "Community", "Education", "Social Impact"].map(cat => ({
    name: cat,
    count: projects.filter(p => p.category === cat).length,
  }));
  const catColors = [palette.accent, palette.blue, palette.green, palette.purple, palette.cyan];

  return (
    <div>
      <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
        <MetricCard icon="🚀" label="Total Projects" value={projects.length} color={palette.blue} />
        <MetricCard icon="✅" label="Launched" value={projects.filter(p => p.status === "Launched").length} color={palette.green} />
        <MetricCard icon="🔧" label="In Development" value={projects.filter(p => p.status === "In Development").length} color={palette.accent} />
      </div>

      <div style={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 22, marginBottom: 24 }}>
        <SectionTitle sub="Projects by impact category">Category Distribution</SectionTitle>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={catData}>
            <CartesianGrid strokeDasharray="3 3" stroke={palette.border} />
            <XAxis dataKey="name" tick={{ fill: palette.textDim, fontSize: 11 }} axisLine={{ stroke: palette.border }} />
            <YAxis tick={{ fill: palette.textDim, fontSize: 11 }} axisLine={{ stroke: palette.border }} allowDecimals={false} />
            <Tooltip contentStyle={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: 8, color: palette.text, fontSize: 13 }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={32}>
              {catData.map((_, i) => <Cell key={i} fill={catColors[i % catColors.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Table
        columns={[
          { key: "title", label: "Project", render: r => <span style={{ fontWeight: 600, color: palette.white }}>{r.title}</span> },
          { key: "category", label: "Category", render: r => (
            <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 11, background: palette.accentDim, color: palette.accent }}>{r.category}</span>
          )},
          { key: "status", label: "Status", render: r => <StatusBadge status={r.status} /> },
          { key: "metrics", label: "Real-World Impact", render: r => <span style={{ fontSize: 12, color: palette.textMuted }}>{r.metrics}</span> },
          { key: "validation", label: "Verify", render: r => <a href={r.validation} target="_blank" rel="noopener noreferrer" style={{ color: palette.blue, cursor: "pointer", fontSize: 12, textDecoration: "none" }}>🔗 View proof</a> },
        ]}
        data={projects}
      />
    </div>
  );
};

const AuditsTab = () => (
  <div>
    <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
      <MetricCard icon="🔍" label="Total Audits" value={audits.length} color={palette.blue} />
      <MetricCard icon="✅" label="Clean Findings" value="3/3" sub="no critical issues" color={palette.green} />
      <MetricCard icon="📅" label="Last Audit" value="Jan 2026" color={palette.accent} />
    </div>

    {audits.map((a, i) => (
      <div key={i} style={{
        background: palette.bgCard,
        border: `1px solid ${palette.border}`,
        borderRadius: 12,
        padding: 24,
        marginBottom: 16,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: palette.white, fontFamily: "'DM Serif Display', Georgia, serif" }}>{a.org}</div>
            <div style={{ fontSize: 12, color: palette.textDim, marginTop: 2 }}>{a.date}</div>
          </div>
          <span style={{ color: palette.blue, fontSize: 12, cursor: "pointer" }}>📄 Full Report</span>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 10, color: palette.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Scope</div>
          <div style={{ fontSize: 13, color: palette.text }}>{a.scope}</div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 10, color: palette.green, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Findings</div>
          <div style={{ fontSize: 13, color: palette.text }}>{a.findings}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: palette.purple, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Recommendations</div>
          <div style={{ fontSize: 13, color: palette.textMuted }}>{a.recommendations}</div>
        </div>
      </div>
    ))}
  </div>
);

// ─── MAIN DASHBOARD ────────────────────────────────────────────────────────────

const tabs = [
  { key: "aggregate", label: "Overview", icon: "◉" },
  { key: "facilitators", label: "Facilitators", icon: "👥" },
  { key: "cohorts", label: "Cohorts", icon: "📋" },
  { key: "students", label: "Student Outcomes", icon: "🎓" },
  { key: "projects", label: "Public Impact", icon: "🚀" },
  { key: "audits", label: "Audits & Validation", icon: "🔍" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("aggregate");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(true); }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "aggregate": return <AggregateTab />;
      case "facilitators": return <FacilitatorsTab />;
      case "cohorts": return <CohortsTab />;
      case "students": return <StudentsTab />;
      case "projects": return <ProjectsTab />;
      case "audits": return <AuditsTab />;
      default: return <AggregateTab />;
    }
  };

  return (
    <div style={{
      fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif",
      background: palette.bg,
      color: palette.text,
      minHeight: "100vh",
      padding: 0,
      transition: "opacity 0.5s",
      opacity: loaded ? 1 : 0,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        padding: "28px 32px 0 32px",
        borderBottom: `1px solid ${palette.border}`,
        background: `linear-gradient(180deg, rgba(212,160,83,0.04) 0%, transparent 100%)`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: `linear-gradient(135deg, ${palette.accent} 0%, ${palette.accentLight} 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 16, color: palette.bg,
          }}>C</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: palette.white, fontFamily: "'DM Serif Display', Georgia, serif", letterSpacing: "-0.01em" }}>
              Covenant of Education
            </h1>
            <div style={{ fontSize: 12, color: palette.textDim, marginTop: 1 }}>Impact Dashboard · Live Data · Radically Transparent</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginTop: 18, overflowX: "auto" }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                background: "none",
                border: "none",
                borderBottom: activeTab === t.key ? `2px solid ${palette.accent}` : "2px solid transparent",
                padding: "10px 18px",
                color: activeTab === t.key ? palette.accent : palette.textDim,
                fontSize: 13,
                fontWeight: activeTab === t.key ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
              onMouseEnter={e => { if (activeTab !== t.key) e.target.style.color = palette.textMuted; }}
              onMouseLeave={e => { if (activeTab !== t.key) e.target.style.color = palette.textDim; }}
            >
              <span style={{ marginRight: 6 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ padding: "28px 32px 40px 32px", maxWidth: 1100 }}>
        {renderTab()}
      </div>

      {/* Footer */}
      <div style={{
        padding: "16px 32px",
        borderTop: `1px solid ${palette.border}`,
        textAlign: "center",
        fontSize: 11,
        color: palette.textDim,
      }}>
        Covenant of Education © 2026 · Data updated in real-time · Independently audited · <span style={{ color: palette.accent }}>Radical transparency by design</span>
      </div>
    </div>
  );
}
