import { Routes, Route } from "react-router-dom";
import Step1PersonalInfo from "../components/Step1PersonalInfo";
import Step2ContactDetails from "../components/Step2ContactDetails";
import Step3LoanRequest from "../components/Step3LoanRequest";
import Step4FinancialInfo from "../components/Step4FinancialInfo";
import Step5Finalization from "../components/Step5Finalization";
import { useWizardForm } from "../hooks/useWizardForm";
import WizardNavigation from "../components/WizardNavigation";

export default function Wizard() {
  const { setFormData } = useWizardForm();

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 shadow-md rounded-md bg-white">
      <WizardNavigation />

      <Routes>
        <Route
          path="step1"
          element={
            <Step1PersonalInfo
              onNext={(data) => setFormData({ personalInfo: data })}
            />
          }
        />
        <Route
          path="step2"
          element={
            <Step2ContactDetails
              onNext={(data) => setFormData({ contactDetails: data })}
            />
          }
        />
        <Route
          path="step3"
          element={
            <Step3LoanRequest
              onNext={(data) => setFormData({ loanRequest: data })}
            />
          }
        />
        <Route
          path="step4"
          element={
            <Step4FinancialInfo
              onNext={(data) => setFormData({ financialInfo: data })}
            />
          }
        />
        <Route path="step5" element={<Step5Finalization />} />
      </Routes>
    </div>
  );
}
