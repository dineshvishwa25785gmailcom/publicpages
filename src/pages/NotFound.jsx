import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '2rem',
      background: 'var(--bg-base)', color: 'var(--text-primary)',
    }}>
      <div style={{
        fontSize: '6rem', fontWeight: 800, lineHeight: 1,
        background: 'var(--grad)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        marginBottom: '1rem',
      }}>404</div>
      <h1 style={{ fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Page Not Found
      </h1>
      <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: 400 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-grad btn-lg">← Back to Home</Link>
        <Link to="/contact" className="btn btn-outline btn-lg">Contact Us</Link>
      </div>
    </div>
  )
}
