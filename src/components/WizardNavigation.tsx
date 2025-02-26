import { Link, useLocation } from "react-router-dom";

const steps = [
  { path: "/step1", label: "Personal Info" },
  { path: "/step2", label: "Contact Details" },
  { path: "/step3", label: "Loan Request" },
  { path: "/step4", label: "Financial Info" },
  { path: "/step5", label: "Finalization" },
];

export default function WizardNavigation() {
  const location = useLocation();
  const currentStepIndex = steps.findIndex(
    (step) => step.path === location.pathname
  );

  return (
    <div className="mb-6">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="flex justify-between mt-2 text-sm font-medium text-gray-500">
        {steps.map((step, index) => (
          <Link
            key={step.path}
            to={index <= currentStepIndex ? step.path : "#"}
            className={`transition-all px-3 py-2 rounded-lg ${
              index === currentStepIndex
                ? "bg-blue-500 text-white shadow-md"
                : index < currentStepIndex
                ? "text-blue-600"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            {step.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
