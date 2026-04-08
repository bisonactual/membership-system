import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import theme from './theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const pages = import.meta.glob('./Pages/**/*.tsx')

createInertiaApp({
  resolve: (name) => {
    const page = pages[`./Pages/${name}.tsx`]
    if (!page) throw new Error(`Page not found: ${name}`)
    return page()
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App {...props} />
        </ThemeProvider>
      </StrictMode>
    );
  },
});
