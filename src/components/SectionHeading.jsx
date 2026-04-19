// components/SectionHeading.jsx — Reusable animated section title
import { motion } from 'framer-motion'

export default function SectionHeading({ label, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: '4rem' }}
    >
      {/* Eyebrow label */}
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.35em',
          color: '#0066FF',
          marginBottom: '0.75rem',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </p>

      {/* Main heading */}
      <h2
        style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          color: '#e2e8f0',
          letterSpacing: '0.04em',
          lineHeight: 1.05,
        }}
      >
        {title}
      </h2>

      {/* Optional subtitle */}
      {subtitle && (
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '1rem',
            color: 'rgba(226,232,240,0.5)',
            marginTop: '0.75rem',
            maxWidth: '480px',
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Decorative line */}
      <div
        style={{
          marginTop: '1.5rem',
          height: '1px',
          width: '60px',
          background: 'linear-gradient(90deg, #0066FF, transparent)',
        }}
      />
    </motion.div>
  )
}
