import React from 'react';
import { Link } from 'react-router';
import { useTheme } from './ThemeContext';

function Header() {
  const { toggleTheme } = useTheme();

  return (
    <header>
      <h1>React Blog</h1>

      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li>
      </ul>

      <button onClick={toggleTheme}>Mode</button>
    </header>
  )
}

export default Header