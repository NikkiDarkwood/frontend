import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav style={navbarStyle}>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link href="/">Home</Link>
        </li>
        <li style={navItemStyle}>
          <Link href="/onboard">Onboard Customer</Link>
        </li>
        <li style={navItemStyle}>
          <Link href="/offboard">Offboard Customer</Link>
        </li>
      </ul>
    </nav>
  );
};

const navbarStyle: React.CSSProperties = {
  backgroundColor: '#333',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navListStyle: React.CSSProperties = {
  display: 'flex',
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const navItemStyle: React.CSSProperties = {
  margin: '0 1rem',
  color: 'white',
};

export default Navbar;
