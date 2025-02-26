import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { LoanRequest } from "../types";
import { useWizardForm } from "../hooks/useWizardForm";


const schema = z
  .object({
    loanAmount: z.number().min(10000).max(70000),
    upfrontPayment: z.number(),
    terms: z.number().min(10).max(30),
  })
  .refine((data) => data.upfrontPayment < data.loanAmount, {
    message: "Upfront payment must be lower than the loan amount",
    path: ["upfrontPayment"],
  });

export default function Step3LoanRequest({
  onNext,
}: {
  onNext: (data: LoanRequest) => void;
}) {
  const { formData, setLastStep } = useWizardForm();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanRequest>({
    resolver: zodResolver(schema),
    defaultValues: formData.loanRequest
  });

  const onSubmit = (data: LoanRequest) => {
    onNext(data);
    setLastStep("/step4");
    navigate("/step4");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Step 3: Loan Request</h2>

      <div>
        <label className="block">Loan Amount</label>
        <input
          type="number"
          {...register("loanAmount", { valueAsNumber: true })}
          className="border p-2 w-full"
        />
        {errors.loanAmount && (
          <p className="text-red-500">{errors.loanAmount.message}</p>
        )}
      </div>

      <div>
        <label className="block">Upfront Payment</label>
        <input
          type="number"
          {...register("upfrontPayment", { valueAsNumber: true })}
          className="border p-2 w-full"
        />
        {errors.upfrontPayment && (
          <p className="text-red-500">{errors.upfrontPayment.message}</p>
        )}
      </div>

      <div>
        <label className="block">Terms (Months)</label>
        <input
          type="number"
          {...register("terms", { valueAsNumber: true })}
          className="border p-2 w-full"
        />
        {errors.terms && <p className="text-red-500">{errors.terms.message}</p>}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          className="bg-gray-500 text-white p-2"
          onClick={() => navigate("/step2")}
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
