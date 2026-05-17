import styles from './calendar.module.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HOURS = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

const scheduledPosts = [
  { id: 1, day: 1, hour: 9, platform: '📘', content: 'Monday morning product update', color: '#1877f2' },
  { id: 2, day: 2, hour: 12, platform: '📸', content: 'Behind the scenes reel', color: '#e1306c' },
  { id: 3, day: 3, hour: 11, platform: '💼', content: 'Industry insights thread', color: '#0a66c2' },
  { id: 4, day: 4, hour: 15, platform: '🐦', content: 'Product announcement', color: '#ffffff' },
  { id: 5, day: 5, hour: 10, platform: '🎵', content: 'Friday viral challenge', color: '#69c9d0' },
  { id: 6, day: 5, hour: 14, platform: '📘', content: 'Weekend engagement post', color: '#1877f2' },
];

const today = new Date();
const dayOfWeek = today.getDay();

export default function CalendarPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Content Calendar</h1>
          <p className={styles.subtitle}>Weekly view of all your scheduled posts</p>
        </div>
        <div className={styles.navButtons}>
          <button className={`btn ${styles.navBtn}`}>← Prev</button>
          <button className={`btn ${styles.todayBtn}`}>Today</button>
          <button className={`btn ${styles.navBtn}`}>Next →</button>
        </div>
      </header>

      <div className={`${styles.calendarWrap} glass`}>
        {/* Day headers */}
        <div className={styles.calendarGrid}>
          <div className={styles.timeGutter} />
          {DAYS.map((day, idx) => (
            <div key={day} className={`${styles.dayHeader} ${idx === dayOfWeek ? styles.today : ''}`}>
              <span className={styles.dayName}>{day}</span>
              <span className={styles.dayNum}>{idx === dayOfWeek ? today.getDate() : ''}</span>
            </div>
          ))}

          {/* Time rows */}
          {HOURS.slice(7, 21).map((hour, hi) => (
            <>
              <div key={`t-${hour}`} className={styles.timeLabel}>{hour}</div>
              {DAYS.map((_, di) => {
                const post = scheduledPosts.find((p) => p.day === di && p.hour === hi + 7);
                return (
                  <div key={`cell-${hi}-${di}`} className={`${styles.cell} ${di === dayOfWeek ? styles.todayCol : ''}`}>
                    {post && (
                      <div className={styles.event} style={{ borderLeftColor: post.color }}>
                        <span className={styles.eventIcon}>{post.platform}</span>
                        <span className={styles.eventContent}>{post.content}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      <div className={styles.legend}>
        {[
          { icon: '📘', name: 'Facebook', color: '#1877f2' },
          { icon: '📸', name: 'Instagram', color: '#e1306c' },
          { icon: '💼', name: 'LinkedIn', color: '#0a66c2' },
          { icon: '🐦', name: 'X', color: '#71717a' },
          { icon: '🎵', name: 'TikTok', color: '#69c9d0' },
        ].map((p) => (
          <div key={p.name} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: p.color }} />
            {p.icon} {p.name}
          </div>
        ))}
      </div>
    </div>
  );
}
