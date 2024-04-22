import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import "semantic-ui-css/semantic.min.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const container = document.getElementById('root');
const queryClient = new QueryClient();
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
