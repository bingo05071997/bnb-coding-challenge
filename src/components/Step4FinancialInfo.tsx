import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { FinancialInfo } from "../types";
import { useWizardForm } from "../hooks/useWizardForm";
import { useState } from "react";

export default function Step4FinancialInfo({
  onNext,
}: {
  onNext: (data: FinancialInfo) => void;
}) {
  const { formData, setFormData } = useWizardForm(); // Access form data (loan amount, terms, etc.)
  const navigate = useNavigate();

  // State for toggling visibility of optional fields
  const [showAdditionalIncome, setShowAdditionalIncome] = useState(false);
  const [showMortgage, setShowMortgage] = useState(false);
  const [showOtherCredits, setShowOtherCredits] = useState(false);

  // Calculate the validation condition
  const loanAmount = formData.loanRequest.loanAmount;
  const terms = formData.loanRequest.terms;

  const schema = z
    .object({
      monthlySalary: z.number().min(1),
      additionalIncome: z.number().optional(),
      mortgage: z.number().optional(),
      otherCredits: z.number().optional(),
    })
    .refine(
      (data) => {
        const totalIncome =
          data.monthlySalary +
          (data.additionalIncome || 0) -
          (data.mortgage || 0) -
          (data.otherCredits || 0);
        return totalIncome * terms * 0.5 > loanAmount; // Apply validation condition
      },
      {
        message:
          "Loan amount is too high. Please reduce the loan amount or restart with a new person.",
        path: ["otherCredits"],
      }
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FinancialInfo>({
    resolver: zodResolver(schema),
    defaultValues: formData.financialInfo,
  });

  const handleJumpToStep1 = () => {
    setFormData({
      personalInfo: { firstName: "", lastName: "", dateOfBirth: "" },
      contactDetails: { email: "", phone: "" },
      loanRequest: { loanAmount: 10000, upfrontPayment: 0, terms: 10 },
      financialInfo: { monthlySalary: 0 },
    });
    navigate("/step1");
  };

  const onSubmit = (data: FinancialInfo) => {
    onNext(data);
    navigate("/step5");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Step 4: Financial Information</h2>

      <div>
        <label className="block">Monthly Salary</label>
        <input
          type="number"
          {...register("monthlySalary", { valueAsNumber: true })}
          className="border p-2 w-full"
        />
        {errors.monthlySalary && (
          <p className="text-red-500">{errors.monthlySalary.message}</p>
        )}
      </div>

      <div className="flex flex-row items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="additionalIncome"
            onChange={() => setShowAdditionalIncome(!showAdditionalIncome)}
            className="border-gray-500"
          />
          <label htmlFor="additionalIncome">Additional Income</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="mortgage"
            onChange={() => setShowMortgage(!showMortgage)}
            className=" border-gray-500"
          />
          <label htmlFor="mortgage">Mortgage</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="otherCredits"
            onChange={() => setShowOtherCredits(!showOtherCredits)}
            className=" border-gray-500"
          />
          <label htmlFor="otherCredits">Other credits</label>
        </div>
      </div>
      {/* Checkbox for Additional Income */}
      {showAdditionalIncome && (
        <div className="mb-4">
          <label className="block text-sm font-medium">Additional Income</label>
          <input
            type="number"
            {...register("additionalIncome", { valueAsNumber: true })}
            className="border p-2 w-full mt-1"
          />
        </div>
      )}

      {/* Checkbox for Mortgage */}
      {showMortgage && (
        <div className="mb-4">
          <label className="block text-sm font-medium">Mortgage</label>
          <input
            type="number"
            {...register("mortgage", { valueAsNumber: true })}
            className="border p-2 w-full mt-1"
          />
        </div>
      )}

      {/* Checkbox for Other Credits */}
      {showOtherCredits && (
        <div className="mb-4">
          <label className="block text-sm font-medium">Other Credits</label>
          <input
            type="number"
            {...register("otherCredits", { valueAsNumber: true })}
            className="border p-2 w-full mt-1"
          />
        </div>
      )}

      {/* Show errors */}
      {errors.monthlySalary ||
      errors.additionalIncome ||
      errors.mortgage ||
      errors.otherCredits ? (
        <div className="text-red-500">
          {errors.monthlySalary?.message ||
            errors.additionalIncome?.message ||
            errors.mortgage?.message ||
            errors.otherCredits?.message ||
            "Loan amount is too high. Please reduce the loan amount or restart with a new person."}
        </div>
      ) : null}

      <div className="flex justify-between">
        <button
          type="button"
          className="bg-gray-500 text-white p-2"
          onClick={() => navigate("/step3")}
        >
          Back
        </button>
        <div className="flex gap-4">
          {/* Only show Jump to Step 1 if there's an error */}
          {errors.monthlySalary ||
          errors.additionalIncome ||
          errors.mortgage ||
          errors.otherCredits ? (
            <button
              type="button"
              className="bg-gray-500 text-white p-2"
              onClick={handleJumpToStep1}
            >
              Jump to Step 1
            </button>
          ) : null}

          <button type="submit" className="bg-blue-500 text-white p-2">
            Next
          </button>
        </div>
      </div>
    </form>
  );
}
