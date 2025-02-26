import { useNavigate } from "react-router-dom";
import { useWizardForm } from "../hooks/useWizardForm";
import { createEntity } from "../services/api";
import { useState } from "react";

export default function Step5Finalization() {
  const { formData } = useWizardForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = async () => {
    if (!confirmed) {
      setError("You must confirm the details before submitting.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await createEntity(formData);
      setSuccessMessage(
        "Form submitted successfully! Your ID: " + response.uuid
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Step 5: Review & Finalize</h2>

      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(formData, null, 2)}
      </pre>

      <label className="flex items-center space-x-2">
        <input
          className="!w-auto"
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        <span>I confirm that the details are correct</span>
      </label>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <div className="flex justify-between">
        <button
          type="button"
          className="bg-gray-500 text-white p-2"
          onClick={() => navigate("/step4")}
        >
          Back
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white p-2"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Submitting..." : "Finalize"}
        </button>
      </div>
    </div>
  );
}
