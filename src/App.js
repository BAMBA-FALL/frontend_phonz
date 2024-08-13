import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRouter from './pages/Public/PublicRouter';
import AdminRouter from './pages/Admin/AdminRouter';
import AuthRouter from './pages/Auth/AuthRouter';
import AuthGuard from './_helpers/AuthGuard';
import { Suspense } from 'react';
import { PanierProvider } from './pages/Public/Panier/PanierContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}> 
         <PanierProvider>
            <Routes>
              <Route path="/*" element={<PublicRouter />} />
              <Route
                path="/admin/*"
                element={
                  <AuthGuard>
                    <AdminRouter />
                  </AuthGuard>
                }
              />
              <Route path="/auth/*" element={<AuthRouter />} />
            </Routes>
            </PanierProvider>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
