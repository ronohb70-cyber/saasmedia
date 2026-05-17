import styles from './settings.module.css';

export default function SettingsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your workspace preferences and billing</p>
      </header>

      <div className={styles.sections}>
        {/* Profile */}
        <section className={`${styles.section} glass`}>
          <h2 className={styles.sectionTitle}>Profile</h2>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Full name</label>
              <input className={styles.input} defaultValue="Admin User" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input className={styles.input} type="email" defaultValue="admin@demo.com" />
            </div>
          </div>
          <button className="btn btn-primary">Save changes</button>
        </section>

        {/* Organization */}
        <section className={`${styles.section} glass`}>
          <h2 className={styles.sectionTitle}>Organization</h2>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Organization name</label>
              <input className={styles.input} defaultValue="Acme Inc." />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Slug</label>
              <input className={styles.input} defaultValue="acme-inc" />
            </div>
          </div>
          <button className="btn btn-primary">Update organization</button>
        </section>

        {/* Billing */}
        <section className={`${styles.section} glass`}>
          <h2 className={styles.sectionTitle}>Billing & Plan</h2>
          <div className={styles.planCard}>
            <div>
              <p className={styles.planName}>Pro Plan</p>
              <p className={styles.planDetail}>$49/month · Renews June 17, 2026</p>
            </div>
            <div className={styles.planBadge}>Active</div>
          </div>
          <div className={styles.planFeatures}>
            {['Unlimited posts', '6 social platforms', '5 team members', 'Advanced analytics', 'Priority support'].map((f) => (
              <div key={f} className={styles.feature}>
                <span className={styles.checkIcon}>✓</span> {f}
              </div>
            ))}
          </div>
          <button className={`btn ${styles.manageBtn}`}>Manage subscription →</button>
        </section>

        {/* Danger Zone */}
        <section className={`${styles.section} ${styles.dangerSection} glass`}>
          <h2 className={`${styles.sectionTitle} ${styles.dangerTitle}`}>Danger Zone</h2>
          <p className={styles.dangerText}>
            Permanently delete your organization and all associated data. This action cannot be undone.
          </p>
          <button className={`btn ${styles.dangerBtn}`}>Delete organization</button>
        </section>
      </div>
    </div>
  );
}
