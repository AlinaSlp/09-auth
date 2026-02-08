'use client';

import { useState } from 'react';
import { register } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import css from './SignUp.module.css';

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      await register({
        email: form.email.value,
        password: form.password.value,
      });
      router.push('/profile');
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form onSubmit={handleSubmit} className={css.form}>
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
        <button className={css.submitButton}>Register</button>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
