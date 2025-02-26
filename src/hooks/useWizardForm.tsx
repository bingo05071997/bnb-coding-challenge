import { createContext, useContext, useState, ReactNode } from "react";
import { WizardFormData } from "../types";

const LOCAL_STORAGE_KEY = "wizardFormData";
const LAST_STEP_KEY = "lastWizardStep"; // Track last step

interface WizardContextType {
  formData: WizardFormData;
  setFormData: (data: Partial<WizardFormData>) => void;
  lastStep: string;
  setLastStep: (step: string) => void;
}

const WizardFormContext = createContext<WizardContextType | undefined>(undefined);

export const WizardFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormDataState] = useState<WizardFormData>(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedData
        ? JSON.parse(savedData)
        : {
            personalInfo: { firstName: "", lastName: "", dateOfBirth: "" },
            contactDetails: { email: "", phone: "" },
            loanRequest: { loanAmount: 10000, upfrontPayment: 0, terms: 10 },
            financialInfo: { monthlySalary: 0 },
          };
    } catch (error) {
      console.error("Error loading form data from localStorage", error);
      return {
        personalInfo: { firstName: "", lastName: "", dateOfBirth: "" },
        contactDetails: { email: "", phone: "" },
        loanRequest: { loanAmount: 10000, upfrontPayment: 0, terms: 10 },
        financialInfo: { monthlySalary: 0 },
      };
    }
  });

  // Load last visited step
  const [lastStep, setLastStepState] = useState(() => {
    return localStorage.getItem(LAST_STEP_KEY) || "/step1";
  });

  // Function to update form data
  const setFormData = (data: Partial<WizardFormData>) => {
    setFormDataState((prev) => {
      const newData = { ...prev, ...data };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
      return newData;
    });
  };

  // Function to update last visited step
  const setLastStep = (step: string) => {
    setLastStepState(step);
    localStorage.setItem(LAST_STEP_KEY, step);
  };

  return (
    <WizardFormContext.Provider value={{ formData, setFormData, lastStep, setLastStep }}>
      {children}
    </WizardFormContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWizardForm = () => {
  const context = useContext(WizardFormContext);
  if (!context) {
    throw new Error("useWizardForm must be used within a WizardFormProvider");
  }
  return context;
};
