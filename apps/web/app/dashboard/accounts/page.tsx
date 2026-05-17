'use client';

import { useState } from 'react';
import styles from './accounts.module.css';

const PLATFORMS = [
  { id: 'FACEBOOK', name: 'Facebook', icon: '📘', color: '#1877f2', description: 'Pages & Groups' },
  { id: 'INSTAGRAM', name: 'Instagram', icon: '📸', color: '#e1306c', description: 'Business accounts' },
  { id: 'LINKEDIN', name: 'LinkedIn', icon: '💼', color: '#0a66c2', description: 'Pages & Profiles' },
  { id: 'X', name: 'X (Twitter)', icon: '🐦', color: '#ffffff', description: 'Profiles' },
  { id: 'TIKTOK', name: 'TikTok', icon: '🎵', color: '#69c9d0', description: 'Business accounts' },
  { id: 'YOUTUBE', name: 'YouTube', icon: '📺', color: '#ff0000', description: 'Channels' },
];

type ConnectionState = 'connected' | 'connecting' | 'disconnected';

type AccountStatus = Record<string, { state: ConnectionState; handle?: string }>;

const initialStatus: AccountStatus = {
  FACEBOOK: { state: 'connected', handle: '@acme.inc' },
  INSTAGRAM: { state: 'connected', handle: '@acme_brand' },
  LINKEDIN: { state: 'disconnected' },
  X: { state: 'disconnected' },
  TIKTOK: { state: 'disconnected' },
  YOUTUBE: { state: 'disconnected' },
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<AccountStatus>(initialStatus);

  const connect = (id: string) => {
    setAccounts((prev) => ({ ...prev, [id]: { state: 'connecting' } }));
    // Simulate OAuth flow delay
    setTimeout(() => {
      setAccounts((prev) => ({
        ...prev,
        [id]: { state: 'connected', handle: `@demo_${id.toLowerCase()}` },
      }));
    }, 1800);
  };

  const disconnect = (id: string) => {
    setAccounts((prev) => ({ ...prev, [id]: { state: 'disconnected' } }));
  };

  const connected = Object.values(accounts).filter((a) => a.state === 'connected').length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Connected Accounts</h1>
          <p className={styles.subtitle}>Manage your social media platform connections</p>
        </div>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          {connected} of {PLATFORMS.length} connected
        </div>
      </header>

      <div className={styles.grid}>
        {PLATFORMS.map((platform) => {
          const status = accounts[platform.id] || { state: 'disconnected' };
          const isConnected = status.state === 'connected';
          const isConnecting = status.state === 'connecting';

          return (
            <div key={platform.id} className={`${styles.card} glass ${isConnected ? styles.cardConnected : ''}`}>
              <div className={styles.cardTop}>
                <div className={styles.platformIcon} style={{ background: `${platform.color}22`, borderColor: `${platform.color}44` }}>
                  <span>{platform.icon}</span>
                </div>
                <div className={`${styles.statusPill} ${isConnected ? styles.statusConnected : isConnecting ? styles.statusConnecting : styles.statusDisconnected}`}>
                  {isConnected ? '● Connected' : isConnecting ? '◌ Connecting…' : '○ Not connected'}
                </div>
              </div>

              <div className={styles.platformInfo}>
                <h3 className={styles.platformName}>{platform.name}</h3>
                <p className={styles.platformDesc}>{platform.description}</p>
                {isConnected && status.handle && (
                  <p className={styles.handle}>{status.handle}</p>
                )}
              </div>

              <div className={styles.cardActions}>
                {isConnected ? (
                  <button
                    className={`btn ${styles.disconnectBtn}`}
                    onClick={() => disconnect(platform.id)}
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    className={`btn btn-primary ${styles.connectBtn}`}
                    onClick={() => connect(platform.id)}
                    disabled={isConnecting}
                  >
                    {isConnecting ? 'Connecting…' : `Connect ${platform.name}`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={`${styles.infoBox} glass`}>
        <div className={styles.infoIcon}>🔒</div>
        <div>
          <p className={styles.infoTitle}>Your tokens are secure</p>
          <p className={styles.infoText}>
            All access tokens are encrypted at rest using AES-256. We only request the minimum
            permissions needed to publish content on your behalf. You can revoke access at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
