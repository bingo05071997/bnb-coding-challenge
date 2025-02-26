import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { ContactDetails } from "../types";
import { useWizardForm } from "../hooks/useWizardForm";

const schema = z.object({
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .regex(/^\+\d{10,15}$/, "Invalid phone format (E.164 required)"),
});

export default function Step2ContactDetails({
  onNext,
}: {
  onNext: (data: ContactDetails) => void;
}) {
  const navigate = useNavigate();
  const { formData, setLastStep } = useWizardForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactDetails>({
    resolver: zodResolver(schema),
    defaultValues: formData.contactDetails,
  });

  const onSubmit = (data: ContactDetails) => {
    onNext(data);
    setLastStep("/step3");
    navigate("/step3");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Step 2: Contact Details</h2>

      <div>
        <label className="block">Email</label>
        <input {...register("email")} className="border p-2 w-full" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block">Phone</label>
        <input {...register("phone")} className="border p-2 w-full" />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          className="bg-gray-500 text-white p-2"
          onClick={() => navigate("/step1")}
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
