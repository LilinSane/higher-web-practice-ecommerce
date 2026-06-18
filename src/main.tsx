import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './index.css';
import {MantineProvider} from "@mantine/core";
import { Provider } from 'react-redux';
import {store} from "@/store/store.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MantineProvider>
          <Provider store={store}>
              <App />
          </Provider>
      </MantineProvider>
  </StrictMode>,
);
