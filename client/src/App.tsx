import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/common/PublicLayout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { useAuth } from './context/AuthContext';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { SolutionDetailPage } from './pages/SolutionDetailPage';
import { QualityPage } from './pages/QualityPage';
import { ManufacturingPage } from './pages/ManufacturingPage';
import { AboutPage } from './pages/AboutPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { RequestQuotePage } from './pages/RequestQuotePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminQuotes } from './pages/admin/AdminQuotes';
import { AdminContacts } from './pages/admin/AdminContacts';
import { AdminDocuments } from './pages/admin/AdminDocuments';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminApplications } from './pages/admin/AdminApplications';
import { AdminFaqs } from './pages/admin/AdminFaqs';
import { AdminResources } from './pages/admin/AdminResources';
import { AdminSettings } from './pages/admin/AdminSettings';

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading Admin Console...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route 
          path="/admin" 
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="quotes" element={<AdminQuotes />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="documents" element={<AdminDocuments />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="faqs" element={<AdminFaqs />} />
          <Route path="resources" element={<AdminResources />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/:type" element={<SolutionDetailPage />} />
          <Route path="/quality" element={<QualityPage />} />
          <Route path="/manufacturing" element={<ManufacturingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:slug" element={<ResourceDetailPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/request-quote" element={<RequestQuotePage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
