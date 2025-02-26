import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { PersonalInfo } from "../types";
import { useWizardForm } from "../hooks/useWizardForm";

const currentYear = new Date().getFullYear();
const minYear = currentYear - 79;

const schema = z.object({
  firstName: z
    .string()
    .regex(/^[A-Za-zÄÖÜäöüß]+$/, "Invalid name")
    .min(1),
  lastName: z
    .string()
    .regex(/^[A-Za-zÄÖÜäöüß\s]+$/, "Invalid name")
    .min(1),
  dateOfBirth: z
    .string()
    .refine((date) => new Date(date).getFullYear() >= minYear, {
      message: "Max age is 79 years",
    }),
});

export default function Step1PersonalInfo({
  onNext,
}: {
  onNext: (data: PersonalInfo) => void;
}) {
  const navigate = useNavigate();
  const { formData, setLastStep } = useWizardForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfo>({
    resolver: zodResolver(schema),
    defaultValues: formData.personalInfo
  });

  const onSubmit = (data: PersonalInfo) => {
    onNext(data);
    setLastStep("/step2");
    navigate("/step2");
  };

  return (
    <div className="container">
      <h2>Step 1: Personal Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block font-medium">First Name</label>
          <input {...register("firstName")} />
          {errors.firstName && (
            <p className="error">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Last Name</label>
          <input {...register("lastName")} />
          {errors.lastName && (
            <p className="error">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Date of Birth</label>
          <input type="date" {...register("dateOfBirth")} />
          {errors.dateOfBirth && (
            <p className="error">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button type="submit" className="primary">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
