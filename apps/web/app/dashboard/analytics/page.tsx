import styles from './analytics.module.css';

const platforms = [
  { name: 'Facebook', color: '#1877f2', reach: 48200, engagement: 5.2, posts: 142, growth: '+8.3%' },
  { name: 'Instagram', color: '#e1306c', reach: 92500, engagement: 7.8, posts: 198, growth: '+14.1%' },
  { name: 'LinkedIn', color: '#0a66c2', reach: 21000, engagement: 3.9, posts: 64, growth: '+5.7%' },
  { name: 'X', color: '#ffffff', reach: 33400, engagement: 2.4, posts: 310, growth: '+2.1%' },
  { name: 'TikTok', color: '#69c9d0', reach: 115000, engagement: 9.6, posts: 48, growth: '+32.5%' },
];

const weeklyData = [
  { day: 'Mon', posts: 4, reach: 12400 },
  { day: 'Tue', posts: 7, reach: 18900 },
  { day: 'Wed', posts: 5, reach: 14200 },
  { day: 'Thu', posts: 9, reach: 26800 },
  { day: 'Fri', posts: 12, reach: 38500 },
  { day: 'Sat', posts: 6, reach: 19100 },
  { day: 'Sun', posts: 3, reach: 9200 },
];

const maxReach = Math.max(...weeklyData.map((d) => d.reach));

export default function AnalyticsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Analytics</h1>
          <p className={styles.subtitle}>Performance insights across all your connected platforms</p>
        </div>
        <div className={styles.dateRange}>
          <button className={`btn ${styles.dateBtn}`}>Last 7 days</button>
          <button className={`btn ${styles.dateBtn} ${styles.dateBtnActive}`}>Last 30 days</button>
          <button className={`btn ${styles.dateBtn}`}>Last 90 days</button>
        </div>
      </header>

      {/* Top KPI cards */}
      <div className={styles.kpiGrid}>
        {[
          { label: 'Total Reach', value: '310,100', trend: '+18.4%', trendUp: true, icon: '📡' },
          { label: 'Avg. Engagement', value: '5.8%', trend: '+0.9%', trendUp: true, icon: '💬' },
          { label: 'Total Posts', value: '762', trend: '+43 this month', trendUp: true, icon: '📝' },
          { label: 'Clicks', value: '24,890', trend: '-3.2%', trendUp: false, icon: '🖱️' },
        ].map((kpi) => (
          <div key={kpi.label} className={`${styles.kpiCard} glass`}>
            <div className={styles.kpiIcon}>{kpi.icon}</div>
            <div className={styles.kpiValue}>{kpi.value}</div>
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={`${styles.kpiTrend} ${kpi.trendUp ? styles.trendUp : styles.trendDown}`}>
              {kpi.trendUp ? '▲' : '▼'} {kpi.trend}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartsRow}>
        {/* Weekly reach chart */}
        <div className={`${styles.chartCard} glass`}>
          <h2 className={styles.chartTitle}>Weekly Reach</h2>
          <div className={styles.barChart}>
            {weeklyData.map((d) => (
              <div key={d.day} className={styles.barGroup}>
                <div className={styles.barWrap}>
                  <div
                    className={styles.bar}
                    style={{ height: `${(d.reach / maxReach) * 100}%` }}
                    title={`${d.reach.toLocaleString()} reach`}
                  >
                    <div className={styles.barTooltip}>{(d.reach / 1000).toFixed(1)}k</div>
                  </div>
                </div>
                <span className={styles.barLabel}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform breakdown */}
        <div className={`${styles.chartCard} glass`}>
          <h2 className={styles.chartTitle}>Platform Breakdown</h2>
          <div className={styles.platformList}>
            {platforms.map((p) => {
              const totalReach = platforms.reduce((s, x) => s + x.reach, 0);
              const pct = ((p.reach / totalReach) * 100).toFixed(1);
              return (
                <div key={p.name} className={styles.platformRow}>
                  <div className={styles.platformInfo}>
                    <span className={styles.platformDot} style={{ background: p.color }} />
                    <span className={styles.platformName}>{p.name}</span>
                    <span className={styles.platformGrowth} style={{ color: '#4ade80' }}>{p.growth}</span>
                  </div>
                  <div className={styles.platformBar}>
                    <div className={styles.platformBarFill} style={{ width: `${pct}%`, background: p.color }} />
                  </div>
                  <span className={styles.platformPct}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Per-platform table */}
      <div className={`${styles.tableCard} glass`}>
        <h2 className={styles.chartTitle}>Platform Details</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Platform</th>
              <th>Total Reach</th>
              <th>Eng. Rate</th>
              <th>Posts</th>
              <th>Growth</th>
            </tr>
          </thead>
          <tbody>
            {platforms.map((p) => (
              <tr key={p.name}>
                <td>
                  <div className={styles.platformCell}>
                    <span className={styles.platformDot} style={{ background: p.color }} />
                    {p.name}
                  </div>
                </td>
                <td>{p.reach.toLocaleString()}</td>
                <td>{p.engagement}%</td>
                <td>{p.posts}</td>
                <td className={styles.growthCell}>{p.growth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
