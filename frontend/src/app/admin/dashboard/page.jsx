import Link from 'next/link';
import './style.css';

const sidebarItems = [
  { label: 'Dashboard', href: '/admin/dashboard', active: true },
  { label: 'Analytics', href: '/admin/analytics' },
  { label: 'Map', href: '#' },
  { label: 'Complaints', href: '#' },
  { label: 'Residents', href: '#' },
  { label: 'Tenant Management', href: '#' },
  { label: 'Registered Vehicle', href: '#' },
];

const metrics = [
  {
    label: 'Pending Approvals',
    value: '24',
    detail: '7 awaiting review',
    tone: 'green',
    icon: '◌',
  },
  {
    label: 'Open Complaints',
    value: '18',
    detail: '5 escalated today',
    tone: 'red',
    icon: '⚠',
  },
  {
    label: 'Paid Residents',
    value: '92.4%',
    detail: 'collection compliance',
    tone: 'blue',
    icon: '◎',
  },
  {
    label: 'Average Resolution',
    value: '1.5 Days',
    detail: 'across all active cases',
    tone: 'purple',
    icon: '◔',
  },
];

const issueCategories = [
  { label: 'Infrastructure', value: 47, color: '#b6f0c2' },
  { label: 'Grievance', value: 22, color: '#f9d6cf' },
  { label: 'Financial', value: 16, color: '#f7ba1e' },
  { label: 'Beautification', value: 8, color: '#b8aedf' },
  { label: 'Public Relations', value: 7, color: '#aadff4' },
];

const complaintOverview = [
  { zone: 'Zone 6', value: 100 },
  { zone: 'Zone 5', value: 70 },
  { zone: 'Zone 4', value: 150 },
  { zone: 'Zone 3', value: 100 },
  { zone: 'Zone 2', value: 200 },
  { zone: 'Zone 1', value: 50 },
];

const turnoverData = [
  { month: 'Jan', moveIn: 50, moveOut: 24 },
  { month: 'Feb', moveIn: 13, moveOut: 34 },
  { month: 'Mar', moveIn: 15, moveOut: 12 },
  { month: 'Apr', moveIn: 22, moveOut: 44 },
  { month: 'May', moveIn: 13, moveOut: 46 },
  { month: 'Jun', moveIn: 35, moveOut: 24 },
  { month: 'Jul', moveIn: 13, moveOut: 10 },
  { month: 'Aug', moveIn: 4, moveOut: 3 },
  { month: 'Sep', moveIn: 5, moveOut: 14 },
  { month: 'Oct', moveIn: 17, moveOut: 4 },
  { month: 'Nov', moveIn: 5, moveOut: 3 },
  { month: 'Dec', moveIn: 4, moveOut: 3 },
];

const recentItems = [
  {
    title: 'New resident registration submitted for Lot 3-B',
    meta: 'Pending document validation',
    tone: 'neutral',
  },
  {
    title: 'Complaint C-4402 escalated from admin queue',
    meta: 'Needs director review',
    tone: 'danger',
  },
  {
    title: 'Monthly ledger export completed',
    meta: 'CSV ready for R analytics',
    tone: 'neutral',
  },
  {
    title: '2 vehicle sticker applications approved',
    meta: 'Ready for release',
    tone: 'success',
  },
];

function MetricCard({ icon, label, value, detail, tone }) {
  return (
    <article className={`ad-metric-card tone-${tone}`}>
      <div className="ad-metric-icon">{icon}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{detail}</span>
      </div>
    </article>
  );
}

