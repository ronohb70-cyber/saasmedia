'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../login/auth.module.css';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', organizationName: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          organizationName: form.organizationName,
          password: form.password,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Registration failed');
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

      <div className={`${styles.authCard} ${styles.authCardWide} glass`}>
        <div className={styles.brandMark}>
          <div className={styles.brandIcon}>⚡</div>
          <h1 className={styles.brandName}>SocialSaaS</h1>
        </div>

        <div className={styles.authHeader}>
          <h2 className={styles.authTitle}>Create your workspace</h2>
          <p className={styles.authSubtitle}>Get started for free. No credit card required.</p>
        </div>

        <form id="register-form" className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.errorBanner}>{error}</div>}

          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>Full name</label>
              <input id="name" name="name" type="text" className={styles.input}
                value={form.name} onChange={handleChange} placeholder="Jane Doe" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="organizationName" className={styles.label}>Organization name</label>
              <input id="organizationName" name="organizationName" type="text" className={styles.input}
                value={form.organizationName} onChange={handleChange} placeholder="Acme Inc." required />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="reg-email" className={styles.label}>Work email</label>
            <input id="reg-email" name="email" type="email" className={styles.input}
              value={form.email} onChange={handleChange} placeholder="jane@acme.com" required />
          </div>

          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label htmlFor="reg-password" className={styles.label}>Password</label>
              <input id="reg-password" name="password" type="password" className={styles.input}
                value={form.password} onChange={handleChange} placeholder="Min. 8 characters" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="confirm" className={styles.label}>Confirm password</label>
              <input id="confirm" name="confirm" type="password" className={styles.input}
                value={form.confirm} onChange={handleChange} placeholder="••••••••" required />
            </div>
          </div>

          <button id="register-submit" type="submit"
            className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
            {loading ? 'Creating workspace...' : 'Create free account'}
          </button>
        </form>

        <p className={styles.switchAuth}>
          Already have an account?{' '}
          <Link href="/login" className={styles.switchLink}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
