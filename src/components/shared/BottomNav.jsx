import React from 'react'
import { NavLink } from 'react-router-dom'

const ITEMS = [
  { to: '/',         end: true, icon: '🏠', label: 'Home'     },
  { to: '/services',            icon: '⚙️', label: 'Services' },
  { to: '/products',            icon: '📦', label: 'Apps'     },
  { to: '/about',               icon: '👥', label: 'About'    },
  { to: '/contact',             icon: '✉️', label: 'Contact'  },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      <div className="bottom-nav__inner">
        {ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `bottom-nav__item${isActive ? ' active' : ''}`}
            aria-label={item.label}
          >
            <span className="bottom-nav__icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
