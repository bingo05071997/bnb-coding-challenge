import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { FinancialInfo } from "../types";
import { useWizardForm } from "../hooks/useWizardForm";

const schema = z.object({
  monthlySalary: z.number().min(1),
  additionalIncome: z.number().optional(),
  mortgage: z.number().optional(),
  otherCredits: z.number().optional(),
});

export default function Step4FinancialInfo({
  onNext,
}: {
  onNext: (data: FinancialInfo) => void;
}) {
  const navigate = useNavigate();
  const { formData, setLastStep } = useWizardForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FinancialInfo>({
    resolver: zodResolver(schema),
    defaultValues: formData.financialInfo,
  });

  const onSubmit = (data: FinancialInfo) => {
    onNext(data);
    setLastStep("/step5");
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

      <div>
        <label className="block">Additional Income</label>
        <input
          type="number"
          {...register("additionalIncome", { valueAsNumber: true })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block">Mortgage</label>
        <input
          type="number"
          {...register("mortgage", { valueAsNumber: true })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block">Other Credits</label>
        <input
          type="number"
          {...register("otherCredits", { valueAsNumber: true })}
          className="border p-2 w-full"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          className="bg-gray-500 text-white p-2"
          onClick={() => navigate("/step3")}
        >
          Back
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Next
        </button>
      </div>
    </form>
  );
}
