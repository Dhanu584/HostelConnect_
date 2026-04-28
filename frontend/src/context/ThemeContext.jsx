import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  student_dark: {
    name: 'Dark', mode: 'dark', role: 'student',
    bg: '#0a0f1e', bgSecondary: '#0f172a', bgCard: 'rgba(255,255,255,0.03)',
    border: 'rgba(99,102,241,0.15)', borderCard: 'rgba(255,255,255,0.07)',
    accent: '#6366f1', accentSoft: 'rgba(99,102,241,0.12)', accentGlow: 'rgba(99,102,241,0.35)',
    accentText: '#a5b4fc', navBg: '#0a0f1e', sidebarBg: '#0d1424',
    text: '#f1f5f9', textMuted: '#64748b', textSoft: '#94a3b8',
  },
  student_light: {
    name: 'Light', mode: 'light', role: 'student',
    bg: '#f0f4ff', bgSecondary: '#ffffff', bgCard: '#ffffff',
    border: 'rgba(99,102,241,0.2)', borderCard: 'rgba(99,102,241,0.12)',
    accent: '#4f46e5', accentSoft: 'rgba(99,102,241,0.08)', accentGlow: 'rgba(99,102,241,0.2)',
    accentText: '#4f46e5', navBg: '#ffffff', sidebarBg: '#ffffff',
    text: '#1e1b4b', textMuted: '#6366f1', textSoft: '#64748b',
  },
  faculty_dark: {
    name: 'Dark', mode: 'dark', role: 'faculty',
    bg: '#050e0a', bgSecondary: '#081510', bgCard: 'rgba(255,255,255,0.02)',
    border: 'rgba(16,185,129,0.15)', borderCard: 'rgba(255,255,255,0.06)',
    accent: '#10b981', accentSoft: 'rgba(16,185,129,0.1)', accentGlow: 'rgba(16,185,129,0.35)',
    accentText: '#6ee7b7', navBg: '#050e0a', sidebarBg: '#050e0a',
    text: '#ecfdf5', textMuted: '#4b5563', textSoft: '#6b7280',
  },
  faculty_light: {
    name: 'Light', mode: 'light', role: 'faculty',
    bg: '#f0fdf4', bgSecondary: '#ffffff', bgCard: '#ffffff',
    border: 'rgba(16,185,129,0.2)', borderCard: 'rgba(16,185,129,0.12)',
    accent: '#059669', accentSoft: 'rgba(16,185,129,0.08)', accentGlow: 'rgba(16,185,129,0.2)',
    accentText: '#059669', navBg: '#ffffff', sidebarBg: '#ffffff',
    text: '#052e16', textMuted: '#059669', textSoft: '#6b7280',
  },
  committee_dark: {
    name: 'Dark', mode: 'dark', role: 'committee',
    bg: '#080510', bgSecondary: '#0e0818', bgCard: 'rgba(255,255,255,0.02)',
    border: 'rgba(139,92,246,0.15)', borderCard: 'rgba(255,255,255,0.06)',
    accent: '#8b5cf6', accentSoft: 'rgba(139,92,246,0.1)', accentGlow: 'rgba(139,92,246,0.35)',
    accentText: '#c4b5fd', navBg: '#080510', sidebarBg: '#080510',
    text: '#faf5ff', textMuted: '#4b5563', textSoft: '#6b7280',
  },
  committee_light: {
    name: 'Light', mode: 'light', role: 'committee',
    bg: '#faf5ff', bgSecondary: '#ffffff', bgCard: '#ffffff',
    border: 'rgba(139,92,246,0.2)', borderCard: 'rgba(139,92,246,0.12)',
    accent: '#7c3aed', accentSoft: 'rgba(139,92,246,0.08)', accentGlow: 'rgba(139,92,246,0.2)',
    accentText: '#7c3aed', navBg: '#ffffff', sidebarBg: '#ffffff',
    text: '#2e1065', textMuted: '#7c3aed', textSoft: '#6b7280',
  },
};

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState(() => {
    return localStorage.getItem('hc_theme') || 'student_dark';
  });

  const theme = themes[themeKey] || themes['student_dark'];

  const setTheme = (key) => {
    localStorage.setItem('hc_theme', key);
    setThemeKey(key);
  };

  useEffect(() => {
    document.body.style.background = theme.bg;
    document.body.style.color = theme.text;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeKey, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);