'use client';

import { useState } from 'react';
import styles from './composer.module.css';

const PLATFORMS = [
  { id: 'FACEBOOK', label: 'Facebook', icon: '📘', limit: 63206 },
  { id: 'INSTAGRAM', label: 'Instagram', icon: '📸', limit: 2200 },
  { id: 'X', label: 'X', icon: '🐦', limit: 280 },
  { id: 'LINKEDIN', label: 'LinkedIn', icon: '💼', limit: 3000 },
  { id: 'TIKTOK', label: 'TikTok', icon: '🎵', limit: 2200 },
];

export default function Composer() {
  const [selected, setSelected] = useState<string[]>(['FACEBOOK']);
  const [content, setContent] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [status, setStatus] = useState<'idle' | 'scheduling' | 'success' | 'error'>('idle');

  const togglePlatform = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);

  const activePlatform = PLATFORMS.find((p) => selected.includes(p.id)) ?? PLATFORMS[0];
  const charLimit = activePlatform?.limit ?? 3000;
  const charCount = content.length;
  const charPct = Math.min((charCount / charLimit) * 100, 100);

  const handleSchedule = async () => {
    if (!content || selected.length === 0) return;
    setStatus('scheduling');
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          platforms: selected,
          scheduledAt: scheduledAt || new Date(Date.now() + 60000).toISOString(),
        }),
      });
      if (!res.ok) throw new Error('Failed to schedule');
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Composer</h1>
        <p className={styles.subtitle}>Draft, preview, and schedule your next viral post.</p>
      </header>

      <div className={styles.composerGrid}>
        {/* Editor */}
        <div className={`${styles.editorSection} glass`}>
          <div className={styles.platformSelector}>
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                className={`${styles.platformBtn} ${selected.includes(p.id) ? styles.active : ''}`}
                onClick={() => togglePlatform(p.id)}
                title={p.label}
              >
                <span>{p.icon}</span> {p.label}
              </button>
            ))}
          </div>

          <textarea
            className={styles.textarea}
            placeholder="What do you want to share with your audience?"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Char count */}
          <div className={styles.charBar}>
            <div className={styles.charBarFill} style={{
              width: `${charPct}%`,
              background: charPct > 90 ? '#f87171' : charPct > 70 ? '#fbbf24' : '#8b5cf6',
            }} />
          </div>
          <div className={styles.charCount} style={{ color: charPct > 90 ? '#f87171' : 'var(--muted-foreground)' }}>
            {charCount} / {charLimit.toLocaleString()}
          </div>

          <div className={styles.editorActions}>
            <button className={`btn ${styles.mediaBtn}`}>📎 Add Media</button>
            <button className={`btn ${styles.aiBtn}`}>✨ AI Enhance</button>
            <div className={styles.scheduleWrap}>
              <input
                type="datetime-local"
                className={styles.dateInput}
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className={`${styles.previewSection} glass`}>
          <h3 className={styles.previewTitle}>Live Preview</h3>
          <div className={styles.platformTabs}>
            {selected.map((id) => {
              const p = PLATFORMS.find((x) => x.id === id)!;
              return <span key={id} className={styles.previewTab}>{p.icon} {p.label}</span>;
            })}
          </div>
          <div className={styles.mockPost}>
            <div className={styles.mockHeader}>
              <div className={styles.mockAvatar}>A</div>
              <div>
                <div className={styles.mockName}>SocialSaaS Demo</div>
                <div className={styles.mockTime}>Just now</div>
              </div>
            </div>
            <div className={styles.mockContent}>
              {content || 'Preview your content here before it goes live. Ensure it looks perfect across all your selected platforms!'}
            </div>
            {selected.length > 0 && (
              <div className={styles.mockPlatforms}>
                {selected.map((id) => PLATFORMS.find((p) => p.id === id)?.icon).join('  ')}
              </div>
            )}
          </div>

          <div className={styles.publishActions}>
            {status === 'success' && (
              <div className={styles.successBanner}>✓ Post scheduled successfully!</div>
            )}
            {status === 'error' && (
              <div className={styles.errorBanner}>✗ Failed to schedule. Try again.</div>
            )}
            <button
              className={`btn btn-primary ${styles.scheduleBtn}`}
              onClick={handleSchedule}
              disabled={status === 'scheduling' || !content || selected.length === 0}
            >
              {status === 'scheduling' ? 'Scheduling…' : '🗓 Schedule Post'}
            </button>
            <button className={`btn ${styles.draftBtn}`}>Save as Draft</button>
          </div>
        </div>
      </div>
    </div>
  );
}