function PieChartCard() {
  const total = issueCategories.reduce((sum, item) => sum + item.value, 0);
  let cumulative = 0;

  const gradients = issueCategories
    .map((item) => {
      const start = cumulative;
      cumulative += item.value;
      return `${item.color} ${((start / total) * 100).toFixed(2)}% ${((cumulative / total) * 100).toFixed(2)}%`;
    })
    .join(', ');

  return (
    <article className="ad-card ad-pie-card">
      <div className="ad-card-header">
        <div>
          <h2>Issue Categorization</h2>
          <p>Monthly volume of recorded complaints by category classification.</p>
        </div>
        <span className="ad-engine-badge">R Analytics</span>
      </div>

      <div className="ad-pie-layout">
        <div className="ad-pie-chart" style={{ background: `conic-gradient(${gradients})` }} aria-label="Issue categorization pie chart" />
        <div className="ad-pie-legend">
          {issueCategories.map((item) => (
            <div key={item.label} className="ad-legend-row">
              <span className="ad-legend-swatch" style={{ backgroundColor: item.color }} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function ComplaintsOverviewCard() {
  const maxValue = Math.max(...complaintOverview.map((item) => item.value));

  return (
    <article className="ad-card ad-overview-card">
      <div className="ad-card-header">
        <div>
          <h2>Complaints Overview</h2>
          <p>Monthly volume complaints by zone classification.</p>
        </div>
        <span className="ad-engine-badge">R Analytics</span>
      </div>

      <div className="ad-overview-bars" aria-label="Complaints by zone">
        {complaintOverview.map((item) => (
          <div key={item.zone} className="ad-overview-row">
            <span className="ad-overview-label">{item.zone}</span>
            <div className="ad-overview-track">
              <div
                className="ad-overview-fill"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function TurnoverCard() {
  const maxValue = Math.max(...turnoverData.map((item) => Math.max(item.moveIn, item.moveOut)));

  return (
    <article className="ad-card ad-turnover-card">
      <div className="ad-card-header">
        <div>
          <h2>Tenant Turnover Rate</h2>
          <p>Total moves per month</p>
        </div>
      </div>

      <div className="ad-turnover-legend">
        <span><i className="legend movein" /> Move In</span>
        <span><i className="legend moveout" /> Move Out</span>
      </div>

      <div className="ad-bar-chart" aria-label="Tenant turnover bar chart">
        {turnoverData.map((item) => (
          <div key={item.month} className="ad-bar-group">
            <div className="ad-bar-stack">
              <div className="ad-bar movein" style={{ height: `${(item.moveIn / maxValue) * 100}%` }} />
              <div className="ad-bar moveout" style={{ height: `${(item.moveOut / maxValue) * 100}%` }} />
            </div>
            <span>{item.month}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function AdminDashboardPage() {
  return (
    <main className="ad-shell">
      <aside className="ad-sidebar">
        <div className="ad-brand">
          <div className="ad-brand-mark">ZG</div>
          <div>
            <strong>ZoneGuard</strong>
            <p>NIA VILLAGE SUBD.</p>
          </div>
        </div>

        <nav className="ad-nav">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`ad-nav-item ${item.active ? 'is-active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ad-sidebar-footer">
          <button type="button" className="ad-nav-item">Account Settings</button>
          <button type="button" className="ad-nav-item">Logout</button>
        </div>
      </aside>

      <section className="ad-main">
        <header className="ad-topbar">
          <label className="ad-search">
            <span>⌕</span>
            <input type="text" placeholder="Search dashboard..." aria-label="Search dashboard" />
          </label>

          <div className="ad-user">
            <div>
              <strong>Admin</strong>
              <p>ADMINISTRATOR</p>
            </div>
            <span>AD</span>
          </div>
        </header>

        <section className="ad-hero-row">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Operational overview for approvals, complaints, payments, and resident activity.</p>
          </div>
          <div className="ad-actions">
            <button type="button" className="ad-secondary-button">Filter</button>
            <button type="button" className="ad-primary-button">Generate Report</button>
          </div>
        </section>

        <section className="ad-metrics-grid">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="ad-analytics-grid">
          <PieChartCard />
          <ComplaintsOverviewCard />
        </section>

        <section className="ad-turnover-row">
          <TurnoverCard />
        </section>

      </section>
    </main>
  );
}
