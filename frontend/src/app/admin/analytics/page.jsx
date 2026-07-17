import Link from 'next/link';
import './style.css';

const sidebarItems = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Analytics', href: '/admin/analytics', active: true },
  { label: 'Map', href: '#' },
  { label: 'Complaints', href: '#' },
  { label: 'Residents', href: '#' },
  { label: 'Tenant Management', href: '#' },
  { label: 'Registered Vehicle', href: '#' },
];

const metrics = [
  {
    label: 'Total Households',
    value: '180',
    detail: 'active registered homes',
    tone: 'green',
    icon: '⌂',
  },
  {
    label: 'Collection Rate',
    value: '92.4%',
    detail: 'monthly dues paid',
    tone: 'purple',
    icon: '◎',
  },
  {
    label: 'Risk Index',
    value: '12.5%',
    detail: 'likely to default',
    tone: 'red',
    icon: '△',
  },
  {
    label: 'Avg. Response Time',
    value: '1.5 Hrs',
    detail: 'mean + forecast trend',
    tone: 'blue',
    icon: '◔',
  },
];

const operationalRows = [
  {
    category: 'Infrastructure',
    status: 'Stable',
    metric: '4.2 Hours',
    insight: 'Predicted spike in 3 days',
    statusTone: 'green',
  },
  {
    category: 'Monthly Dues',
    status: 'At-Risk',
    metric: 'N/A',
    insight: 'High probability of delinquency',
    statusTone: 'red',
  },
  {
    category: 'Security',
    status: 'Optimal',
    metric: '15 Minutes',
    insight: 'Decreasing trend',
    statusTone: 'green',
  },
];

function MetricCard({ icon, label, value, detail, tone }) {
  return (
    <article className={`aa-metric-card tone-${tone}`}>
      <div className="aa-metric-icon">{icon}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{detail}</span>
      </div>
    </article>
  );
}

function StatusPill({ tone, children }) {
  return <span className={`aa-status-pill tone-${tone}`}>{children}</span>;
}

export default function AdminAnalyticsPage() {
  return (
    <main className="aa-shell">
      <aside className="aa-sidebar">
        <div className="aa-brand">
          <div className="aa-brand-mark">ZG</div>
          <div>
            <strong>ZoneGuard</strong>
            <p>NIA VILLAGE SUBD.</p>
          </div>
        </div>

        <nav className="aa-nav">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`aa-nav-item ${item.active ? 'is-active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="aa-sidebar-footer">
          <button type="button" className="aa-nav-item">Account Settings</button>
          <button type="button" className="aa-nav-item">Logout</button>
        </div>
      </aside>

      <section className="aa-main">
        <header className="aa-topbar">
          <div className="aa-hero-row">
            <h1>Analytics Report</h1>
          </div>

          <div className="aa-topbar-right">
            <label className="aa-search">
              <span>⌕</span>
              <input type="text" placeholder="Search here..." aria-label="Search" />
            </label>
            <div className="aa-user">
              <div>
                <strong>Admin Analytics</strong>
                <p>ZONE 3 ADMIN</p>
              </div>
              <span>AA</span>
            </div>
          </div>
        </header>

        <div className="aa-actions">
          <button type="button" className="aa-secondary-button">Filter</button>
          <button type="button" className="aa-primary-button">Generate New Report</button>
        </div>

        <section className="aa-metrics-grid">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="aa-table-card aa-card">
          <div className="aa-section-heading">
            <div>
              <h2>Zone Operational Status</h2>
              <p>Real-time tracking across key infrastructure and service metrics.</p>
            </div>
          </div>

          <div className="aa-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Metric (Avg. Resolve)</th>
                  <th>R-Driven Insight</th>
                </tr>
              </thead>
              <tbody>
                {operationalRows.map((row) => (
                  <tr key={row.category}>
                    <td>{row.category}</td>
                    <td><StatusPill tone={row.statusTone}>{row.status}</StatusPill></td>
                    <td>{row.metric}</td>
                    <td className="aa-insight">{row.insight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="aa-bottom-grid">
          <article className="aa-card aa-chart-card">
            <div className="aa-card-header">
              <h3>Complaint Forecast</h3>
              <span className="aa-engine">Engine: forecast::auto.arima()</span>
            </div>

            <div className="aa-chart-box">
              <svg viewBox="0 0 540 280" role="img" aria-label="Complaint forecast line chart">
                <defs>
                  <linearGradient id="forecastLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4e6f9b" />
                    <stop offset="100%" stopColor="#67d4c0" />
                  </linearGradient>
                </defs>
                <g className="aa-gridlines">
                  {[40, 88, 136, 184, 232].map((y) => (
                    <line key={y} x1="46" y1={y} x2="510" y2={y} />
                  ))}
                </g>
                <polyline
                  fill="none"
                  stroke="url(#forecastLine)"
                  strokeWidth="4"
                  points="50,205 110,190 170,140 230,132 290,115 350,155 410,95 470,82 510,72"
                />
                <polyline
                  fill="none"
                  stroke="#1b2636"
                  strokeWidth="2"
                  opacity="0.25"
                  points="50,214 110,206 170,181 230,160 290,154 350,170 410,145 470,122 510,111"
                />
              </svg>
            </div>

            <p className="aa-caption">Complaint Volume Projection (Next 30 Days)</p>
            <div className="aa-footer-actions">
              <button type="button">Preview PDF</button>
              <button type="button">Download PDF</button>
            </div>
          </article>

          <article className="aa-card aa-heatmap-card">
            <div className="aa-card-header">
              <h3>Zone Heatmap</h3>
              <span className="aa-engine">Engine: geom_density2d()</span>
            </div>

            <div className="aa-heatmap-box" aria-hidden="true">
              <div className="aa-heat-glow glow-a" />
              <div className="aa-heat-glow glow-b" />
              <div className="aa-heat-glow glow-c" />
              <div className="aa-map-overlay" />
            </div>

            <p className="aa-caption">Service Demand Hotspots</p>
          </article>
        </section>
      </section>
    </main>
  );
}