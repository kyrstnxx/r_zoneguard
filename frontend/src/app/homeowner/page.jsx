import './style.css';

const properties = [
  { name: 'Primary Residence', zone: 'Zone 3', active: true },
  { name: 'Property 1', zone: 'Zone 3' },
  { name: 'Property 2', zone: 'Zone 1' },
];

const navItems = [
  'Dashboard',
  'Payments',
  'Complaints',
  'Vehicle Sticker',
  'Tenant Management',
];

function StatCard({ icon, heading, title, value, footA, footB }) {
  return (
    <article className="zg-stat-card">
      <div className="zg-stat-icon">{icon}</div>
      <p className="zg-stat-heading">{heading}</p>
      <h3>{title}</h3>
      <p className="zg-stat-value">{value}</p>
      <div className="zg-stat-foot">
        <span>{footA}</span>
        <span>{footB}</span>
      </div>
    </article>
  );
}

export default function HomeownerPage() {
  return (
    <main className="zg-shell">
      <aside className="zg-sidebar">
        <div className="zg-brand">
          <div className="zg-logo">ZG</div>
          <div>
            <strong>ZoneGuard</strong>
            <p>NIA Village Subd.</p>
          </div>
        </div>

        <nav className="zg-nav">
          {navItems.map((item, index) => (
            <button
              key={item}
              type="button"
              className={`zg-nav-item ${index === 0 ? 'is-active' : ''}`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="zg-sidebar-bottom">
          <button type="button" className="zg-nav-item">
            Account Settings
          </button>
          <button type="button" className="zg-nav-item">
            Logout
          </button>
        </div>
      </aside>

      <section className="zg-main">
        <header className="zg-topbar">
          <div className="zg-property-tabs">
            {properties.map((property) => (
              <button
                key={property.name}
                type="button"
                className={`zg-tab ${property.active ? 'is-active' : ''}`}
              >
                {property.name} ({property.zone})
              </button>
            ))}
          </div>

          <div className="zg-user">
            <div>
              <strong>John D</strong>
              <p>HOMEOWNER</p>
            </div>
            <span>JD</span>
          </div>
        </header>

        <div className="zg-grid">
          <section className="zg-content">
            <h1>Hello, John!</h1>

            <article className="zg-card zg-dues">
              <div className="zg-dues-head">
                <div>
                  <h2>My Dues</h2>
                  <p>
                    Your monthly homeowners association dues are currently up to
                    date. Thank you for contributing to the community&apos;s growth
                    and security.
                  </p>
                </div>
                <span className="zg-pill">IN GOOD STANDING</span>
              </div>

              <div className="zg-dues-stats">
                <div>
                  <small>Current Balance</small>
                  <strong>P0.00</strong>
                </div>
                <div>
                  <small>June 2026 Payment</small>
                  <span className="zg-pill-subtle">APPROVED</span>
                </div>
                <div>
                  <small>Next Billing Cycle</small>
                  <strong className="zg-highlight">July 2026</strong>
                </div>
              </div>
            </article>

            <section className="zg-standing">
              <h2>Community Standing</h2>
              <article className="zg-card zg-badge-card">
                <div className="zg-badge-coin">
                  <span>GOLD</span>
                </div>
                <div>
                  <h3>Gold Badge Status</h3>
                  <p>
                    You are in the top 5% of residents for consistent on-time
                    payments. Keep up the great work!
                  </p>
                </div>
              </article>
            </section>

            <section className="zg-overview">
              <h2>Overview</h2>
              <div className="zg-overview-grid">
                <StatCard
                  icon="!"
                  heading="Complaints"
                  title="Active Tickets"
                  value="3"
                  footA="2 Investigating"
                  footB="1 Escalated"
                />
                <StatCard
                  icon="V"
                  heading="Vehicle Stickers"
                  title="Registered Vehicles"
                  value="5"
                  footA="2 Private"
                  footB="3 Commercial"
                />
              </div>
            </section>

            <article className="zg-service-card">
              <div>
                <h3>Service Access</h3>
                <p>
                  As a homeowner in good standing, you have full access to
                  community services and administrative request channels.
                </p>
              </div>
              <div className="zg-service-actions">
                <button type="button">Submit complaint</button>
                <button type="button">Purchase Vehicle Sticker</button>
              </div>
            </article>
          </section>

          <aside className="zg-sidepanel">
            <article className="zg-card zg-payment-card">
              <h2>Pay via QR</h2>
              <small>Scan QR code</small>
              <div className="zg-qr-box">
                <div className="zg-qr-placeholder" aria-hidden="true" />
                <p>Scan QR Code</p>
              </div>

              <small>Upload screenshot</small>
              <button type="button" className="zg-upload">
                Upload Proof of Payment
                <span>JPG, PNG (max 5MB)</span>
              </button>

              <small>Input reference number</small>
              <input type="text" placeholder="e.g. 9012345678910" />
              <button type="button" className="zg-submit">
                Submit for validation
              </button>
            </article>

            <article className="zg-card zg-hours-card">
              <h3>Office Hours</h3>
              <div className="zg-hours-row">
                <span>Weekdays</span>
                <span>8:00 AM - 5:00 PM</span>
              </div>
              <div className="zg-hours-row">
                <span>Saturdays</span>
                <span>9:00 AM - 1:30 PM</span>
              </div>
              <div className="zg-hours-row">
                <span>Sun & holidays</span>
                <span>No Office</span>
              </div>
            </article>
          </aside>
        </div>
      </section>
    </main>
  );
}
