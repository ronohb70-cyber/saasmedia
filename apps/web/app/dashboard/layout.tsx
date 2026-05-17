'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './dashboard.module.css';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: '◈' },
  { href: '/dashboard/composer', label: 'Composer', icon: '✦' },
  { href: '/dashboard/calendar', label: 'Calendar', icon: '◻' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: '◎' },
  { href: '/dashboard/accounts', label: 'Accounts', icon: '⬡' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} glass`}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>⚡</div>
          <h2>SocialSaaS</h2>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>A</div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>Admin User</p>
              <p className={styles.userEmail}>admin@demo.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={`${styles.header} glass`}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>⌕</span>
            <input type="text" placeholder="Search posts, analytics..." className={styles.input} />
          </div>
          <div className={styles.headerActions}>
            <Link href="/dashboard/composer" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
              + Create post
            </Link>
            <div className={styles.avatar}>A</div>
          </div>
        </header>
        <div className={styles.pageContent}>{children}</div>
      </main>
    </div>
  );
}
