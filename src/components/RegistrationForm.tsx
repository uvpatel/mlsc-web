"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/form/label";
import { Input } from "@/components/ui/form/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegistrationSchema, UserRegistrationInput } from "@/lib/validation/userSchema";
import axios from "axios";
import { motion } from "motion/react";

export function RegistrationForm({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistrationInput>({
    resolver: zodResolver(userRegistrationSchema),
  });

  const onSubmit = async (data: UserRegistrationInput) => {
    setLoading(true);
    setSuccess(false);
    setErrorMsg("");

    try {
      const response = await axios.post(`/api/events/${slug}/register`, data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-input dark:bg-black"
      >
        <h2 className="mb-2 text-2xl font-bold text-green-600 dark:text-green-500">🎉 Successfully Registered!</h2>
        <p className="text-neutral-600 dark:text-neutral-300">You are good to go. Keep an eye on your email for updates.</p>
      </motion.div>
    );
  }

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Register for Event
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300 mb-8">
        Please fill in your details to secure your spot.
      </p>

      {errorMsg && (
        <div className="mb-4 rounded flex items-center bg-red-100 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Full Name</Label>
          <Input id="username" placeholder="Tyler Durden" type="text" {...register("username")} />
          {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" {...register("email")} />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </LabelInputContainer>

        <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <LabelInputContainer>
            <Label htmlFor="year">Year of Study</Label>
            <Input id="year" placeholder="2" type="number" {...register("year", { valueAsNumber: true })} />
            {errors.year && <p className="text-xs text-red-500">{errors.year.message}</p>}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="idno">ID Number</Label>
            <Input id="idno" placeholder="STU123456" type="text" {...register("idno")} />
            {errors.idno && <p className="text-xs text-red-500">{errors.idno.message}</p>}
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="mobileno">Mobile Number</Label>
          <Input id="mobileno" placeholder="9876543210" type="tel" {...register("mobileno")} />
          {errors.mobileno && <p className="text-xs text-red-500">{errors.mobileno.message}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="department">Department</Label>
          <Input id="department" placeholder="Computer Science" type="text" {...register("department")} />
          {errors.department && <p className="text-xs text-red-500">{errors.department.message}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="github">GitHub Profile (Optional)</Label>
          <Input id="github" placeholder="https://github.com/..." type="text" {...register("github")} />
          {errors.github && <p className="text-xs text-red-500">{errors.github.message}</p>}
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] disabled:opacity-50 dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : (
            <>
              Confirm Registration &rarr;
              <BottomGradient />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
