'use client';

import { useState } from 'react';
import { login } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import css from './SignIn.module.css';

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    const form = e.currentTarget;

    try {
      await login({
        email: form.email.value,
        password: form.password.value,
      });
      router.push('/profile');
    } catch {
      setError('Login failed');
    }
  };

  return (
    <main className={css.mainContent}>
      <form onSubmit={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label>Email</label>
          <input name="email" type="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label>Password</label>
          <input
            name="password"
            type="password"
            className={css.input}
            required
          />
        </div>

        <button className={css.submitButton}>Log in</button>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
