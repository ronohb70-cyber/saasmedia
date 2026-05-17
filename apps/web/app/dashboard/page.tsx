import styles from './overview.module.css';

export default function DashboardOverview() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, Admin</h1>
          <p className={styles.subtitle}>Here is what's happening with your accounts today.</p>
        </div>
        <button className="btn btn-primary">Create Post</button>
      </header>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} glass`}>
          <div className={styles.statHeader}>Total Posts</div>
          <div className={styles.statValue}>1,284</div>
          <div className={styles.statTrend}>+12% from last month</div>
        </div>
        <div className={`${styles.statCard} glass`}>
          <div className={styles.statHeader}>Engagement Rate</div>
          <div className={styles.statValue}>4.8%</div>
          <div className={styles.statTrend}>+0.5% from last month</div>
        </div>
        <div className={`${styles.statCard} glass`}>
          <div className={styles.statHeader}>Scheduled Posts</div>
          <div className={styles.statValue}>24</div>
          <div className={styles.statTrend}>Next post in 2 hours</div>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={`${styles.activityList} glass`}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.activityItem}>
              <div className={styles.activityIcon}></div>
              <div className={styles.activityDetails}>
                <p className={styles.activityText}>Published a post to <strong>Facebook</strong></p>
                <p className={styles.activityTime}>{i * 2} hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
