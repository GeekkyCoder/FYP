import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthContextProvider } from './context/auth/auth.context';

import App from './app';
import { QueryClientProvider, client } from './utils/query-config';
import { CloudinaryContext } from 'cloudinary-react';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <CloudinaryContext cloudName="dczhcauwf">
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <AuthContextProvider>
            <Suspense>
              <App />
            </Suspense>
          </AuthContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </CloudinaryContext>
  </HelmetProvider>
);
