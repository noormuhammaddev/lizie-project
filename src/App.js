import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Properties from "./pages/Properties";
import Messages from "./pages/Messages";
import Accounts from "./pages/Accounts";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import Login from "./pages/chatpages/Login";
import Register from "./pages/chatpages/Register";
import Favoritos from "./pages/Favoritos";
import Dashboard from "./Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import { PropertyProvider } from "./context/PropertyContext";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import InnerPage from "./pages/InnerPage";
import Blog from "./pages/Blog";
import TermsOsUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ServiceContractingPolicy from "./pages/ServiceContractingPolicy";
import LibroDeReclamaciones from "./pages/LibroDeReclamaciones";
import FeaturedProperties from "./pages/FeaturedProperties";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoutes />}>
            <Route
              path="/dashboard"
              element={
                <PropertyProvider>
                  <Dashboard />
                </PropertyProvider>
              }
            >
              <Route path="sidebar" element={<Sidebar />} />
              <Route path="properties" element={<Properties />} />
              <Route path="messages" element={<Messages />} />
              <Route path="accounts" element={<Accounts />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="" element={<Messages />} />
              <Route
                path="favoritos"
                element={
                  <PropertyProvider>
                    <Favoritos />
                  </PropertyProvider>
                }
              />
            </Route>
          </Route>

          <Route
            path="/"
            element={
              <PropertyProvider>
                <Home />
              </PropertyProvider>
            }
          />
          <Route
            path="/home"
            element={
              <PropertyProvider>
                <Home />
              </PropertyProvider>
            }
          />
          <Route
            path="*"
            element={
              <PropertyProvider>
                <Home />
              </PropertyProvider>
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/featuredproperties"
            element={
              <PropertyProvider>
                <FeaturedProperties />
              </PropertyProvider>
            }
          />
          <Route
            path="/inner-page/:selectedPropertyId"
            element={
              <PropertyProvider>
                <InnerPage />
              </PropertyProvider>
            }
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/terms-of-use" element={<TermsOsUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/service-contracting-policy"
            element={<ServiceContractingPolicy />}
          />
          <Route
            path="/libro-de-reclamaciones"
            element={<LibroDeReclamaciones />}
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
