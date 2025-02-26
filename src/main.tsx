import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Wizard from "./pages/Wizard";
import { WizardFormProvider } from "./hooks/useWizardForm";
import { useWizardForm } from "./hooks/useWizardForm";

// eslint-disable-next-line react-refresh/only-export-components
const AppRouter = () => {
  function RedirectToLastStep() {
    const { lastStep } = useWizardForm();
    return <Navigate to={lastStep} replace />;
  }

  return (
    <Router>
      <Routes>
        {/* Redirect root ("/") to last step */}
        <Route path="/" element={<RedirectToLastStep />} />

        {/* Wizard Steps */}
        <Route path="/*" element={<Wizard />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WizardFormProvider>
      <AppRouter />
      <ToastContainer position="top-center" autoClose={3000} />
    </WizardFormProvider>
  </React.StrictMode>
);
