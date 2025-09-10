import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ThemeUpdater = () => {
  const activeTheme = useSelector((state) => state.customizer.activeTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-color-theme', activeTheme.replace('_THEME', '') + '_Theme');
  }, [activeTheme]);

  return null;
};

export default ThemeUpdater;
