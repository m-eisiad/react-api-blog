import React from 'react';
import { useTheme } from '../Components/ThemeContext'

function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer class={theme}>
        &copy; 2026 React Blog
    </footer>
  );
}

export default Footer