'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './auth.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Login failed');
      }
      const data = await res.json();
      localStorage.setItem('access_token', data.access_token);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={`${styles.authCard} glass`}>
        <div className={styles.brandMark}>
          <div className={styles.brandIcon}>⚡</div>
          <h1 className={styles.brandName}>SocialSaaS</h1>
        </div>

        <div className={styles.authHeader}>
          <h2 className={styles.authTitle}>Welcome back</h2>
          <p className={styles.authSubtitle}>Sign in to your workspace</p>
        </div>

        <form id="login-form" className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.errorBanner}>{error}</div>}

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Email address</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <a href="#" className={styles.forgotLink}>Forgot password?</a>
            </div>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            id="login-submit"
            type="submit"
            className={`btn btn-primary ${styles.submitBtn}`}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className={styles.switchAuth}>
          Don&apos;t have an account?{' '}
          <Link href="/register" className={styles.switchLink}>Create one free</Link>
        </p>

        <div className={styles.demoHint}>
          <span>Demo credentials:</span>
          <code>admin@demo.com / password</code>
        </div>
      </div>
    </div>
  );
}
